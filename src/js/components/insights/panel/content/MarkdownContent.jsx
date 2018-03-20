/**
 * MarkdownContent.jsx
 * Created by Kevin Li 3/20/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { fetchAuditMarkdown } from 'helpers/insightsHelper';

const propTypes = {
    url: PropTypes.string
};

export default class MarkdownContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: []
        };
    }

    componentDidMount() {
        this.loadSource();
    }

    loadSource() {
        fetchAuditMarkdown(this.props.url).promise
            .then((res) => {
                this.parseSource(res.data);
            });
    }

    parseSource(data) {
        // split it up by section
        const sections = data.split('### ').reduce((parsed, section) => {
            if (section !== '') {
                parsed.push(`### ${section}`);
            }
            return parsed;
        }, []);

        this.setState({
            sections
        });
    }

    render() {
        const output = this.state.sections.map((section, index) => (
            <div
                className="insights-card"
                key={index}>
                <ReactMarkdown
                    source={section} />
            </div>
        ));
        return (
            <div>
                {output}
            </div>
        );
    }
}

MarkdownContent.propTypes = propTypes;
