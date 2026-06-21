const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const containerTime = document.getElementById("time");
const displayDate = new Date().toLocaleString("en-GB", {
    timeZone: "Africa/Lagos"
});
const clickButton = document.getElementById("click");

// Function to check input and toggle button state
function checkInput() {
    if (inputBox.value.trim() === '') {
        clickButton.disabled = true;
    } else {
        clickButton.disabled = false;
    }
}

function addTask()
{
    if (inputBox.value.trim() === '') {
        return; // This is now redundant but keep for safety
    }

    
    if (inputBox.value === '') {
        alert("You must write something"); 
        return; 
    }

    //check char limit
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
    checkInput(); // Re-check after clearing
    saveData();


}

  // Add event listeners
    inputBox.addEventListener('input', checkInput);
// Initialize button state on page load
     checkInput();

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



    



