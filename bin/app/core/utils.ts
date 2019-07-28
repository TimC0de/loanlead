export default class Utils {
    public static toCamelCase(s: string): string {
        return s.replace(/_[a-z]/g, (c: string): string => c.slice(1).toUpperCase());
    }

    public static toSnakeCase(s: string): string {
        return s.replace(/[A-Z]/g, (c: string): string => `_${c.toLowerCase()}`);
    }

    public static replaceUnderscore(s: string): string {
        return s.replace(/^_w+/, (c: string): string => c.slice(1));
    }

    public static capitaliseString(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}