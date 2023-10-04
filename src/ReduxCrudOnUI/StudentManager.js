
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from './studentsSlice';

const StudentManager = () => {
  const [student, setStudent] = useState({ id: '', name: '', email: '', age: '' });
  const [editMode, setEditMode] = useState(false);

  const students = useSelector(state => state.students);
  const dispatch = useDispatch();
  /*useSelector is used to access the students array from the Redux store, 
  and useDispatch is used to dispatch actions to the Redux store*/

  const generateUniqueId = () => {
    return Date.now(); // for unique ID generation basisOnTime
  };

  const handleAddStudent = () => {
    if (student.name.trim() === '' || student.email.trim() === '' || student.age.trim() === '') return;

    const newStudent = { ...student, id: generateUniqueId() };
    dispatch(addStudent(newStudent));
    setStudent({ id: '', name: '', email: '', age: '' });
  };

  const handleEditStudent = (selectedStudent) => {
    setStudent(selectedStudent);
    setEditMode(true);
  };

  const handleUpdateStudent = () => {
    if (student.name.trim() === '' || student.email.trim() === '' || student.age.trim() === '') return;

    dispatch(updateStudent(student));
    setStudent({ id: '', name: '', email: '', age: '' });
    setEditMode(false);
  };

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div>
      <h1>Student Manager</h1>
      <div>
        <input type="text" placeholder="Name"value={student.name}
onChange={(eventObj) => setStudent({ ...student, name: eventObj.target.value })}
    /* here we use ...student spread operator for creating new object existing 
    the old object's values and update specific  values here is (name)
  e.target points to the specific input element and we get value using .value 
     */
       />
        <input
          type="text" placeholder="Email" value={student.email}
          onChange={(eventObj) => setStudent({ ...student, email: eventObj.target.value })}
        />
        <input
          type="text"  placeholder="Age"
value={student.age}
          onChange={(eventObj) => setStudent({ ...student, age: eventObj.target.value })}
        />
        {editMode ? (
          <button onClick={handleUpdateStudent} class ="btn btn-info">Update</button>
        ) : (
          <button onClick={handleAddStudent} class ="btn btn-success" >Add</button>
        )}
      </div>
      <center>
      
<table class="table table-bordered table-hover">
            <thead class="thead-dark">
            <tr>
            <th  scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {students.map((student) => (
            <tr class="table-success" key={student.id}>
              <td class="table-success">{student.id}</td>
              <td class="table-success">{student.name}</td>
              <td class="table-success">{student.email}</td>
              <td class="table-success">{student.age}</td>
              <td class="table-success">
                <button onClick={() => handleEditStudent(student)} class ="btn btn-secondary">Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)} class ="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default StudentManager;
