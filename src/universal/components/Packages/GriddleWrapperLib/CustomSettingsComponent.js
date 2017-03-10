import React from 'react'
import InputRange from 'react-input-range'


class CheckItem extends React.Component {
    constructor(props) {
        super(props)
        this.toggleColumns = this.toggleColumns.bind(this)

    }
    removeLockedColumns(column){
        //console.log('removeLockedColumns')
        var columnsToRemove = []

        var columnProperties = Object.values(this.props.renderProperties.columnProperties)
        for (var i = 0; i < columnProperties.length; i++) {
            if (columnProperties[i].locked){
                columnsToRemove.push(columnProperties[i].id)
            }
        }
        if (columnsToRemove.indexOf(column) >= 0 ) {
            //console.log(column)
            return true
        }

        return false
    }
    render() {
        if (this.removeLockedColumns(this.props.name)) {
            return null
        }else {
            return (
          <label onClick={this._handleClick} className={this.props.checked ? 'btn btn-sm btn-primary active m-r-xs' : 'btn btn-sm btn-default m-r-xs'}>
            <input type="checkbox" defaultChecked={this.props.checked} name={this.props.name} hidden/>
            {this.props.text}
          </label>)
        }

    }

    _handleClick = (event) => {
        event.preventDefault() // Let's stop this event.
        this.toggleColumns(this.props.name)
        //console.log(this.props.name)
        event.stopPropagation()
    }
    toggleColumns(name){
        console.log('toggle-Column: ' + name)
        var activeColumns = this.props.sortedColumns
        var index = activeColumns.indexOf(name)
        if (index < 0) {// no name col in array
            activeColumns.push(name)
            //console.log(activeColumns)
        }
        else  { // yes we already have this column -> remove it
            activeColumns.splice(index,1)
        }
        //console.log(activeColumns)
        this.props.storeSortedColumns(activeColumns, this.props.renderProperties.columnProperties)
        //console.log(this.props)
        this.props.updateSettings()
    }
}

CheckItem.propTypes = {
    storeSortedColumns: React.PropTypes.func.isRequired,
    updateSettings:  React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.Number
    ]),
    text: React.PropTypes.string
}


class CustomSettingsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: parseInt(this.props.resultsPerPage),
            updateKey: Math.random()
        }
        this.updateSettings = this.updateSettings.bind(this)
    }
    componentWillUpdate(){
        //console.log('willupdate settings')
    }
    updateSettings(){
        //console.log('updateSettings')
        this.setState({ updateKey: Math.random() })
    }
    shouldComponentUpdate(nextProps){
        return true
    }
    handleValueChange(component, value) {
        this.setState({
            value: value
        })
    }
    handleChangeCompleted(component, value) {
        // console.log('handleChangeCompleted')
        // console.log(value)
        this.props.changeResultsPerPage(value)

    }

    render() {
        let keys = this.props.sortedColumns
        let allColumns = this.props.columns
        var columns = allColumns.map(column =>
      <CheckItem
         {...this.props}
        updateSettings={this.updateSettings}
        key={column}
        name={column}
        text={this._getDisplayName(column)}
        checked={keys.indexOf(column) > -1} />)

        return (
        <div key={this.state.updateKey} className="griddle-settings clear">
        <div className="col-md-9">
            <span className="label-primary block p-xs">Spalteneinstellungen: Hier können Sie Spalten aktivieren oder deaktivieren, die Einstellungen werden bei der nächsten Suche übernommen.</span>
            <div className="griddle-columns m-t-xs">
                {columns}
            </div>

        </div>
        <div className="col-md-3 m-b-lg">
            <span className="label-info block p-xs">Direkte Suchtreffer zzgl. verknüpfter Kontakte</span>
        <InputRange
       maxValue={100}
       minValue={1}
       value={this.state.value}
       onChange={this.handleValueChange.bind(this)}
       onChangeComplete={this.handleChangeCompleted.bind(this)}
     />
      </div>
      </div>
        )
    }

    _getDisplayName = (column) => {
        const { renderProperties } = this.props
        if(renderProperties.columnProperties.hasOwnProperty(column)) {
            return renderProperties.columnProperties[column].hasOwnProperty('displayName') ?
        renderProperties.columnProperties[column].displayName :
        column
        } else if (renderProperties.hiddenColumnProperties.hasOwnProperty(column)) {
            return renderProperties.hiddenColumnProperties[column].hasOwnProperty('displayName') ?
        renderProperties.hiddenColumnProperties[column].displayName :
        column
        }

        return column
    }
}

CustomSettingsComponent.propTypes = {
    allColumns: React.PropTypes.arrayOf(React.PropTypes.string),
    visibleColumns: React.PropTypes.arrayOf(React.PropTypes.node)
}

export default CustomSettingsComponent
