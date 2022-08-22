import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import PageHeading from './Components/PageHeading'
import BillItemsForm from './Components/BillItemsForm'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <PageHeading firstname='Brandon' lastname='Fuerst' /> {/* Modify to be parent of form and results display */}
    <BillItemsForm /> {/* Rendering form, put underneath parent */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
