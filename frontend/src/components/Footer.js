import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container text-center">
        <p className="mb-0">© 2024 Voygr by Prerna Mittal. All rights reserved.</p>
        <div className="mt-2">
          <a href="https://linkedin.com/in/prernamittal03" className="text-light me-3" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="https://github.com/prernamittal" className="text-light me-3" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a href="https://medium.com/@prernamittal03" className="text-light" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-medium fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
