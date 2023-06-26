import {Product} from "../model/Product.js";


export class ProductController {
    constructor() {
        this.products = this.getProductsFromLocalStorage() || [];

        $("#AddProduct").on('click', this.handleSaveProduct.bind(this));

        $("#UpdateProductBtn").on('click', this.handleUpdateProduct.bind(this));

        $('#productSearch').on('keyup', (e) => {
            this.findProducts(e.target.value);
        });

        this.initProductTbl(this.products);

    }

    saveProduct(product) {
        console.log(product);
        if (this.findIndexByProductId(product._pId) === -1) {
            console.log(product);
            this.products.push(product);
            this.storeProductsOnLocalStorage();
            this.initProductTbl(this.products);
        } else {
            alert('product id repeated...');
        }
    }

    updateProduct(product) {
        // Find the index of the updatable customer
        const index = this.findIndexByProductId(product._pId);
        if (index !== -1) { // Check if the customer exists
            this.products[index] = product;
            this.storeProductsOnLocalStorage();
            this.initProductTbl(this.products);
        } else {
            alert('Wrong Product ID!');
        }
    }


    updateProductQty(product) {
        const index= this.findIndexByProductId(product._pId);
        this.products[index]=product;
    }



    deleteProduct(productId) {
        console.log(productId);
        this.products.splice(productId, 1);
        this.storeProductsOnLocalStorage();
        this.initProductTbl(this.products);
    }

    findProducts(searchString) {
        $('#ProductTbl').empty();
        if (!this.products) {
            return;
        }
        this.products.map((result, index) => {
            if (
                result._desc.toLowerCase().includes(searchString.toLowerCase()) ||
                result._pId.toLowerCase().includes(searchString.toLowerCase())
            ) {
                const tr = $('<tr>').on('click', () => {
                    console.log('Click on table row');
                    this.setDataToTxt(result);
                });
                const deleteButton = $('<div class="btn btn-danger">delete</div>');
                deleteButton.on('click', () => {
                    this.deleteProduct(index);
                });
                let no = index + 1;
                $('#ProductTbl').append(
                    tr.append(
                        $('<th scope="row">').text(no),
                        $('<td>').text(result._pId),
                        $('<td>').text(result._desc),
                        $('<td>').text(result._price),
                        $('<td>').text(result._qtyOnHand),
                        $('<td>').append(deleteButton)
                    )
                );

            }

        });
    }

    storeProductsOnLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    findIndexByProductId(productId) {
        return this.products.findIndex((product) => productId === product._pId);
    }

    getProductsFromLocalStorage() {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : null;
    }

    handleSaveProduct() {
        console.log('handler calling...');
        const pId = $("#PIdTxt").val().trim();
        const pDesc = $("#PDescTxt").val().trim();
        const qty = $("#PQtyTxt").val().trim();
        const price = $("#PUnitPriceTxt").val().trim();
        this.saveProduct(new Product(pId, pDesc,price, qty));
    }

    handleUpdateProduct() {
        console.log('handler calling...');
        const pId = $("#PIdTxt").val().trim();
        const pDesc = $("#PDescTxt").val().trim();
        const qty = $("#PQtyTxt").val().trim();
        const price = $("#PUnitPriceTxt").val().trim();
        this.updateProduct(new Product(pId, pDesc, price, qty));
    }


    setDataToTxt(product) {
        console.log(product);
        $("#PIdTxt").val(product._pId);
        $("#PDescTxt").val(product._desc);
        $("#PQtyTxt").val(product._qtyOnHand);
        $("#PUnitPriceTxt").val(product._price);
    }

    initProductTbl(productArr) {
        console.log('Init call');
        $('#ProductTbl').empty();
        if (!productArr) {
            return;
        }
        productArr.map((result, index) => {
            const tr = $('<tr class="text-light">').on('click', () => {
                console.log('Click on table row');
                this.setDataToTxt(result);
            });
            const deleteButton = $('<div class="btn btn-danger">delete</div>');
            deleteButton.on('click', () => {
                this.deleteProduct(index);
            });
            let no = index + 1;
            $('#ProductTbl').append(
                tr.append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(result._pId),
                    $('<td>').text(result._desc),
                    $('<td>').text(result._price),
                    $('<td>').text(result._qtyOnHand),
                    $('<td>').append(deleteButton)
                )
            );
        });
    }
}

const productController = new ProductController();