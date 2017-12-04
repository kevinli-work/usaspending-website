/**
 * QuarterPicker.jsx
 * Created by Lizzie Salita 11/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

const propTypes = {
    pickedQuarter: PropTypes.func,
    fy: PropTypes.string,
    quarter: PropTypes.string
};

export default class QuarterPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverQuarter: 0
        };

        this.pickedQuarter = this.pickedQuarter.bind(this);
        this.hoveredOverQuarter = this.hoveredOverQuarter.bind(this);
        this.resetHover = this.resetHover.bind(this);
    }

    pickedQuarter(e) {
        e.preventDefault();
        const target = e.target;
        this.props.pickedQuarter(target.value);
    }

    hoveredOverQuarter(e) {
        e.preventDefault();
        const target = e.target;
        this.setState({
            hoverQuarter: target.value
        });
    }

    resetHover() {
        this.setState({
            hoverQuarter: 0
        });
    }

    render() {
        const quarters = [];
        const currentQuarter = parseInt(this.props.quarter, 10);
        for (let quarter = 1; quarter <= 4; quarter++) {
            let selectedClass = '';
            let hoverClass = '';
            if (quarter <= currentQuarter && this.state.hoverQuarter === 0) {
                selectedClass = 'selected';
            }
            else if (quarter <= this.state.hoverQuarter) {
                hoverClass = 'hover';
            }

            const monthRange =
                FiscalYearHelper.convertQuarterToCumulativeDateRange(quarter, this.props.fy);
            const item = (
                <button
                    title={monthRange}
                    key={quarter}
                    className={`quarter-item ${selectedClass} ${hoverClass}`}
                    value={quarter}
                    onClick={this.pickedQuarter}
                    onMouseEnter={this.hoveredOverQuarter}
                    onMouseLeave={this.resetHover}>
                    Q{quarter}
                </button>
            );

            quarters.push(item);
        }

        return (
            <div className="explorer-quarter-picker">
                <div className="quarters-list">
                    {quarters}
                </div>
            </div>
        );
    }
};

QuarterPicker.propTypes = propTypes;

