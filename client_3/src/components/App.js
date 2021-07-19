import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

import Header from './Header/Header';
import Body from './Body/Body';

import './App.scss'; // For styling the App component

const App = () => {
    return (
        <div className="container">
            <Router history={history}>
                <Header />
                <Body />
            </Router>
        </div>
    );
};

export default App;

/*
.container = the element with bothe "Header" and "Body" component (to display them horizontally)
.header = "Header" component
.body = "Body" component
*/