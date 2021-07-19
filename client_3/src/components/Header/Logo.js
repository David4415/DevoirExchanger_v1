import React from 'react';

import img from './header_image/logo.png';
import './header.scss';

class Logo extends React.Component {
    render() {
        return (
            <div className="logo">
                <img src={img} height="25px"/>
                <h1>hubrium</h1>
            </div>
        );
    }
}

export default Logo;