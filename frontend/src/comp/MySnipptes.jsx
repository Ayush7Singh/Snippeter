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
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 pt-12 text-white">
            All Snippets
          </h1>
        </div>
        <section class="text-gray-400 bg-gray-900 body-font">
          <div class="container px-5 py-8 mx-auto">
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {snips ? (
                <>
                  {snips.map((item) => {
                    return (
                      <>
                        <div class="p-2 sm:w-1/2 w-full">
                          <div class="bg-gray-800 rounded flex justify-between p-4 h-full items-center">
                            <div>
                            <button
                              title="Copy"
                              onClick={() => copyToClipboard(item.code)}
                              >
                              <i class="fa-solid fa-copy text-xl px-2 text-yellow-500 hover:text-blue-500"></i>
                            </button>
                            <span class="title-font font-medium text-white">
                              {item.name + "(" + item.lan + ")"}{" "}
                            </span>
                            </div>
                            <div >
                            <i title = "share" onClick={()=>copyToClipboard(item._id)} class="fa-solid hover:text-white fa-share"></i>
                            <Link title="edit" to={`/update/snippet/${item._id}`}><i class="fa-solid px-2 hover:text-orange-600 fa-pen-to-square"></i></Link>
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
          </div>
        </section>
      </div>
    </div>
  );
}
