/**
 * InsightsPanel.jsx
 * Created by Kevin Li 3/19/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideInsights: PropTypes.func
};

export default class InsightsPanel extends React.Component {
    render() {
        return (
            <div className="insights">
                <div className="insights__header">
                    <div className="insights__title">
                        <img
                            className="insights__title-icon"
                            src="img/spark.png"
                            alt="Insights" />
                        <h2 className="insights__title-text">
                            Insights
                        </h2>
                    </div>
                    <button
                        className="insights__close"
                        aria-label="Close"
                        onClick={this.props.hideInsights}>
                        <Close alt="Close" />
                    </button>
                </div>
            </div>
        );
    }
}

InsightsPanel.propTypes = propTypes;
