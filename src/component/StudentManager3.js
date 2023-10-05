
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStudent, deleteStudent, setStudents } from '../slices/studentsSlice';
import axios from 'axios';
import {Link} from 'react-router-dom';

const StudentManager3 = () => {
  const [editingStudent, setEditingStudent] = useState({ id: '', name: '', email: '', dob: '', books: [] });
  //const [editId, setEditId] = useState(-1);

  const students = useSelector(state => state.students); // This hook retrieves the students slice of the Redux store, providing access to the student data 

  const dispatch = useDispatch(); //This hook gives access to the dispatch function, which is used to dispatch actions to the Redux store.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students');
        dispatch(setStudents(response.data));//dispatched to redux store
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleEditStudent = (selectedStudent) => {
    // Show a confirmation dialog before editing
      setEditingStudent(selectedStudent);
      //setEditId(selectedStudent.id);
    
  };

    const handleUpdateStudent = async (id) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this student?');
    if (confirmUpdate) {
      if (editingStudent.name.trim() === '' || editingStudent.email.trim() === '' || editingStudent.dob.trim() === '') {
        alert("Please fill the data correctly");
        return;
      }

      try {
        const response = await axios.put('http://localhost:8080/students/' + id, editingStudent);
        const updatedStudent = { ...editingStudent };
        dispatch(updateStudent(updatedStudent));
        setEditingStudent({ id: '', name: '', email: '', dob: '', books: [] });
        alert("Student updated Successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:8080/students/' + id);
        dispatch(deleteStudent(id));
        alert('Student deleted Successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    
    <div>
      <div className="fixed-button-container" style={{ textAlign: 'right' }} >
        <div style={{ textAlign: 'center' }}>
      <h5 >Student Manager</h5>
      </div>
      <Link to="/addStudent" className="btn btn-sm btn-info" >Add Student</Link>      
      <Link to="/" className="btn btn-sm btn-primary" >Back</Link>    
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
     editingStudent.id === student.id ?   
     <tr> 
     <td class="table-success">{student.id}</td>
              <td class="table-success"><input type="text"  value={editingStudent.name}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, name: eventObj.target.value })}></input></td>
              <td class="table-success"><input type="text"  value={editingStudent.email}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, email: eventObj.target.value })}></input></td>
              <td class="table-success"><input type="date"  value={editingStudent.dob}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, dob: eventObj.target.value })}></input></td>
              <button onClick={() => handleUpdateStudent(student.id)} class="btn btn-success">Update</button>
              <button onClick={() => setEditingStudent({ id: '', name: '', email: '', dob: '', books: [] })} className="btn btn-warning">Back</button>
            </tr>
              :
            <tr class="table-success" key={student.id}>
              <td class="table-success">{student.id}</td>
              <td class="table-success">{student.name}</td>
              <td class="table-success">{student.email}</td>
              <td class="table-success">{student.dob}</td>
              <td class="table-success">
              {/* By using the anonymous function, you ensure that handleEdit Student is called only when the button is clicked */}
              {/* <button onClick={() => handleBooks(student.id)} class ="btn btn-secondary">Books</button> */}
              <Link to={`/addBook/${student.id}`}  className="btn btn-sm btn-info" >Add Book</Link> 
              <Link to={`/books/${student.id}`}  className="btn btn-sm btn-warning" >Books</Link> 
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

export default StudentManager3;
