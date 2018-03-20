/**
 * InsightsButtonContainer.jsx
 * Created by Kevin Li 3/19/18
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as insightsActions from 'redux/actions/insights/insightsActions';

import InsightsButton from 'components/insights/InsightsButton';

export class InsightsButtonContainer extends React.Component {
    render() {
        return (
            <InsightsButton
                {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        insightsActive: state.insights.display
    }),
    (dispatch) => bindActionCreators(insightsActions, dispatch)
)(InsightsButtonContainer);
