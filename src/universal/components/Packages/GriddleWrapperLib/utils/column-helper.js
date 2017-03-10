'use strict'
export const flatten = function(arr, result = []) {
    for (let i = 0, length = arr.length; i < length; i++) {
        const value = arr[i]
        if (Array.isArray(value)) {
            for (let i = 0, length = value.length; i < length; i++) {
                const value2 = value[i]
                if (Array.isArray(value2)) {
                    flatten(value2, result)
                } else {
                    result.push(value2)
                }
            }
        } else {
            result.push(value)
        }
    }
    return result
}




//TODO: Why is this even used?
//      Could probalby set something up in the reducers to send the visible columns based on the properties.
//      At the very least, make the signature (column, { columnProperties, ignoredColumns })
const ColumnHelper = {
    isColumnVisible(column, {columnProperties, ignoredColumns}) {
        if(!ignoredColumns) { return true }
        return !(ignoredColumns.indexOf(column) >= 0)
    },

  //TODO: Not sure I like this method
  //      It seems like it could go elsewhere

  //This gets one column property object from the global property object
    getColumnPropertyObject(columnProperties, columnName) {
        return columnProperties.hasOwnProperty(columnName) ?
      columnProperties[columnName] :
      null
    },
    getColumns(columnProperties) {
        //get all columns from definition here
        if(columnProperties) {
            return Object.keys(columnProperties).sort((first, second) => {
                const firstColumn = columnProperties[first]
                const secondColumn = columnProperties[second]
        //deal with columns without order properties
                if(!firstColumn['order'] && !secondColumn['order']) { return 0 }
                if(firstColumn['order'] && !secondColumn['order']) { return -1 }
                if(!firstColumn['order'] && secondColumn['order']) { return 1 }

        //order the columns if they both have an order property
                return (firstColumn['order']) - (secondColumn['order'])
            })
        }
        return []
    },
    filterColumns(activeColumns, columnProperties){
        //console.log('filtercolumns')
        var columns = this.getColumns(columnProperties)
        //console.log(activeColumns)
        var sortedColumns = this.getColumns(columnProperties)

        for (var i = 0; i < activeColumns.length; i++) {
            var index = columns.indexOf(activeColumns[i])
            columns.splice(index, 1)
        }

        if (columns.length > 0){
            for (var i = 0; i < columns.length; i++) {
                var index = sortedColumns.indexOf(columns[i])
                sortedColumns.splice(index, 1)
            }
        }

        //console.log(sortedColumns)
        return sortedColumns
    }
}

export default ColumnHelper
