/**
 * TestStylePage.jsx
 * Created by Kevin Li 1/3/17
 */

import React from 'react';
import _ from 'lodash';

import * as MetaTagHelper from 'helpers/metaTagHelper';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';

import * as Icons from '../sharedComponents/icons/Icons';
import * as HpIcons from '../sharedComponents/icons/home/HomeIcons';
import * as AbIcons from '../sharedComponents/icons/about/AboutIcons';

import IconsExample from './IconsExample';
import HomepageIcons from './HomepageIcons';
import AboutIcons from './AboutIcons';
import ButtonsExample from './ButtonsExample';

export default class TestStylePage extends React.Component {
    render() {
        const icons = [];
        _.forEach(Icons, (value, key) => {
            const component = (<IconsExample
                key={key}
                icon={value}
                label={`Icon.${key}`} />);
            icons.push(component);
        });
        const homepageicons = [];
        _.forEach(HpIcons, (value, key) => {
            const component = (<HomepageIcons
                key={key}
                hpicon={value}
                hplabel={`HomepageIcons.${key}`} />);
            homepageicons.push(component);
        });

        const abouticons = [];
        _.forEach(AbIcons, (value, key) => {
            const component = (<AboutIcons
                key={key}
                abicon={value}
                ablabel={`AboutIcons.${key}`} />);
            abouticons.push(component);
        });
        return (
            <div className="usa-da-test-page">
                <MetaTags {...MetaTagHelper.stylePageMetaTags} />
                <Header />
                <main id="main-content">
                    <div className="page-content">
                        <div className="page-wrapper">
                            <ButtonsExample />
                            <h3>Icons</h3>
                            <ul className="icon-list">
                                {icons}
                            </ul>
                            <h3>Homepage Icons</h3>
                            <ul className="icon-list">
                                {homepageicons}
                            </ul>
                            <h3>About Page Icons</h3>
                            <ul className="icon-list">
                                {abouticons}
                            </ul>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
