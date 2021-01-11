var elevi=[];
var currentElev;
var isEleviHead=0;

function adaugaElev() {
    var elev=document.getElementById("input_nume").value;
    var thead=document.getElementById("thead_elevi");
    var tbody=document.getElementById("tbody_elevi");
    if(elev!="") {
        if(isEleviHead==0) {
            thead.innerHTML=`
                <th id="th_nume">NUME</th>
                <th id="th_medie">MEDIE</th>
                <th id="th_butoane"></th>
            `;
            isEleviHead=1;
        }
        elevi.push({nume: elev, note: [], medie: 0});
        var row=tbody.insertRow(-1);
        var rowNumber=elevi.length-1;
        row.setAttribute("id", `row${rowNumber}`);
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
        cell1.innerHTML=elev;
        cell3.innerHTML=`<button class="butoane_vezi_note" onclick="afiseazaDateElev(indiceElevCurent(this.parentElement.parentElement.id))">note</button>`;
    }
    document.getElementById("input_nume").value="";
}

function sortAscElevi() {
    var sw;
    for(let i=0; i<elevi.length-1; i++) {
        for(let j=i+1; j<elevi.length; j++) {
            if(elevi[i].nume>elevi[j].nume) {
                sw=elevi[i];
                elevi[i]=elevi[j];
                elevi[j]=sw;
            }
        }
    }
    afiseazaElevi();
}

function sortDescElevi() {
    var sw;
    for(let i=0; i<elevi.length-1; i++) {
        for(let j=i+1; j<elevi.length; j++) {
            if(elevi[i].nume<elevi[j].nume) {
                sw=elevi[i];
                elevi[i]=elevi[j];
                elevi[j]=sw;
            }
        }
    }
    afiseazaElevi();
}

function afiseazaElevi() {
    var thead=document.getElementById("thead_elevi");
    var tbody=document.getElementById("tbody_elevi");
    tbody.innerHTML="";
    if(isEleviHead==0) {
        thead.innerHTML=`
            <th id="th_nume">NUME</th>
            <th id="th_medie">MEDIE</th>
            <th id="th_butoane"></th>
        `;
        isEleviHead=1;
    }
    for(let i=0; i<elevi.length; i++) {
        var row=tbody.insertRow(-1);
        row.setAttribute("id", `row${i}`);
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
        cell1.innerHTML=elevi[i].nume;
        cell2.innerHTML=elevi[i].medie;
        cell3.innerHTML=`<button class="butoane_vezi_note">note</button>`;
    }
}

function afiseazaDateElev(indiceElev) {
    document.getElementById("nume_elev").innerHTML=elevi[indiceElev].nume;
    document.getElementById("note_elev_wrapper").removeAttribute("style");
    afiseazaNote(indiceElev);
    currentElev=indiceElev;
}

function ascundeDateElev() {
    document.getElementById("tbody_note").innerHTML="";
    document.getElementById("note_elev_wrapper").style.display="none";
}

function afiseazaNote(indiceElev) {
    var tbody=document.getElementById("tbody_note");
    tbody.innerHTML="";
    for(let i=0; i<elevi[indiceElev].note.length; i++) {
        var row=tbody.insertRow(-1);
        var cell1=row.insertCell(0);
        cell1.innerHTML=elevi[indiceElev].note[i];
    }
}

function calculeazaMedie(indiceElev) {
    if(elevi[indiceElev].note.length!=0) {
        var sumaNote=0;
        for(let i=0; i<elevi[indiceElev].note.length; i++) {
            sumaNote+=elevi[indiceElev].note[i];
        }
        elevi[indiceElev].medie=sumaNote/elevi[indiceElev].note.length;
    }
}

function adaugaNota(indiceElev) {
    var nota=parseInt(document.getElementById("input_nota").value);
    var tbody=document.getElementById("tbody_note");
    if(nota!="") {
        elevi[indiceElev].note.push(nota);
        calculeazaMedie(indiceElev);
        var row=tbody.insertRow(-1);
        var cell1=row.insertCell(0);
        cell1.innerHTML=nota;
        var currentElevRow=document.getElementById(`row${indiceElev}`);
        var currentElevMedieCell=currentElevRow.getElementsByTagName("td")[1];
        currentElevMedieCell.innerHTML=elevi[indiceElev].medie;
    }
    document.getElementById("input_nota").value="";
}

function sortAscNote(indiceElev) {
    var sw;
    for(let i=0; i<elevi[indiceElev].note.length-1; i++) {
        for(let j=i+1; j<elevi[indiceElev].note.length; j++) {
            if(elevi[indiceElev].note[i]>elevi[indiceElev].note[j]) {
                sw=elevi[indiceElev].note[i];
                elevi[indiceElev].note[i]=elevi[indiceElev].note[j];
                elevi[indiceElev].note[j]=sw;
            }
        }
    }
    afiseazaNote(indiceElev);
}

function sortDescNote(indiceElev) {
    var sw;
    for(let i=0; i<elevi[indiceElev].note.length-1; i++) {
        for(let j=i+1; j<elevi[indiceElev].note.length; j++) {
            if(elevi[indiceElev].note[i]<elevi[indiceElev].note[j]) {
                sw=elevi[indiceElev].note[i];
                elevi[indiceElev].note[i]=elevi[indiceElev].note[j];
                elevi[indiceElev].note[j]=sw;
            }
        }
    }
    afiseazaNote(indiceElev);
}


//indiceElevCurent(this.parentElement.parentElement.id)
function indiceElevCurent(rowID) {
    return parseInt(rowID.substr(3, rowID.length));
}

document.getElementById("buton_adauga_elev").addEventListener("click", () => adaugaElev());
document.getElementById("sorteaza_asc_elevi").addEventListener("click", () => sortAscElevi());
document.getElementById("sorteaza_desc_elevi").addEventListener("click", () => sortDescElevi());
document.getElementById("buton_ascunde").addEventListener("click", () => ascundeDateElev());
document.getElementById("buton_adauga_nota").addEventListener("click", () => adaugaNota(currentElev));
document.getElementById("sorteaza_asc_note").addEventListener("click", () => sortAscNote(currentElev));
document.getElementById("sorteaza_desc_note").addEventListener("click", () => sortDescNote(currentElev));