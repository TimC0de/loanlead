export default function post(path: string) {
    return (target, value, descriptor) => {
        target.mappings.push({
            method: "post",
            path,
            callback: descriptor.value,
        });

        return descriptor;
    };
}