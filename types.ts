// Types for RuleBuilder
export type LogicType = 'AND' | 'OR';

export interface Filter {
  id: string;
  type: 'filter';
  field: string;
  operator: 'equals' | 'not equals' | 'is after' | 'is before';
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