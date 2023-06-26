export class Customer {
    constructor(id, name, email) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    // Getters and setters
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }
}
