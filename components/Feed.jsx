'use client';

import { useState, useEffect} from 'react';
import PromptCard from './PromptCard';
import axios from 'axios';

const PromptCardList = ({ data, handleTagClick, textHighlight }) => {

  return(
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            textHighlight={textHighlight}
          />
        ))
      }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] =useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    let filtered = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(value) ||
        post.tag.toLowerCase().includes(value) ||
        post.creator.userName.toLowerCase().includes(value) ||
        post.creator.email.toLowerCase().includes(value)
      );
    });

    setFilteredPosts(filtered);
  }

  const handleTagClick = async(e) => {
    const value = e.toLowerCase();
    setSearchText(value);

    let filtered = posts.filter((post) => {
      return (
        post.tag.toLowerCase().includes(value)
      );
    });

    setFilteredPosts(filtered);
  }

  useEffect(()=>{
    const fetchPosts = async() => {
      const response = await axios.get('/api/prompt');
      setPosts(response.data);
    }

    fetchPosts();
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag or a username' className='search_input peer' value={searchText} onChange={handleSearchChange} required />
      </form>

      <PromptCardList 
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        handleTagClick={handleTagClick}
        textHighlight={searchText}
      />
    </section>
  )
}

export default Feed;