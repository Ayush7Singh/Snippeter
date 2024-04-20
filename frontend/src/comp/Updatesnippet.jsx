import React, {useState,useEffect} from 'react'
import {  useSelector } from "react-redux";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useParams } from 'react-router-dom';

export default function UpdateSnippet() {
  const [name, setname] = useState("")
  const [lan,setlan] = useState("");
  const [code,setcode] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const {isAuth} = useSelector((store) => store.user);

  useEffect((e)=>async()=>{
    if(isAuth===false){
      navigate('/')
    }
    else{
      console.log(id);
       const {data}  = await axios.get(`http://localhost:4000/api/v1/snippet/get/${id}`, { withCredentials: true});
       setname(data.name);
       setlan(data.lan);
       setcode(data.code);
    }
  },[])

  

  const handler = async()=>{
    try {
     
    const {data}  =await axios.post(`http://localhost:4000/api/v1/snippet/update/${id}`,{name,lan,code}, { withCredentials: true});
      toast.success("Created Successfully!");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Update Snippet</h1>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-400">Name</label>
            <input type="text" value={name} onChange={(e)=>setname(e.target.value)}  id="name" name="name" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="lan" class="leading-7 text-sm text-gray-400">Language</label>
            <input type="text"  value={lan} onChange={(e)=>setlan(e.target.value)}  id="lan" name="lan" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="code" class="leading-7 text-sm text-gray-400">Code</label>
            <textarea  value={code} onChange={(e)=>setcode(e.target.value)} id="code"  name="code" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button onClick={handler} class="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">Update</button>
        </div>
    
      </div>
    </div>
  </div>
</section>
<ToastContainer />
    </div>
  )
}
