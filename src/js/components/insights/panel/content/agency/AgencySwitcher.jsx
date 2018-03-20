/**
 * AgencySwitcher.jsx
 * Created by Kevin Li 3/20/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import NoContent from '../NoContent';
import MarkdownContent from '../MarkdownContent';
import ObjectClassCompare from './ObjectClassCompare';

const sections = {
    'agency__major-object-class': {
        title: 'Major Object Classes',
        widgets: [
            {
                type: 'markdown',
                code: 'audit',
                url: 'data/insights/agency_major_oc.md'
            },
            {
                type: 'custom',
                code: 'fy',
                component: ObjectClassCompare
            }
        ]
    },
    'agency__federal-accounts': {
        title: 'Federal Accounts',
        widgets: [
            {
                type: 'markdown',
                code: 'fedaudit',
                url: 'data/insights/agency_fedaccount.md'
            }
        ]
    }
};


const propTypes = {
    agency: PropTypes.object
};

export default class AgencySwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: '',
            elements: []
        };

        this.userScrolled = throttle(this.userScrolled.bind(this), 300);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.userScrolled);

        // get all the insight elements
        this.findInsightTargets();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.agency.id !== this.props.agency.id) {
            this.findInsightTargets();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.userScrolled);

        // remove all highlights
        const allInsights = document.querySelectorAll('[data-insights-id]');
        allInsights.forEach((el) => {
            el.removeAttribute('data-insights-active');
        });
    }


    findInsightTargets() {
        const insightElements = Array.from(document.querySelectorAll('[data-insights-id]'))
            .reduce((parsed, el) => {
                if (el.dataset.insightsId.indexOf('agency__') > -1) {
                    parsed.push({
                        id: el.dataset.insightsId,
                        y: el.offsetTop,
                        height: el.offsetHeight
                    });
                }
                return parsed;
            }, []);

        this.setState({
            elements: insightElements
        }, () => {
            this.userScrolled();
        });
    }

    userScrolled() {
        // find the current element on screen
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        // find every element with insight content
        let insightTarget = null;
        for (const element of this.state.elements) {
            if (element.y <= (scrollY + windowHeight) && (element.y + element.height) >= scrollY) {
                // element is in view
                insightTarget = element;
                break;
            }
        }

        this.setState({
            activeSection: insightTarget && insightTarget.id
        }, () => {
            this.highlightSection();
        });
    }

    highlightSection() {
        const allInsights = document.querySelectorAll('[data-insights-id]');
        allInsights.forEach((el) => {
            if (el.dataset.insightsId !== this.state.activeSection) {
                el.removeAttribute('data-insights-active');
            }
            else {
                el.setAttribute('data-insights-active', 'true');
            }
        });
    }

    generateSection() {
        const section = sections[this.state.activeSection];

        const output = [this.generateTitle(section.title)];
        const body = section.widgets.reduce((rendered, widget) => {
            switch (widget.type) {
                case 'markdown':
                    rendered.push(this.generateMarkdown(widget));
                    break;
                case 'custom':
                    rendered.push(this.generateCustom(widget));
                default:
                    break;
            }
            return rendered;
        }, output);

        return body;
    }

    generateTitle(title) {
        return (
            <div
                className="insights-section__section-title"
                key="title">
                {title}
            </div>
        );
    }

    generateMarkdown(widget) {
        return (
            <MarkdownContent
                key={widget.code}
                url={widget.url} />
        );
    }

    generateCustom(widget) {
        return React.createElement(widget.component, Object.assign({}, this.props, {
            key: widget.code
        }));
    }

    render() {
        const section = sections[this.state.activeSection] ? this.generateSection() : (
            <NoContent
                title="Scroll for insights"
                explanation="Scroll up or down the page to see relevant insights." />
        );
        return (
            <div className="insights-section">
                <div className="insights-section__page-title">
                    {this.props.agency.name}
                </div>
                {section}
            </div>
        );
    }
}

AgencySwitcher.propTypes = propTypes;
