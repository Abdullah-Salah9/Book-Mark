var bookMarkInput = document.getElementById("Bookmark")
var bookUrlInput = document.getElementById("bookurl")

var bookList = JSON.parse(localStorage.getItem("Links")) || []

display()

function addBook() {
    var name = bookMarkInput.value.trim();
    var url = bookUrlInput.value.trim();

if (!isValidName(name) || !isValidUrl(url)) {
    document.getElementById("alertMessage").classList.remove("d-none");
    return;
} else {
    document.getElementById("alertMessage").classList.add("d-none");
}

var bookObject = {
    name: name,
    url: url
}

    bookList.push(bookObject);
    localStorage.setItem("Links", JSON.stringify(bookList));
    display();

    clearInputs()
}


function display() {
    var cartona = ""
    for(var i =0; i < bookList.length; i++){
        cartona += `
        <tr class="align-middle">
                    <td>${i+1}</td>
                    <td>${bookList[i].name}</td>
                    <td><button onclick="visitLink('${bookList[i].url }')" class="btn btn-success"><i class="fa-solid fa-eye me-1"></i> Visit</button></td>
                    <td><button onclick="deleteLink(${i})" class="btn btn-danger"><i class="fa-solid fa-trash me-1"></i> Delete</button></td>
                </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = cartona
}

function deleteLink(deleteIndex) {
    bookList.splice(deleteIndex,1)
    localStorage.setItem("Links", JSON.stringify(bookList))
    display()
}

function visitLink(VisitIndex){
    window.open(VisitIndex, "_blank")
}

function clearInputs(){
    bookMarkInput.value = ""
    bookUrlInput.value = ""
}

function isValidName(name) {
    return name.trim().length >= 3;
}


function isValidUrl(url) {
    var regex = /^(https?:\/\/)(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)?$/;
    return regex.test(url);
}