export default function get(path: string) {
    return (target, value, descriptor) => {
        target.mappings.push({
            method: "get",
            path,
            callback: descriptor.value,
            multipart: false,
        });

        return descriptor;
    };
}