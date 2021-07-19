import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {createDoc, editDoc,  getCourse} from '../../../actions';
import history from '../../../history';

import './FormCourse.scss';

class FormCourse extends React.Component {
    state = { selectedFile: null, selectedFileURL: null };

    componentDidMount() {
        if (this.props.docId) this.props.getCourse(this.props.docId);
    }

    onSubmit = (formValues) => {
        const previewDom = document.querySelector(".previewDiv");
        const previewNoData = document.querySelector(".previewNoData");


        if (this.state.selectedFile === null && !this.props.docId) {
            previewNoData.style.color = "red";
            previewDom.style.outline = "3px solid red";
            previewDom.style.animation = "flipAround 1s"
            previewNoData.innerHTML = `NO FILE CHOSEN`
        } else {
            const {selectedFile, selectedFileURL} = this.state;

            if (!formValues.tags) formValues.tags = "";

            let formValuesAdd;
            if (!this.props.courseInfo) {
                let type = selectedFile.type.match(/\/.*/g)[0].slice(1);
                if (selectedFile.type.slice(5)==="image") type = "image"
                else if (selectedFile.type.match(/\/.*/g)[0].slice(1) === "pdf") type = "pdf"

                formValuesAdd = {...formValues, 
                    URL: selectedFileURL, 
                    type: type,
                    image: "https://cdn.pixabay.com/photo/2021/05/18/08/07/buildings-6262595_1280.jpg",
                    creator: this.props.userId
                };
                this.props.createDoc(formValuesAdd);

            } else {
                formValuesAdd = {...formValues, 
                    docId: this.props.docId
                };
                this.props.editDoc(formValuesAdd);
            }
            
            this.props.onSubmit(formValuesAdd);
            history.push('/courses');
        }
    }

    renderError({ error, touched }) {
        if (touched && error) return <div className="errorMessage">{error}</div>;
    }

    onFileChange = async (event) => {
        const file = event.target.files[0];
        this.setState({ selectedFile: file });
        const previewImageDom = document.querySelector("#previewImage");
        const previewDom = document.querySelector(".previewDiv");
        const previewNoData = document.querySelector(".previewNoData");

        await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = (e) => {
                let img = new Image;
                img.onload = function() {
                    previewNoData.style.color = "black";
                    previewDom.style.outline = "none";
                    previewImageDom.style.backgroundImage =  `url("${e.target.result}")`;
                    previewImageDom.style.height = `${Math.ceil((200*img.height)/img.width)}px`;
                    previewImageDom.style.maxWidth = "200px";
                    previewImageDom.style.minWidth = "200px";
                    previewImageDom.style.backgroundSize = "contain";
                };
                img.src = e.target.result;
                this.setState({selectedFileURL: e.target.result});
            }
            reader.readAsDataURL(file);
        });
    }

    renderTitle = ({ input, label, meta }) => {
        const {courseInfo} = this.props;
        return (
            <div>
                <input className={`form_item ${meta.error && meta.touched ? 'error' : ''}`} {...input} autoComplete="off" />
                {courseInfo ? <p>Défaut: {courseInfo.titleDoc}</p> : ""}
                {this.renderError(meta)}
            </div>
        );
    }
    renderTags = ({ input, label, meta }) => {
        const {courseInfo} = this.props;
        return (
            <div>
                <input className={`form_item ${meta.error && meta.touched ? 'error' : ''}`} {...input} autoComplete="off" />
                {courseInfo ? <p>Défaut: {courseInfo.tags}</p> : ""}
                {this.renderError(meta)}
            </div>
        );
    }
    renderTextArea = ({ input, label, meta }) => {
        const {courseInfo} = this.props;
        return (
            <div>
                <textarea className={`form_item ${meta.error && meta.touched ? 'error' : ''}`} {...input} />
                {courseInfo ? <p>Défaut: {courseInfo.description}</p> : ""}
                {this.renderError(meta)}
            </div>
        );
    }
    renderSelect= ({ input, label, meta }) => {
        const {courseInfo} = this.props;
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
                {courseInfo ? <p>Défaut: {courseInfo.matiere}</p> : ""}
                {this.renderError(meta)}
            </div>
        );
    }

    render() {
        const {courseInfo} = this.props;

        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="formCourse">
                <div className="itemCreate">
                    <label className="label" htmlFor="title">Title </label><Field name="title" component={this.renderTitle}/>
                </div>

                <div className="itemCreate">
                    <label className="label" htmlFor="description">Description </label><Field name="description" component={this.renderTextArea}/>
                </div>
                
                <div className="itemCreate">
                    <label className="label" htmlFor="tags">Tags </label><Field name="tags" component={this.renderTags}/>
                </div>

                <div className="itemCreate">
                    <label className="label" htmlFor="matiere">Matière</label>
                    <Field name="matiere" className="form_item field" component={this.renderSelect} />
                </div>

                { (!this.props.docId) 
        ? <React.Fragment>
                <div className="itemCreate">
                    <label className="label" htmlFor="file">Course</label>
                    <input name="file" type="file" onChange={this.onFileChange} className="uploadFile" 
                        accept=".jpeg,.png,.jpg,application/pdf"/>
                </div>

                <div className="itemCreate">
                    <label className="label"> </label>
                    <div className="form_item field previewDiv" name="preview">
                        <div id="previewImage" style={{"width": "200px", "boxShadow":"1px 1px 10px black"}} />
                        {this.state.selectedFile 
                            ? <div className="fichePreview">
                                <h1>{this.state.selectedFile.name}</h1>
                                <ul>
                                    <li><strong>Size:</strong> {this.state.selectedFile.size/1000} Ko</li>
                                    <li><strong>Last Modified:</strong> {`${this.state.selectedFile.lastModifiedDate}`}</li>
                                </ul>
                                </div> 
                            : <div className="previewNoData">No data</div> }
                    </div>
                </div> 
        </React.Fragment>: "" }
                
                <button className="buttonSubmitCreateDoc">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) errors.title = 'You must enter a title';
    else if (formValues.title.length >= 10 && 50 <= formValues.title.length) errors.title = 'You must enter minimum 10 characters and maximum 50 characters';

    if (!formValues.description) errors.description = 'You must enter a description';
    else if (formValues.description.length > 1000) errors.description = 'You must enter maximum 1000 characters';

    if (!formValues.matiere) errors.matiere = 'Please choose a subject';

    if (formValues.file === null) errors.file = 'Please choose a file';

    console.log(errors);
    return errors;
};

const mapStateToProps = (state, ownProps) => {  
    if (state.cours.courseGetInfo) return {  courseInfo: state.cours.courseGetInfo[0][0], file: state.cours.courseGetInfo[1]   }
    return {  isSignedIn : state.auth.isSignedIn };
}

const FormCoursewithReduxForm = reduxForm({
    form: 'DocumentForm',
    validate
})(FormCourse);

export default connect(mapStateToProps, {createDoc, getCourse, editDoc})(FormCoursewithReduxForm);