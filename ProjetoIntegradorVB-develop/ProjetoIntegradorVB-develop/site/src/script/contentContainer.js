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

function createVendasSubMenu() {
    ul = document.createElement("ul");
    ul.classList.add('content-list');
    list = ["MARCA", "COLABORADOR"];
    ul.appendChild(createVendasProductItemList());
    ul.appendChild(createVendasPeriodItemList());
    list.forEach(element => {
        li = document.createElement("li");
        li.textContent = element;
        ul.appendChild(li);
    });
    return ul;
}

function createVendasProductItemList() {
    li = document.createElement("li");
    li.textContent = "PRODUTO";
    li.addEventListener("click", function () {
        sales.loadSalesGraph();
    });
    return li;
}

function createVendasPeriodItemList() {
    li = document.createElement("li");
    li.textContent = "PERÍODO";
    li.addEventListener("click", function () {
        section = document.getElementById("content");
        section.appendChild(createLabel("start", "label", "Start: "));
        section.appendChild(createInputDate("start", "start"));
        section.appendChild(createLabel("end", "label", "End: "));
        section.appendChild(createInputDate("end", "end"));
        section.appendChild(createGoButton());

        sales.loadSalesGraph();
    })
    return li;
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
