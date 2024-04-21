import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Explore() {

  const [allSnips, setAllSnips] = useState([]);
  const [val , setVal] = useState(false);

  const addHandler = async(id)=>{
    try {
      const {data}  = await axios.post("http://localhost:4000/api/v1/explore/add", {id} ,{ withCredentials: true});
      toast.success("Added Successfully")
      setVal(!val);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  useEffect(()=>async()=>{
    try {
      const {data} = await axios.get('http://localhost:4000/api/v1/allsnip',{withCredentials : true});
      
        setAllSnips(data.snips);
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },[val])

  return (
    <div>
      <ToastContainer/>
      <section class="text-gray-400 body-font bg-gray-900">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Explore Snippets</h1>
            <p class="lg:w-1/2 w-full leading-relaxed text-opacity-80">Add the snippets of coders all around the globe.</p>
          </div>
          <div class="flex flex-wrap -m-4">
          {allSnips.length ? (
            <>
              {allSnips.map((item)=>{
                return (
                  <>
                    <div class="xl:w-1/3 md:w-1/2 p-4">
                      <div class="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                        <div className='flex flex-row justify-between'>
                        <h2 class="text-lg text-indigo-500 font-medium title-font mb-2">{item.name}</h2>
                        <i onClick={()=>addHandler(item._id)} title="Add it" class="fa-solid text-xl hover:scale-110 hover:text-yellow-500 fa-circle-plus"></i>
                        </div>
                        <div className='flex flex-row justify-between'>
                        <p class="leading-relaxed text-base">{item.lan}</p>
                        <p class="leading-relaxed text-base">{item.shareCount} <i class="fa-solid fa-user-group"></i></p>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </>
          ) : (
            <p> Loading </p>
          ) }
          </div>
          
        </div>
      </section>
    </div>
  )
}
