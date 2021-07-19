import React from 'react';
import {connect} from 'react-redux';
import { menuChange, getCourse } from '../../../actions';

import GoogleAuth from '../../GoogleAuth';
import FormCourse from './FormCourse';

import './Create.scss';

class EditDoc extends React.Component {
    componentDidMount() {
        this.props.menuChange('courses');
        this.props.getCourse(this.props.match.params.id);
    }

    onSubmit = async (formValues) => {
        console.log(formValues);
    }

    render() {
        return (
            <div className="CreateDoc">
                <GoogleAuth />
                <h1>Edit  :)</h1>
                <div className="formCreateDoc">
                    <FormCourse isSignedIn={this.props.isSignedIn} onSubmit={this.onSubmit} docId={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {isSignedIn : state.auth.isSignedIn, userId: state.auth.userId};
}

export default connect(mapStateToProps, {menuChange, getCourse})(EditDoc);