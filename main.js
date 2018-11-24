window.onload = start;

function start() {
    var width = 600, height = 600, radius = 3;
    var padding = {left: 100, right: 100, top: 100, bottom: 100}; //this doesn't fully work if left/right, and top/bottom are different
    var chart1 = d3.select('#chart1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    d3.csv("colleges.csv", function(error, csv) {
        if (error) {
            console.error(error.error);
        }

        // READ CSV
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

        // CREATE EXTENTS
        var debtExtent = d3.extent(csvTrimmed, function(row) { return row.debt; });
        var salaryExtent = d3.extent(csvTrimmed, function(row) { return row.salary; });
        var costExtent = d3.extent(csvTrimmed, function(row) { return row.cost; });
        var incomeExtent = d3.extent(csvTrimmed, function(row) { return row.income; });
        var admissionExtent = d3.extent(csvTrimmed, function(row) { return row.admission; });
        var expenditureExtent = d3.extent(csvTrimmed, function(row) { return row.expenditure; });
        
        // CREATE SCALES
        var debtScale = d3.scale.linear().domain(debtExtent).range([padding.left, width - padding.right]);
        var salaryScale = d3.scale.linear().domain(salaryExtent).range([padding.left, width - padding.right]);
        var costScale = d3.scale.linear().domain(costExtent).range([height - padding.top, padding.bottom]);
        var admissionScale = d3.scale.linear().domain(admissionExtent).range([height - padding.top, padding.bottom]);
        var incomeScale = d3.scale.linear().domain(incomeExtent).range([height - padding.top, padding.bottom]);
        var expenditureScale = d3.scale.linear().domain(expenditureExtent).range([height - padding.top, padding.bottom]);

        // CREATE AXIS
        var debtAxis = d3.svg.axis().scale(debtScale)
            // .tickSubdivide(true)
            .tickSize(1)
            .orient("bottom");
        var salaryAxis = d3.svg.axis().scale(salaryScale)
            .tickSize(1)
            .orient("bottom");
        var costAxis = d3.svg.axis().scale(costScale)
            .tickSize(1)
            .orient("left");
        var admissionAxis = d3.svg.axis().scale(admissionScale)
            .tickSize(1)
            .orient("left");
        var incomeAxis = d3.svg.axis().scale(incomeScale)
            .tickSize(1)
            .orient("left");
        var expenditureAxis = d3.svg.axis().scale(expenditureScale)
            .tickSize(1)
            .orient("left");

        // DRAW AXES
        chart1
            .append("g")
            .attr("transform", "translate(0," + (width - padding.left) + ")")
            .call(debtAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("x", width / 2)
                .attr("y", 50)
                .style("text-anchor", "middle")
                .text("Debt");
        chart1
			.append("g")
			.attr("transform", "translate(" + padding.bottom + ", 0)")
			.call(costAxis)
			.append("text")
                .attr("class", "axes-label")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("dx", -height / 2)
                // .attr("dy", ".71em")
                .style("text-anchor", "middle")
                .text("Cost of Attendance");
            
        // CREATE SVG ELEMENTS
        // console.log(csvTrimmed);
        chart1.selectAll("circle")
            .data(csvTrimmed)
            .enter()
            .append("circle")
            .attr("id", function(d, i) { return i; })
            .attr("stroke", "black")
            .attr("cx", function(d) { return debtScale(d.debt); })
            .attr("cy", function(d) { return costScale(d.cost); })
            .attr("r", radius)
            .attr("class", "dots")
            .on("click", function(d, i) {
                console.log(d);
            })
    });
}


function mouseover() {

}