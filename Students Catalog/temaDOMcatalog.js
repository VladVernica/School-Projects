var countRows=0;
var note=[];
var currentMedie;
var currentStudent;

function adaugaElev (table, tbody, input) {
    if(input!="") {
        if(table.style.display==="none") {
            table.style.display="block";
            document.getElementById("paragraf").style.display="none";
        }
        var row=tbody.insertRow(-1);
        row.setAttribute("id", `row${countRows}`);
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
        cell1.innerHTML=input;
        cell3.innerHTML=`<button class="veziNote" onclick="veziNote(this.parentElement.parentElement.id)">Vezi note</button>`;
    }
    countRows++;
}

function veziNote(rowId) {
    rightDiv.style.display="block";
    leftDiv.style.width="50%";
    var tbody=document.getElementById("rightTbody");
    tbody.innerHTML="";
    currentMedie=document.getElementById(rowId).cells[1];
    currentStudent=parseInt(rowId.substring(3,rowId.length));
    for(let j=0; j<=currentStudent; ++j) {
        if (!note[j]) note[j]=[];
    }
    if(note[currentStudent]!=[]) {
        for(let i=0; i<note[currentStudent].length; ++i){
            tbody.insertRow(i).insertCell(0).innerHTML=note[currentStudent][i];
        }
    }
}

function adaugaNota (input) {
    var tbody=document.getElementById("rightTbody");
    note[currentStudent].push(input);
    tbody.insertRow(-1).insertCell(0).innerHTML=input;
    currentMedie.innerHTML=medie(currentStudent);
}

function medie (currentStudent) {
    var sum=0;
    for (let i=0; i<note[currentStudent].length; ++i) {
        sum+=note[currentStudent][i];
    }
    return sum/note[currentStudent].length;
}

function ascundeNote (rightDiv, leftDiv) {
    document.getElementById("rightTbody").innerHTML="";
    rightDiv.style.display="none";
    leftDiv.style.width="100%";
    currentMedie=undefined;
    currentStudent=undefined;
}

function sortAsc (tbody, col) {
    for (let i=0; i<tbody.rows.length-1; ++i) {
        for (let j=i+1; j<tbody.rows.length; ++j) {
            var a=tbody.rows[i];
            var b=tbody.rows[j];
            if (parseInt(a.cells[col].innerHTML)>parseInt(b.cells[col].innerHTML)) {
                var sw=a.innerHTML;
                a.innerHTML=b.innerHTML;
                b.innerHTML=sw;
            }
        }
    }
}

function sortDsc (tbody, col) {
    for (let i=0; i<tbody.rows.length-1; ++i) {
        for (let j=i+1; j<tbody.rows.length; ++j) {
            var a=tbody.rows[i];
            var b=tbody.rows[j];
            if (parseInt(a.cells[col].innerHTML)<parseInt(b.cells[col].innerHTML)) {
                var sw=a.innerHTML;
                a.innerHTML=b.innerHTML;
                b.innerHTML=sw;
            }
        }
    }
}