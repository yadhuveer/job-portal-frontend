import React from 'react';

import {useParams} from 'react-router-dom';
const ResumeDisplay = () => {
    const {fileName}=useParams();
    console.log(fileName);
  if (!fileName) return null;
  

  const ext = fileName.split('.').pop().toLowerCase();
  console.log(ext);
  console.log(`http://localhost:3000/pdf/${encodeURIComponent(fileName)}`);

  return (
    <>
      {ext === 'pdf' ? (
        
        <iframe src={`http://localhost:3000/pdf/${encodeURIComponent(fileName)}`} width="100%" height="600px" title="Resume PDF" />
      ) : (
        <img src={`http://localhost:3000/pdf/${encodeURIComponent(fileName)}`} width="100%" height="600px" alt="Resume Preview" />
      )}
    </>
  );
};

export default ResumeDisplay;
