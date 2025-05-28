import React from "react";
import { Input } from "../../../common/input";
import { Button } from "../../../common/button";
import { Filter as FilterType } from "../../../../types";
import { fields, operators } from "../../constants";

interface FilterProps {
  filter: FilterType;
  onEdit: (filter: FilterType) => void;
  onDelete: () => void;
  disabled?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  filter,
  onEdit,
  onDelete,
  disabled,
}) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 my-1 p-2 rounded border ${
        disabled ? "bg-gray-100 opacity-60" : "bg-white"
      }`}
    >
      <select
        className="border rounded px-1 py-0.5"
        value={filter.field}
        onChange={(e) => onEdit({ ...filter, field: e.target.value })}
        disabled={disabled}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <select
        className="border rounded px-1 py-0.5"
        value={filter.operator}
        onChange={(e) =>
          onEdit({
            ...filter,
            operator: e.target.value,
          })
        }
        disabled={disabled}
      >
        {operators.map((operator) => (
          <option key={operator} value={operator}>
            {operator}
          </option>
        ))}
      </select>
      <Input
        className="px-1 py-0.5"
        value={filter.value}
        onChange={(e) => onEdit({ ...filter, value: e.target.value })}
        disabled={disabled}
      />
      <Button
        className="ml-2 text-red-500 hover:underline disabled:opacity-50 px-2 py-1"
        onClick={onDelete}
        disabled={disabled}
        title="Delete filter"
      >
        x
      </Button>
    </div>
  );
};

export default Filter;
