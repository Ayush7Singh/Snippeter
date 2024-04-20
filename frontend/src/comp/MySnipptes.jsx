import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MySnipptes() {
  const navigate = useNavigate();
  const {isAuth,user} = useSelector((store) => store.user);

  const [snips,setsnips] = useState([]);

  useEffect(()=>async()=>{
    if(isAuth===false){
      navigate('/')
    }
    else{
      const {data}  = await axios.get("http://localhost:4000/api/v1/snippet/get", { withCredentials: true});
      setsnips(data);
    }
  },[])

  

  return (
    <div>
      <div>
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">All Snippets</h1>
    </div>
    <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
    {(snips)  ? (
            <>
            {snips.map((item)=>{
              return (
                <>
               {item.name}
               {item.code}
               {item.lan}
                </>
              )
            })}
            </>
          ) : (
            <p> loading </p>
          )}
      
      </div>
      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-800 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span class="title-font font-medium text-white">Kinfolk Chips Snackwave</span>
        </div>
      </div>
      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-800 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span class="title-font font-medium text-white">Coloring Book Ethical</span>
        </div>
      </div>
     </div>
</section>

    </div>
    </div>
  )
}
