var BASE_URL = "https://games-world.herokuapp.com/games";
var REGENERATE_URL = "https://games-world.herokuapp.com/regenerate-games";
var allGames;
var oneGame = {
    "description": "",
    "genre": "",
    "imageUrl": "",
    "publisher": "",
    "releaseDate": "",
    "title": ""
};
var isEditing = 0;
var idEdited = "";
var lastRow;
var lastCol;

async function initInterface() {
    if(window.location.href.endsWith("index.html")) {
        await fillTable();
        document.getElementById("game_button_index_save").addEventListener("click", () => { saveGame(); });
        document.getElementById("game_button_index_close").addEventListener("click", () => { closeForm(); });
        document.getElementById("game_button_index_add").addEventListener("click", () => { addGame(); });
        document.getElementById("game_button_index_regenerate").addEventListener("click", () => { regenerateGames(); });
    }
    if(window.location.href.includes("details.html")) {
        await fillDetails();
    }
}

async function fillTable() {
    await populateAllGames();
    var row=0;
    var col=0;
    var table=document.getElementById("table_index");
    var rowHtml=document.getElementById(`r${row}`);
    for(var i=0; i<allGames.length; i++) {
        if(col>2) {
            col=0;
            row++;
            table.innerHTML+=`
                <div id="r${row}" class="table_row_index">
                </div>
            `;
            rowHtml=document.getElementById(`r${row}`);
        }
        rowHtml.innerHTML+=`
            <div id="r${row}c${col}" class="game_wrapper_index">
                <img src="${allGames[i].imageUrl}" class="game_img_index">
                <div class="game_title_index">${allGames[i].title}</div>
                <div class="game_buttons_index">
                    <button class="game_button_index" onclick="redirect('${allGames[i]._id}')">details</button>
                    <button class="game_button_index" onclick="editGame('${allGames[i]._id}')">edit</button>
                    <button class="game_button_index" onclick="deleteGame('${allGames[i]._id}', 'r${row}c${col}')">delete</button>
                </div>
            </div>
        `;
        col++;
        if(i==allGames.length-1) {
            lastRow = row;
            lastCol = col++;
        }
    }
}

async function fillDetails() {
    oneGame = {};
    var left = document.getElementById("left_details");
    var right = document.getElementById("right_details");
    var id = getQueryVariable("id");
    await populateOneGame(id);
    var date = Date(oneGame.releaseDate);
    left.innerHTML=`
        <img id="game_img_details" src="${oneGame.imageUrl}">
    `;
    right.innerHTML=`
        <h2 id="game_title_details">${oneGame.title}</h2>
        <p id="game_description_details">
            ${oneGame.publisher}<br>
            ${formatDateRo(date.toString())}<br><br>
            ${oneGame.description}
        </p>
    `;
}

async function editGame(id) {
    await populateOneGame(id);
    showEditForm();
    hideTable();
    fillInForm();
    isEditing = 1;
    idEdited = id;
}

async function deleteGame(id, rowCol) {
    await deleteGameFromDatabase(id);
    document.getElementById(rowCol).remove();
}

function addGame() {
    showEditForm();
    hideTable();
}

async function regenerateGames() {
    document.getElementById("table_index").innerHTML = `
        <div id="r0" class="table_row_index">
        </div>
    `;
    await getRegeneratedGames();
    await fillTable();
}

function closeForm() {
    hideEditForm();
    showTable();
    emptyForm();
    removeFormRedBackground();
    isEditing = 0;
    idEdited = "";
}

async function saveGame() {
    if (!isEditing && !checkFormIfEmpty()) { 
        oneGame = await postGame(formToGameObject());
        addOneGameLast();
    }
    if (isEditing && !checkFormIfEmpty()) {
        await putGame(idEdited, formToGameObject());
        isEditing = 0;
        idEdited = "";
    }
    emptyForm();
    hideEditForm();
    showTable();
}

window.onload = initInterface;