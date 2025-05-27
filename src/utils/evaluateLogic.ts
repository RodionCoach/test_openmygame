import { Group } from '../types';

export default function evaluateLogic(group: Group): boolean {
    if (group.disabled) return false;
    // Placeholder: always returns true for demo
    return true;
  } 