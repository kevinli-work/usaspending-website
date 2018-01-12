/**
 * TableBody.jsx
 * Created by Kevin Li 12/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ScrollManager from '../managers/ScrollManager';

const propTypes = {
    columns: PropTypes.array,
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    bodyHeight: PropTypes.number,
    bodyWidth: PropTypes.number,
    contentWidth: PropTypes.number,
    tableId: PropTypes.string,
    onReachedBottom: PropTypes.func,
    bodyCellRender: PropTypes.func
};

const watchedProps = ['rowCount', 'rowHeight', 'bodyHeight', 'contentWidth', 'bodyWidth'];

export default class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            visibleRange: ''
        };

        this._lastX = 0;
        this._lastY = 0;

        this._cellCache = {};
        this._visibleCells = [];

        this._scrollListener = null;

        this._tableScrolled = this._tableScrolled.bind(this);
    }

    componentDidMount() {
        this._scrollListener = ScrollManager.subscribe(this._tableScrolled);
    }

    componentDidUpdate(prevProps) {
        for (const prop of watchedProps) {
            if (prevProps[prop] !== this.props[prop]) {
                this._generateAllCells();
                break;
            }
        }
    }

    componentWillUnmount() {
        if (this._scrollListener) {
            ScrollManager.unsubscribe(this._scrollListener);
        }
    }

    reloadTable() {
        this.setState({
            visibleRange: ''
        }, () => {
            this._generateAllCells();
        });
    }

    _tableScrolled(scroll) {
        const visibleCoords = this._calculateVisibleCells(scroll.x, scroll.y);
        if (!visibleCoords || visibleCoords.length === 0) {
            // there is no data so there's nothing to show
            return;
        }

        const visibleRange = visibleCoords.range;

        this._lastX = scroll.x;
        this._lastY = scroll.y;

        if (visibleRange !== this.state.visibleRange) {
            // cells changed
            this._visibleCells = visibleCoords.rows.reduce((visible, rowData) => {
                const cells = rowData.cells.map((coord) => this._generateCell(coord.col, coord.row));
                const row = this._generateRowWrapper(rowData.row, cells);
                // const output = visible.concat(cells);
                // return output;
                visible.push(row);
                return visible;
            }, []);

            this.setState({
                visibleRange
            }, () => {
                if (this.props.onReachedBottom && this._isAtBottom()
                    && this.props.rowCount > 0) {
                    this.props.onReachedBottom();
                }
            });
        }
    }

    _calculateVisibleCells(x, y) {
        if (this.props.rowCount === 0 || this.props.columns.length === 0) {
            // there's no data
            return null;
        }

        // allow a buffer of one out-of-view row above and below the visible area
        const mathematicalTopRow = Math.floor(y / this.props.rowHeight);
        const bottomY = y + this.props.bodyHeight;
        const mathematicalBottomRow = Math.ceil(bottomY / this.props.rowHeight);
        const topRow = Math.max(0, mathematicalTopRow - 1);
        const bottomRow = Math.min(this.props.rowCount - 1, mathematicalBottomRow + 1);

        // calculate the visible X range
        const leftX = x;
        const rightX = x + this.props.bodyWidth;

        const visibleColumns = [];
        let leadingColumn = null;
        let trailingColumn = null;

        for (let i = 0; i < this.props.columns.length; i++) {
            const column = this.props.columns[i];
            const columnStartX = column.x;
            const columnEndX = column.x + column.width;

            if (columnEndX < leftX) {
                // column is out of view and is to the left of the visible area
                // use it as a potential leading cell
                leadingColumn = i;
                continue;
            }
            else if (columnStartX > rightX) {
                // column is out of view and is to the right of the visible area
                // use it as a potential trailing cell and stop looping
                trailingColumn = i;
                break;
            }

            visibleColumns.push(i);
        }

        if (leadingColumn) {
            visibleColumns.unshift(leadingColumn);
        }
        if (trailingColumn) {
            visibleColumns.push(trailingColumn);
        }

        const visibleRows = [];

        for (let i = topRow; i <= bottomRow; i++) {
            const cellsInRow = [];
            if (i === topRow) {
                // ensure the last column of the first row is included for accessibility purposes
                if (visibleColumns[visibleColumns.length - 1] !== this.props.columns.length - 1) {
                    cellsInRow.push({
                        col: this.props.columns.length - 1,
                        row: topRow
                    });
                }
            }
            else if (i === bottomRow) {
                // ensure the first column of the last row is included for accessibility purposes
                if (visibleColumns[0] !== 0) {
                    cellsInRow.push({
                        col: 0,
                        row: bottomRow
                    });
                }
            }

            visibleColumns.forEach((col) => {
                cellsInRow.push({
                    col,
                    row: i
                });
            });
            visibleRows.push({
                row: i,
                cells: cellsInRow
            });
        }

        return {
            rows: visibleRows,
            range: `${visibleColumns[0]},${topRow}-${visibleColumns[visibleColumns.length - 1]},${bottomRow}`
        };
    }

    _isAtBottom() {
        const visibleBottom = this._lastY + this.props.bodyHeight;
        // allow a half row buffer at the bottom
        const contentBottom = (this.props.rowCount * this.props.rowHeight) -
            (this.props.rowHeight / 2);
        const maxBottom = this.props.rowCount * this.props.rowHeight;
        if (visibleBottom >= contentBottom && visibleBottom <= maxBottom) {
            return true;
        }
        return false;
    }

    _generateAllCells() {
        // pre-generate all the cells the table will have when the data is initially loaded in
        // we'll pull these from the cache on-the-fly as they come into view
        const cellCache = {};
        // for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
            // this.props.columns.forEach((column, columnIndex) => {
            //     const cellPositioning = {
            //         x: column.x,
            //         y: rowIndex * this.props.rowHeight,
            //         width: column.width,
            //         height: this.props.rowHeight
            //     };

            //     const cellContent = this.props.bodyCellRender(columnIndex, rowIndex);
            //     // console.log(cellContent);

            //     const coord = `${columnIndex},${rowIndex}`;
            //     const realCell = (
            //         <div
            //             key={coord}
            //             className="ibt-table-cell"
            //             tabIndex={-1}
            //             role="gridcell"
            //             aria-describedby={`header-${this.props.tableId}-${columnIndex}`}
            //             style={{
            //                 top: cellPositioning.y,
            //                 left: cellPositioning.x,
            //                 height: cellPositioning.height,
            //                 width: cellPositioning.width
            //             }}>
            //             {cellContent}
            //         </div>
            //     );
            //     cellCache[coord] = realCell;
            // });
        // }

        this._cellCache = cellCache;

        this._tableScrolled({
            x: this._lastX,
            y: this._lastY
        });
    }

    _generateRowWrapper(rowIndex, cells) {
        return (
            <div
                key={`row-${rowIndex}`}
                className="ibt-table-row"
                tabIndex={-1}
                role="row">
                {cells}
            </div>
        );
    }

    _generateCell(columnIndex, rowIndex) {
        const cellContent = this.props.bodyCellRender(columnIndex, rowIndex);
        const column = this.props.columns[columnIndex];
        const cellPositioning = {
            x: column.x,
            y: rowIndex * this.props.rowHeight,
            width: column.width,
            height: this.props.rowHeight
        };
        const coord = `${columnIndex},${rowIndex}`;
        const realCell = (
            <div
                key={coord}
                className="ibt-table-cell"
                tabIndex={-1}
                role="gridcell"
                aria-describedby={`header-${this.props.tableId}-${columnIndex}`}
                style={{
                    top: cellPositioning.y,
                    left: cellPositioning.x,
                    height: cellPositioning.height,
                    width: cellPositioning.width
                }}>
                {cellContent}
            </div>
        );

        return realCell;
    }

    render() {
        const style = {
            width: this.props.contentWidth,
            height: this.props.rowCount * this.props.rowHeight
        };

        return (
            <div
                className="ibt-table-body-container"
                role="presentation"
                style={style}>
                <div
                    className="ibt-table-body"
                    role="rowgroup">
                    {this._visibleCells}
                </div>
            </div>
        );
    }
}

TableBody.propTypes = propTypes;
