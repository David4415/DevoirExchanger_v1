import React from 'react';

import Logo from './Logo';
import Menu from './Menu';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo_container"><Logo /></div>
                <Menu />
            </div>
        );
    }
}

export default Header;