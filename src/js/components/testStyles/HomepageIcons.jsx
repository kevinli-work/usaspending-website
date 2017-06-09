/**
 * HomepageIcons.jsx
 * Created by Destin Frasier 6/6/17
 */

import React from 'react';

const propTypes = {
    hpicon: React.PropTypes.func,
    hplabel: React.PropTypes.string
};

export default class HomepageIcons extends React.Component {
    render() {
        const HomeIcon = this.props.hpicon;
        return (
            <li>
                <div className="icon-svg">
                    <HomeIcon />
                </div>
                <div className="icon-label">
                    {this.props.hplabel}
                </div>
            </li>
        );
    }
}

HomepageIcons.propTypes = propTypes;
