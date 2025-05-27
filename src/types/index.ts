import { fields, operators } from "../components/RuleBuilder/constants";
export type LogicType = 'AND' | 'OR';

export interface Filter {
  id: string;
  type: 'filter';
  field: typeof fields[number];
  operator: typeof operators[number];
  value: string;
  disabled?: boolean;
}

export interface Group {
  id: string;
  type: 'group';
  name: string;
  logicType: LogicType;
  children: RuleItem[];
  locked?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
}

export type RuleItem = Group | Filter;

export interface RuleBuilderState {
  root: Group;
} 