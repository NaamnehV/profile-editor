import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; 
import ProfileForm from '../ProfileForm/ProfileForm';
import CreateProject from '../CreateProject/CreateProject';
import CreateTask from '../CreateTask/CreateTask';
import s from './DashboardContainer.module.css';

export default function DashboardContainer() {
  return (
    <div className={s.dashboardContainer}>
      <div className={s.leftColumn}>
        <div className={s.profileHeader}>
          <FaArrowLeft className={s.arrowIcon} />
          <span className={s.troodText}>TROOD.</span>
          <span className={s.profileText}> Profile</span>
        </div>
        <CreateProject />
        <CreateTask />
      </div>
      <div className={s.rightColumn}>
        <ProfileForm />
      </div>
    </div>
  );
}
