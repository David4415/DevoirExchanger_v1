import React from 'react';
import {connect} from 'react-redux';
import { menuChange } from '../../../actions';

import GoogleAuth from '../../GoogleAuth';
import FormCourse from './FormCourse';

import './Create.scss';

class CreateDoc extends React.Component {
    componentDidMount() {
        this.props.menuChange('courses');
    }

    onSubmit = async (formValues) => {
        console.log(formValues);
    }

    render() {
        return (
            <div className="CreateDoc">
                <GoogleAuth />
                <h1>Create Your Course :)</h1>
                <div className="formCreate">
                    <FormCourse isSignedIn={this.props.isSignedIn} onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {  isSignedIn : state.auth.isSignedIn  }
}

export default connect(mapStateToProps, {menuChange})(CreateDoc);