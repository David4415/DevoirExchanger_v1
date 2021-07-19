import React from 'react';
import { connect } from 'react-redux';

import Logo from '../../Header/Logo';
import GoogleAuth from '../../GoogleAuth';
import JoinIn from './JoinIn';
import Search from './Search';
import { menuChange } from '../../../actions';

import './Home.scss';

class Home extends React.Component {
    state = { showJoinIn: true, selectedMenu: 1 };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.props.menuChange('home');
    }

    onDismiss = (bool) => {
        this.setState({ showJoinIn: bool })
    }

    displayJoinIn = () => {
        if (!this.props.isSignedIn && this.state.showJoinIn) return <JoinIn onDismiss={this.onDismiss} />;
        return <div></div>;
    }

    renderIfNotSignedIn = () => {
        return (
            <div>
                <div className="join">
                    <GoogleAuth text="Sign In" buttonColor="red" displayButton />
                    <GoogleAuth text="Log In" buttonColor="blue" displayButton />
                </div>
                <div className="home_menu">
                    <div className={this.state.selectedMenu===1 ? "selected" : ""} onClick={()=>{this.setState({selectedMenu: 1})}}><p>Cours pinnés</p></div>
                    
                </div>
                <div ref={this.myRef}>
                    <Search notActive />
                </div>
            </div>
        );
    }
    renderIfSignedIn() {
        return (
            <div>
                <div className="join">
                    <img className="profileImage" src={this.props.userInfo.profileImage} width="35px" height="35px"/>
                </div>
                <div className="home_menu">
                    <div className={this.state.selectedMenu===1 ? "selected" : ""} onClick={()=>{this.setState({selectedMenu: 1})}}><p>Cours pinnés</p></div>
                    <div className={this.state.selectedMenu===2 ? "selected" : ""} onClick={()=>{this.setState({selectedMenu: 2})}}><p>Cours que j'ai fait</p></div>
                </div>
                <div ref={this.myRef}>
                    { this.state.selectedMenu === 1 ? <div><Search notActive /></div> : <div><Search notActive putUserId/></div>}
                </div>
            </div>
            
        )
    }

    render() {
        return (
            <div className="home">
                <GoogleAuth /> 
                {this.props.isSignedIn !== true ? this.renderIfNotSignedIn() : this.renderIfSignedIn()}
                {this.displayJoinIn()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {  isSignedIn : state.auth.isSignedIn, userInfo: state.auth.userInfo };
}

export default connect(mapStateToProps, {menuChange})(Home);