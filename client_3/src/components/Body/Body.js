import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Routes/Home';
import Courses from './Routes/Courses';
import Search from './Routes/Search';
import Forums from './Routes/Forums';
import Statistics from './Routes/Statistics';
import Settings from './Routes/Settings';
import DocGet from './Routes/DocGet';
import ForumGet from './Routes/ForumGet';
import CreateDoc from './Routes/CreateDoc';
import EditDoc from './Routes/EditDoc';
import CreateForum from './Routes/CreateForum';

import './Body.scss';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.bodyRef = React.createRef();
    }

    render() {
        return (
            <div ref={this.bodyRef} id="body">
                <Route path="/home" component={Home} />
                <Route path="/search" exact component={Search} />
                <Route path="/courses" exact component={Courses} />
                <Route path="/forums" exact component={Forums} />
                <Route path="/statistics/:where" exact component={Statistics} />
                <Route path="/settings" exact component={Settings} /> 
                <Route path="/course/see/:id" exact component={DocGet} />
                <Route path="/forum/see/:id" exact component={ForumGet} />
                <Route path="/forum/create" exact component={CreateForum} />
                <Route path="/course/create" exact component={CreateDoc} />
                <Route path="/course/edit/:id" exact component={EditDoc} />
            </div>
        );
    }
}

export default Body;

/*
<Route path="/search" exact component={} />
<Route path="/messages" exact component={} />
<Route path="/statistics" exact component={} />
<Route path="/settings" exact component={} /> 
*/