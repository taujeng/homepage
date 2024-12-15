'use client'

import React, {useState} from 'react'
import './home.css'
import WidgetBase from './components/widget/widgetBase/WidgetBase';

export default function Home() {

  // State for widgets with their positions
  const [widgets, setWidgets] = useState([
    { id: 'a', row: 1, column: 1 },
    { id: 'b', row: 1, column: 2 },
  ]);

  const [draggingWidget, setDraggingWidget] = useState(null);

  // Total number of rows and columns
  const rows = 3;
  const columns = 3;

  // Function to check if a cell is occupied
  const isCellOccupied = (row, column) =>
    widgets.some((w) => w.row === row && w.column === column);

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
      {Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => {
          // Check if a widget exists in this cell
          const widget = widgets.find(
            (w) => w.row === rowIndex + 1 && w.column === colIndex + 1
          );

          // Highlight valid drop targets during drag
          const isDragging = !!draggingWidget;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${isDragging && !widget ? 'valid-drop' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, rowIndex + 1, colIndex + 1)}
            >
              {widget ? (
                <div
                  className="widget-wrapper"
                  draggable
                  onDragStart={(event) => handleDragStart(event, widget)}
                >
                  <WidgetBase content={widget.id} />
                </div>
              ) : (
                <div className="empty-placeholder">Drop Here</div>
              )}
            </div>
          );
        })
      )}

    </div>
  );
}
