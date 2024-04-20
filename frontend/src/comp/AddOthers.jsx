import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'

export default function AddOthers() {

  const [name,setName] = useState("");
  const [id,setId] = useState("");
  const handler = async()=>{
    try {
      const {data} = await axios.post('http://localhost:4000/api/v1/add/snippet',{name,id},{withCredentials : true});
      toast.success("Added Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <ToastContainer/>
      <section class="text-gray-400 bg-gray-900 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Add Others Snippets</h1>
        </div>
        <div class="flex lg:w-2/3 w-full sm:flex-col flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
          <div class="relative sm:mb-0 flex-grow w-full">
            <label for="objectID" class="leading-7 text-sm text-gray-400">Snippet Refer ID</label>
            <input onChange={(e)=>setId(e.target.value)} type="text" id="objectID" name="objectID" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div class="relative sm:mb-0 py-8 flex-grow w-full">
            <label for="name" class="leading-7 text-sm text-gray-400">New Name</label>
            <input onChange={(e)=>setName(e.target.value)}  type="name" id="name" name="name" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <button onClick={handler} class="text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">Add</button>
        </div>
      </div>
    </section>
    </div>
  )
}
