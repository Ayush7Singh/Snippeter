import axios from 'axios';
import React, { useState } from 'react';

export default function Compiler() {
  const [code, setCode] = useState(
    `Code here`
  );
  const [lan, setLan] = useState("");
  const [input, setInput] = useState("");
  const [output,setOutput] = useState("");
  
  const handler = async()=>{
    try {
      const {data} = await axios.post("http://localhost:4000/api/v1/compile",{code,lan,input}, {withCredentials : true} );
      setOutput(data.output);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font relative">
  <div class="container px-5 py-20 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font  text-white">Online Compiler</h1>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
       
        <div class="p-2 w-full">
          <div class="relative">
            <div className='flex flex-row justify-between'>
              <label for="message" class="leading-7 text-sm text-gray-400">Code </label>
              <div>
                <select className='bg-gray-700 rounded-md'>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
              </div>
            </div>
            <textarea onChange={(e)=>setCode(e.target.value)} id="message" name="message" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>


        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-400">Input</label>
            <textarea onChange={(e)=>setInput(e.target.value)} id="message" name="message" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-400">Output</label>
            <textarea value={output} id="message" name="message" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        
        <div class="p-2 w-full">
          <button
           onClick={handler}
           class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Run</button>
        
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
