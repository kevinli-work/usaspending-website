/**
 * AgencySwitcherContainer.jsx
 * Created by Kevin Li 3/20/18
 */

import React from 'react';
import { connect } from 'react-redux';

import AgencySwitcher from 'components/insights/panel/content/agency/AgencySwitcher';

export class AgencySwitcherContainer extends React.Component {
    render() {
        return (
            <AgencySwitcher
                {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        agency: state.agency.overview
    }),
)(AgencySwitcherContainer);
