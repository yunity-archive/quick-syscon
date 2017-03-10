import React from 'react'
import Tooltip from 'rc-tooltip'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import HelpMe from  '../../collections/HelpMe'

class CustomTooltipText extends React.Component{
    constructor(props) {
        super(props)
        this.setEditMode = this.setEditMode.bind(this)
        this.saveNewHelpTextToDB = this.saveNewHelpTextToDB.bind(this)
        this.onChangeHelpText = this.onChangeHelpText.bind(this)

        this.state = {
            helpText: '',
            editMode: false
        }
    }

    getHelpFromDB() {
        var self = this
        Meteor.subscribe('helpMe', this.props.tooltipname, {
            onReady: function () {
                if (HelpMe.find().fetch()[0] == undefined) {
                    HelpMe.insert({'name': self.props.tooltipname, 'text': 'Sie können diesen Hilfetext einfach über den Button bearbeiten!'})
                    self.setState( { helpText : 'Sie können diesen Hilfetext einfach über den Button bearbeiten!'})
                } else {
                    self.setState( { helpText : HelpMe.find().fetch()[0].text })
                }
                this.stop()
            },
            onError: function () { console.log('subscribe Error', arguments) }
        })
    }
    saveNewHelpTextToDB(){
        // console.log('TODO save new item to db')
        var self = this

        Meteor.subscribe('helpMe', this.props.tooltipname, {
            onReady: function () {
                // console.log(self.state.helpText)
                HelpMe.update(HelpMe.find().fetch()[0]._id, {$set: {'text': self.state.helpText }}, function(err,result){
                    // console.log(err)
                    // console.log(result)
                })
                self.setState( { editMode : false})
                this.stop()
            },
            onError: function () { console.log('subscribe Error', arguments) }
        })
    }
    setEditMode(){
        this.setState( { editMode : true})
    }
    onChangeHelpText(event){
        // console.log('onChangeHelpText')
        // console.log(event.target.value)
        this.setState({ helpText : event.target.value})
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.props.isVisible == false) {
            this.setState({ editMode : false})
        }
    }
    componentWillMount(){
        this.getHelpFromDB()
    }

    render() {
        return (
            <div>
                {this.state.editMode ?
                    (
                    <div>
                        <textarea
                        className="tooltipTextInput"
                        type="textarea"
                        defaultValue={this.state.helpText}
                        onChange={this.onChangeHelpText}
                        />
                    <button type="submit" className="btn btn-sm btn-primary btn-block"
                            onClick={this.saveNewHelpTextToDB}>
                            <i className="fa fa-cloud-upload button-icon-spacer-right"/>
                            Änderungen speichern
                        </button>
                    </div>
                    ):
                (
                    <div>{this.state.helpText}
                        <button type="edit" className="btn btn-sm btn-info m-l-sm"
                                onClick={this.setEditMode}>
                                <i className="fa fa-pencil"/>
                        </button></div>
                )
                }
        </div>
        )
    }
}
export class CustomTooltip extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
        this.onVisibleChange = this.onVisibleChange.bind(this)
    }
    onVisibleChange(visible) {
        this.setState({isVisible: visible})
        //console.log('tooltip', visible);
    }

    render() {
        return (
        <Tooltip
        {...this.props}
          placement="right"
          mouseEnterDelay={0}
          mouseLeaveDelay={0.1}
          trigger={['click']}
          onVisibleChange={this.onVisibleChange}
          transitionName="rc-tooltip-zoom"
          overlay={<CustomTooltipText tooltipname={this.props.name} isVisible={this.state.isVisible}/>}
        >
          <div className="customTooltip"><i className="fa fa-question-circle"></i></div>
        </Tooltip>
        )
    }
}
export class WizardTooltip extends React.Component{
    constructor(props) {
        super(props)
    }
    onVisibleChange(visible) {
        //console.log('tooltip', visible);
    }

    render() {
        return (
        <Tooltip
          placement="top"
          mouseEnterDelay={0.1}
          mouseLeaveDelay={0.3}
          trigger={['hover']}
          onVisibleChange={this.onVisibleChange}
          transitionName="rc-tooltip-zoom"
          overlay={<CustomTooltipText tooltipname={this.props.name}/>}
        >
          <a><label className="label">{this.props.number}</label></a>
        </Tooltip>
        )
    }
}
