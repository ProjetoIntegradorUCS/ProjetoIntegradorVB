var canvasObj;

function createContentContainer(title, subMenu) {
    section = document.getElementById("content");
    section.replaceChildren();

    h2 = document.createElement("h2");
    h2.setAttribute('id', 'contentTitle');
    h2.textContent = title;
    section.appendChild(h2);

    if (subMenu) {
        section.appendChild(subMenu);
    }

    canvas = document.createElement("canvas");
    canvas.setAttribute('id', 'myChart');
    canvas.classList.add('canvas');
    section.appendChild(canvas);
}

function removeCanvas() {
    canvas = document.getElementById("myCanvas");
    if (canvas) {
        canvas.remove();
    }
}

function createVendasSubMenu() {
    ul = document.createElement("ul");
    ul.classList.add('content-list');

    ul.appendChild(createVendasProductItemList());
    ul.appendChild(createVendasPeriodItemList());
    ul.appendChild(createVendasMarcaItemList());
    ul.appendChild(createVendasColaboradorItemList());

    return ul;
}

function createVendasColaboradorItemList() {
    li = document.createElement("li");
    li.textContent = "COLABORADOR";
    li.addEventListener("click", function () {
        removePeriodDiv();
        sales.loadStaffSalesGraph();
    });
    return li;
}

function createVendasMarcaItemList() {
    li = document.createElement("li");
    li.textContent = "MARCA";
    li.addEventListener("click", function () {
        removePeriodDiv();
        sales.loadBrandSalesGraph();
    });
    return li;
}

function createVendasProductItemList() {
    li = document.createElement("li");
    li.textContent = "PRODUTO";
    li.addEventListener("click", function () {
        removePeriodDiv();
        sales.loadSalesGraph();
    });
    return li;
}

function createVendasPeriodItemList() {
    li = document.createElement("li");
    li.textContent = "PERÍODO";
    li.addEventListener("click", function () {
        section = document.getElementById("content");
        section.appendChild(createPeriodDiv());
        sales.loadSalesGraph();
    })
    return li;
}

function removePeriodDiv() {
    elem = document.getElementById("periodInput");
    if (elem) {
        elem.remove();
    }
}

function createPeriodDiv() {
    removePeriodDiv();
    div = document.createElement("div");
    div.setAttribute('id', 'periodInput');
    div.appendChild(createLabel("start", "label", "Start: "));
    div.appendChild(createInputDate("start", "start"));
    div.appendChild(createLabel("end", "label", "End: "));
    div.appendChild(createInputDate("end", "end"));
    div.appendChild(createGoButton());
    return div;
}

function createGoButton() {
    button = document.createElement("button");
    button.textContent = "Go";
    button.addEventListener("click", function () {
        sales.loadPeriodSalesGraph(document.getElementById("start").value,
            document.getElementById("end").value);
    });
    return button;
}

function createInputDate(id, name) {
    inputDate = document.createElement("input");
    inputDate.setAttribute('type', 'date');
    inputDate.setAttribute('id', id);
    inputDate.setAttribute('name', name);
    return inputDate;
}

function createLabel(target, className, text) {
    label = document.createElement("label");
    label.setAttribute('for', target);
    label.classList.add(className);
    label.textContent = text;
    return label;
}
