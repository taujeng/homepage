'use client'

import React, {useState, useEffect} from 'react'
import './home.css'
import WidgetBase from './components/widget/widgetBase/WidgetBase';

export default function Home() {

  // State for widgets with their positions
  const [widgets, setWidgets] = useState([
    { id: 'a', row: 0, col: 0, rowEnd: 1, colEnd: 0 },
    { id: 'b', row: 2, col: 2, rowEnd: 2, colEnd: 2 },
  ]);
  const [grid, setGrid] = useState(Array(3).fill(null).map(() => 
    Array(3).fill(null)));

  useEffect(() => {
    // 3x3 2D Array
    const grid = Array(3).fill(null).map(() =>
      Array(3).fill(null)
    );

    widgets.forEach( (w) => {
      for (let r = w.row; r <= w.rowEnd; r++) {
        for (let c = w.col; c <= w.colEnd; c++) {
          if (r === w.row && c === w.col) {
            grid[r][c] = {...w, type: "main"}
          } else {
            grid[r][c] = {...w, type: "span"}
          }
        }
      }
    })
    console.table(grid)
    setGrid(grid);
  },[widgets])
  const [draggingWidget, setDraggingWidget] = useState(null);


  useEffect(() => {
    if (draggingWidget) {
      document.body.style.cursor = "grabbing";
    }

    return () => {
      document.body.style.cursor = "auto"
    }
  }, [draggingWidget])
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
  const isCellOccupied = (row, col) =>
    widgets.some(
      (widget) =>
        widget.row <= row && widget.rowEnd >= row &&
        widget.col <= col && widget.colEnd >= col
    );

  const handleDragStart = (event, widget) => {
    setDraggingWidget(widget);
    event.dataTransfer.setData('widgetId', widget.id);
  };
  const handleDragEnd = () => {
    setDraggingWidget(null); // Reset draggingWidget when the drag ends
  };

  const handleDrop = (event, row, col) => {
    event.preventDefault();
    if (!draggingWidget) return;
    console.log("made it here")

    const rowEnd = row + (draggingWidget.rowEnd - draggingWidget.row);
    const colEnd = col + (draggingWidget.colEnd - draggingWidget.col)

    // Prevent moving widget to an occupied cell
    if (isCellOccupied(row, col)) {
      console.log( "cell is already occupied!")
      return;
    }

    // Update widget position
    setWidgets((prevWidgets) =>
      prevWidgets.map((w) =>
        w.id === draggingWidget.id ? { ...w, row, col, rowEnd, colEnd } : w
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
                `${content.col + 1} / ${content.colEnd + 2}` 
                : "auto",
              backgroundColor: content?.type === "main" ? "aquamarine" : "red", // fixed typo: ; to ,
            }}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, rowI, colI)}
          >
            {content && content.type === "main" ? (
              <div
                className="widget-wrapper"
                draggable
                onDragStart={(event) => handleDragStart(event, content)}
                onDragEnd={handleDragEnd}
              >
                <WidgetBase content={content} style={{
                  gridRow: `${content.row + 1} / ${content.rowEnd + 2}`,
                  gridColumn: `${content.col + 1} / ${content.colEnd + 2}`,
                }} />
              </div>
            ) : (
              <div className="empty-placeholder"></div>
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
