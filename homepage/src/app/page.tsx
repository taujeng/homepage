'use client'

import React, {useState} from 'react'
import './home.css'
import WidgetBase from './components/widget/widgetBase/WidgetBase';

export default function Home() {

  const [list, setList] = useState([
    "a",
    "b",
  ])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null); // Track the currently dragged widget

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingIndex(index);
    event.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default to allow dropping
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    const dragIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    if (dragIndex === dropIndex) return; // Avoid unnecessary updates

    // Reorder the list
    const newList = [...list];
    const [draggedItem] = newList.splice(dragIndex, 1);
    newList.splice(dropIndex, 0, draggedItem);

    setList(newList);
  };
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add('widget-over');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('widget-over');
  };

  const handleDragEnd = () => {
    setDraggingIndex(null); // Clear dragging state
  };
  return (
    <div className="home-container">
      {list.map((item, index) => (
        <div
          key={index}
          draggable
          className={`widget-wrapper ${draggingIndex === index ? 'widget-dragging' : ''}`}
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event, index)}
          onDragEnter={(event) => handleDragEnter(event)}
          onDragLeave={(event) => handleDragLeave(event)}
          onDragEnd={handleDragEnd}
      >
        <WidgetBase 
         
         content={item} />
      </div>
      )
        
      )}

    </div>
  );
}
