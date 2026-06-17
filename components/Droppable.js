"use client";

/*
  A small wrapper that marks an area as a "drop zone" (somewhere you can
  drop a gift). It tells us when a gift is hovering over it (isOver) so we
  can highlight it. You won't usually need to edit this.
*/

import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ id, children, className = "", style }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className} style={style} data-over={isOver}>
      {typeof children === "function" ? children(isOver) : children}
    </div>
  );
}
