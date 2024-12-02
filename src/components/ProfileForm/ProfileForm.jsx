import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AvatarUpload from '../AvatarUpload/AvatarUpload';
import InterestsField from '../InterestsField/InterestsField';
import LinksField from '../LinksField/LinksField';
import s from './ProfileForm.module.css';

export default function ProfileForm() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    jobTitle: '',
    phone: '',
    address: '',
    email: '',
    avatarUrl: '',
    visibility: 'Private',
    pitch: '',
    interests: [],
    links: [],
  });

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setProfile(savedProfile);
      // Update the form with the saved profile values
      Object.keys(savedProfile).forEach(key => {
        setValue(key, savedProfile[key]);
      });
    }
  }, [setValue]);

  // Handle avatar image change
  const handleAvatarChange = (file) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      avatarUrl: URL.createObjectURL(file),
    }));
  };

  // Form submission handler
  const onSubmit = (data) => {
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    localStorage.setItem('profile', JSON.stringify(updatedProfile)); // Save updated profile
  };

  // Input field with validation
  const renderInputField = (id, placeholder, validationRules, value) => (
    <div className={`${s.inputContainer} ${value ? s.filled : s.empty}`}>
      <input
        type="text"
        id={id}
        {...register(id, validationRules)}
        placeholder={placeholder}
        defaultValue={value || ''}
        className={s.input}
      />
      {errors[id] && <p className={s.errorMessage}>{errors[id].message}</p>}
    </div>
  );

  return (
    <div className={s.formMedia}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Avatar upload */}
        <AvatarUpload avatarUrl={profile.avatarUrl} onAvatarChange={handleAvatarChange} />

        {/* Name field */}
        {renderInputField('name', 'Name', {
          required: 'Name is required',
          minLength: { value: 2, message: 'Name must be at least 2 characters' },
          maxLength: { value: 50, message: 'Name must be less than 50 characters' },
          pattern: { value: /^[A-Za-zА-Яа-яЁё\s-]+$/, message: 'Name can only contain letters and spaces' },
        }, profile.name)}

        {/* Surname field */}
        {renderInputField('surname', 'Surname', {
          required: 'Surname is required',
          minLength: { value: 2, message: 'Surname must be at least 2 characters' },
          maxLength: { value: 50, message: 'Surname must be less than 50 characters' },
          pattern: { value: /^[A-Za-zА-Яа-яЁё\s-]+$/, message: 'Surname can only contain letters and spaces' },
        }, profile.surname)}

        {/* Job Title field */}
        {renderInputField('jobTitle', 'Job Title', {
          maxLength: { value: 100, message: 'Job title must be less than 100 characters' },
          pattern: { value: /^[A-Za-z0-9\s-]+$/, message: 'Job title can contain letters, numbers, and spaces' },
        }, profile.jobTitle)}

        {/* Phone number field */}
        {renderInputField('phone', 'Phone Number', {
          required: 'Phone number is required',
          pattern: { value: /^\+([0-9]{10,15})$/, message: 'Phone number must start with "+" followed by digits, and be between 10 to 15 digits long' },
        }, profile.phone)}

        {/* Email field */}
        {renderInputField('email', 'Email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address',
          },
        }, profile.email)}

        {/* Address field */}
        {renderInputField('address', 'Address', {
          maxLength: { value: 200, message: 'Address must be less than 200 characters' },
          pattern: { value: /^[A-Za-z0-9\s,.-]+$/, message: 'Address can contain letters, numbers, spaces, commas, dots, and hyphens' },
        }, profile.address)}

        {/* Pitch field */}
        {renderInputField('pitch', 'Enhance your professional skills', {
          maxLength: { value: 300, message: 'Pitch must be less than 300 characters' },
          pattern: {
            value: /^[A-Za-z0-9\s,.-]+$/,
            message: 'Pitch must contain valid text or tags, with no special characters.',
          },
        }, profile.pitch)}

        {/* Interests field */}
        <InterestsField
          onChange={(updatedInterests) => setProfile((prevProfile) => ({ ...prevProfile, interests: updatedInterests }))}
          defaultInterests={profile.interests}
        />

        {/* Links field */}
        <LinksField
          onChange={(updatedLinks) => setProfile((prevProfile) => ({ ...prevProfile, links: updatedLinks }))}
          defaultLinks={profile.links}
        />

        {/* Submit button */}
        <button type="submit" className={s.submitButton}>Save Profile</button>
      </form>
    </div>
  );
}
