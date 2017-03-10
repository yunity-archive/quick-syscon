import React from 'react'
import classnames from 'classnames'
import { getStyleProperties } from './utils/styleHelper'

class CustomTableHeadingCell extends React.Component {
    constructor(props, context) {
        super(props, context)

        this._handleClick = this._handleClick.bind(this)
        this._handleHover = this._handleHover.bind(this)
    }

    getSortIcon() {
        // console.log('geticon')
        //console.log(this.props)
        if (this.props.column == this.props.externalSortColumn) {
            return (this.props.externalSortOrder == 'asc') ? <i className="fa fa-sort-alpha-asc"></i>  : <i className="fa fa-sort-alpha-desc"></i>
        }
    }

    isSortable() {
        const { column, renderProperties } = this.props
        const columnProperties = renderProperties.columnProperties[column]

        if(columnProperties && columnProperties.hasOwnProperty('sortable') && columnProperties.sortable === false) {
            return false
        }

        return true
    }


    render() {
        const style = this.props.styles.getStyle({
            styles: this.props.styles.inlineStyles,
            styleName: 'columnTitle',
        })
        const { className } = getStyleProperties(this.props, 'tableHeadingCell')
        const classNames = classnames(className, this.props.columnProperty ? this.props.columnProperty.headerCssClassName : null)
        const { sorted, styles } = this.props
        const clickEvent = this.isSortable() ? this._handleClick : null
        return (
      <th
        style={styles}
        key={this.props.column}
        onMouseOver={this._handleHover}
        onClick={clickEvent}
        className={classNames}
      >
        {this.props.customHeaderComponent ? <this.props.customHeaderComponent {...this.props} /> : this.props.title } { this.getSortIcon() }
      </th>)
    }

    _handleHover(e) {
        this.props.headingHover(this.props.column, e)
    }

    _handleClick(e) {
        // this.props.headingClick(this.props.column, e)
        var sortOrder = 'asc'
        if (this.props.column == this.props.externalSortColumn) {
            //if click on other column start with asc again
            //on click on own column, then do a switch of asc and desc
            if (this.props.externalSortOrder == 'asc' ){
                sortOrder = 'desc'
            }
        }

        this.props.changeSort(this.props.column, sortOrder)
    }
}

CustomTableHeadingCell.propTypes = {
    headingHover: React.PropTypes.func,
    headingClick: React.PropTypes.func,
    headerAlignment: React.PropTypes.oneOf(['left', 'right', 'center']),
    alignment: React.PropTypes.oneOf(['left', 'right', 'center']),
    sortAscending: React.PropTypes.bool,
    sorted: React.PropTypes.bool
}

export default CustomTableHeadingCell
