import React from 'react';
import { connect } from 'react-redux';

import { menuChange, getCourses } from '../../../actions';
import Search from './Search';
import JoinIn from './JoinIn';
import GoogleAuth from '../../GoogleAuth';

class Courses extends React.Component {
    state = { showJoinIn: true }

    componentDidMount() {
        this.props.getCourses();
        this.props.menuChange('courses');
    }

    onDismiss = (bool) => {
        this.setState({ showJoinIn: bool })
    }

    displayJoinIn = () => {
        if (!this.props.isSignedIn && this.state.showJoinIn) return <JoinIn onDismiss={this.onDismiss} textInfo="To see this page you need to be logged"/>;
        return <div></div>;
    }

    render() {
        this.props.menuChange('courses');
        
        if (!this.props.courses) return null;
        else if (!this.props.isSignedIn) return <div>{this.displayJoinIn()}</div>

        console.log(this.props.courses);
        return (
            <div className="Courses">
                <GoogleAuth />
                <Search putUserId createButt />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {  isSignedIn : state.auth.isSignedIn, courses:state.cours.tt_cours };
}

export default connect(mapStateToProps, {menuChange, getCourses})(Courses);