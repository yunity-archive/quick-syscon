import React from 'react'
import ColumnHelper from './utils/column-helper'
import { _ } from 'meteor/underscore'

class CustomTableComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            updateKey: Math.random()

        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if (_.isEqual(this.props.searchTime, nextProps.searchTime) === false) {
            // console.log('update-customtablecomponent')
            this.setState({ updateKey: Math.random() })
            return true
        }
        if (_.isEqual(this.state.data, nextState.data) === false) {
            //console.log('update-ContactsGriddle')
            this.setState({ updateKey: Math.random() })
            return true
        }
        return false
    }
    componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate(nextProps){

    }
    getTableBodySection() {
        //console.log(sortedColumns)
        // console.log('tablebody - gets data')
        // console.log(this.props.data)
        if(this.props.resultsCount == 0) {
            return (
        <tbody>
          <tr>
            <td>
              <this.props.components.NoResults
                components={this.props.components}
                settings={this.props.settings}
                events={this.props.events} />
            </td>
          </tr>
        </tbody>
            )
        } else{
            return <this.props.components.TableBody
                    {...this.props} />
        }
    }


    getTableHeaderSection() {
        return <this.props.components.TableHeading
                columnProperties={this.props.renderProperties.columnProperties}
                {...this.props} />
    }

    render() {
        // console.log('render TableComponent')
    //translate the definition object to props for Heading / Body
        return (
    <div key={this.state.updateKey} className={'griddle'}>
      <table>
        { this.getTableHeaderSection() }
        { this.getTableBodySection() }
      </table>
  </div>

        )
    }
}

export default CustomTableComponent
