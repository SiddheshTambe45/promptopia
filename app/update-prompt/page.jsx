"use client";

// 'use client';

// import {Suspense, useEffect, useState} from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Form from '@components/Form';
// import axios from 'axios';

// // Force the page to use dynamic rendering (client-side only)
// export const dynamic = 'force-dynamic';

// const UpdatePrompt = () => {

//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const promptId = searchParams?.get('id');

//     const [submitting, setSubmitting] = useState(false);
//     const [post, setPost] = useState({
//         prompt: '',
//         tag: ''
//     })

//     const updatePrompt = async(e) => {
//       e.preventDefault();
//       setSubmitting(true);

//       if(!promptId){
//         return alert('Prompt ID not found');
//       }

//       try {
//         const response = await axios.patch(`/api/prompt/${promptId}`,{
//           prompt: post.prompt,
//           tag: post.tag
//         });

//         if(response.status === 200){
//           router.push('/');
//         }
//       } catch (error) {
//         console.log(error);
//       } finally{
//         setSubmitting(false);
//       }
//     }

//     useEffect(()=>{
//         const getPromptDetails = async() => {
//             const response = await axios.get(`/api/prompt/${promptId}`);
//             setPost({
//                 prompt: response.data.prompt,
//                 tag: response.data.tag
//             })
//         }

//         if(promptId) getPromptDetails();
//     },[promptId])

//   return (
//         <Form
//         type="Edit"
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={updatePrompt}
//       />
//   )
// }

// export default UpdatePrompt;


import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
