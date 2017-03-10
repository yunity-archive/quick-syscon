import React from 'react'
import { _ } from 'meteor/underscore'

import ColumnHelper from './utils/column-helper'
import { getStyleProperties } from './utils/styleHelper'
import classNames from 'classnames'

class CustomRowComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    shouldComponentUpdate(nextProps) {
        if (_.isEqual(this.props.sortedColumns, nextProps.sortedColumns) === false) {
            return true
        }
        if(this.props.isExpanded !== nextProps.isExpanded) {
            // console.log('update row')
            return true
        }
        return false
    }

    render() {
        // console.log(this.props)
        var columns = []
        const { columnProperties,
        ignoredColumns,
        tableProperties,
        rowData,
        events,
        originalRowData,
        rowIndex,
        absoluteRowIndex,
        sortedColumns,
        components
        } = this.props
        const allProps = this.props
        const { mainKey } = this.props

        sortedColumns.forEach(function(column) {

            //var currentRow = rowData.find(column)
            //console.log(column)
            //console.log(allProps)
        //get the additional properties defined in the creation of the object
            let columnProperty = ColumnHelper.getColumnPropertyObject(columnProperties, column)
        //render the column if there are no properties, there are properties and the column is in the collection OR there are properties and no column properties.
            if(ColumnHelper.isColumnVisible(column, {columnProperties, ignoredColumns: ignoredColumns || []})) {
                columns.push(
            <components.Column
            {...allProps}
            key={column}
            originalData={rowData}
            originalRowData={originalRowData}
            absoluteRowIndex={mainKey}
            dataKey={column}
            value={rowData[column]}
            {...columnProperty}
             />)
            }
        }
        )
        //console.log(this.props.isExpanded)
        //console.log(rowData.mainKey)
        var rowClassName =  classNames({
            'parent-row': this.props.depthLevel == 0,
            'row-level-2' : this.props.depthLevel == 1,
            'row-level-3' : this.props.depthLevel == 2,
            'expanded': this.props.isExpanded,
        })
        // var rowClassName =  classNames({
        //     'parent-row': !this.props.isChild,
        //     'child-row' : this.props.isChild,
        //     'expanded': this.props.isExpanded == absoluteRowIndex,
        // })
        return (
        <tr
          className={rowClassName}
          onMouseOver={this._handleHover}
          onClick={this._onClick}
          key={mainKey}
        >
          {columns}
        </tr>
        )
    }

    _onClick = (event) => {
        // console.log('rowClick')
        event.preventDefault()
        event.stopPropagation()
        this.props.events.rowClick(this.props.rowData, this.props.originalRowData)
        this.props.toggleChildren(this.props.rowData.mainKey, this.props.depthLevel)
    }
  }
export default CustomRowComponent
