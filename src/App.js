import logo from './logo.svg';
import './App.css';
import ItemManager from './ReduxCrudOnUI/ItemManager';
// import StudentManager1 from './component/StudentManager1';
// import StudentManager2 from './component/StudentManager2';
import StudentManager3 from './component/StudentManager3';
import AddStudent from './component/AddStudent';
import AddBook from './component/AddBook';
import Home from './component/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BookManager from './component/BookManager';

function App() {
  return (
    <div className="App">
      {/* <ItemManager/> */}
      {/* <StudentManager1/> */}
      {/* BrowserRouter is used to wrap your application and provide routing functionality. */}
      <BrowserRouter>
      {/* Routes component acts as a container for defining your application's routes. */}
    <Routes>
    {/* / root path or index path*/}
      <Route path='/' element={ <Home /> } />
      {/* When the URL matches this paths, the associated component will be rendered. */}
      <Route path="/addStudent" element={<AddStudent />}/>
      <Route path="/students" element={<StudentManager3 />}/>
      <Route path="/books/:studentId" element={<BookManager />}/>
      {/* studentId is a dynamic parameter in the URL. */}
      <Route path="/addBook/:studentId" element={<AddBook/>}/>
    </Routes>
   </BrowserRouter>
       </div>
  );
}

export default App;

