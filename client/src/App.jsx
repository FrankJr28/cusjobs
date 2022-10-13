import './App.css';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import AppliedJobs from './pages/AppliedJobs';
import JobInfo from './pages/JobInfo';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register';

import DefaultLayout from './components/DefaultLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, {useEffect} from 'react';
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from "./redux/actions/jobActions";
import PostedJobs from './pages/PostedJobs';
import EditJob from './pages/EditJob';
import { getAllUsers } from './redux/actions/userActions';
import UserInfo from './pages/UserInfo';


function App() {
  const {loader}= useSelector(state=>state.loaderReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers()) 
  }, []);
  return (
    <div className="App">
      {loader && (<div className="sweet-loading text-center">
        <ClipLoader color={'#001529'} />
      </div>)}
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register/>} />
        </Routes>

        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/appliedjobs" element={<ProtectedRoute><AppliedJobs/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/postjob" element={<ProtectedRoute><PostJob/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/posted" element={<ProtectedRoute><PostedJobs/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/jobs/:id" element={<ProtectedRoute><JobInfo/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/editjob/:id" element={<ProtectedRoute><EditJob/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route path="/users/:id" element={<ProtectedRoute><UserInfo/></ProtectedRoute>} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({children}){
  const user = localStorage.getItem('user')
  if(user){
    return children;
  }
  else{
    return <Navigate to="/login" replace={true} />
  }
}

/*
import { BrowserRouter as Router } from 'react-router-dom';
<Router exact path="/">
      <Home/>
    </Router>
*/