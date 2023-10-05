import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addBook } from '../slices/booksSlice';
import { useNavigate, useParams,Link } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [book, setBook] = useState({ name: '', author: '' });
  const dispatch = useDispatch();

  const handleAddBook = () => {
    if (book.name.trim() === '' || book.author.trim() === '') {
      alert('Please fill the data correctly');
      return;
    }
    const newBook = { ...book, student_id: studentId };
    axios
      .post(`http://localhost:8080/students/${studentId}/book`, newBook, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        newBook.id = res.data.id;
        dispatch(addBook(newBook));
        alert('Book added Successfully');
      })
      .catch((error) => console.log(error));
    setBook({ name: '', author: '' });
    navigate(`/books/${studentId}`);
  };

  return (
    <div>
      <h2>Add Book for Student whose id is {studentId}</h2>
      <input
        type="text"
        placeholder="Name"
        defaultValue={book.name}
        onChange={(eventObj) => setBook({ ...book, name: eventObj.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Author"
        defaultValue={book.author}
        onChange={(eventObj) => setBook({ ...book, author: eventObj.target.value })}
      />
      <br />
      <button onClick={handleAddBook} className="btn btn-success">
        Add
      </button>
      <br />
      <Link to="/students" className="btn btn-sm btn-primary" >Back</Link>    
     
    </div>
  );
};

export default AddBook;
