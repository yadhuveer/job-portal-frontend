// src/Home.jsx

import styles from  '../styles/home.module.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className={styles.container1}>
      <div className={styles.homeHeader}>
        <h2>Welcome to Job Portal</h2>
        <h3 className={styles.h3Header}>Find your dream job today!</h3>
      

      <div className={styles.jobseeker}>
        <Link to="/jobs" className={styles.jobSeekerlinks}>I'm A job Seeker</Link>
        <Link to="/register" className={styles.jobSeekerlinks}>I'm Recutier</Link>
       
      
      </div>

      </div> 
    </div>
  );
}

export default Home;
