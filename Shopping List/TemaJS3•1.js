var countRows=0;
var isHead=0;

function displayTable() {
    var thead=document.querySelector("table thead");
    var tbody=document.querySelector("table tbody");
    var input=document.querySelector("input").value;
    if(input!="") {
        if(isHead==0) {
            thead.innerHTML=`
                <th>ITEM</th>
            `;
            isHead=1;
        }
        var row=tbody.insertRow(-1);
        row.setAttribute("id", `row${countRows}`)
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        cell1.innerHTML=`${input}`;
        cell2.innerHTML=`<button onclick="markAsBuyed(this.parentElement.parentElement.id)">mark as buyed</button>`;
        countRows++;
    }
}

function markAsBuyed(rowID) {
    document.getElementById(rowID).style.textDecoration="line-through";
}

function sortAsc() {
    var tbody=document.querySelector("table tbody");
    for(let i=0; i<tbody.rows.length-1; ++i) {
        for(let j=i+1; j<tbody.rows.length; ++j) {
            if(tbody.rows[i].cells[0].innerHTML>tbody.rows[j].cells[0].innerHTML) {
                var sw=tbody.rows[i].cells[0].innerHTML;
                var swDeco=tbody.rows[i].style.textDecoration;
                tbody.rows[i].cells[0].innerHTML=tbody.rows[j].cells[0].innerHTML;
                tbody.rows[i].style.textDecoration=tbody.rows[j].style.textDecoration;
                tbody.rows[j].cells[0].innerHTML=sw;
                tbody.rows[j].style.textDecoration=swDeco;
            }
        }
    }
}

function sortDesc() {
    var tbody=document.querySelector("table tbody");
    for(let i=0; i<tbody.rows.length-1; i++) {
        for(let j=i+1; j<tbody.rows.length; j++) {
            if(tbody.rows[i].cells[0].innerHTML<tbody.rows[j].cells[0].innerHTML) {
                var sw=tbody.rows[i].cells[0].innerHTML;
                var swDeco=tbody.rows[i].style.textDecoration;
                tbody.rows[i].cells[0].innerHTML=tbody.rows[j].cells[0].innerHTML;
                tbody.rows[i].style.textDecoration=tbody.rows[j].style.textDecoration;
                tbody.rows[j].cells[0].innerHTML=sw;
                tbody.rows[j].style.textDecoration=swDeco;
            }
        }
    }
}

document.getElementById("addButton").addEventListener("click", () => displayTable());
document.getElementById("sortAsc").addEventListener("click", () => sortAsc());
document.getElementById("sortDesc").addEventListener("click", () => sortDesc());