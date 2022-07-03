function toggleMarcas() {
    document.getElementById("dropdownMarcas").classList.toggle("show");
}

function loadBrandsList() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                onLoadListHandler(this.responseText, "dropdownMarcas");
            }
        }
    }
    xhttp.open("GET", "http://localhost:5000/brands");
    xhttp.send();
}

function onLoadListHandler(response, menuId) {
    listItem = document.getElementById(menuId);
    array = JSON.parse(response);
    array.forEach(element => {
        let div = document.createElement("div");
        div.textContent = element["brand_name"];
        div.className = "submenu";
        div.addEventListener("click", function () { loadBrandGraph(element["brand_id"]); });
        listItem.appendChild(div);
    });
}

window.onload = loadBrandsList();
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}