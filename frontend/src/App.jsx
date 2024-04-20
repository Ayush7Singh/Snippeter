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
    <Router >
      <Header />
        <Routes>
          <Route path='/' element={<MySnipptes/>} />
          <Route path="/user/auth" element={<Home />} />
          <Route path="/create/snippet" element={<CreateSnippet />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;