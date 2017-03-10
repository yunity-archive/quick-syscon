import React from 'react'
import { arraysEqual } from './utils/arrayHelper'
import ColumnHelper from './utils/column-helper'
import { _ } from 'meteor/underscore'



class CustomTableHeading extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            updateKey: Math.random()
        }
        this.getColumnTitle = this.getColumnTitle.bind(this)

    }

    shouldComponentUpdate(nextProps) {
        if (_.isEqual(this.props.sortedColumns, nextProps.sortedColumns) === false) {
            console.log('update-customtablecomponent- sortedColumns')
            this.setState({ updateKey: Math.random() })
            return true
        }
        return false
    }

    getColumnTitle(column) {
        const initial = this.props.columnTitles[column]  ?
                  this.props.columnTitles[column] :
                  column

        return this.props.renderProperties.columnProperties[column] && this.props.renderProperties.columnProperties[column].hasOwnProperty('displayName') ?
            this.props.renderProperties.columnProperties[column].displayName :
            initial
    }

    render() {
        let { headingClick, headingHover } = this.props.events
        var headings = []
        const { pageProperties,
                columnProperties,
                renderProperties,
                ignoredColumns,
                tableProperties,
                rowData,
                sortedColumns,
                events,
                originalRowData,
                components,
                settings
                } = this.props
        const allProps = this.props
        sortedColumns.map(column =>{
            let columnProperty = ColumnHelper.getColumnPropertyObject(columnProperties, column)
            const showColumn = ColumnHelper.isColumnVisible(column, {columnProperties, ignoredColumns: ignoredColumns || []})

            const sortAscending = pageProperties && pageProperties.sortAscending
            const sorted = pageProperties && pageProperties.sortColumns.indexOf(column) > -1
            const title = this.getColumnTitle(column)
            //const title = this.getColumnTitle(column)
            if(ColumnHelper.isColumnVisible(column, {columnProperties, ignoredColumns: ignoredColumns || []})) {
                headings.push(
                    <components.TableHeadingCell
                        {...allProps}
                        key={column}
                        column={column}
                        sorted={sorted}
                        sortAscending={sortAscending}
                        settings={settings}
                        headingClick={headingClick}
                        headingHover={headingHover}
                        title={title}
                        columnProperty={columnProperty}
                        {...columnProperty}
                        />)
            }
        })

        return headings.length > 0 ? (
      <thead className={'griddle-heading'}>
        <tr>
          {headings}
        </tr>
      </thead>
    ) : null
    }
}

export default CustomTableHeading
