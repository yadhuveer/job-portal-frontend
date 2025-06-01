import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Details from './components/Details';

import { useEffect } from 'react';
import Applicants from './components/Applicants';
import Login from './components/Login';

import Register from './components/Register';
import PostJob from './components/Newjob';
import ResumeViewer from './components/Resume';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home';
import Job from './components/Job'
import EditJobForm from './components/JobUpdate';

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [lastVisit, setLastVisit] = useState(null);
   
   
  useEffect(() => {
    
    fetch(`${import.meta.env.VITE_BACKEND_URL}/get-session`,{credentials: 'include' })  
      .then(res => res.json())
     
      .then(data => setUserEmail(data.userEmail));



       fetch(`${import.meta.env.VITE_BACKEND_URL}/lastvisit`,{credentials: 'include' })  
      .then(res => res.json())
     
      .then(data1 => setLastVisit(data1.lastVist));
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (/^\/jobs\/\d+$/.test(location.pathname)) {
      document.body.className = 'details-body'; 
    }else if(location.pathname=="/register"){
      document.body.className = 'register-body'; 
    } else if(location.pathname=="/login"){
      document.body.className = 'register-body'; 
    
    }else if(/^\/edit\/\d+$/.test(location.pathname)){
      document.body.className = 'register-body'; 
    }else if(/^\/applicants\/\d+$/.test(location.pathname)){
      document.body.className = 'register-body'; 
    }else if (/^\/viewResume\/pdf\/[^/]+$/.test(location.pathname)){
      document.body.className = 'register-body'; 
    } else if(location.pathname=="/postJob"){
      document.body.className = 'register-body';
    }
     else {
      document.body.className = 'general-body'; 
    }
  }, [location.pathname]);

  return (
   

       <>
       <Navbar userEmail={userEmail} lastVisit={lastVisit} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/jobs/:id" element={<Details />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<EditJobForm />} />
        <Route path="/applicants/:id" element={<Applicants />} />
        <Route path="/viewResume/pdf/:fileName" element={<ResumeViewer />} />
        <Route path="/postJob" element={<PostJob/>} />
       
      </Routes>
      </>
  );

}

export default App;
