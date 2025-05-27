import React, { useState } from "react";
import { Button } from "../common/button";
import { Group } from "./components/Group";
import { Group as GroupType } from "../../types";
import { initialRoot } from "./constants";

const RuleBuilder: React.FC = () => {
  const [root, setRoot] = useState<GroupType>(initialRoot);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rule Builder</h1>
        <Button
          className="bg-gray-200 p-2 flex items-center justify-center"
          onClick={() => setRoot({ ...initialRoot })}
          title="Reset"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582M19.418 19A9 9 0 106.582 6.582"
            />
          </svg>
        </Button>
      </div>
      <Group
        group={root}
        onChange={setRoot}
        onDelete={() => setRoot({ ...initialRoot })}
        isInitialGroup={root.children.length === 0}
      />
    </div>
  );
};

export default RuleBuilder;
