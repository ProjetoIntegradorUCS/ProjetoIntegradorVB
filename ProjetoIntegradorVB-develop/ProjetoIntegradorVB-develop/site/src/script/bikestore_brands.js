function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r, g, b];
}

function randomHexColor() {
    let [r, g, b] = randomRgbColor();

    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
}

function getRandomBackgroundColors(size) {
    result = [];
    for (let index = 0; index < size; index++) {
        result.push(randomHexColor());
    }
    return result;
}

function getQualitativeBackgroundColors(size) {
    colors = ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"];
    if (size <= colors.length) {
        return colors.slice(0, size);
    } else {
        return getRandomBackgroundColors(size);
    }
}

function onLoadHandler(response) {
    var array = JSON.parse(response);
    [xValues, yValues] = getGraphData(array);
    new Chart(document.getElementById('myChart'), {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: getQualitativeBackgroundColors(yValues.length),
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Products"
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        const total = yValues.reduce((partialSum, a) => partialSum + a, 0);
                        const current = data['datasets'][0]['data'][tooltipItem['index']];
                        const value = current / total;
                        const percent = Math.trunc(value * 100);
                        return data['labels'][tooltipItem['index']] + ': ' + percent + '% (' + current + ')';
                    }
                }
            }
        }
    });
}

function getGraphData(graphJson) {
    var xValues = [];
    var yValues = [];
    if (graphJson.length <= 5) {
        for (let i = 0; i < graphJson.length; i++) {
            xValues.push(graphJson[i]["product_name"]);
            yValues.push(graphJson[i]["quantity"]);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            xValues.push(graphJson[i]["product_name"]);
            yValues.push(graphJson[i]["quantity"]);
        }

        qtd = 0;
        for (let i = 5; i < graphJson.length; i++) {
            qtd += graphJson[i]["quantity"];
        }
        xValues.push("Others");
        yValues.push(qtd);
    }

    return [xValues, yValues];
}

function loadBrandGraph(brandId) {
    console.log(brandId);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                onLoadHandler(this.responseText);
            }
        }
    }
    xhttp.open("GET", "http://localhost:5000/products");
    xhttp.send();
}