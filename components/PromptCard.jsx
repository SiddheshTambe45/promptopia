'use client';

import {useState} from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, textHighlight }) => {

  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = async() => {

    await navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);

    setTimeout(() => {
      setCopied('');
    }, 3000);
  }

  // Function to highlight text
  const highlightText = (text, search) => {
    if (!search) return text; // Return original text if no search term

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    console.log("entered")
    return parts.map((part, index) => 
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className='text-red-600'>{part}</span>
      ) : (
        part
      )
    );
  };

  // Get the prompt text (with truncation if necessary)
  const displayPrompt = post.prompt.length > 150 ? `${post.prompt.slice(0, 150)}...` : post.prompt;

  return (
    <div className='prompt_card relative'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.userName}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            width={12} 
            height={12}
          />
        </div>

      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{highlightText(displayPrompt, textHighlight)}</p>

      <p className='font-inter text-sm blue_gradient cursor-pointer absolute bottom-5 left-5' onClick={() => handleTagClick && handleTagClick(post.tag) }>
        {post.tag}
      </p>

      {
        session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3 absolute bottom-5 right-5'>
            <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
            <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>
          </div> 
        )
      }
    </div>
  )
}

export default PromptCard