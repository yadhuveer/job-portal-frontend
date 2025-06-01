import React, { useState,useEffect } from 'react';

import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import registerImage from '../assets/register.png';
const JobDetails = () => {
  const [showForm, setShowForm] = useState(false);
  
  const {id}=useParams();
  
  const [varJob,setVarJob]= useState({});

useEffect(()=>{
  const fetchJob = async()=>{
    try{
      console.log(`/viewDetails/${id}`);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/viewDetails/${id}`);
      if(response.ok){
        const data = await response.json();
        setVarJob(data);
        console.log(data);
      }else{

        console.error("falied to fetch job data");
      }
      
    }catch(error){
      //console.log(response);
      console.error('Error fetching job',error);
    }
  }
  fetchJob();
},[]);


const handleSubmit = async (e) => {
  
  
  e.preventDefault();
  console.log("Inside handlw submit");
  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/apply/${varJob?.id}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json(); 

    if (response.ok) {
      setShowForm(false);
      alert("Application submitted!");
      window.location.href = '/jobs';
      //setShowForm(false);
    } else {
      alert("Submission failed: " + result);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Network error.");
  }
};



  const deleteProduct = async (id) => {
    const result = window.confirm("Are you sure you want to delete this product?");
    if (result) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`, { method: "POST",credentials: 'include' });
        if (response.ok) {
          console.log("Product deleted successfully");
          window.location.href = '/jobs';
        }else if(response.status==401){
          window.location.href = '/login';
        } 
        else {
          console.log("Failed to delete the product");
        }
      } catch (error) {
        console.log("Error during fetch:", error);
      }
    }
  };

  return (
    <>
    <div className="container1">
      <section>
        <header>
          <img src={registerImage} alt="Register" />
        </header>
        <main>
          <h2>{varJob?.brief || 'No brief available'}</h2>
          <div>
            <a href={`/edit/${varJob?.id || 'No id available'}`}>
              <button>Edit</button>
            </a>
            <button onClick={() => deleteProduct(varJob?.id || 'No id available')}>Delete</button>
          </div>
          <p id="company">{varJob?.company || 'No company is available'}</p>
          <p id="role">{varJob?.role || 'No role is available'}</p>
          <p id="location" className="right">{varJob?.location || 'No location is available'}</p>
          <p id="salary" className="right">{varJob?.salary || 'No salary is available'}</p>
          <p id="lastDate" className="right">Apply By {varJob?.lastDate || 'No last date is available'}</p>
          <p id="openings" className="right">Number of Openings {varJob?.no_openings || 'no openings available'}</p>
          <Link to={`/applicants/${varJob?.id || 'No id'}`} id="applicants" className="right">
  Applicants {varJob?.applicants || 'No applicants'}
</Link>
          

          <div id="skill" className="right">
            {varJob?.skills?.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>

          <button id="apply" className="right" onClick={() => setShowForm(true)}>Apply Now</button>
        </main>
      </section>

      {showForm && (
        <div id="form">
          <div id="head">
            <p>easily</p>
            <i className="fa-solid fa-xmark" onClick={() => setShowForm(false)}></i>
          </div>
          <hr />
          <br />
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <p>Apply in less than one Minute</p>
            <br />

            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Enter Your Name" />
            </div>
            <br />

            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" />
            </div>
            <br />

            <div>
              <label htmlFor="phone">Contact</label>
              <input type="tel" name="phone" id="phone" placeholder="+91---- -- ----" />
            </div>
            <br />

            <div>
              <label htmlFor="resume">Resume</label>
              <input type="file" name="resume" id="resume" />
            </div>
            <br />

            <button id="submit" type="submit" >Submit</button>
          </form>
        </div>
      )}
      </div>
    </>
  );
};

export default JobDetails;
