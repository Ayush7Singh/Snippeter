import { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_LOAD_FAIL,USER_LOAD_SUCCESS,USER_LOAD_REQUEST } from "./constants/user.js";
import Header from "./comp/Header.jsx";
import Footer from './comp/Footer.jsx'
import Home from "./comp/Home.jsx";
import MySnipptes from "./comp/MySnipptes.jsx";
import CreateSnippet from "./comp/CreateSnippet.jsx";
import AddOthers from "./comp/AddOthers.jsx";
import UpdateSnippet from "./comp/Updatesnippet.jsx"
import Compiler from "./comp/Compiler.jsx";
import Explore from "./comp/Explore.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>async()=>{
      try {
        dispatch({
          type: USER_LOAD_REQUEST
        });
        const {data}=await axios.get("http://localhost:4000/api/v1/me",{withCredentials:true});
        dispatch({
          type : USER_LOAD_SUCCESS,
          payload : data.user,
        })
      } catch (error) {
        dispatch({
          type : USER_LOAD_FAIL,
        })
      }
    },[dispatch])
  return (
    <div className="w-96 mx-auto">
    <Router >
      <Header />
        <Routes>
          <Route path='/home' element={<MySnipptes/>} />
          <Route path="/" element={<Home />} />
          <Route path='/add/snippet' element={<AddOthers/>} />
          <Route path='/update/snippet/:id' element={<UpdateSnippet/>} />
          <Route path="/create/snippet" element={<CreateSnippet />} />
          <Route path='/compiler' element={<Compiler/>} />
          <Route path='/explore/snippets' element={<Explore/>} />
        </Routes>
      {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App;