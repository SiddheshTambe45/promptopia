// 'use client';

// import {useState, useEffect} from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Profile from '@components/Profile';
// import axios from 'axios';

// // This ensures the page only renders dynamically on the client
// export const dynamic = 'force-dynamic';

// const MyProfile = () => {

//   const {data: session} = useSession();
//   const router = useRouter();

//   const [posts, setPosts] = useState([]);

//   const handleEdit = (post) => {
//     router.push(`/update-prompt?id=${post._id}`);
//   }

//   const handleDelete = async(post) => {

//     const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

//     if(hasConfirmed){
//       try {
//         await axios.delete(`/api/prompt/${post._id.toString()}`);

//         const filteredPosts = posts.filter((p) => p._id !== post._id);

//         setPosts(filteredPosts);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // router.push(`/delete-prompt?id=${post._id}`);
//   }

//   useEffect(()=>{
//     const fetchPosts = async() => {
//       const response = await axios.get(`/api/users/${session?.user.id}/posts`);
//       setPosts(response.data);
//     }

//     if(session?.user.id) fetchPosts();
//   },[])

//   return (
//     <Profile
//       name='My'
//       desc='Welcome to your personlized profile page'
//       data={posts}
//       handleEdit={handleEdit}
//       handleDelete={handleDelete}
//     />
//   )
// }

// export default MyProfile;

'use client'; // Client-side only

import { useSearchParams } from 'next/navigation'; // Import from next/navigation
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Ensure dynamic rendering to avoid static generation errors
export const dynamic = 'force-dynamic';

const UpdatePrompt = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // useSearchParams is client-side only

  // Extract the id from the URL search parameters
  const promptId = searchParams.get('id');

  useEffect(() => {
    if (promptId) {
      const fetchPrompt = async () => {
        try {
          const { data } = await axios.get(`/api/prompt/${promptId}`);
          setPost(data);
        } catch (error) {
          console.error("Failed to fetch prompt:", error);
        }
      };

      fetchPrompt();
    }
  }, [promptId]);

  const handleUpdate = async () => {
    // Handle the update logic here
    // You can send an API request to update the prompt with the new data
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {post ? (
          <div>
            <h1>Update Prompt</h1>
            <form onSubmit={handleUpdate}>
              <textarea defaultValue={post.content}></textarea>
              <button type="submit">Update</button>
            </form>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Suspense>
  );
};

export default UpdatePrompt;
