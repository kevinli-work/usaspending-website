/**
 * SwitchedContent.jsx
 * Created by Kevin Li 3/20/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import AgencySwitcherContainer from 'containers/insights/agency/AgencySwitcherContainer';

const propTypes = {
    feature: PropTypes.string
};

const switchers = {
    agency: AgencySwitcherContainer
};

const SwitchedContent = (props) => {
    const switcher = switchers[props.feature];
    if (!switcher) {
        return null;
    }

    return React.createElement(switcher, props);
};

SwitchedContent.propTypes = propTypes;

export default SwitchedContent;
