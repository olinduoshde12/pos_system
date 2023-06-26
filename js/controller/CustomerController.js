import { Customer } from "../model/Customer.js";

export class CustomerController {
    constructor() {
        this.customers = this.getCustomersFromLocalStorage() || [];

        // Event handler for save customer button
        $("#saveCustomerBtn").on('click', this.handleSaveCustomer.bind(this));

        // Event handler for update customer button
        $("#updateCustomerBtn").on('click', this.handleUpdateCustomer.bind(this));

        // Event handler for search customer text input
        $('#searchCustomerTxt').on('keyup', (e) => {
            this.findCustomers(e.target.value);
        });

        // Initialize customer table
        this.initCusTbl(this.customers);
    }

    // Method to save a customer
    saveCustomer(customer) {
        if(this.findIndexFromCustomerId(customer._id) === -1){
            console.log(customer);
            this.customers.push(customer);
            this.storeCustomersOnLocalStorage();
            this.initCusTbl(this.customers);
        }else {
            alert('customer id repeated...');
        }
    }

    // Method to update an existing customer
    updateCustomer(customer) {
        // Find the index of the updatable customer
        const index = this.findIndexFromCustomerId(customer.id);
        if (index !== -1) { // Check if the customer exists
            this.customers[index] = customer;
            this.storeCustomersOnLocalStorage();
            this.initCusTbl(this.customers);
        } else {
            alert('Wrong customer ID!');
        }
    }

    // Method to delete a customer
    deleteCustomer(customerId) {
        console.log(customerId);
        this.customers.splice(customerId, 1);
        this.storeCustomersOnLocalStorage();
        this.initCusTbl(this.customers);
    }

    // Method to find customers based on a search string
    findCustomers(searchString) {
        $('#cusTblBody').empty();
        if (!this.customers) {
            return;
        }
        this.customers.map((result, index) => {
            if (
                result._name.toLowerCase().includes(searchString.toLowerCase()) ||
                result._email.toLowerCase().includes(searchString.toLowerCase())
            ) {
                const tr = $('<tr>').on('click', () => {
                    console.log('Click on table row');
                    this.setDataToTxt(result);
                });
                const deleteButton = $('<div class="btn btn-danger">delete</div>');
                deleteButton.on('click', () => {
                    this.deleteCustomer(index);
                });
                let no = index + 1;
                $('#cusTblBody').append(
                    tr.append(
                        $('<th scope="row">').text(no),
                        $('<td>').text(result._id),
                        $('<td>').text(result._name),
                        $('<td>').text(result._email),
                        $('<td>').append(deleteButton)
                    )
                );
            }
        });
    }

    // Method to find the index of a customer using customer ID
    findIndexFromCustomerId(customerId) {
        return this.customers.findIndex((customer) => customerId === customer._id);
    }

    // Method to store customers on local storage in the browser
    storeCustomersOnLocalStorage() {
        localStorage.setItem('customers', JSON.stringify(this.customers));
    }

    // Method to get all customers from local storage in the browser
    getCustomersFromLocalStorage() {
        const storedCustomers = localStorage.getItem('customers');
        return storedCustomers ? JSON.parse(storedCustomers) : null;
    }

    // Event handler for save customer button
    handleSaveCustomer() {
        const cusId = $("#customerIdTxt").val().trim();
        const cusName = $("#customerNameTxt").val().trim();
        const cusMail = $("#customerEmailTxt").val().trim();
        this.saveCustomer(new Customer(cusId, cusName, cusMail));
    }

    // Event handler for update customer button
    handleUpdateCustomer() {
        const cusId = $("#customerIdTxt").val().trim();
        const cusName = $("#customerNameTxt").val().trim();
        const cusMail = $("#customerEmailTxt").val().trim();
        this.updateCustomer(new Customer(cusId, cusName, cusMail));
    }

    // Method to set data to text inputs
    setDataToTxt(customer) {
        console.log(customer);
        $("#customerIdTxt").val(customer._id);
        $("#customerNameTxt").val(customer._name);
        $("#customerEmailTxt").val(customer._email);
    }

    // Method to initialize the customer table
    initCusTbl(cusArr) {
        console.log('Init call');
        $('#cusTblBody').empty();
        if (!cusArr) {
            return;
        }
        cusArr.map((result, index) => {
            const tr = $('<tr class="text-light">').on('click', () => {
                console.log('Click on table row');
                this.setDataToTxt(result);
            });
            const deleteButton = $('<div class="btn btn-danger">delete</div>');
            deleteButton.on('click', () => {
                this.deleteCustomer(index);
            });
            let no = index + 1;
            $('#cusTblBody').append(
                tr.append(
                    $('<th scope="row">').text(no),
                    $('<td>').text(result._id),
                    $('<td>').text(result._name),
                    $('<td>').text(result._email),
                    $('<td>').append(deleteButton)
                )
            );
        });
    }
}

const customerController = new CustomerController();
