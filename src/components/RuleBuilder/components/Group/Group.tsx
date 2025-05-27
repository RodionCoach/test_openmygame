import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext } from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "../../../common/button";
import {
  Group as GroupType,
  RuleItem,
  Filter as FilterType,
} from "../../../../types";
import { Filter } from "../Filter";
import { initialRoot, initialFilter } from "../../constants";
import ModalEditName from "../ModalEditName/ModalEditName";
import { SortableItem } from "../SortableItem";

interface GroupProps {
  group: GroupType;
  onChange: (group: GroupType) => void;
  onDelete: () => void;
  parentLocked?: boolean;
  parentDisabled?: boolean;
  isInitialGroup?: boolean;
}

const Group: React.FC<GroupProps> = ({
  group,
  onChange,
  onDelete,
  parentLocked,
  parentDisabled,
  isInitialGroup,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isLocked = group.locked || parentLocked;
  const isDisabled = group.disabled || parentDisabled;

  const handleAddFilter = () => {
    const newFilter: FilterType = {
      ...initialFilter,
      id: uuidv4(),
    };
    onChange({ ...group, children: [...group.children, newFilter] });
  };

  const handleAddGroup = () => {
    const newGroup: GroupType = {
      ...initialRoot,
      id: uuidv4(),
    };
    onChange({ ...group, children: [...group.children, newGroup] });
  };

  const handleChildChange = (index: number, item: RuleItem) => {
    const newChildren = [...group.children];
    newChildren[index] = item;
    onChange({ ...group, children: newChildren });
  };

  const handleChildDelete = (index: number) => {
    const newChildren = group.children.filter((_, i) => i !== index);
    onChange({ ...group, children: newChildren });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = group.children.findIndex(
        (child) => child.id === active.id
      );
      const overIndex = group.children.findIndex(
        (child) => child.id === over.id
      );
      onChange({
        ...group,
        children: arrayMove(group.children, activeIndex, overIndex),
      });
    }
  };

  return (
    <div
      className={`my-2 p-2 border rounded relative ${
        group.logicType === "AND"
          ? "border-blue-600 bg-blue-300"
          : "border-green-600 bg-green-300"
      } ${isDisabled ? "bg-gray-100 opacity-50" : ""}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Button
          className="font-bold underline px-2 py-1"
          onClick={() => setModalIsOpen(true)}
          disabled={isLocked || isDisabled}
        >
          {group.name}
        </Button>
        <Button
          className="ml-2 px-2 py-1 border border-red-400 text-red-600 bg-white"
          onClick={onDelete}
          disabled={isLocked || isDisabled || isInitialGroup}
        >
          x
        </Button>
        {isDisabled && (
          <span className="ml-2 text-xl text-gray-500">Draft</span>
        )}
        {isLocked && (
          <span className="ml-2 text-xl text-yellow-600">Locked</span>
        )}
      </div>
      {!group.collapsed && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="ml-4">
            <SortableContext
              items={group.children.map((child) => child.id)}
              strategy={verticalListSortingStrategy}
            >
              {group.children.map((child, index) => (
                <SortableItem key={child.id} id={child.id}>
                  {child.type === "group" ? (
                    <Group
                      group={child}
                      onChange={(item) => handleChildChange(index, item)}
                      onDelete={() => handleChildDelete(index)}
                      parentLocked={isLocked}
                      parentDisabled={isDisabled}
                    />
                  ) : (
                    <Filter
                      filter={child}
                      onEdit={(item) => handleChildChange(index, item)}
                      onDelete={() => handleChildDelete(index)}
                      disabled={isLocked || isDisabled}
                    />
                  )}
                </SortableItem>
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          className="px-2 py-1 border border-blue-400 text-blue-600 bg-white"
          onClick={() =>
            onChange({
              ...group,
              logicType: group.logicType === "AND" ? "OR" : "AND",
            })
          }
          disabled={isLocked || isDisabled || isInitialGroup}
        >
          {group.logicType}
        </Button>
        <Button
          className="px-2 py-1 border border-gray-400 text-gray-700 bg-white"
          onClick={() => onChange({ ...group, collapsed: !group.collapsed })}
          disabled={isLocked || isDisabled || isInitialGroup}
        >
          {group.collapsed ? "Expand" : "Collapse"}
        </Button>
        <Button
          className="px-2 py-1 border border-yellow-400 text-yellow-700 bg-white"
          onClick={() => onChange({ ...group, locked: !group.locked })}
          disabled={isDisabled || isInitialGroup}
        >
          {group.locked ? "Unlock" : "Lock"}
        </Button>
        <Button
          className="px-2 py-1 border border-gray-500 text-gray-700 bg-white"
          onClick={() => onChange({ ...group, disabled: !group.disabled })}
          disabled={isLocked || isInitialGroup}
        >
          {group.disabled ? "Enable" : "Disable"}
        </Button>
        <Button
          className="px-2 py-1 border border-blue-400 text-blue-600 bg-white"
          onClick={handleAddFilter}
          disabled={isLocked || isDisabled || group.collapsed}
        >
          Add Filter
        </Button>
        <Button
          className="px-2 py-1 border border-green-400 text-green-700 bg-white"
          onClick={handleAddGroup}
          disabled={isLocked || isDisabled || group.collapsed}
        >
          Add Group
        </Button>
      </div>
      <ModalEditName
        isOpen={modalIsOpen}
        initialName={group.name}
        onSave={(name) => onChange({ ...group, name })}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Group;
