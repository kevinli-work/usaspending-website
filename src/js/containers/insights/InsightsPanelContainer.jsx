/**
 * InsightsPanelContainer.jsx
 * Created by Kevin Li 3/19/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Router from 'containers/router/Router';

import * as insightsActions from 'redux/actions/insights/insightsActions';

import InsightsPanel from 'components/insights/panel/InsightsPanel';

const propTypes = {
    insights: PropTypes.object
};

export class InsightsPanelContainer extends React.Component {
    render() {
        let panel = null;
        if (this.props.insights.display) {
            panel = (
                <InsightsPanel
                    {...this.props}
                    feature={Router.state.insightsFeature || ''} />
            );
        }

        return (
            <div className="insights-animations">
                <CSSTransitionGroup
                    transitionName="glossary-slide"
                    transitionLeaveTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeave>
                    {panel}
                </CSSTransitionGroup>
            </div>
        );
    }
}

InsightsPanelContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        insights: state.insights
    }),
    (dispatch) => bindActionCreators(insightsActions, dispatch)
)(InsightsPanelContainer);
