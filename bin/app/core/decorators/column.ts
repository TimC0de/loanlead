export default function column(columnName: string) {
    return (target, value: string) => {
        console.log(target.constructor);

        target.columns.set(value, columnName);
    };
}