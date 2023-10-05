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
      <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path="/addStudent" element={<AddStudent />}/>
      <Route path="/students" element={<StudentManager3 />}/>
      <Route path="/books/:studentId" element={<BookManager />}/>
      <Route path="/addBook/:studentId" element={<AddBook/>}/>
    </Routes>
   </BrowserRouter>
       </div>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import StudentManager from './StudentManager';
// import AddStudent from './AddStudent';
// import EditStudent from './EditStudent';

// function App() {
//   return (
//     <Router>
      // <Switch>
      //   <Route path="/" exact component={StudentManager} />
      //   <Route path="/add" component={AddStudent} />
      //   <Route path="/edit/:id" component={EditStudent} />
      // </Switch>
//     </Router>
//   );
// }

// export default App;

