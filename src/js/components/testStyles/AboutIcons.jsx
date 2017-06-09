/**
 * AboutIcons.jsx
 * Created by Destin Frasier 6/6/17
 */

import React from 'react';

const propTypes = {
    abicon: React.PropTypes.func,
    ablabel: React.PropTypes.string
};

export default class AboutIcons extends React.Component {
    render() {
        const AboutIcon = this.props.abicon;
        return (
            <li>
                <div className="icon-svg">
                    <AboutIcon />
                </div>
                <div className="icon-label">
                    {this.props.ablabel}
                </div>
            </li>
        );
    }
}

AboutIcons.propTypes = propTypes;
