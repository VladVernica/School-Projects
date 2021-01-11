var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";

if(window.location.href.includes("index")) {
    window.onload = () => { fillMenu(); };
}

if(window.location.href.includes("detalii")) {
    window.onload = () => { getQueryVariable("id"); fillDetails(getQueryVariable("id")); };
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for(var i=0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0]==variable) { return pair[1]; }
    }
    return false;
}

function fillMenu() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", MENU_SERVER_URL, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.status === 200) {
            var menuTbody=document.getElementById("menu_tbody");
            menuTbody.innerHTML="";
            var menuJson=Object.entries(JSON.parse(this.response).menu);
            console.log(menuJson);
            for(var i=0; i<menuJson.length; i++) {
                var row=menuTbody.insertRow(-1);
                row.innerHTML=`
                    <td class="td_img"><img src=${menuJson[i][1].imagine} class="menu_img"></td>
                    <td class="td_ingredients">
                        <h3>${menuJson[i][1].nume}</h3>
                        <p>${menuJson[i][1].ingrediente}</p>
                    </td>
                    <td class="td_button"><button class="details_button" onclick="window.location='detalii.html?id=${menuJson[i][0]}'">detalii</button></td>
                `;
            }
        }
    }
}

function searchMenu() {
    var ingredient=document.getElementById("search_input").value;
    console.log(ingredient);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", MENU_SERVER_URL, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.status === 200) {
            var menuTbody=document.getElementById("menu_tbody");
            menuTbody.innerHTML="";
            var menuJson=Object.entries(JSON.parse(this.response).menu);
            console.log(menuJson);
            for(var i=0; i<menuJson.length; i++) {
                if(menuJson[i][1].ingrediente.includes(ingredient)) {
                    var row=menuTbody.insertRow(-1);
                    row.innerHTML=`
                    <td class="td_img"><img src=${menuJson[i][1].imagine} class="menu_img"></td>
                    <td class="td_ingredients">
                        <h3>${menuJson[i][1].nume}</h3>
                        <p>${menuJson[i][1].ingrediente}</p>
                    </td>
                    <td class="td_button"><button class="menu_button" onclick="window.location='detalii.html?id=${menuJson[i][0]}'">detalii</button></td>
                `;
                }
            }
        }
    }
}

function fillDetails(productID) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", MENU_ITEM_SERVER_URL+productID+".json", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.status === 200) {
            var detailsHeader=document.getElementById("details_header");
            var productImg=document.getElementById("product_img");
            var productP=document.getElementById("product_p");
            var itemJson=Object.entries(JSON.parse(this.response));
            console.log(itemJson);
            detailsHeader.innerHTML=itemJson[2][1];
            productP.innerHTML=itemJson[3][1];
            productImg.setAttribute("src", `${itemJson[0][1]}`);
        }
    }
}

document.getElementById("search_button").addEventListener("click", () => { searchMenu(); });
document.getElementById("contact_button").addEventListener("click", () => { window.location="contact.html"; });
document.getElementById("menu_button").addEventListener("click", () => { window.location="index.html"; });