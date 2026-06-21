const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const containerTime = document.getElementById("time");
const displayDate = new Date().toLocaleString("en-GB", {
    timeZone: "Africa/Lagos"
});


function addTask()
{
    if (inputBox.value === '') {
        alert("You must write something"); 
        return; 
    }
    if (inputBox.value.length > 60)
       {
        alert("Task cannot exceed 60 characters. Please shorten it .. !!! ");
        inputBox.value = "";
        return;
       }
    else {
       let li = document.createElement("li");
       li.innerHTML = inputBox.value;
       listContainer.appendChild(li);
       let span = document.createElement("span");
       span.innerHTML = "\u00d7"
       li.appendChild(span);
    }
    inputBox.value = "";
    saveData();

}

listContainer.addEventListener("click", function (e) {
    
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()
        
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function showDate() {

      document.getElementById("time").innerHTML = displayDate;        
    
}


function toggleTimeVisibility() {
    const isEmpty = listContainer.innerHTML.trim() === "";
    containerTime.style.display = isEmpty ? "none" : "block";

    if (!isEmpty) { showDate(); }
}


const observer = new MutationObserver(function () {
    toggleTimeVisibility();
});

//start observing
observer.observe(listContainer, {
    childList: true, //watch for added/remove children
    subtree: true,
    characterData: true
});

toggleTimeVisibility();


//check char limit

/*function checkChar() {
    
    if (inputBox.value.Length > 100)
    {
        alert("Task cannot exceed 100 characters. Please shorten it .. !!! ");
    }
    return;
}
checkChar();












        /* 
        function validateInput() {
            if (inputBox.value.length > 2) {
                inputBox.disabled = false;
            }
        } */



