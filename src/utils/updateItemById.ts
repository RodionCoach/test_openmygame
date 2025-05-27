import { RuleItem } from '../types';

export default function updateItemById(
    item: RuleItem,
    id: string,
    updater: (item: RuleItem) => RuleItem
  ): RuleItem {
    if (item.id === id) return updater(item);
    if (item.type === 'group') {
      return {
        ...item,
        children: item.children.map(child => updateItemById(child, id, updater)),
      };
    }
    return item;
  } 