import React, { useState, useEffect } from "react";
import { Input } from "../../../common/input";
import { Button } from "../../../common/button";
import { Modal } from "../../../common/modal";

interface ModalEditGroupProps {
  isOpen: boolean;
  initialName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}

const ModalEditGroup: React.FC<ModalEditGroupProps> = ({
  isOpen,
  initialName,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName, isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <h2 className="text-lg font-bold mb-4">Edit Group Name</h2>
      <Input
        className="w-full mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button className="bg-gray-200" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            onSave(name);
            onClose();
          }}
          disabled={!name.trim()}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEditGroup;
