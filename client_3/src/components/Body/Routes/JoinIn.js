import React from 'react';

import GoogleAuth from '../../GoogleAuth';
import Modal from '../../Modal';

import './JoinIn.scss';

class JoinIn extends React.Component {
    render() {
        return (
            <div>
                <Modal title="Hi there" onDismiss={this.props.onDismiss}>
                    {this.props.textInfo ? <div className="textInfo"><p>{this.props.textInfo}</p></div> : ""}
                    <div className="joinIn_part">
                        <h2>Are you ready to to join us ?</h2>
                        <GoogleAuth text="Sign In" buttonColor="red" displayButton />
                    </div>
                    <hr />
                    <div className="joinIn_part">
                        <h4>Already have an account ?</h4>
                        <GoogleAuth text="Log In" buttonColor="blue" displayButton />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default JoinIn;
