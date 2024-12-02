import React from 'react';
import { FaPlus } from 'react-icons/fa';
import s from './CreateTask.module.css';

export default function CreateTask({ onFileUpload }) {
  const handleFileInput = (e) => {
    const files = e.target.files;
    if (onFileUpload) {
      onFileUpload(files); 
    }
  };

  return (
    <div className={s.createTask}>
      <div className={s.title}>Tasks:</div>  
      <div className={s.text}>Create Task</div>
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
