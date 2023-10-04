import logo from './logo.svg';
import './App.css';
import ItemManager from './ReduxCrudOnUI/ItemManager';
// import StudentManager from './ReduxCrud/StudentManager';
// import StudentManager1 from './component/StudentManager1';
import StudentManager2 from './component/StudentManager2';
import AddStudent from './component/AddStudent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <ItemManager/> */}
      {/* <StudentManager1/> */}
      <BrowserRouter>
    <Routes>
      <Route path='/' element={ <StudentManager2 /> } />
      <Route path="/add" element={<AddStudent />}/>
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

