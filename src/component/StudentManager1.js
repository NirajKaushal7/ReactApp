
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from './studentsSlice';
import axios from 'axios';

const StudentManager1 = () => {
  const [student, setStudent] = useState({ id: '', name: '', email: '', dob: '' ,books :{}});
  const [editingStudent, setEditingStudent] = useState({ id: '', name: '', email: '', dob: '' ,books :{}});
  const [editId, setEditId] = useState(-1);
  const [students, setStudents] = useState([]);

  //const students = useSelector(state => state.students);

  useEffect( () => 
  {
    axios.get('http://localhost:8080/students').
    then(res => setStudents(res.data)).
    catch(error => console.log(error));
  },[])// this for fetching the data

  const dispatch = useDispatch();
  /*useSelector is used to access the students array from the Redux store, 
  and useDispatch is used to dispatch actions to the Redux store*/

  const generateUniqueId = () => {
    return Date.now(); // for unique ID generation basisOnTime
  };

  const handleAddStudent = () => {
    if (student.name.trim() === '' || student.email.trim() === '' || student.dob.trim() === '') return;

    const newStudent = { ...student, id: generateUniqueId() };
    //dispatch(addStudent(newStudent));
     axios.post('http://localhost:8080/students',newStudent)
    .then(res => {
      window.location.reload();
      alert("Student added Successfully")})
    .catch(error => console.log(error));
    
    setStudent({ id: '', name: '', email: '', dob: '' ,books :{}});
  };

  const handleEditStudent = (selectedStudent) => {
    setEditingStudent(selectedStudent); // Set the editingStudent state
    setEditId(selectedStudent.id);
  };

  const handleUpdateStudent = (id) => {
    if (editingStudent.name.trim() === '' || editingStudent.email.trim() === '' || editingStudent.dob.trim() === '') return;

    axios.put('http://localhost:8080/students/' + id, editingStudent) // Use editingStudent
      .then(res => {
        window.location.reload();
        alert("Student updated Successfully");
        setEditId(-1);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteStudent = (id) => {
   // dispatch(deleteStudent(id));
   axios.delete('http://localhost:8080/students/'+id)
    .then(res => {alert("Student deleted Successfully")
    window.location.reload();
    })
    .catch(error => console.log(error));
     
  };

  return (
    <div>
      <h1>Student Manager</h1>
      <div>
        <input type="text" placeholder="Name" 
onChange={(eventObj) => setStudent({ ...student, name: eventObj.target.value })}
    /* here we use ...student spread operator for creating new object existing 
    the old object's values and update specific  values here is (name)
  e.target points to the specific input element and we get value using .value 
     */
       />
        <input
          type="text" placeholder="Email"
          onChange={(eventObj) => setStudent({ ...student, email: eventObj.target.value })}
        />
        <input
          type="text"  placeholder="dob (YY-MM-DD)"
          onChange={(eventObj) => setStudent({ ...student, dob: eventObj.target.value })}
        />
       
          <button onClick={handleAddStudent} class ="btn btn-success" >Add</button>
             </div>
      <center>
      
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
     editId === student.id?   
     <tr> 
     <td class="table-success">{student.id}</td>
              <td class="table-success"><input type="text"  value={editingStudent.name}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, name: eventObj.target.value })}></input></td>
              <td class="table-success"><input type="text"  value={editingStudent.email}
onChange={(eventObj) => setEditingStudent({ ...editingStudent, email: eventObj.target.value })}></input></td>
              <td class="table-success"><input type="text"  value={editingStudent.dob}
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
      </center>
    </div>
  );
};

export default StudentManager1;
