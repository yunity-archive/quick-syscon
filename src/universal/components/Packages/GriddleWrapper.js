import React from 'react'
import { GriddleRedux } from 'griddle-connector'
import { Griddle , DefaultModules } from 'griddle-render'
import extend  from 'lodash.assign'
import CustomPaginationComponent from './GriddleWrapperLib/CustomPaginationComponent'
import CustomFilterComponent from './GriddleWrapperLib/CustomFilterComponent'
import CustomLoadingComponent from './GriddleWrapperLib/CustomLoadingComponent'
import CustomNoResultsComponent from './GriddleWrapperLib/CustomNoResultsComponent'
import CustomSettingsToggle from './GriddleWrapperLib/CustomSettingsToggle'
import CustomSettingsComponent from './GriddleWrapperLib/CustomSettingsComponent'
import CustomTableHeading from './GriddleWrapperLib/CustomTableHeading'
import CustomTableHeadingCell from './GriddleWrapperLib/CustomTableHeadingCell'
import CustomTableComponent from './GriddleWrapperLib/CustomTableComponent'
import CustomTableBodyComponent from './GriddleWrapperLib/CustomTableBodyComponent'
import CustomColumnComponent from './GriddleWrapperLib/CustomColumnComponent'
import CustomColumnDefinition from './GriddleWrapperLib/CustomColumnDefinition'
import CustomRowComponent from './GriddleWrapperLib/CustomRowComponent'
import CustomRowDefinition from './GriddleWrapperLib/CustomRowDefinition'

class GriddleWrapper extends React.Component {
    constructor(props) {
        super(props)

        this.component = GriddleRedux({
            Griddle,
            Components: extend({}, DefaultModules, this.props.components),
            Plugins: this.props.plugins
        })
    }
    render () {
        var griddleSettings = {
            useGriddleStyles: false,
            noDataMessage:'Kein entsprechender Datensatz gefunden.',
            filterPlaceholderText:'Suchwörter',
        }
        //console.log(this.props)
        //const allProps = this.props
        return (
        <this.component
            {...this.props}
            settings={griddleSettings}
            components={{SettingsToggle: CustomSettingsToggle, Settings: CustomSettingsComponent, Filter: CustomFilterComponent, Pagination: CustomPaginationComponent, Row: CustomRowComponent, RowDefinition: CustomRowDefinition, TableBody: CustomTableBodyComponent, Column: CustomColumnComponent, ColumnDefinition: CustomColumnDefinition, TableHeading: CustomTableHeading, TableHeadingCell: CustomTableHeadingCell, Table: CustomTableComponent, Loading: CustomLoadingComponent, NoResults: CustomNoResultsComponent}}>
            {this.props.children}
        </this.component>
        )
    }
}

export default GriddleWrapper
