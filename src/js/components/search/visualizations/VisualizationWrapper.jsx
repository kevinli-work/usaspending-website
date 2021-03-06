/**
 * VisualizationWrapper.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';
import RankVisualizationWrapperContainer from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';

import NoFiltersScreen from './screens/NoFiltersScreen';

import VisualizationTabItem from './VisualizationTabItem';

const tabOptions = [
    {
        code: 'table',
        label: 'Table',
        icon: 'Table'
    },
    {
        code: 'time',
        label: 'Time',
        icon: 'Calendar'
    },
    {
        code: 'map',
        label: 'Map',
        icon: 'MapMarker'
    }
];

const propTypes = {
    isMobile: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool
};

export default class VisualizationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'table'
        };

        this._queuedAnalyticEvent = null;

        this.clickedTab = this.clickedTab.bind(this);
        this.logVisualizationTab = this.logVisualizationTab.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        this.logVisualizationTab(this.state.active);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    logVisualizationTab(tab) {
        if (this.props.noFiltersApplied) {
            // no filters are applied yet, don't log an analytic event
            return;
        }

        // discard any previously scheduled tab analytic events that haven't run yet
        if (this._queuedAnalyticEvent) {
            window.clearTimeout(this._queuedAnalyticEvent);
        }

        // only log analytic event after 15 seconds
        this._queuedAnalyticEvent = window.setTimeout(() => {
            if (this._mounted) {
                const activeLabel = tabOptions.find((el) => el.code === tab).label;
                Analytics.event({
                    category: 'Advanced Search - Visualization Type',
                    action: activeLabel
                });
            }
        }, 15 * 1000);
    }

    clickedTab(tab) {
        this.setState({
            active: tab
        }, () => {
            this.logVisualizationTab(tab);
        });
    }

    render() {
        const tabs = tabOptions.map((tab) => (
            <VisualizationTabItem
                {...tab}
                key={tab.code}
                active={this.state.active === tab.code}
                clickedTab={this.clickedTab}
                disabled={!this.props.requestsComplete} />
        ));

        let content = <NoFiltersScreen />;
        if (!this.props.noFiltersApplied) {
            switch (this.state.active) {
                case 'table':
                    content = <ResultsTableContainer />;
                    break;
                case 'time':
                    content = <TimeVisualizationSectionContainer />;
                    break;
                case 'map':
                    content = <GeoVisualizationSectionContainer />;
                    break;
                case 'rank':
                    content = <RankVisualizationWrapperContainer />;
                    break;
                default:
                    content = null;
            }
        }

        return (
            <div
                className="search-visualizations"
                ref={(div) => {
                    this.visualizationWrapper = div;
                }}>
                <div
                    className="visualization-tab-wrapper"
                    role="navigation"
                    aria-label="Visualization types">
                    <ul
                        className="visualization-tabs"
                        role="menu">
                        {tabs}
                    </ul>
                </div>
                <div className="visualization-content-wrapper">
                    <div
                        className="visualization-content"
                        role="main"
                        aria-label="Search results">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

VisualizationWrapper.propTypes = propTypes;
