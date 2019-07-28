export default interface Mapping {
    path: string;
    method: string;
    callback: (req, res) => void;
    multipart: boolean;
}