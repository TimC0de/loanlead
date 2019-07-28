export default function controller(namespace: string) {
    return (constructor) => {
        constructor.prototype.controllerNamespace = namespace;
    };
}