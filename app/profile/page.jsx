'use client';

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import axios from 'axios';

// This ensures the page only renders dynamically on the client
export const dynamic = 'force-dynamic';

const MyProfile = () => {

  const {data: session} = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async(post) => {

    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed){
      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`);

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
    // router.push(`/delete-prompt?id=${post._id}`);
  }

  useEffect(()=>{
    const fetchPosts = async() => {
      const response = await axios.get(`/api/users/${session?.user.id}/posts`);
      setPosts(response.data);
    }

    if(session?.user.id) fetchPosts();
  },[])

  return (
    <Profile
      name='My'
      desc='Welcome to your personlized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;