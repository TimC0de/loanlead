export default function del(path: string) {
    return (target, value, descriptor) => {
        target.mappings.push({
            method: "delete",
            path,
            callback: descriptor.value,
            multipart: false,
        });

        return descriptor;
    };
}