import React, { useState, useRef, useEffect } from 'react';
import s from './InterestsField.module.css';

const availableInterests = [
  'React', 'Product', 'Web3', 'JavaScript', 'Node.js', 'Python', 'Machine Learning',
  'Design', 'Blockchain', 'UI/UX', 'Data Science', 'Marketing', 'Cloud Computing', 'AI', 'DevOps',
];

export default function InterestsField({ onChange, defaultInterests = '' }) {
  // States for interests, dropdown visibility, user tag, and user tag input visibility
  const [interests, setInterests] = useState(typeof defaultInterests === 'string' ? defaultInterests : '');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userTag, setUserTag] = useState(''); // State for user-defined tag
  const [isUserTagInputVisible, setIsUserTagInputVisible] = useState(false); // State for showing the input field
  const containerRef = useRef(null);

  // Close the dropdown if clicked outside the container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Add interest to the list
  const handleAddInterest = (interest) => {
    const currentInterests = (interests || '').split(' ').filter(Boolean);
    
    // Limit the number of interests to 10 and avoid duplicates
    if (currentInterests.length < 10 && !currentInterests.includes(interest)) {
      const newInterests = [...currentInterests, interest].join(' ').trim();
      setInterests(newInterests);
      onChange(newInterests); // Notify parent component of the change
    }
    setIsDropdownVisible(false); // Close the dropdown after selection
  };

  // Add user-defined tag to the interests list
  const handleAddUserTag = () => {
    if (userTag && !interests.split(' ').includes(userTag)) {
      const newInterests = [...interests.split(' '), userTag].join(' ').trim();
      setInterests(newInterests);
      onChange(newInterests); // Notify parent component of the change
      setUserTag(''); // Clear the input field
      setIsUserTagInputVisible(false); // Hide the input field after adding the tag
    }
  };

  // Remove interest from the list
  const handleRemoveInterest = (interest) => {
    const currentInterests = (interests || '').split(' ').filter(Boolean);
    const newInterests = currentInterests.filter(item => item !== interest).join(' ').trim();
    setInterests(newInterests);
    onChange(newInterests); // Notify parent component of the change
  };

  return (
    <div className={s.inputContainer} ref={containerRef}>
      <label className={s.interestsLabel}>The scopes of your interest:</label>

      {/* Display selected interests and the "+" button */}
      <div className={s.interestsContainer}>
        {/* Display selected interests */}
        <div className={s.interestsDisplay}>
          {interests ? interests.split(' ').map((interest, index) => (
            <span key={index} className={s.interestTag}>
              {interest}
              <button
                type="button"
                className={s.removeInterestBtn}
                onClick={() => handleRemoveInterest(interest)} // Remove interest on click
              >
                &times;
              </button>
            </span>
          )) : ''}
        </div>

        {/* "+" button to toggle dropdown visibility */}
        <div className={s.addButtonContainer}>
          <button
            type="button"
            className={s.addTagBtn}
            onClick={() => setIsDropdownVisible(!isDropdownVisible)} // Toggle dropdown visibility
          >
            +
          </button>
        </div>

        {/* Dropdown list with available interests */}
        {isDropdownVisible && (
          <div className={s.dropdown}>
            {/* Render available interests as clickable items */}
            {availableInterests.map((interest, index) => (
              <div
                key={index}
                className={s.dropdownItem}
                onClick={() => handleAddInterest(interest)} // Add interest on click
              >
                {interest}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section for adding a new user-defined tag */}
      <div className={s.potentialInterests}>
        <label className={s.potentialInterestsLabel}>Potential interests:</label>
        
        {/* "+" button to show the input field for a new tag */}
        <div className={s.addButtonContainer}>
          {!isUserTagInputVisible ? (
            <button
              type="button"
              className={s.addUserTagBtn}
              onClick={() => setIsUserTagInputVisible(true)} // Show input field on click
            >
              + 
            </button>
          ) : (
            <div>
              <input
                type="text"
                value={userTag}
                onChange={(e) => setUserTag(e.target.value)} // Update user tag as the user types
                onKeyDown={(e) => e.key === 'Enter' && handleAddUserTag()} // Add user tag on Enter key
                placeholder="Add your own interest"
                className={s.inputTag}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
