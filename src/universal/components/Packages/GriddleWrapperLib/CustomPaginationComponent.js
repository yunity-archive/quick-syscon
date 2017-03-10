import React from 'react'


export default class CustomPaginationComponent extends React.Component{
    constructor(props, context) {
        super(props, context)
        this.pageChange = this.pageChange.bind(this)
        this.handleClickPagesCount = this.handleClickPagesCount.bind(this)
        this.handleClickPrevious = this.handleClickPrevious.bind(this)
        this.handleClickNext = this.handleClickNext.bind(this)
        this.handleClickFirst = this.handleClickFirst.bind(this)
        this.handleClickLast = this.handleClickLast.bind(this)
    }
    pageChange(pagenumber){
        this.props.updateSearch(pagenumber)
    }
    handleClickPagesCount(event){
        this.pageChange(parseInt(event.target.getAttribute('data-value')))
        event.stopPropagation()
    }
    handleClickPrevious(event){
        //go to previous page
        this.pageChange(this.props.currentPage - 1)
        event.stopPropagation()
    }
    handleClickFirst(event){
        //go to first page
        this.pageChange(0)
        event.stopPropagation()
    }
    handleClickNext(event){
        //go to last page
        if(this.props.currentPage != (this.props.maxPages -1)){
            this.pageChange(this.props.currentPage + 1)
        }
        event.stopPropagation()
    }
    handleClickLast(event){
        //go to last page
        this.pageChange(this.props.maxPages - 1)
        event.stopPropagation()
    }
    render(){
        var previous = ''
        var next = ''
        var gotofirst = ''
        var gotolast = ''

        if(this.props.currentPage > 0){
            previous = <span onClick={this.handleClickPrevious} className="griddle-previous-button btn btn-sm btn-default"><i className="glyphicon glyphicon-arrow-left griddle-button-icon-spacer"></i>Vorherige Seite</span>
            gotofirst = <span onClick={this.handleClickFirst} className="griddle-previous-button btn btn-sm btn-default">Erste Seite</span>
        }

        if((this.props.currentPage != (this.props.maxPages -1)) && (this.props.maxPages != 0)) {
            gotolast = <span onClick={this.handleClickLast} className="griddle-next-button btn btn-sm btn-default">Seite {this.props.maxPages}</span>
            next = <span onClick={this.handleClickNext} className="griddle-next-button btn btn-sm btn-default">Nächste Seite<i className="glyphicon glyphicon-arrow-right griddle-button-icon-spacer"></i></span>
        }

        var options = []

        var startIndex = Math.max(this.props.currentPage - 5, 0)
        var endIndex = Math.min(startIndex + 11, this.props.maxPages)

        if (this.props.maxPages >= 11 && (endIndex - startIndex) <= 10) {
            startIndex = endIndex - 11
        }

        for(var i = startIndex; i < endIndex ; i++){
            var selected = this.props.currentPage == i ? 'current-page-selected btn btn-sm btn-default' : 'btn btn-sm btn-default'
            options.push(<button key={'griddle-page-numbers-' + i} className={selected} data-value={i} onClick={this.handleClickPagesCount}>{i + 1}</button>)
        }

        return (
            <div className="custom-pager">
                <div className="col-xs-4">{gotofirst}{previous}</div>
                <div className="col-xs-4 griddle-page-numbers">
                    {options}
                </div>
                <div className="col-xs-4 right">{gotolast}{next}</div>
            </div>
        )
    }
}
