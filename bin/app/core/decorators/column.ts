const replaceUnderscore = (s: string): string => {
    return s.replace("_", "");
};

export default function column(columnName: string) {
    return (target, value: string) => {
        target.constructor.columns.modelRow[replaceUnderscore(value)] = columnName;
        target.constructor.columns.rowModel[columnName] = replaceUnderscore(value);
    };
}