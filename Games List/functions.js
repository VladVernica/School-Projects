async function getGames() {
    try {
        var fetchedResponse = await fetch(BASE_URL);
        if(fetchedResponse.status === 200) {
            return await fetchedResponse.json();
        } else {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function populateAllGames() {
    allGames = await getGames();
}

async function getRegeneratedGames() {
    try {
        var fetchedResponse = await fetch(REGENERATE_URL);
        if(fetchedResponse.status != 200) {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function postGame(gameObject) {
    try {
        var fetchedResponse = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: gameObject
        });
        if(fetchedResponse.status === 200) {
            return await fetchedResponse.json();
        } else {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function putGame(id, gameObject) {
    try {
        var fetchedResponse = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: gameObject
        });
        if(fetchedResponse.status === 200) {
            return await fetchedResponse.json();
        } else {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function editGameInDatabase(id, gameObject) {
    try {
        var fetchedResponse = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            payload: gameObject
        });
        if(fetchedResponse.status != 200) {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function deleteGameFromDatabase(id) {
    try {
        var fetchedResponse = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if(fetchedResponse.status != 200) {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function getGame(id) {
    try {
        var fetchedResponse = await fetch(`${BASE_URL}/${id}`);
        if(fetchedResponse.status === 200) {
            return await fetchedResponse.json();
        } else {
            throw new Error("Response is not OK");
        }
    } catch(error) {
        console.log(error);
    }
}

async function populateOneGame(id) {
    oneGame = await getGame(id);
}

function addOneGameLast() {
    var row = lastRow;
    var col = lastCol;
    var table = document.getElementById("table_index");
    var rowHtml = document.getElementById(`r${row}`);
    if(col>2) {
        col=0;
        row++;
        table.innerHTML+= `
            <div id="r${row}" class="table_row_index">
            </div>
        `;
        rowHtml = document.getElementById(`r${row}`);
    }
    rowHtml.innerHTML+=`
        <div id="r${row}c${col}" class="game_wrapper_index">
            <img src="${oneGame.imageUrl}" class="game_img_index">
            <div class="game_title_index">${oneGame.title}</div>
            <div class="game_buttons_index">
                <button class="game_button_index" onclick="redirect('${oneGame._id}')">details</button>
                <button class="game_button_index" onclick="editGame('${oneGame._id}')">edit</button>
                <button class="game_button_index" onclick="deleteGame('${oneGame._id}', 'r${row}c${col}')">delete</button>
            </div>
        </div>
    `;
}

function redirect(id) {
    window.location=`details.html?id=${id}`;
}

function showEditForm() {
    var form = document.getElementById("add_section");
    form.classList.remove("hidden");
}

function hideEditForm() {
    var form = document.getElementById("add_section");
    form.classList.add("hidden");
}

function showTable() {
    var table = document.getElementById("table_section");
    table.classList.remove("hidden");
}

function hideTable() {
    var table = document.getElementById("table_section");
    table.classList.add("hidden");
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

function formatDateRo(date) {
    var splitDate = date.split(" ");
    var finalDate = `${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`;
    return finalDate;
}

function formatDate(date) {
    var splitDate = date.split(" ");
    var month = splitDate[1];
    switch(month) {
        case "Jan": {
            month = "01";
            break;
        }
        case "Feb": {
            month = "02";
            break;
        }
        case "Mar": {
            month = "03";
            break;
        }
        case "Apr": {
            month = "04";
            break;
        }
        case "May": {
            month = "05";
            break;
        }
        case "Jun": {
            month = "06";
            break;
        }
        case "Jul": {
            month = "07";
            break;
        }
        case "Aug": {
            month = "08";
            break;
        }
        case "Sep": {
            month = "09";
            break;
        }
        case "Oct": {
            month = "10";
            break;
        }
        case "Nov": {
            month = "11";
            break;
        }
        case "Dec": {
            month = "12";
            break;
        }
        break;
    }
    var finalDate = `${splitDate[3]}-${month}-${splitDate[2]}`;
    return finalDate;
}

function fillInForm() {
    document.getElementById("edit_section_title").setAttribute("value", oneGame.title);
    document.getElementById("edit_section_genre").setAttribute("value", oneGame.genre);
    document.getElementById("edit_section_publisher").setAttribute("value", oneGame.publisher);
    document.getElementById("edit_section_date").setAttribute("value", formatDate(Date(oneGame.releaseDate).toString()));
    document.getElementById("edit_section_image").setAttribute("value", oneGame.imageUrl);
    document.getElementById("edit_section_description").innerHTML = oneGame.description;
}

function emptyForm() {
    document.getElementById("edit_section_title").value = "";
    document.getElementById("edit_section_genre").value = "";
    document.getElementById("edit_section_publisher").value = "";
    document.getElementById("edit_section_date").value = "";
    document.getElementById("edit_section_image").value = "";
    document.getElementById("edit_section_description").value = "";
}

function formToGameObject() {
    var title = `title=${document.getElementById("edit_section_title").value}`;
    var releaseDate = `releaseDate=${Date.parse(document.getElementById("edit_section_date").value)}`;
    var genre = `genre=${document.getElementById("edit_section_genre").value}`;
    var publisher = `publisher=${document.getElementById("edit_section_publisher").value}`;
    var imageUrl = `imageUrl=${document.getElementById("edit_section_image").value}`;
    var description = `description=${document.getElementById("edit_section_description").value}`;
    return `${title}&${releaseDate}&${genre}&${publisher}&${imageUrl}&${description}`;
}

function checkFormIfEmpty() {
    var isEmpty = 0;
    var title = document.getElementById("edit_section_title");
    var genre = document.getElementById("edit_section_genre");
    var publisher = document.getElementById("edit_section_publisher");
    var releaseDate = document.getElementById("edit_section_date");
    var imageUrl = document.getElementById("edit_section_image");
    var description = document.getElementById("edit_section_description");
    if(title.value == "") {
        title.classList.add("redBackground");
        isEmpty = 1;
    } else { title.classList.remove("redBackground"); }
    if(genre.value == "") {
        genre.classList.add("redBackground");
        isEmpty = 1;
    } else { genre.classList.remove("redBackground"); }
    if(publisher.value == "") {
        publisher.classList.add("redBackground");
        isEmpty = 1;
    } else { publisher.classList.remove("redBackground"); }
    if(releaseDate.value == "") {
        releaseDate.classList.add("redBackground");
        isEmpty = 1;
    } else { releaseDate.classList.remove("redBackground"); }
    if(imageUrl.value == "") {
        imageUrl.classList.add("redBackground");
        isEmpty = 1;
    } else { imageUrl.classList.remove("redBackground"); }
    if(description.value == "") {
        description.classList.add("redBackground");
        isEmpty = 1;
    } else { description.classList.remove("redBackground"); }
    return isEmpty;
}

function removeFormRedBackground() {
    document.getElementById("edit_section_title").classList.remove("redBackground");
    document.getElementById("edit_section_genre").classList.remove("redBackground");
    document.getElementById("edit_section_publisher").classList.remove("redBackground");
    document.getElementById("edit_section_date").classList.remove("redBackground");
    document.getElementById("edit_section_image").classList.remove("redBackground");
    document.getElementById("edit_section_description").classList.remove("redBackground");
}