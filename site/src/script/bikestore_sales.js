var sales = {
    loadStoresSalesGraph: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    sales.onLoadStoresSalesHandler(this.responseText);
                }
            }
        }
        xhttp.open("GET", "http://localhost:5000/sales?store=all");
        xhttp.send();
    },

    loadStaffSalesGraph: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    sales.onLoadStaffSalesHandler(this.responseText);
                }
            }
        }
        xhttp.open("GET", "http://localhost:5000/sales?staff=all");
        xhttp.send();
    },

    loadBrandSalesGraph: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    sales.onLoadBrandSalesHandler(this.responseText);
                }
            }
        }
        xhttp.open("GET", "http://localhost:5000/sales?brand=all");
        xhttp.send();
    },

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
        if (canvasObj) {
            canvasObj.destroy();
        }
        canvasObj = new Chart(document.getElementById('myChart'), {
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
    },

    onLoadBrandSalesHandler: function (response) {
        var array = JSON.parse(response);
        [xValues, yValues] = sales.getBrandSalesGraphData(array);
        if (canvasObj) {
            canvasObj.destroy();
        }
        canvasObj = new Chart(document.getElementById('myChart'), {
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
                    text: "Vendas Marcas"
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const total = yValues.reduce((partialSum, a) => partialSum + a, 0);
                            const current = data['datasets'][0]['data'][tooltipItem['index']];
                            const value = current / total;
                            const percent = Math.trunc(value * 100);
                            return data['labels'][tooltipItem['index']] + ': ' + percent + '% ($' + Intl.NumberFormat('en-US').format(current) + ')';
                        }
                    }
                }
            }
        });
    },

    onLoadStaffSalesHandler: function (response) {
        var array = JSON.parse(response);
        [xValues, yValues] = sales.getStaffSalesGraphData(array);
        if (canvasObj) {
            canvasObj.destroy();
        }
        canvasObj = new Chart(document.getElementById('myChart'), {
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
                    text: "Vendas Vendedores"
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const total = yValues.reduce((partialSum, a) => partialSum + a, 0);
                            const current = data['datasets'][0]['data'][tooltipItem['index']];
                            const value = current / total;
                            const percent = Math.trunc(value * 100);
                            return data['labels'][tooltipItem['index']] + ': ' + percent + '% ($' + Intl.NumberFormat('en-US').format(current) + ')';
                        }
                    }
                }
            }
        });
    },

    onLoadStoresSalesHandler: function (response) {
        var array = JSON.parse(response);
        [xValues, yValues] = sales.getStoresSalesGraphData(array);
        if (canvasObj) {
            canvasObj.destroy();
        }
        canvasObj = new Chart(document.getElementById('myChart'), {
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
                    text: "Vendas Lojas"
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const total = yValues.reduce((partialSum, a) => partialSum + a, 0);
                            const current = data['datasets'][0]['data'][tooltipItem['index']];
                            const value = current / total;
                            const percent = Math.trunc(value * 100);
                            return data['labels'][tooltipItem['index']] + ': ' + percent + '% ($' + Intl.NumberFormat('en-US').format(current) + ')';
                        }
                    }
                }
            }
        });
    },

    getStoresSalesGraphData: function (graphJson) {
        var xValues = [];
        var yValues = [];

        for (let i = 0; i < graphJson.length; i++) {
            xValues.push(graphJson[i]["store_name"]);
            yValues.push(graphJson[i]["total"]);
        }

        return [xValues, yValues];
    },

    getBrandSalesGraphData: function (graphJson) {
        var xValues = [];
        var yValues = [];

        for (let i = 0; i < graphJson.length; i++) {
            xValues.push(graphJson[i]["brand_name"]);
            yValues.push(graphJson[i]["total"]);
        }

        return [xValues, yValues];
    },

    getStaffSalesGraphData: function (graphJson) {
        var xValues = [];
        var yValues = [];

        for (let i = 0; i < graphJson.length; i++) {
            xValues.push(graphJson[i]["first_name"] + " " + graphJson[i]["last_name"]);
            yValues.push(graphJson[i]["total"]);
        }

        return [xValues, yValues];
    }
}
