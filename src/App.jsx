import React from 'react';
import RegistrationFormV2 from './components/RegistrationFormV2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const App = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to the Registration Page</h1>
            <RegistrationFormV2 />
        </div>
    );
};

export default App;