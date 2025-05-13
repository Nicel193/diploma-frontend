import React from 'react';

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="fs-4 fw-bold">My Awesome Site</div>
      <div>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="rounded-circle"
          width="40"
          height="40"
        />
      </div>
    </header>
  );
};

export default Header;
