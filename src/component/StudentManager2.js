// StudentManager.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent, setStudents } from './studentsSlice';
import axios from 'axios';
import {Link} from 'react-router-dom';

const StudentManager2 = () => {
  const [student, setStudent] = useState({ id: '', name: '', email: '', dob: '', books: [] });
  const [editingStudent, setEditingStudent] = useState({ id: '', name: '', email: '', dob: '', books: [] });
  const [editId, setEditId] = useState(-1);

  const students = useSelector(state => state.students); // Use the Redux state

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => {
        dispatch(setStudents(res.data)); // Dispatch the fetched data to Redux
      })
      .catch(error => console.log(error));
  }, [dispatch]);

  // const generateUniqueId = () => {
  //   return Date.now();
  // };

   /* onChange={(eventObj) => setStudent({ ...student, name: eventObj.target.value })} />
   we use ...student spread operator for creating new object existing 
    the old object's values and update specific  values here is (name)
  e.target points to the specific input element and we get value using .value 
     */
   
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
        setStudent({ id: '', name: '', email: '', dob: '', books: [] });
        alert("Student added Successfully");
      })
      .catch(error => console.log(error));  
  };

  const handleEditStudent = (selectedStudent) => {
    setEditingStudent(selectedStudent);
    setEditId(selectedStudent.id);
  };

  const handleUpdateStudent = (id) => {
    if (editingStudent.name.trim() === '' || editingStudent.email.trim() === '' || editingStudent.dob.trim() === '') return;
  
    axios.put('http://localhost:8080/students/' + id, editingStudent)
      .then(res => {
        const updatedStudent = { ...editingStudent }; // Create a new object
        dispatch(updateStudent(updatedStudent)); // Dispatch the new object
        setEditId(-1);
        alert("Student updated Successfully");
      })
      .catch(error => console.log(error));
  };
  
  const handleDeleteStudent = (id) => {
    axios.delete('http://localhost:8080/students/' + id)
      .then(res => {
        dispatch(deleteStudent(id)); // Dispatch the deleted student's ID to Redux
        alert("Student deleted Successfully");
      })
      .catch(error => console.log(error));
  };

  return (
    
    <div>
      <div className="fixed-button-container">
      <h5>Student Manager</h5>
      <Link to="/add" className="btn btn-sm btn-info" >Add User</Link>      
      {/* <div>
        <input type="text" placeholder="Name" value ={student.name}
onChange={(eventObj) => setStudent({ ...student, name: eventObj.target.value })} />
      
        <input
          type="text" placeholder="Email" value ={student.email}
          onChange={(eventObj) => setStudent({ ...student, email: eventObj.target.value })}
        />
        <input
          type="date"  placeholder="dob (YY-MM-DD)" value ={student.dob}
          onChange={(eventObj) => setStudent({ ...student, dob: eventObj.target.value })}
          />
       
          <button onClick={handleAddStudent} class ="btn btn-success" >Add</button>
             </div> */}

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
