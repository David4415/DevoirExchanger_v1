import React from 'react';
import { connect } from 'react-redux';

import { menuChange } from '../../../actions';
import GoogleAuth from '../../GoogleAuth';

class Settings extends React.Component {
    componentDidMount() {
        this.props.menuChange('settings');
    }

    render() {
        return <div className="Settings">Settings<GoogleAuth signOutBut/></div>;
    }
};

export default connect(null, {menuChange})(Settings);