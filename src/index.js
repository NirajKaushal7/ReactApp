import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import store from './ReduxCrudOnUI/Store';//
// import store from './redux/Store';// here all operation same component using D.B.
// import store from './Store';
import store from "./redux/Store";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* the Main component wraps the <App> component with the <Provider>, passing the store 
as a prop to the provider. This makes the Redux store available to all components
rendered by <App> and its descendants.    
 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
