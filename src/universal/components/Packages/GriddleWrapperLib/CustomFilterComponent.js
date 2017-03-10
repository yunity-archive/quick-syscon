import React from 'react'

class CustomFilterComponent extends React.Component {
    constructor(props, context) {
        super(props, context)

        this._handleChange = this._handleChange.bind(this)
    }

    shouldComponentUpdate(props) {
        return false
    }

    render() {
        return (<div></div>)
    }

    _handleChange = (e) => {
    //TODO: debounce this
        this.props.events.setFilter(e.target.value)
    }
}

CustomFilterComponent.propTypes = {
    setFilter: React.PropTypes.func
}

export default CustomFilterComponent

//
// return (
//   <input
//     type="text"
//     name="filter"
//     placeholder="filter"
//     onChange={this._handleChange} />
// );
