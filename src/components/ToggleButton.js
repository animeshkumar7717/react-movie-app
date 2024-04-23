import React from 'react';
import './Component.css';

const ToggleTheme = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle-checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle-checkbox" className="theme-toggle-label"></label>
    </div>
  );
}

export default ToggleTheme;
