interface Item { id: string; };

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
    return items.findIndex((it: T) => it.id === id);
};

const removeItemAt = <T>(items: T[], index: number) => [ ...items.slice(0, index), ...items.slice(index + 1) ];

const insertItemAt = <T>(items: T[], item: T, index: number) => [ ...items.slice(0, index), item, ...items.slice(index) ];

export const moveItem = <T>(items: T[], fromIndex: number, toIndex: number) => {
    const item = items[fromIndex];
    return insertItemAt(removeItemAt(items, fromIndex), item, toIndex);
};