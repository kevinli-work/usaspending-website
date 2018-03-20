/**
 * NoContent.jsx
 * Created by Kevin Li 3/20/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    title: 'Coming soon',
    explanation: 'Insights are not yet available for this page.'
};

const propTypes = {
    title: PropTypes.string,
    explanation: PropTypes.string
};

const NoContent = (props) => (
    <div className="insights-none">
        <h3 className="insights-none__title">
            {props.title}
        </h3>
        <div className="insights-none__explanation">
            {props.explanation}
        </div>
    </div>
);

NoContent.defaultProps = defaultProps;
NoContent.propTypes = propTypes;

export default NoContent;
