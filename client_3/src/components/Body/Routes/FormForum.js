import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './FormCourse.scss';

class FormForum extends React.Component {
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    renderTitle({ input, label, meta }) {
        return (
            <div>
                <input className={`form_item ${meta.error && meta.touched ? 'error' : ''}`} {...input} autoComplete="off" /> 
                {meta.touched && meta.error ? <div className="errorMessage">{meta.error}</div> : ""}
            </div>
        );
    }
    renderTags = ({ input, label, meta }) => {
        return (
            <div>
                <input className={`form_item ${meta.error && meta.touched ? 'error' : ''}`} {...input} autoComplete="off"/> 
                {meta.touched && meta.error ? <div className="errorMessage">{meta.error}</div> : ""}
            </div>
        );
    }
    renderSelect= ({ input, label, meta }) => {
        return (
            <div>
                <select className={`form_item ${meta.error && meta.touched ? 'error' : ''}`} {...input}>
                    <option></option>
                    <option value="anglais">Anglais</option>
                    <option value="français">Français</option>
                    <option value="pc">Physique-Chimie</option>
                    <option value="math">Mathématiques</option>
                    <option value="geographie">Géographie</option>
                    <option value="svt">SVT</option>
                    <option value="histoire">Histoire</option>
                </select> 
                {meta.touched && meta.error ? <div className="errorMessage">{meta.error}</div> : ""}
            </div>
        );
    }
    
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="formCourse">
                <div className="itemCreate">
                    <label className="label" htmlFor="title">Title </label>
                    <Field name="title" component={this.renderTitle}/>
                </div>

                <div className="itemCreate">
                    <label className="label" htmlFor="tags">Tags </label>
                    <Field name="tags" component={this.renderTags}/>
                </div>

                <div className="itemCreate">
                    <label className="label" htmlFor="matiere">Matière</label>
                    <Field name="matiere" className="form_item field" component={this.renderSelect} />
                </div>
                <button className="buttonSubmitCreateDoc">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) errors.title = 'You must enter a title';
    else if (formValues.title.length >= 10 && 50 <= formValues.title.length) errors.title = 'You must enter minimum 10 characters and maximum 50 characters';

    if (!formValues.matiere) errors.matiere = 'Please choose a subject';

    console.log(errors);
    return errors;
};


const mapStateToProps = (state, ownProps) => {
    return {isSignedIn : state.auth.isSignedIn };
}

const FormForumwithReduxForm = reduxForm({
    form: 'ForumForm',
    validate
})(FormForum);

export default connect(mapStateToProps, {})(FormForumwithReduxForm);