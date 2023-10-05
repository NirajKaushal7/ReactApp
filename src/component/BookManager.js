
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBook, deleteBook, setBooks } from '../slices/booksSlice'; // Import relevant actions and reducers for books
import axios from 'axios';
import { Link ,useParams  } from 'react-router-dom';


const BookManager = () => {
  const { studentId } = useParams();

  // console.log(studentId);
  const [editingBook, setEditingBook] = useState({ id: '', name: '', author: '', student_id: '' });
 // const [editId, setEditId] = useState(-1);
  
  const books = useSelector(state => state.books);
  //console.log(books);

  
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:8080/students/${studentId}/books`)
      .then(res => {
        dispatch(setBooks(res.data));
        // console.log('ddddddddddd',res.data)
      })
      .catch(error => console.log(error));
  }, []);

  const handleEditBook = (selectedBook) => { 
    const book = { ...selectedBook, student_id:studentId};
    setEditingBook(book);
    //console.log(book);
  };

  const handleUpdateBook = (id) => {
    const confirmUpdate = window.confirm('Are you sure you want to update this book?');
    if (confirmUpdate) {
      if (
        editingBook.name.trim() === '' ||
        editingBook.author.trim() === '' ||
        editingBook.student_id.trim() === ''
      ) {
        alert('Please fill the data correctly');
        return;
      }
      axios.put(`http://localhost:8080/students/book/${editingBook.id}`, editingBook)
        .then(res => {
          const updatedBook = { ...editingBook };
          dispatch(updateBook(updatedBook));
          setEditingBook({ id: '', name: '', author: '', student_id: '' });
          alert('Book updated Successfully');
        })
        .catch(error => console.log(error));
    }
  };

  const handleDeleteBook = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/students/${studentId}/books/${id}`)
        .then((res) => {
          dispatch(deleteBook(id));
          alert('Book deleted Successfully');
        })
        .catch((error) => console.log(error));

    }
  };

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
    <Link to="/students" className="btn btn-sm btn-primary">Back</Link>
  </div>
      <div className="fixed-button-container">
      <h2>{books.length !==0 ? `Books of Student whose id is ${studentId}`:'No Books Available '}</h2>
      </div>
      {books.length > 0 && (
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            editingBook.id === book.id ? (
              <tr key={book.id}>
                <td className="table-success">{book.id}</td>
                <td className="table-success">
                  <input
                    type="text"
                    value={editingBook.name}
                    onChange={(eventObj) =>
                      setEditingBook({ ...editingBook, name: eventObj.target.value })
                    }
                  />
                </td>
                <td className="table-success">
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={(eventObj) =>
                      setEditingBook({ ...editingBook, author: eventObj.target.value })
                    }
                  />
                </td>
               
                <td>
                  <button onClick={() => handleUpdateBook(book.id)} className="btn btn-success">
                    Update
                  </button>
                  <button onClick={() => setEditingBook({ id: '', name: '', author: '', student_id: '' })} className="btn btn-warning">
                    Back
                  </button>
                </td>
              </tr>
            ) : (
              <tr className="table-success" key={book.id}>
                <td className="table-success">{book.id}</td>
                <td className="table-success">{book.name}</td>
                <td className="table-success">{book.author}</td>
                <td className="table-success">
                  <button onClick={() => handleEditBook(book)} className="btn btn-secondary">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteBook(book.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default BookManager;
