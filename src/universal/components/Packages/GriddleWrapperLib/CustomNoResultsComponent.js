import React from 'react'

class CustomNoResultsComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props.resultsCount)
        // console.log(this.props.emptySearch)
        return (
            <div>
                {this.props.resultsCount == 0 && this.props.emptySearch ? ( null ) : (
                    <div className="m-b-lg">
                    <h4 className="center-block bg-info p-xs">Leider kein entsprechender Datensatz gefunden.</h4>
                    <span className="p-lg m-b-lg col-xs-12"></span>
                    <span className="p-lg m-b-lg col-xs-12"></span>
                    </div>
                )}
            </div>
        )
    }
}

export default CustomNoResultsComponent
