import React from 'react';

import GoogleAuth from '../../GoogleAuth';
import FormForum from './FormForum';
import './Create.scss';

class CreateForum extends React.Component {
    onSubmit = async (formValues) => {
        console.log(formValues);
    }

    render() {
        return (
            <div>
                <GoogleAuth />
                <h1>Create Your Forum page to discuss about a subject :)</h1>
                <div className="formCreate">
                    <FormForum onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

export default CreateForum;