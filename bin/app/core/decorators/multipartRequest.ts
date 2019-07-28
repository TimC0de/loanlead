export default function multipart(target, value, descriptor) {
    target.mappings[target.mappings.length - 1].multipart = true;
}