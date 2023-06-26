import {CustomerController} from "./CustomerController.js";
import {ProductController} from "./ProductController.js";
import {OrderController} from "./OrderController.js";
import {Order} from "../model/Order.js";

export class PlaceOrderController {

    constructor() {
        this.customerController = new CustomerController();
        this.productController = new ProductController();
        this.orderController= new OrderController();
        $('#PO_CusId').on('keyup', (e) => {
            if (e.keyCode === 13) {
                const customer =
                    this.customerController.customers[this.customerController.findIndexFromCustomerId
                    (e.target.value)];
                $('#PO_CusName').val(customer._name);
            }
        });
        $('#pOproductIdTxt').on('keyup', (e) => {
            if (e.keyCode === 13) {
                const product =
                    this.productController.products[this.productController.findIndexByProductId
                    (e.target.value)];
                $('#pOdescTxt').val(product._desc);
                $('#pOPriceTxt').val(product._price);
                $('#pOqtyOnHandTxt').val(product._qtyOnHand);
            }
        });

        $('#discountTxt').on('input', (e) => {
            const totalPrice = Number($('#totalPriceTxt').text());
            const discount = Number($('#discountTxt').val());
            console.log(totalPrice, discount);

            if (discount > 0 && discount < 100) {
                const discountAmount = (totalPrice / 100) * discount;
                console.log(discountAmount);
                const subTotal = totalPrice - discountAmount;
                console.log(subTotal);
                $('#subTotal').text(subTotal.toFixed(2));
            } else {
                $('#subTotal').text("Enter a number greater than 0% and less than 100%");
            }
        });



        $('#addToCartBtn').on('click', this.addToCart.bind(this));
        $('#placeOrderBtn').on('click',this.handlePlaceOrder.bind(this));

        //        Create bucket to store shopping cart
        this.shoppingCart = [];
    }

    addToCart() {
        const productIndex = this.productController.findIndexByProductId($('#pOproductIdTxt').val());
        const foundedObj= this.shoppingCart.find((e)=> e.product === $('#pOproductIdTxt').val());
        console.log($('#pOproductIdTxt').val());
        console.log($('#pOqtyTxt').val());
        console.log(this.shoppingCart);
        if (foundedObj){
            let index= this.shoppingCart.findIndex((e)=> e.product === $('#pOproductIdTxt').val());
            console.log("qty is "+this.shoppingCart[index].qty);
            this.shoppingCart[index].qty = Number($('#pOqtyTxt').val());
            // this.shoppingCart[index].qty=Number($('#pOqtyTxt').val());
        }else {
            this.shoppingCart.push({
                "product": this.productController.products[productIndex]._pId,
                "qty": Number($('#pOqtyTxt').val())
            });
        }
        this.displayCart();
    }

    deleteFromCart(index) {
        console.log("Request to delete "+index+" , "+this.shoppingCart[index]);
        let slice  = this.shoppingCart.splice(index, 1);
        console.log("Slice "+slice);
        console.log(this.shoppingCart);
        this.displayCart();
    }

    displayCart() {
        let unitPrice= 0; // row price
        let totalPrice= 0;
        $('#shoppingCartTbl').empty();

        this.shoppingCart.map((result, index) => {

            const removeFromCartBtn = $('<div class="btn btn-danger">remove</div>');
            removeFromCartBtn.on('click', () => {
                this.deleteFromCart(index);
            });
            let arrIndex= Number(this.productController.findIndexByProductId(result.product).toFixed(2));
            unitPrice= this.productController.products[arrIndex]._price * result.qty
            totalPrice+=unitPrice;
            let no = index + 1;
            $('#shoppingCartTbl').append(
                $('<tr>').append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(this.productController.products[arrIndex]._desc),
                    $('<td>').text(result.qty),
                    $('<td>').text(unitPrice),
                    $('<td>').append(removeFromCartBtn)
                )
            );
            $('#totalPriceTxt').text(totalPrice);
            $('#subTotal').text(totalPrice);
        });
    }

    handlePlaceOrder(){
        const orderId = $('#PO_OrderId').val();
        const customrId= $('#PO_CusId').val();
        const discount= $('#discountTxt').val();
        const tot= $('#totalPriceTxt').text();
        this.orderController.saveOrder(new Order(
            orderId,customrId,this.shoppingCart,discount,tot
        ));
        this.shoppingCart.map((result,index)=>{
            let obj= this.productController.products[this.productController.
            findIndexByProductId(result.product)];
            obj._qtyOnHand= obj._qtyOnHand-result.qty;
            console.log("Updateble obj is ",obj);
            this.productController.updateProductQty(result);
        });
        console.log(this.orderController.orders);
    }
}


const placeOrderController = new PlaceOrderController();

/*
  check qty user enter and is it uneven , show error message.
* create array to store cart.
* store object on array like {product:productId, qty:qty}
*
* */