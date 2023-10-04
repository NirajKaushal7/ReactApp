
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addStudent } from './studentsSlice';
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom";
const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', email: '', dob: '' });
  const dispatch = useDispatch();

  const handleAddStudent = () => {

    if (student.name.trim() === '' || student.email.trim() === '' || student.dob.trim() === '') return;

    const newStudent = { ...student};
    axios.post('http://localhost:8080/students', newStudent, 
        {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        newStudent.id = res.data.id; // Set the id in the newStudent object
        dispatch(addStudent(newStudent)); // Dispatch the added student to Redux
        alert("Student added Successfully");
      })
      .catch(error => console.log(error));  
    setStudent({ id: '', name: '', email: '', dob: '', books: [] });
    navigate('/')
  };

  return (
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={student.name}
        onChange={(eventObj) => setStudent({ ...student, name: eventObj.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={student.email}
        onChange={(eventObj) => setStudent({ ...student, email: eventObj.target.value })}
      />
      <input
        type="text"
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
