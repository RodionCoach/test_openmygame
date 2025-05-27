import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../../common/button";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative mr-4">
      {children}
      <Button
        {...attributes}
        {...listeners}
        className="absolute right-0 top-0 bottom-0 w-4 my-1 mr-1 rounded-r bg-gray-400 hover:opacity-60 hover:cursor-move z-0"
      />
    </div>
  );
};

export default SortableItem;
