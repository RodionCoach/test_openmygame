import { Group as GroupType, Filter as FilterType } from "../../types";

const initialRoot: GroupType = {
    id: "root",
    type: "group",
    name: "Root Group",
    logicType: "AND",
    children: [],
    locked: false,
    disabled: false,
  };
  
  const initialFilter: FilterType = {
    id: "filter",
    type: "filter",
    field: "gender",
    operator: "equals",
    value: "",
  };

const fields = ["gender", "birth_date", "channel"];
const operators = ["equals", "not equals", "is after", "is before"];

  export { initialRoot, initialFilter, fields, operators };