/**
 * InsightsButton.jsx
 * Created by Kevin Li 3/19/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    insightsActive: PropTypes.bool,
    showInsights: PropTypes.func,
    hideInsights: PropTypes.func
};

const InsightsButton = (props) => {
    const insightToggleOn = props.insightsActive ? 'insight-toggle__toggle_on' : '';
    const insightPositionOn = props.insightsActive ? 'insight-toggle__decorator_on' : '';

    const toggleInsights = () => {
        if (props.insightsActive) {
            props.hideInsights();
        }
        else {
            props.showInsights();
        }
    };

    return (
        <button
            className="insight-toggle"
            onClick={toggleInsights}
            aria-pressed={props.insightsActive}>
            <div className="insight-toggle__title">
                Insights
            </div>
            <div className={`insight-toggle__toggle ${insightToggleOn}`}>
                <div className={`insight-toggle__decorator ${insightPositionOn}`} />
            </div>
        </button>
    );
};

InsightsButton.propTypes = propTypes;

export default InsightsButton;
