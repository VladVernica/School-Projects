var isHead=0;
var countRows=0;
var isModifying=0;
var currentModifyingRowId;

function adaugaContact () {
    var nume=document.getElementById("numeInput").value;
    var telefon=document.getElementById("telefonInput").value;
    if(isModifying==0) {
        var tbody=document.querySelector("table tbody");
        if((nume!=null)&&(telefon!=null)) {
            if(isHead==0) {
                var thead=document.querySelector("table thead");
                thead.innerHTML=`
                    <th>Nume</th>
                    <th>Telefon</th>
                `;
                document.getElementById("domDiv").style.display="block";
                isHead=1;
            }
            var row=tbody.insertRow(-1);
            row.setAttribute("id", `row${countRows}`);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            var cell3=row.insertCell(2);
            var cell4=row.insertCell(3);
            cell1.innerHTML=`${nume}`;
            cell2.innerHTML=`${telefon}`;
            cell3.innerHTML="<a onclick='modifica(this.parentElement.parentElement.id)'>Modifica</a>";
            cell4.innerHTML="<a onclick='sterge(this.parentElement.parentElement.id)'>Sterge</a>";
            countRows++;
        }
    }
    else {
        var nume=document.getElementById("numeInput").value;
        var telefon=document.getElementById("telefonInput").value;
        var cell1=document.getElementById(currentModifyingRowId).cells[0];
        var cell2=document.getElementById(currentModifyingRowId).cells[1];
        cell1.innerHTML=nume;
        cell2.innerHTML=telefon;
        currentModifyingRowId=undefined;
        isModifying=0;
    }
}

function modifica (rowId) {
    var nume=document.getElementById("numeInput");
    var telefon=document.getElementById("telefonInput");
    nume.value=document.getElementById(rowId).cells[0].innerHTML;
    telefon.value=document.getElementById(rowId).cells[1].innerHTML;
    isModifying = 1;
    currentModifyingRowId=rowId;
}

function sterge (rowId) {
    document.querySelector("table tbody").removeChild(document.getElementById(rowId));
    if(document.querySelector("table tbody").innerHTML=="") {
        document.getElementById("domDiv").style.display="none";
        isHead=0;
    } 
}