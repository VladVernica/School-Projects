var logsNumber=0;

function changeBorderColor(id, color) {
    var element = document.getElementById(id);
    element.removeAttribute("class");
    element.setAttribute("class", color);
}

function checkIfEmpty(id) {
    var element = document.getElementById(id);
    if(element.value=="") { 
        return 1; 
    } else {
        return 0;
    }  
}

function showConfirmation() {
    document.getElementById("confirmationName").innerHTML=document.getElementById("firstName").value;
    document.getElementById("confirmation").removeAttribute("class");
}

function hideConfirmation() {
    document.getElementById("confirmation").setAttribute("class","hiddenElement");
}

function gender() {
    if(document.getElementById("male").checked) { 
        return "male";
    } else {
        return "female";
    }
}

function logToConsole() {
    logsNumber++;
    console.log("• Log number "+logsNumber);
    console.log("Firs Name: "+document.getElementById("firstName").value);
    console.log("Second Name: "+document.getElementById("lastName").value);
    console.log("Gender: "+gender());
    console.log("Message: "+document.getElementById("message").value);
}

function checkAllInputs() {
    var allGood=1;
    if(checkIfEmpty("firstName")) { 
        changeBorderColor("firstName", "redBorder");
        allGood=0;
     } else {
        changeBorderColor("firstName", "grayBorder");
     }
     if(checkIfEmpty("lastName")) { 
        changeBorderColor("lastName", "redBorder");
        allGood=0;
     } else {
        changeBorderColor("lastName", "grayBorder");
     }
     if(checkIfEmpty("message")) { 
        changeBorderColor("message", "redBorder");
        allGood=0;
     } else {
        changeBorderColor("message", "grayBorder");
     }
     if(allGood) {
         logToConsole();
         return 1;
     } else {
         hideConfirmation();
         return 0;
     }
}

function submit() {
    if(checkAllInputs()) { showConfirmation(); }
}

document.getElementById("submitButton").addEventListener("click", () => submit());
document.getElementById("closeButton").addEventListener("click", () => hideConfirmation());

