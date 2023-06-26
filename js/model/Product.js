export class Product {
    constructor(pId, desc, price, qty) {
        this._pId = pId;
        this._desc = desc;
        this._price=price;
        this._qtyOnHand = qty;
    }

    get pId() {
        return this._pId;
    }

    set pId(value) {
        this._pId = value;
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }

    get price(){
        return this.price;
    }

    set price(price){
        this._price=price;
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    set qtyOnHand(value) {
        this._qtyOnHand = value;
    }
}
