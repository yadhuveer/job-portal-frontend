import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual API call
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).
    then(response => {
      if (!response.ok) throw new Error("Request failed");
      return response.text();
    })
    .then(data => {
    console.log('Success:', data);
    window.location.href = '/login';
})
  };

  return (
    <>
      <h1 className="mt-5 mb-4" style={{ marginLeft: '3rem' }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ width: '80%', marginLeft: '3rem' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            required 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
