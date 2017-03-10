import React from 'react'

class CustomSettingsToggle extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.state.toggled = false

        this._handleButton = this._handleButton.bind(this)
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div className="m-t-xs">
            <button className={'btn btn-default btn-sm btn-outline button-icon-spacer btn-block'} onClick={this._handleButton}>    <i className="fa fa-cog button-icon-spacer"></i>Einstellungen</button>
        </div>
        )
    }

  //this should keep track locally if it's toggled
  //and just send whether or not settings should be shown
    _handleButton() {
        const toggled = !this.state.toggled
        this.props.showSettings(toggled)
        this.setState({toggled: toggled})
    }
}

export default CustomSettingsToggle
