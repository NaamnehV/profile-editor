import React from 'react';
import { FaPlus } from 'react-icons/fa';
import s from './CreateProject.module.css';

export default function CreateProject({ onFileUpload }) {
  const handleFileInput = (e) => {
    const files = e.target.files;
    if (onFileUpload) {
      onFileUpload(files);
    }
  };

  return (
    <div className={s.createProject}>
      <div className={s.title}>Projects:</div> 
      <div className={s.text}>Create Project</div>
      <label className={s.uploadButton}>
        <FaPlus className={s.icon} />
        <input
          type="file"
          onChange={handleFileInput}
          multiple
          className={s.fileInput}
        />
      </label>
    </div>
  );
}
