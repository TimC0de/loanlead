class Role {
    private _id?: number;
    private _name?: string;
    private _displayName?: string;
    private _sendSms?: boolean;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get displayName(): string {
        return this._displayName;
    }

    set displayName(value: string) {
        this._displayName = value;
    }

    get sendSms(): boolean {
        return this._sendSms;
    }

    set sendSms(value: boolean) {
        this._sendSms = value;
    }
}

export default Role;
