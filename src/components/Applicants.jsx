import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from  '../styles/applicant.module.css';
const ApplicantsGrid = () => {
  const [applicantsArray, setApplicantsArray] = useState([]);
  const {id}=useParams();
  
  useEffect(() => {
    // Replace with your actual backend API endpoint
    axios.get(`http://localhost:3000/applicants/${id}`,{ withCredentials: true })
      .then(response => {
        setApplicantsArray(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching applicants:', error);
        alert("Please refister and login to view applicants")
        window.location.href = '/login';
      });
  }, []);

  return (
    <div className={styles.gridContainer}>
      <p>#</p>
      <p>Name</p>
      <p>Email</p>
      <p>Contact</p>
      <p>Resume</p>

      {applicantsArray.map((job, index) => (
        <React.Fragment key={job.id || index}>
          <p>{index + 1}</p>
          <p>{job.name}</p>
          <p>{job.email}</p>
          <p>{job.phone}</p>
          
          <Link to={`/viewResume${job.fileName}`}>View</Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ApplicantsGrid;
