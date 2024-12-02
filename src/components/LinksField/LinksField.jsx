import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import s from './LinksField.module.css';

export default function LinksField({ onChange, defaultLinks = [] }) {
  // Load data from localStorage if available
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem('links');
    return savedLinks ? JSON.parse(savedLinks) : defaultLinks;
  });

  const [errors, setErrors] = useState([]);

  // Validate link inputs
  const validateLinks = (newLinks) => {
    const newErrors = newLinks.map(link => {
      const errors = [];
      if (!link.siteName) errors.push('Site name is required.');
      if (link.link && !/^https?:\/\//.test(link.link)) errors.push('Link must start with http:// or https://');
      return errors;
    });
    return newErrors;
  };

  // Add a new link row
  const handleAddLink = (e) => {
    e.stopPropagation();
    const newLinks = [...links, { siteName: '', link: '' }];
    setLinks(newLinks);
    onChange(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks)); // Save to localStorage
  };

  // Remove a link row
  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    onChange(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks)); // Save to localStorage
  };

  // Handle field changes and validate
  const handleFieldChange = (index, fieldName, value) => {
    const newLinks = [...links];
    newLinks[index][fieldName] = value;
    setLinks(newLinks);
    const validationErrors = validateLinks(newLinks);
    setErrors(validationErrors);
    onChange(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks)); // Save to localStorage
  };

  // Load links from localStorage on mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []); // Runs only once when component mounts

  return (
    <div>
      <div className={s.linksTitle}>Your links:</div>
      {links.map((link, index) => (
        <div key={index} className={s.linkRow}>
          {/* Site name input */}
          <input
            type="text"
            placeholder="Site name"
            className={s.input}
            value={link.siteName}
            onChange={(e) => handleFieldChange(index, 'siteName', e.target.value)}
          />
          {errors[index] && errors[index].includes('Site name is required.') && (
            <div className={s.errorMessage}>Site name is required.</div>
          )}

          {/* Link input */}
          <input
            type="text"
            placeholder="Link"
            className={s.input}
            value={link.link}
            onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
          />
          {errors[index] && errors[index].includes('Link must start with http:// or https://') && (
            <div className={s.errorMessage}>Link must start with http:// or https://</div>
          )}

          {/* Remove button */}
          <FaTrashAlt
            className={s.removeIcon}
            onClick={() => handleRemoveLink(index)}
          />
        </div>
      ))}

      {/* Add link button */}
      <button type="button" className={s.addButton} onClick={handleAddLink}>
        <FaPlus />
      </button>
    </div>
  );
}
