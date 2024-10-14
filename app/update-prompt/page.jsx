'use client';

import {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';

const UpdatePrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async(e) => {
      e.preventDefault();
      setSubmitting(true);

      if(!promptId){
        return alert('Prompt ID not found');
      }

      try {
        const response = await axios.patch(`/api/prompt/${promptId}`,{
          prompt: post.prompt,
          tag: post.tag
        });

        if(response.status === 200){
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      } finally{
        setSubmitting(false);
      }
    }

    useEffect(()=>{
        const getPromptDetails = async() => {
            const response = await axios.get(`/api/prompt/${promptId}`);
            setPost({
                prompt: response.data.prompt,
                tag: response.data.tag
            })
        }

        if(promptId) getPromptDetails();
    },[promptId])

  return (
    <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt;