import React, { useState } from 'react';

import styles from  '../styles/jobForm.module.css';

const PostJobForm = () => {
  const [formValues, setFormValues] = useState({
    JobType: 'Tech',
    
    designation: 'Mern Developer',
    location: '',
    company: '',
    salary: '',
    positions: '',
    options: [],
    lastDate: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === 'select-multiple') {
      const selected = Array.from(selectedOptions).map((opt) => opt.value);
      setFormValues((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/postJob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
      credentials: 'include'
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if(data.error=="Unauthorized"){
            alert("Please register and login to Post a new job");
             window.location.href = '/login';
          }else{
          setErrors(data.errors || [{ msg: 'Unknown error' }]);
          //window.location.href = '/login';
          }
        } else {
          alert('Job posted successfully!');
          window.location.href = '/jobs';
        }
      })
      .catch((err) => {
        console.error(err);
        setErrors([{ msg: 'Network error or server down.' }]);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="formCss" className={styles.formCss}>
      {errors.length > 0 &&
        errors.map((err, index) => (
          <div className="alert alert-danger" role="alert" key={index}>
            {err.msg}
          </div>
        ))}

      <h3>Post a new job</h3>

      <div className={styles.formCssdiv}>
        <label htmlFor="JobType">Job Type</label>
        <select id="JobType" name="JobType" onChange={handleChange}>
          <option value="tech">Tech</option>
          <option value="non-tech">Non Tech</option>
        </select>
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="designation">Designation</label>
        <select id="designation" name="designation" onChange={handleChange}>
          <option value="Mern Developer">Mern Developer</option>
          <option value="Mean Developer">Mean Developer</option>
          <option value="Java Developer">Java Developer</option>
          <option value="Backend Developer">Backend Developer</option>
        </select>
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="location">Enter Job Location</label>
        <input type="text" name="location" id="location" onChange={handleChange} />
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="company">Enter company Name</label>
        <input type="text" name="company" id="company" onChange={handleChange} />
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="salary">Enter Salary</label>
        <input type="text" name="salary" id="salary" onChange={handleChange} />
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="positions">Total Positions</label>
        <input type="number" name="positions" id="positions" onChange={handleChange} />
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="options">Select Skills required for this job</label>
        <select id="options" name="options" multiple size="5" onChange={handleChange}>
          <option value="React">React</option>
          <option value="Angular">Angular</option>
          <option value="Node">Node</option>
          <option value="JS">JS</option>
          <option value="Mongo DB">Mongo DB</option>
        </select>
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="lastDate">Apply By</label>
        <input type="date" id="lastDate" name="lastDate" onChange={handleChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostJobForm;
