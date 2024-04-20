import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_LOAD_FAIL,USER_LOAD_SUCCESS,USER_LOAD_REQUEST } from "./constants/user.js";
import Header from "./comp/Header.jsx";
import Footer from './comp/Footer.jsx'
import Home from "./comp/Home.jsx";
import MySnipptes from "./comp/MySnipptes.jsx";
import CreateSnippet from "./comp/CreateSnippet.jsx";
import AddOthers from "./comp/AddOthers.jsx";
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
    <div className="min-h-screen flex flex-col">
    <Router >
      <Header />
        <Routes>
          <Route path='/home' element={<MySnipptes/>} />
          <Route path="/" element={<Home />} />
          <Route path='/add/snippet' element={<AddOthers/>} />
          <Route path="/create/snippet" element={<CreateSnippet />} />
        </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;