window.onload = start;

function start() {
    var width = 500, height = 500, radius = 1;
    var chart1 = d3.select('#chart1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    d3.csv("colleges.csv", function(error, csv) {
        if (error) {
            console.error(error.error);
        }
        var csvTrimmed = []; //this list only contains the columns we care about
        for (var i = 0; i < csv.length; ++i) {
            let temp = {};
            temp['debt'] = Number(csv[i]['Median Debt']); //Dont know which debt we wanted to use we can change if wanted
            temp['salary'] = Number(csv[i]['Mean Earnings 8 years After Entry']);
            temp['cost'] = Number(csv[i]['Average Cost']);
            temp['income'] = Number(csv[i]['Median Family Income']);
            temp['admission'] = Number(csv[i]['Admission Rate']);
            temp['expenditure'] = Number(csv[i]['Expenditure Per Student']);
            temp['index'] = Number(i);
            csvTrimmed.push(temp);
        }
        // create extents
        var debtExtent = d3.extent(csvTrimmed, function(row) { return row.debt; });
        var salaryExtent = d3.extent(csvTrimmed, function(row) { return row.salary; });
        var costExtent = d3.extent(csvTrimmed, function(row) { return row.cost; });
        var incomeExtent = d3.extent(csvTrimmed, function(row) { return row.income; });
        var admissionExtent = d3.extent(csvTrimmed, function(row) { return row.admission; });
        var expenditureExtent = d3.extent(csvTrimmed, function(row) { return row.expenditure; });
        
        // create scales
        var debtScale = d3.scale.linear().domain(debtExtent).range([50, 450]);
        var salaryScale = d3.scale.linear().domain(salaryExtent).range([50, 450]);
        var costScale = d3.scale.linear().domain(costExtent).range([450, 50]);
        var admissionScale = d3.scale.linear().domain(admissionExtent).range([450, 50]);
        var incomeScale = d3.scale.linear().domain(incomeExtent).range([450, 50]);
        var expenditureScale = d3.scale.linear().domain(expenditureExtent).range([450, 50]);

        // create axes
        var debtAxis = d3.svg.axis().scale(debtScale);
        var salaryAxis = d3.svg.axis().scale(salaryScale);
        var costAxis = d3.svg.axis().scale(costScale);
        var admissionAxis = d3.svg.axis().scale(admissionScale);
        var incomeAxis = d3.svg.axis().scale(incomeScale);
        var expenditureAxis = d3.svg.axis().scale(expenditureScale);
        costAxis.orient("left"); // only orient the y-axes
        admissionAxis.orient("left");
        incomeAxis.orient("left");
        expenditureAxis.orient("left");

        console.log(csvTrimmed);
        chart1.selectAll("circle")
            .data(csvTrimmed)
            .enter()
            .append("circle")
            .attr("id", function(d, i) { return i; })
            .attr("stroke", "black")
            .attr("cx", function(d) { return debtScale(d.debt); })
            .attr("cy", function(d) { return costScale(d.cost); })
            .attr("r", radius)
            .on("click", function(d, i) {
                console.log("click");
            });

    });
}