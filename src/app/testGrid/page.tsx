'use client'

import React, {useState} from 'react'
import './testGrid.css'

const testGrid = () => {
  const [grid, setGrid] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  return (
    <div className="grid">
      <div className="widget a" >as</div>
      <div className="widget a">asdf</div>
      <div className="widget a">asdf</div>
      <div className="widget">asdf</div>

    </div>
  )
}

export default testGrid