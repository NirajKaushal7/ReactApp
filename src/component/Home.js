import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const MainComponent = () => {
  return (
    <>
      <Helmet>
        <title>Student Crud</title>
      </Helmet>

      <nav className="navbar">
        <div className="logo">
          <span>Student Crud</span>
        </div>
        <div className="nav-buttons">
          <Link to="/students" className="btn btn-sm btn-info">
            Students
          </Link>
          <Link to="/addStudent" className="btn btn-sm btn-success">
            Add Student
          </Link>
        </div>
      </nav>
    </>
  );
};
export default MainComponent;
