// ----- • GLOBAL VARIABLES • -----

var DATABASE_URL = "https://vernimarket.firebaseio.com/";
var PRODUCTS_URL = "https://vernimarket.firebaseio.com/products/";
var CART_URL = "https://vernimarket.firebaseio.com/cart/";

// ------------------------------------



// ----- • HELP FUNCTIONS • -----

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

// ------------------------------------



// ----- • GO TO PAGE FUNCTIONS • -----

function goToHome() {
    window.location = `index.html`;
}

function goToDetails(productID) {
    window.location = `details.html?id=${productID}`;
}

function goToCart() {
    window.location = `cart.html`;
}

function goToAdmin() {
    window.location = `admin.html`;
}

function goToForm() {
    window.location = `form.html`;
}

// ------------------------------------



// ----- • FILL PAGE FUNCTIONS • -----

function fillIndexContent() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var content = "";
            var indexContentDiv = document.getElementById("content");
            var productsJson = JSON.parse(this.response);
            var keys = Object.keys(productsJson);
            for (var i = 0; i < keys.length; ++i) {
                content += `
                    <div class="productBox">
                        <div class="productBoxImageDiv">
                            <img class="productBoxImage" src="${productsJson[keys[i]].image}">
                        </div>
                        <div class="productBoxName">${productsJson[keys[i]].name}</div>
                        <div class="productBoxPrice">${productsJson[keys[i]].price} lei</div>
                        <button class="productBoxButtonDetails" onclick="goToDetails('${keys[i]}')">DETALII</button>
                    </div>
                `;
            }
            indexContentDiv.innerHTML = content;
        }
    };
    xhttp.open("GET", PRODUCTS_URL + ".json", true);
    xhttp.send();
}

function fillDetailsContent(productID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var detailsContentDiv = document.getElementById("detailBoxContent");
            var productJson = JSON.parse(this.response);
            detailsContentDiv.innerHTML = `
                <div id="detailBoxImageDiv">
                    <img id="detailBoxImage" src="${productJson.image}">
                </div>
                <div id="detailBoxTextDiv">
                    <div id="detailBoxName">${productJson.name}</div>
                    <div id="detailBoxPrice">${productJson.price}</div>
                    <div id="detailBoxDescription">${productJson.description}</div>
                    <p id="detailBoxStock">În stoc: ${productJson.stock}</p>
                    <p id="detailBoxQuantity">Cantitate:</p>
                    <input type="number" id="detaiBoxInput" value="0" />
                    <button id="detailBoxButtonAdd" onclick="addToCart(${productJson.stock})">ADAUGĂ ÎN COȘ</button>
                </div>
            `;
        }
    }
    xhttp.open("GET", PRODUCTS_URL + productID + ".json", true);
    xhttp.send();
}

function fillCartContent() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var productCount = 0;
            var total = 0;
            var transport = 0;
            var content = "";
            var cartBoxTableTbody = document.getElementById("cartBoxTableTbody");
            var cartBoxRightDiv = document.getElementById("cartBoxRightDiv");
            var databaseJson = JSON.parse(this.response);
            var productsJson = databaseJson.products;
            var cartJson = databaseJson.cart;
            var cartKeys = Object.keys(cartJson);
            for (var i = 0; i < cartKeys.length; ++i) {
                content += `
                    <tr class="cartBoxTableTr" id="cartBoxTableTr${i}">
                        <td class="adminBoxTableCellImage"><img class="cartBoxTableImage" src="${productsJson[cartJson[cartKeys[i]].productID].image}"></td>
                        <td class="cartBoxTableCellName">${productsJson[cartJson[cartKeys[i]].productID].name}</td>
                        <td class="cartBoxTableCell">${productsJson[cartJson[cartKeys[i]].productID].price}</td>
                        <td class="cartBoxTableCell">
                            <a class="cartBoxTableButton" onclick="minusButton('cartBoxTableQuantity${i}', 'cartBoxTableCellSubtotal${i}', '${cartKeys[i]}', '${cartJson[cartKeys[i]].productID}', ${productsJson[cartJson[cartKeys[i]].productID].price})">-</a>
                            <div class="cartBoxTableQuantity" id="cartBoxTableQuantity${i}">${cartJson[cartKeys[i]].quantity}</div>
                            <a class="cartBoxTableButton" onclick="plusButton('cartBoxTableQuantity${i}', 'cartBoxTableCellSubtotal${i}', '${cartKeys[i]}', '${cartJson[cartKeys[i]].productID}', ${productsJson[cartJson[cartKeys[i]].productID].price}, ${productsJson[cartJson[cartKeys[i]].productID].stock})">+</a>
                        </td>
                        <td class="cartBoxTableCell" id="cartBoxTableCellSubtotal${i}">${cartJson[cartKeys[i]].quantity * productsJson[cartJson[cartKeys[i]].productID].price}</td>
                        <td class="cartBoxTableCell"><a class="cartBoxTableButton" onclick="removeFromCart('${cartKeys[i]}', this.parentElement.parentElement.id, ${cartJson[cartKeys[i]].quantity}, ${productsJson[cartJson[cartKeys[i]].productID].price})">Remove</a></td>
                    </tr>
                `;
                productCount += cartJson[cartKeys[i]].quantity;
                total += cartJson[cartKeys[i]].quantity * productsJson[cartJson[cartKeys[i]].productID].price;
            }
            cartBoxTableTbody.innerHTML = content;
            if (total < 6000) transport = 500;
            total += transport;
            cartBoxRightDiv.innerHTML = `
                <div class="cartBoxRightText">Produse: <span id="cartBoxRightCountValue">${productCount}</span></div>
                <div class="cartBoxRightText">TVA: 0 %</div>
                <div class="cartBoxRightText">Transport: <span id="cartBoxRightTransportValue">${transport}</span> lei</div>
                <div id="cartBoxRightTotal">Total: <span id="cartBoxRightTotalValue">${total}</span> LEI</div>
                <button id="cartBoxRightButtonBuy" onclick="buyButton()">🠞 CUMPARA</button>
            `;
        }
    };
    xhttp.open("GET", DATABASE_URL + ".json", true);
    xhttp.send();
}

function fillAdminContent() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var content = "";
            var adminBoxTableTbody = document.getElementById("adminBoxTableTbody");
            var productsJson = JSON.parse(this.response);
            var keys = Object.keys(productsJson);
            for (var i = 0; i < keys.length; ++i) {
                content += `
                    <tr class="adminBoxTableTr" id="adminBoxTableTr${i}">
                        <td class="adminBoxTableCell"><img class="adminBoxTableImage" src="${productsJson[keys[i]].image}"></td>
                        <td class="adminBoxTableCellName">${productsJson[keys[i]].name}</td>
                        <td class="adminBoxTableCell">${productsJson[keys[i]].price}</td>
                        <td class="adminBoxTableCell">${productsJson[keys[i]].stock}</td>
                        <td class="adminBoxTableCell"><a class="adminBoxTableButton" onclick="removeFromProducts('${keys[i]}', this.parentElement.parentElement.id)">Remove</a></td>
                    </tr>
                `;
            }
            adminBoxTableTbody.innerHTML = content;
        }
    };
    xhttp.open("GET", PRODUCTS_URL + ".json", true);
    xhttp.send();
}

// ------------------------------------



// ----- • ADD TO DATABASE FUNCTIONS • -----

function addProduct() {
    var image = document.getElementById("adminBoxFormInputImage").value;
    var name = document.getElementById("adminBoxFormInputName").value;
    var price = document.getElementById("adminBoxFormInputPrice").value;
    var stock = document.getElementById("adminBoxFormInputStock").value;
    var description = document.getElementById("adminBoxFormTextArea").value;
    var newProduct = {
        "image": image,
        "name": name,
        "price": parseInt(price),
        "stock": parseInt(stock),
        "description": description
    };
    alert("Produsul a fost adăugat!");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", PRODUCTS_URL + ".json", true);
    xhttp.send(JSON.stringify(newProduct));
}

function addToCart(stock) {
    var quantity = parseInt(document.getElementById("detaiBoxInput").value);
    if (quantity<0) { alert("Vă rugăm să introduceți un număr valid"); return; }
    if (quantity>stock) { alert("Cantitatea introdusă depășește stocul disponibil!"); return; }
    var newProduct = {
        "productID": getQueryVariable('id'),
        "quantity": quantity
    };
    alert("Produsul a fost adăugat!");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", CART_URL + ".json", true);
    xhttp.send(JSON.stringify(newProduct));
}

// ------------------------------------



// ----- • REMOVE FROM DATABASE FUNCTIONS • -----

function removeFromProducts(productID, rowID) {
    document.getElementById("adminBoxTableTbody").removeChild(document.getElementById(rowID));
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", PRODUCTS_URL+productID + ".json", true);
    xhttp.send();
}

function removeFromCart(cartKey, rowID, quantity, productPrice) {
    var totalDiv = document.getElementById("cartBoxRightTotalValue");
    var total = parseInt(totalDiv.innerHTML);
    var transportDiv = document.getElementById("cartBoxRightTransportValue");
    var transport = parseInt(transportDiv.innerHTML);
    var countDiv = document.getElementById("cartBoxRightCountValue");
    var count = parseInt(countDiv.innerHTML);
    countDiv.innerHTML = count-quantity;
    if((total-(quantity*productPrice))<6000) {
        transport = 500;
        total+= 500;
    }
    transportDiv.innerHTML = transport;
    totalDiv.innerHTML = total-(quantity*productPrice);
    document.getElementById("cartBoxTableTbody").removeChild(document.getElementById(rowID));
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", CART_URL + cartKey + ".json", true);
    xhttp.send();
}

// ------------------------------------



// ----- • MODIFY FUNCTIONS • -----

function plusButton(quantityDivID, subtotalDivID, cartKey, productID, productPrice, productStock) {
    var quantityDiv = document.getElementById(quantityDivID);
    var quantity = parseInt(quantityDiv.innerHTML);
    if (quantity<productStock) {
        var subtotalDiv = document.getElementById(subtotalDivID);
        var subtotal = parseInt(subtotalDiv.innerHTML);
        var countDiv = document.getElementById("cartBoxRightCountValue");
        var count = parseInt(countDiv.innerHTML);
        var transportDiv = document.getElementById("cartBoxRightTransportValue");
        var transport = parseInt(transportDiv.innerHTML);
        var totalDiv = document.getElementById("cartBoxRightTotalValue");
        var total = parseInt(totalDiv.innerHTML);
        if((total+productPrice>6000) && transport==500) {
            transportDiv.innerHTML = 0;
            total-=500;
        }
        quantityDiv.innerHTML = quantity+1;
        subtotalDiv.innerHTML = (productPrice*(quantity+1));
        totalDiv.innerHTML = (total+productPrice);
        countDiv.innerHTML = count+1;
        var updatedCartEntry = {
            "productID": productID,
            "quantity": quantity+1
        };
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", CART_URL + cartKey + ".json", true);
        xhttp.send(JSON.stringify(updatedCartEntry));
    }
}

function minusButton(quantityDivID, subtotalDivID, cartKey, productID, productPrice) {
    var quantityDiv = document.getElementById(quantityDivID);
    var quantity = parseInt(quantityDiv.innerHTML);
    if (quantity>=1) {
        var subtotalDiv = document.getElementById(subtotalDivID);
        var subtotal = parseInt(subtotalDiv.innerHTML);
        var countDiv = document.getElementById("cartBoxRightCountValue");
        var count = parseInt(countDiv.innerHTML);
        var transportDiv = document.getElementById("cartBoxRightTransportValue");
        var transport = parseInt(transportDiv.innerHTML);
        var totalDiv = document.getElementById("cartBoxRightTotalValue");
        var total = parseInt(totalDiv.innerHTML);
        if (((total-productPrice-transport)<6000) && transport==0) {
            transport=500;
            total+= transport;
        }
        transportDiv.innerHTML = transport;
        console.log(total);
        quantityDiv.innerHTML = quantity-1;
        subtotalDiv.innerHTML = (productPrice*(quantity-1));
        totalDiv.innerHTML = (total-productPrice);
        countDiv.innerHTML = count-1;
        var updatedCartEntry = {
            "productID": productID,
            "quantity": quantity-1
        };
        console.log(updatedCartEntry)
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", CART_URL + cartKey + ".json", true);
        xhttp.send(JSON.stringify(updatedCartEntry));
    }
}

function buyButton() {
    var cartBoxTableTbody = document.getElementById("cartBoxTableTbody");
    cartBoxTableTbody.innerHTML = "";
    var countDiv = document.getElementById("cartBoxRightCountValue");
    countDiv.innerHTML = 0;
    var transportDiv = document.getElementById("cartBoxRightTransportValue");
    transportDiv.innerHTML = 0;
    var totalDiv = document.getElementById("cartBoxRightTotalValue");
    alert ("Felicitări, ați cumpărat produse în valoare de " + parseInt(totalDiv.innerHTML) + " lei")
    totalDiv.innerHTML = 0;
/*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xhttp = new XMLHttpRequest();
            var databaseJson = JSON.parse(this.response);
            var cartJson = databaseJson.cart;
            var cartKeys = Object.keys(cartJson);
            var productsJson = databaseJson.products;
            var productsKeys = Object.keys(productsJson);
            for (var i = 0; i<cartKeys.length; ++i) {
                let id = cartJson[cartKeys[i]].productID;
                let stock = productsJson[cartJson[cartKeys[i]].productID].stock;
                let quantity = cartJson[cartKeys[i]].quantity;
                if (quantity>stock) quantity = stock;
                xhttp.open("PUT", PRODUCTS_URL + id + "/" + stock + ".json", true);
                xhttp.send(stock-quantity);
            }
        }
    };
    xhttp.open("GET", DATABASE_URL + ".json", true);
    xhttp.send();
*/
}

// ------------------------------------