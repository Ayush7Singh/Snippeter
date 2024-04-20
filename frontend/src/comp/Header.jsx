import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate('/');
  const {isAuth,user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handler = async ()=>{
    try{
      const { data } = await axios.get('http://localhost:4000/api/v1/user/logout',{withCredentials: true});
      dispatch({
        type : "LOGOUT_USER"
      })
      navigate('/')
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className=''>
      <header class="text-gray-400 bg-gray-900 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          {isAuth && (
            <>
            <Link to="/" class="mr-5 hover:text-white">My Snip</Link>
            <Link to="/create/snippet" class="mr-5 hover:text-white">Create Snip</Link>
            <Link to='/add/snippet' class="mr-5 hover:text-white">Add Snip</Link>
            <Link to='/update/snippet/66235969d0c8714569afef50' class="mr-5 hover:text-white">Edit Snip</Link>
            <a class="mr-5 hover:text-white">Default Snip</a>
            </>
          )}
        </nav>
        <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-orange-500">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
    </svg>
          <span class="ml-3 text-xl xl:block lg:hidden">Snippeter</span>
        </a>
        <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          {
            user!=null && (
              <>
          <button 
          onClick={handler}
           class="inline-flex hover:bg-red-900 items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">Logout
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
              </>
            )
          }
        </div>
      </div>
    </header>
    </div>
  )
}
