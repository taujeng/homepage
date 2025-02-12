import React from 'react'
import "./widgetBase.css"

const WidgetBase = ( {content, style} ) => {
  const {widget, id, row, col, rowEnd, colEnd} = content;
  return (
    <div className="widgetBase-container"
     style={style}>
      {widget}
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