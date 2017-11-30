/**
 * FYPicker.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { AngleUp, AngleDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    pickedYear: PropTypes.func,
    fy: PropTypes.string
};

export default class FYPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showFYMenu: false
        };

        this.toggleFYMenu = this.toggleFYMenu.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
    }

    toggleFYMenu() {
        this.setState({
            showFYMenu: !this.state.showFYMenu
        });
    }

    pickedYear(e) {
        e.preventDefault();
        const target = e.target;
        this.props.pickedYear(target.value);

        this.setState({
            showFYMenu: false
        });
    }

    render() {
        let arrowIcon = <AngleDown alt="Show Menu" />;
        const fy = [];
        if (this.state.showFYMenu) {
            arrowIcon = <AngleUp alt="Hide Menu" />;
            // TODO - Lizzie: uncomment
            // const currentFY = FiscalYearHelper.defaultFiscalYear();
            // const earliestFY = FiscalYearHelper.earliestExplorerYear;
            const currentFY = 2018;
            const earliestFY = 2017;
            for (let year = currentFY; year >= earliestFY; year--) {
                const item = (
                    <li
                        className="field-item"
                        key={year}>
                        <button
                            className="item-button"
                            title={year}
                            aria-label={year}
                            value={year}
                            onClick={this.pickedYear}>
                            FY {year}
                        </button>
                    </li>
                );

                fy.push(item);
            }
        }

        return (
            <div className="field-picker explorer-fy-picker">
                <button
                    className="selected-button fy-button"
                    title={this.props.fy}
                    aria-label={this.props.fy}
                    onClick={this.toggleFYMenu}>
                    <div className="label">
                        FY {this.props.fy}
                        <div className="arrow-icon">
                            {arrowIcon}
                        </div>
                    </div>
                </button>

                <div className="field-list">
                    <ul>
                        {fy}
                    </ul>
                </div>
            </div>
        );
    }

};

FYPicker.propTypes = propTypes;

