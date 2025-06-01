import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import './Jobs.css'; // optional, if you have styling
import styles from  '../styles/home.module.css'
function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/jobs') 
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs))
      .catch((err) => console.error(err));
  }, []);
  

  return (
    <div className={styles.jobContainer}>
      {jobs.map((job) => (
        <div className={styles.jobCard} key={job.id}>
          <p>{job.status}</p>
          <p className={styles.comp}>{job.company}</p>
          <p>{job.role}</p>
          <p><i className="fa-solid fa-location-dot"></i> {job.location}</p>
          <p>{job.salary}</p>
        
          <div className={styles.skillSection}>
            {job.skills.map((skill, index) => (
              <p className={styles.skillSectionp} key={index}>{skill}</p>
            ))}
          </div>

          <Link className={styles.jobCarda} to={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
