var sales = {
    loadPeriodSalesGraph: function (start, end) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    sales.onLoadHandler(this.responseText);
                }
            }
        }
        xhttp.open("GET", "http://localhost:5000/sales?start=" + start + "&end=" + end);
        xhttp.send();
    },

    loadSalesGraph: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    sales.onLoadHandler(this.responseText);
                }
            }
        }
        xhttp.open("GET", "http://localhost:5000/sales");
        xhttp.send();
    },

    onLoadHandler: function (response) {
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
}
