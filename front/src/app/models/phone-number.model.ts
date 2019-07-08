class PhoneNumber {
    private _id?: number;
    private _firstPhoneNumber?: string;
    private _secondPhoneNumber?: string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get firstPhoneNumber(): string {
        return this._firstPhoneNumber;
    }

    set firstPhoneNumber(value: string) {
        this._firstPhoneNumber = value;
    }

    get secondPhoneNumber(): string {
        return this._secondPhoneNumber;
    }

    set secondPhoneNumber(value: string) {
        this._secondPhoneNumber = value;
    }
}

export default PhoneNumber;
