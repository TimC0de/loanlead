export default function put(path: string) {
    return (target, value, descriptor) => {
        target.mappings.push({
            method: "put",
            path,
            callback: descriptor.value,
            multipart: false,
        });

        return descriptor;
    };
}