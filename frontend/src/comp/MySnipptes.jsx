import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MySnipptes() {
  const navigate = useNavigate();
  const {isAuth,user} = useSelector((store) => store.user);

  useEffect(()=>{
    if(user === null){
      navigate('/user/auth')
    }
  },[isAuth,navigate])

  
  return (
    <div>
      Mysinppets
    </div>
  )
}
