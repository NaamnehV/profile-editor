import React, { useState, useEffect } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import s from './AvatarUpload.module.css'; 

export default function AvatarUpload({ onAvatarChange }) {
  const [preview, setPreview] = useState(null); // State for image preview
  const [error, setError] = useState(null);     // State for error messages

  // Load avatar from localStorage when the component is mounted
  useEffect(() => {
    const savedAvatar = localStorage.getItem('avatar');
    if (savedAvatar) {
      setPreview(savedAvatar); // Set the saved avatar as preview
    }
  }, []);

  // Handle file change when a user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    // Validate file type (only .jpg, .jpeg, .png are allowed)
    const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file && !supportedFormats.includes(file.type)) {
      setError('Only .jpg, .jpeg, and .png files are supported.');
      setPreview(null); // Clear the preview on error
      return;
    }

    // Validate file size (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB.');
      setPreview(null); // Clear the preview on error
      return;
    }

    // Set the preview and save the file to localStorage
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl); // Update the preview
    setError(null); // Clear any error

    // Save the file URL to localStorage
    localStorage.setItem('avatar', fileUrl);

    // Send the selected file to the parent component
    onAvatarChange(file);
  };

  return (
    <div className={s.avatarUploadWrapper}>
      <div className={s.avatarUpload}>
        <label htmlFor="file-input" className={s.avatarLabel}>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Call the handler when file is selected
            className={s.fileInput}
          />
          <div className={s.iconContainer}>
            {/* Show camera icon if no avatar is selected */}
            {!preview ? (
              <TbCameraPlus className={s.cameraIcon} />
            ) : (
              <img src={preview} alt="Avatar" className={s.avatarImage} />
            )}
          </div>
        </label>
        {/* Display error message if there is an error */}
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}
