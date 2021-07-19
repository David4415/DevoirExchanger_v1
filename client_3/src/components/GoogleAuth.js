import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '542587154619-3njdd7kn733e9le5sm51u9cro586ur2u.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn =>{
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile ());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick() {
        this.auth.signIn();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return <button>GoogleAuth</button>;
        } else {
            return (
                <button onClick={() => this.onSignInClick()} className={`ui ${this.props.buttonColor} google button`}>
                    <i className="google icon" />
                    {this.props.text}
                </button>
            );
        }
    }

    onSignOutClick() {
        this.auth.signOut();
    }

    renderSignOutButton() {
        return (
            <button onClick={() => this.onSignOutClick()} className={`ui black google button`}>
                <i className="google icon" />
                Sign Out
            </button>
        )
    }

    render() {
        if (this.props.signOutBut) return <div>{this.renderSignOutButton()}</div>
        else if (this.props.displayButton) return <div>{this.renderAuthButton()}</div>;
        else return <div></div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
//mapStateToProps