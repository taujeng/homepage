import React from 'react'
import "./widgetBase.css"

const WidgetBase = ( {content, style} ) => {
  const {id, row, col, rowEnd, colEnd} = content;
  console.log(content)
  return (
    <div className="widgetBase-container"
     style={style}>
      <div className="">
      ID: {id}, row: {row}, column: {col}
        </div>
        <div className="">
            endRow: {rowEnd}      endColumn: {colEnd}
        </div>
    </div>
  )
}

export default WidgetBase