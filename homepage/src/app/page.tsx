'use client'

import React, {useState, useEffect} from 'react'
import './home.css'
import WidgetBase from './components/widget/widgetBase/WidgetBase';

export default function Home() {

  // State for widgets with their positions
  const [widgets, setWidgets] = useState([
    { id: 'a', row: 0, column: 0, rowEnd: 0, colEnd: 0 },
    { id: 'b', row: 2, column: 2, rowEnd: 2, colEnd: 2 },
  ]);

  // useEffect(() => {
    // 3x3 2D Array
    const grid = Array(3).fill(null).map(() =>
      Array(3).fill(null)
    );

    widgets.forEach( (w) => {
      for (let r = w.row; r <= w.rowEnd; r++) {
        for (let c = w.column; c <= w.colEnd; c++) {
          if (r === w.row && c === w.column) {
            grid[r][c] = {...w, type: "main"}
          } else {
            grid[r][c] = {...w, type: "span"}
          }
        }
      }
    })
    console.table(grid)
  // },[])
  const [draggingWidget, setDraggingWidget] = useState(null);

  // const grid = [
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ]
  // widgets.map(item => {
  //   if (item.rowSpan > 1 || item.colSpan > 1) {
  //     for (let i = item.rowSpan - 1; i >= 0; i--) {
  //       for (let k = item.colSpan - 1; k >= 0; k--) {
  //         grid[i][k] = item.id
  //       }

  //     }
  //   } else {
  //     grid[item["row"] - 1][item["column"] - 1] = item.id
  //   }
  // })
  // console.table(grid);
  // Total number of rows and columns
  // const rows = 3;
  // const columns = 3;

  // Function to check if a cell is occupied
  // const isCellOccupied = (row, column) =>
  //   widgets.some((widget) => {
  //     const rowCheck = 
  //   });

  const handleDragStart = (event, widget) => {
    setDraggingWidget(widget);
    event.dataTransfer.setData('widgetId', widget.id);
  };

  const handleDrop = (event, row, column) => {
    event.preventDefault();
    if (!draggingWidget) return;

    // Prevent moving widget to an occupied cell
    if (isCellOccupied(row, column)) {
      return;
    }

    // Update widget position
    setWidgets((prevWidgets) =>
      prevWidgets.map((w) =>
        w.id === draggingWidget.id ? { ...w, row, column } : w
      )
    );

    setDraggingWidget(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div className="home-container">
    {grid.map((row, rowI) => 
      row.map((col, colI) => {
        const content = grid[rowI][colI] || null;
        return (
          <div
            key={`${rowI}-${colI}`}
            className="grid-cell"
            style={{
              gridRow: content?.type === "main" ? 
                `${content.row + 1} / ${content.rowEnd + 2}` 
                : "auto",
              gridColumn: content?.type === "main" ? 
                `${content.column + 1} / ${content.colEnd + 2}` 
                : "auto",
              backgroundColor: content?.type === "main" ? "aquamarine" : "red", // fixed typo: ; to ,
            }}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, rowI + 1, colI + 1)}
          >
            {content && content.type === "main" ? (
              <div
                className="widget-wrapper"
                draggable
                onDragStart={(event) => handleDragStart(event, content)}
              >
                <WidgetBase content={content} style={{
                  gridRow: `${content.row + 1} / ${content.rowEnd + 2}`,
                  gridColumn: `${content.column + 1} / ${content.colEnd + 2}`,
                }} />
              </div>
            ) : (
              <div className="empty-placeholder">Drop Here</div>
            )}
          </div>
        );
      })
    )}
  </div>
  )
  // return (
  //   <div className="home-container">
  //     {Array.from({ length: rows }, (_, rowIndex) =>
  //       Array.from({ length: columns }, (_, colIndex) => {
  //         // Check if a widget exists in this cell
  //         const widget = widgets.find(
  //           (w) => w.row === rowIndex + 1 && w.column === colIndex + 1
  //         );

  //         // Highlight valid drop targets during drag
  //         const isDragging = !!draggingWidget;

  //         return (
  //           <div
  //             key={`${rowIndex}-${colIndex}`}
  //             className={`grid-cell ${isDragging && !widget ? 'valid-drop' : ''}`}
  //             onDragOver={handleDragOver}
  //             onDrop={(event) => handleDrop(event, rowIndex + 1, colIndex + 1)}
  //           >
  //             {widget ? (
  //               <div
  //                 className="widget-wrapper"
  //                 draggable
  //                 onDragStart={(event) => handleDragStart(event, widget)}
  //               >
  //                 <WidgetBase content={widget.id} />
  //               </div>
  //             ) : (
  //               <div className="empty-placeholder">Drop Here</div>
  //             )}
  //           </div>
  //         );
  //       })
  //     )}

  //   </div>
  // );
}
