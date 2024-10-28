'use client';

import Profile from '@components/Profile';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const UserProfile = ({params}) => {

    const searchParams = useSearchParams();
    const userName = searchParams.get('name'); 

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async() => {
            const response = await axios.get(`/api/users/${params?.id}/posts`);

            setPosts(response.data);
        }

        if(params?.id)  fetchPosts();
    },[params.id]);

  return (
    <div>
        <Profile 
            name = {userName}
            desc = {`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data = {posts}
        />
    </div>
  )
}

export default UserProfile;