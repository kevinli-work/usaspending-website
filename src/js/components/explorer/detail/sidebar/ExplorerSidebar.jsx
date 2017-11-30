/**
 * ExplorerSidebar.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Home, Calendar } from 'components/sharedComponents/icons/Icons';

import FYPicker from './FYPicker';
import VerticalTrail from './VerticalTrail';
import QuarterPicker from './QuarterPicker';

const propTypes = {
    fy: PropTypes.string,
    trail: PropTypes.object,
    setExplorerYear: PropTypes.func,
    rewindToFilter: PropTypes.func
};

export default class ExplorerSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO - Lizzie: move to Redux
            selectedQuarter: '2'
        };

        this.pickedYear = this.pickedYear.bind(this);
        this.pickedQuarter = this.pickedQuarter.bind(this);
    }

    pickedYear(year) {
        this.props.setExplorerYear(`${year}`);
    }

    pickedQuarter(quarter) {
        this.setState({
            selectedQuarter: quarter
        });
    }

    render() {
        return (
            <div className="explorer-sidebar">
                <div className="start-over">
                    <a
                        className="start-over-button"
                        href="#/explorer">
                        <div className="content">
                            <div className="icon">
                                <Home alt="Home" />
                            </div>
                            <div className="label">
                                Start Over
                            </div>
                        </div>
                    </a>
                </div>

                <div className="time-period-section">
                    <div className="fy-section">
                        <div className="icon">
                            <Calendar alt="Pick fiscal year" />
                        </div>
                        <FYPicker
                            pickedYear={this.pickedYear}
                            fy={this.props.fy} />
                    </div>
                    <QuarterPicker
                        pickedQuarter={this.pickedQuarter}
                        fy={this.props.fy}
                        quarter={this.state.selectedQuarter} />
                </div>

                <VerticalTrail
                    trail={this.props.trail.toArray()}
                    rewindToFilter={this.props.rewindToFilter} />
            </div>
        );
    }
}

ExplorerSidebar.propTypes = propTypes;
