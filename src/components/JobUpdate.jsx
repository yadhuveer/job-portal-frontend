import React, { useState } from 'react';

import styles from  '../styles/jobForm.module.css'

import {useParams} from 'react-router-dom';
const EditJobForm = () => {
    const {id}=useParams();
  
    const [formValues, setFormValues] = useState({
    id,
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
      const selected = Array.from(selectedOptions).map(opt => opt.value);
      setFormValues(prev => ({ ...prev, [name]: selected }));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    }).
    then(async res => {
      const data = await res.json();
      if (!res.ok) {
        // Server-side validation errors
        setErrors(data.errors || [{ msg: "Unknown error" }]);
      } else {
        alert("Job updated successfully!");
        window.location.href = '/jobs';
        // Optionally redirect or clear form
      }
    })
    .catch(err => {
      console.error(err);
      setErrors([{ msg: "Network error or server down." }]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCss}>
      {errors.length > 0 &&
        errors.map((err, index) => (
          <div className="alert alert-danger" role="alert" key={index}>
            {err.msg}
          </div>
        ))}

      <h3>Update Job</h3>

      <input type="hidden" value={formValues.id} name="id" />

      <div className={styles.formCssdiv}>
        <label htmlFor="JobType">Job Type</label>
        <select id="JobType" name="JobType" onChange={handleChange}>
          <option selected value="tech">Tech</option>
          <option  value="non-tech">Non Tech</option>
        </select>
      </div>

      <div className={styles.formCssdiv}>
        <label htmlFor="designation">Designation</label>
        <select id="designation" name="designation" onChange={handleChange}>
          <option selected value="Mern Developer">Mern Developer</option>
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

export default EditJobForm;
