export default function multipartRequest() {
    return (target, value, descriptor) => {
        target.mappings[target.mappings.length - 1].multipart = true;
    };
}