

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStudent, deleteStudent, setStudents } from '../slices/studentsSlice';
import axios from 'axios';
import {Link} from 'react-router-dom';

const StudentManager2 = () => {
  const [editingStudent, setEditingStudent] = useState({ id: '', name: '', email: '', dob: '', books: [] });
  const [editId, setEditId] = useState(-1);

  const students = useSelector(state => state.students); // This hook retrieves the students slice of the Redux store, providing access to the student data 

  const dispatch = useDispatch(); //This hook gives access to the dispatch function, which is used to dispatch actions to the Redux store.

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => {
        dispatch(setStudents(res.data)); // Dispatch the fetched data to Redux
      })
      .catch(error => console.log(error));
  }, [dispatch]);
  const handleEditStudent = (selectedStudent) => {
    // Show a confirmation dialog before editing
      setEditingStudent(selectedStudent);
      setEditId(selectedStudent.id);
    
  };

  const handleUpdateStudent = (id) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this student?');
    if (confirmUpdate) {
    if (editingStudent.name.trim() === '' || editingStudent.email.trim() === '' || editingStudent.dob.trim() === '')
    {
      alert("Please fill the data correctly");
      return;
    }
    axios.put('http://localhost:8080/students/' + id, editingStudent)
      .then(res => {
        const updatedStudent = { ...editingStudent }; // Create a new object
        dispatch(updateStudent(updatedStudent)); // Dispatch the new object to Redux Store
        setEditId(-1);
        alert("Student updated Successfully");
      })
      .catch(error => console.log(error));
    }
  };
  
  const handleDeleteStudent = (id) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      axios
        .delete('http://localhost:8080/students/' + id)
        .then((res) => {
          dispatch(deleteStudent(id)); // It dispatches the deleteStudent action to remove the student from the Redux store.
          alert('Student deleted Successfully');
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    
    <div>
      <div className="fixed-button-container">
      <h5>Student Manager</h5>
      <Link to="/addStudent" className="btn btn-sm btn-info" >Add User</Link>      
          </div>
             {/* <br/><br/><br/> */}
<table class="table table-bordered table-hover">
            <thead class="thead-dark">
            <tr>
            <th  scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Dob</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {students.map((student) => (
     editId === student.id ?   
     <tr> 
     <td class="table-success">{student.id}</td>
              <td class="table-success"><input type="text"  value={editingStudent.name}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, name: eventObj.target.value })}></input></td>
              <td class="table-success"><input type="text"  value={editingStudent.email}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, email: eventObj.target.value })}></input></td>
              <td class="table-success"><input type="date"  value={editingStudent.dob}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, dob: eventObj.target.value })}></input></td>
              <button onClick={() => handleUpdateStudent(student.id)} class="btn btn-success">Update</button>
              <button onClick={() => setEditId(-1)} className="btn btn-warning">Back</button>
            </tr>
              :
            <tr class="table-success" key={student.id}>
              <td class="table-success">{student.id}</td>
              <td class="table-success">{student.name}</td>
              <td class="table-success">{student.email}</td>
              <td class="table-success">{student.dob}</td>
              <td class="table-success">
              {/* By using the anonymous function, you ensure that handleEdit Student is called only when the button is clicked */}
                <button onClick={() => handleEditStudent(student)} class ="btn btn-secondary">Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)} class ="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
     
    </div>
  );
};

export default StudentManager2;
