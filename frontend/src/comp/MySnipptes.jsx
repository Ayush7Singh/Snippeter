import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MySnipptes() {
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((store) => store.user);
  const [load, setLoad] = useState(false);
  const [snips, setsnips] = useState([]);
  const [search, setSearch] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied Successfully!")
  };
  

  const handler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/snippet/delete/${id}`,
        { withCredentials: true }
      );
      toast.success("Deleted Successfully!");
      setLoad(!load);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(
    () => async () => {
      if (isAuth === false) {
        navigate("/");
      } else {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/snippet/get",
          { withCredentials: true }
        );
        setsnips(data);
        console.log(data);
      }
    },
    [load]
  );

  return (
    <div>
      <ToastContainer />
      <div>
        <div class="flex flex-col mx-auto text-center w-full mb-8">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 pt-4 text-white">
            All Snippets
          </h1>
         
             <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Search Snippets"
             class="w-3/4 mx-auto bg-gray-100 bg-opacity-10 text-center rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
           
        </div>
        <section class="flex  justify-center text-gray-400 bg-gray-900 body-font">
          {snips ? (<>return (<p>{snips}</p>)</>) : (<>return (<p>false</p>)</>)}
            <div class="flex flex-col justify-center">
              {snips ? (
                <>
                
                  {snips
                  .filter((val)=>{
                    if(search===""){return val;}
                    else if(val.name.toLowerCase().includes(search.toLowerCase())){return val;}
                  })
                  .map((item) => {
                    return (
                      <>
                        <div class="p-2">
                          <div class="bg-gray-800 rounded flex justify-between p-4 h-full items-center">
                            <div>
                            <button
                              title="Copy"
                              onClick={() => copyToClipboard(item.code)}
                              >
                              <i class="fa-solid fa-copy text-xl pr-4 text-yellow-500 hover:text-blue-500"></i>
                            </button>
                            <span class="title-font mr-9 font-medium text-white">
                              {item.name + "(" + item.lan + ")"}{" "}
                            </span>
                            </div>
                            <div >
                            <i title = "share" onClick={()=>copyToClipboard(item._id)} class="fa-solid pr-4 hover:text-white fa-share"></i>
                            <Link title="edit" to={`/update/snippet/${item._id}`}><i class="fa-solid pr-4 hover:text-orange-600 fa-pen-to-square"></i></Link>
                            <button
                              onClick={() => {
                                handler(item._id);
                              }}
                              >
                              <i class="fa-solid fa-trash hover:text-red-700"></i>
                            </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <p> Loading </p>
              )}
            </div>
        </section>
      </div>
    </div>
  );
}
