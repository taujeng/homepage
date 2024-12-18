import React from 'react'
import "./widgetBase.css"

const WidgetBase = ( {content, style} ) => {
  const {id, row, column} = content;
  return (
    <div className="widgetBase-container"
     style={style}>WidgetBase: ID: {id}, row: {row}, column: {column}</div>
  )
}

export default WidgetBase