/*
* Created by : @yash
*              4/26/2023 , Wednesday
*              06:11 PM
* Project : book_store
* Contact me : contact.yashen@gmail.com 
*/

/*import CustomerController from "./controller/CustomerController.js";
import Customer from "./model/Customer.js";*/

const toDashboard= ()=> {
    toOrderPage();
}

const toOrderPage = ()=>{
    $('#orders').css('display','block');
    $('#customer').css('display','none');
    $('#product').css('display','none');
    $('#placeOrder').css('display','none');
}

const toCustomerPage = ()=>{
  $('#orders').css('display','none');
  $('#customer').css('display','block');
  $('#product').css('display','none');
  $('#placeOrder').css('display','none');
}

const toProductPage = ()=>{
  $('#orders').css('display','none');
  $('#customer').css('display','none');
  $('#product').css('display','block');
  $('#placeOrder').css('display','none');
}

const toPlaceOrderPage = ()=>{
  $('#orders').css('display','none');
  $('#customer').css('display','none');
  $('#product').css('display','none');
  $('#placeOrder').css('display','block');
}



const regexCusId = /^Cus-\d{3}$/;
const verifyCusId = $("#customerIdTxt").on("keyup", (e) => {
    if (regexCusId.test($("#customerIdTxt").val())) {
        $("#customerIdTxt").css("border", "2px solid green");
        $("#cusIdErr").css("display", "none");
        if (e.key === "Enter") {
            $("#customerNameTxt").focus();
        }
    } else {
        $("#customerIdTxt").css("border", "2px solid red");
        $("#cusIdErr").css("display", "block");
        $("#cusIdErr").text("wrong input format ex:- Cus-001");
    }
    verifyCustomer();
});

const regexCusName = /^[a-zA-Z\s']+$/;
const verifyCusName = $("#customerNameTxt").on("keyup", (e) => {
    if (regexCusName.test($("#customerNameTxt").val())) {
        $("#customerNameTxt").css("border", "2px solid green");
        $("#cusNameErr").css("display", "none");
        if (e.key === "Enter") {
            $("#customerEmailTxt").focus();
        }
    } else {
        $("#customerNameTxt").css("border", "2px solid red");
        $("#cusNameErr").css("display", "block");
        $("#cusNameErr").text("Invalied Name");
    }
    verifyCustomer();
});

const regexCusEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const verifyCusEmail = $("#customerEmailTxt").on("keyup", (e) => {
    if (regexCusEmail.test($("#customerEmailTxt").val())) {
        $("#customerEmailTxt").css("border", "2px solid green");
        $("#cusEmailErr").css("display", "none");
    } else {
        $("#customerEmailTxt").css("border", "2px solid red");
        $("#cusEmailErr").css("display", "block");
        $("#cusEmailErr").text("Invalied Email");
    }
    verifyCustomer();
});

const verifyCustomer = () => {
    if (
        regexCusId.test($("#customerIdTxt").val()) &&
        regexCusName.test($("#customerNameTxt").val()) &&
        regexCusEmail.test($("#customerEmailTxt").val())
    ) {
        $("#saveCustomerBtn").removeClass("disabled");
    } else {
        $("#saveCustomerBtn").addClass("disabled");
    }
};

