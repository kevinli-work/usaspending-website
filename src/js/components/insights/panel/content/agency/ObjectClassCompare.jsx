/**
 * ObjectClassCompare.jsx
 * Created by Kevin Li 3/20/18
 */

import React from 'react';
import { orderBy } from 'lodash';
import { fetchAgencyMajorObjectClasses } from 'helpers/agencyHelper';
import { formatTreemapValues } from 'helpers/moneyFormatter';

export default class ObjectClassCompare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const prevFY = fetchAgencyMajorObjectClasses({
            fiscal_year: parseInt(this.props.agency.activeFY, 10) - 1,
            funding_agency_id: this.props.agency.id
        }).promise;
        const currentFY = fetchAgencyMajorObjectClasses({
            fiscal_year: this.props.agency.activeFY,
            funding_agency_id: this.props.agency.id
        }).promise;

        Promise.all([prevFY, currentFY])
            .then((results) => {
                const prevData = results[0].data.results;
                const currentData = results[1].data.results;

                const output = {};
                prevData.forEach((item) => {
                    output[item.major_object_class_code] = {
                        code: item.major_object_class_code,
                        name: item.major_object_class_name,
                        prev: parseFloat(item.obligated_amount)
                    };
                });
                currentData.forEach((item) => {
                    if (output[item.major_object_class_code]) {
                        output[item.major_object_class_code].current = parseFloat(item.obligated_amount);
                    }
                    else {
                        output[item.major_object_class_code] = {
                            code: item.major_object_class_code,
                            name: item.major_object_class_name,
                            current: parseFloat(item.obligated_amount)
                        };
                    }
                });

                // convert to an array and order by current amount
                const ordered = orderBy(output, ['current', 'prev'], ['desc', 'desc']);
                this.setState({
                    data: ordered
                });
            });
    }

    render() {
        const rows = this.state.data.map((row) => (
            <tr key={row.code}>
                <td>
                    {row.name}
                </td>
                <td>
                    {(row.prev && formatTreemapValues(row.prev)) || '--'}
                </td>
                <td>
                    {(row.current && formatTreemapValues(row.current)) || '--'}
                </td>
            </tr>
        ));
        return (
            <div
                className="insights-card">
                <h3>FY Comparison</h3>
                <p>
                    Here is how major object class obligations for the most recent quarter compare to Q4 of the last fiscal year.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Major Object Class
                            </th>
                            <th>
                                FY {parseInt(this.props.agency.activeFY, 10) - 1} (Q4)
                            </th>
                            <th>
                                FY {this.props.agency.activeFY} (Q{this.props.agency.activeFQ})
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
