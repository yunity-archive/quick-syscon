import React from 'react'
import { _ } from 'meteor/underscore'


class CustomTableBodyComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isExpanded: [[],[]],
            updateKey: Math.random()
        }
        this.toggleChildren = this.toggleChildren.bind(this)
    }
    // shouldComponentUpdate(nextProps, nextState) {
    // }
    // componentDidUpdate(){
    // }
    toggleChildren(mainKey, depth) {
        // console.log(this.state.isExpanded)
        //console.log('toggle children function')
        // expandedobj 1.level isExpanded[0], etc..
        // 1. if click on parent level open children or close parent
        var isExpanded = this.state.isExpanded
        if (depth == 0) {
            //if close first level
            if (isExpanded[0] == mainKey) {
                this.setState({ isExpanded: [[],[]]})
                //console.log('collapse')
            } else {
                //set the mainkey to first level
                isExpanded[0] = mainKey
                this.setState({ isExpanded: isExpanded})
                //console.log('expand')
            }
        } else if (depth == 1) {
            //key is the clicked row
            if (isExpanded[1] == mainKey) {
                // only close child level
                isExpanded[1] = []
                this.setState({ isExpanded: isExpanded})
                //console.log('collapse')
            } else {
                //set the mainkey to second level
                isExpanded[1] = mainKey
                this.setState({ isExpanded: isExpanded})
                //console.log('expand')
            }
        }
    }
    isExpanded(data) {
        var isExpanded = this.state.isExpanded
        // console.log('mainkey: ' +data.mainKey)
        // console.log('isExpanded: ' +isExpanded[data.depthLevel])
        // //function if additional children rows should be rendered
        if (data.mainKey == isExpanded[data.depthLevel]) {
            // console.log('true')
            return true
        } else {
            // console.log('false')
            return false
        }
    }
    getRows(rowData) {
        return rowData
        .filter(data => data.visible === undefined || data.visible === true)
        .map((data, index) =>
          this.getRow(data, index)
        )

    }

    getRow(data, index) {
        //console.log(index)
        //console.log(data.mainKey)
        //console.log(isChild);
        // console.log(data.depthLevel)
        let rows = [
            <this.props.components.Row
                {...this.props}
        sortedColumns={this.props.sortedColumns}
        rowData={data}
        isExpanded={this.isExpanded(data)}
        depthLevel={data.depthLevel}
        toggleChildren={this.toggleChildren}
          absoluteRowIndex={data.mainKey}
          key={data.mainKey}
          griddleKey={data.griddleKey}
          components={this.props.components}
          events={this.props.events}
          rowIndex={data.mainKey}
          styles={this.props.styles}
          rowProperties={this.props.renderProperties.rowProperties}
          settings={this.props.settings}
          tableProperties={this.props.tableProperties}
          ignoredColumns={this.props.renderProperties.ignoredColumns}
          columnProperties={this.props.renderProperties.columnProperties}
          />
        ]
        if (data.children && data.children.length > 0 && data.depthLevel == 0 && this.isExpanded(data)) {
            rows.push(this.getRows(data.children))
        }
        if (data.children && data.children.length > 0 && data.depthLevel == 1 && this.isExpanded(data)) {
            //if expanded check to add
            rows.push(this.getRows(data.children))
        }
        if (data.children && data.children.length > 0 && data.depthLevel == 2 && this.isExpanded(data)) {
            //maybe later add 4th level
            // rows.push(this.getRows(data.children))
        }
        // if(data.children && data.children.length > 0 && (this.isExpanded(data))) {
        //     rows.push(this.getRows(data.children))
        // }
        return rows
    }


    render() {
        // console.log('loading?')
        var loadingSpinner = this.props.updateContactsFlag
        // console.log(loadingSpinner)
        const { data, components, settings, events } = this.props
        const rows = this.getRows(this.props.state.data)

        return (
            <tbody key={this.state.updateKey} className={'tbody'}>
                {loadingSpinner ? (
                    <components.Loading components={components} settings={settings} events={events} />
                ) : (
                rows
                )
                }
            </tbody>
        )
    }
}

export default CustomTableBodyComponent
