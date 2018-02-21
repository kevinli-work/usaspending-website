/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';


import { defaultFiscalYear } from 'helpers/fiscalYearHelper';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerLandingOption from './ExplorerLandingOption';

require('pages/explorer/explorerPage.scss');

const ExplorerLanding = () => (
    <ExplorerWrapperPage>
        <div className="explorer-landing-page">
            <div className="landing-intro">
                <h2>Explore spending for Fiscal Year {defaultFiscalYear()}</h2>
                <div className="description">
                    <div className="highlight">
                        Choose a starting point to begin.
                    </div>
                    We&apos;ll begin by seeing spending broken down by your starting point. From there you can dive deeper and explore several other breakdowns of spending.
                </div>
            </div>
            <div className="landing-options">
                <ExplorerLandingOption
                    icon="budget_function"
                    title="Budget Function"
                    description="See spending divided by a high level categorization based on purpose."
                    url="#/explorer/budget_function"
                    term="budget-function" />
                <ExplorerLandingOption
                    icon="agency"
                    title="Agency"
                    description="See spending divided by all U.S. government agencies."
                    url="#/explorer/agency"
                    term="agency" />
                <ExplorerLandingOption
                    icon="object_class"
                    title="Object Class"
                    description="See spending grouped by the types of items and services purchased by the federal government."
                    url="#/explorer/object_class"
                    term="object-class" />
            </div>
            <div className="explorer-disclaimer-wrap">
                <div className="explorer-disclaimer">
                    <div className="explorer-disclaimer__icon">
                        <i className="usa-da-icon">
                            <InfoCircle alt="Information" />
                        </i>
                    </div>
                    <div className="explorer-disclaimer__content">
                        <div className="explorer-disclaimer__title">
                            About the Spending Explorer
                        </div>
                        <ul className="explorer-disclaimer__list">
                            <li>
                                All dollar amounts shown here represent obligated amounts.
                            </li>
                            <li>
                                Department of Defense data isn’t available for the last reported fiscal quarter. Learn more
                                about DoD reporting exemptions in our&nbsp;
                                <a
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    FAQ
                                </a>.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </ExplorerWrapperPage>
);

export default ExplorerLanding;
