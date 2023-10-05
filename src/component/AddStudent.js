
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addStudent } from '../slices/studentsSlice';
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom";
const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', email: '', dob: '' });
  const dispatch = useDispatch();

  const handleAddStudent = async () => {
    if (student.name.trim() === '' || student.email.trim() === '' || student.dob.trim() === '') {
      alert("Please fill the data correctly");
      return;
    }

    const newStudent = { ...student };

    try {
      const response = await axios.post('http://localhost:8080/students', newStudent, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      newStudent.id = response.data.id; // Set the id in the newStudent object
      dispatch(addStudent(newStudent)); // Dispatch the added student to Redux
      alert("Student added Successfully");
    } catch (error) {
      console.error(error);
    }

    setStudent({ id: '', name: '', email: '', dob: '', books: [] });
    navigate('/students');
  };

  return (
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={student.name}
        onChange={(eventObj) => setStudent({ ...student, name: eventObj.target.value })}
      /><br/>
      <input
        type="text"
        placeholder="Email"
        value={student.email}
        onChange={(eventObj) => setStudent({ ...student, email: eventObj.target.value })}
      /><br/>
      <input
        type="date"
        placeholder="dob (YY-MM-DD)"
        value={student.dob}
        onChange={(eventObj) => setStudent({ ...student, dob: eventObj.target.value })}
      /><br/>
      <button onClick={handleAddStudent} className="btn btn-success">Add</button>
      <br/>
      <Link to="/" className="btn btn-sm btn-info" >Back</Link>
      
    </div>
  );
};

export default AddStudent;
