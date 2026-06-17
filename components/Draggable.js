"use client";

/*
  A small wrapper that makes anything draggable (works with mouse AND
  touch / mobile, thanks to the @dnd-kit library). You won't usually
  need to edit this.
*/

import { useDraggable } from "@dnd-kit/core";

export default function Draggable({ id, children, className = "", style }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={className}
      style={{
        ...style,
        // "touch-action: none" lets us drag on phones without the page scrolling
        touchAction: "none",
        opacity: isDragging ? 0 : 1, // hide original while the floating copy is shown
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
}
