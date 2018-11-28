window.onload = start;
var chart1, chart2, chart3, chart4;
function start() {
    var width = 700, height = 400, radius = 2;
    var padding = {left: 80, right: 80, top: 80, bottom: 80};
    chart1 = d3.select('#chart1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    chart2 = d3.select('#chart2')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    chart3 = d3.select('#chart3')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    chart4 = d3.select('#chart4')
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
            temp['Region'] = csv[i]['Region'];
            temp['Locale'] = csv[i]['Locale'];
            temp["satData"] = csv[i]["SAT Average"];
            temp['actData'] = csv[i]["ACT Median"];
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
            .tickFormat(function(d){ return String(d / 1000) + 'k'; })
            .orient("bottom");
        var salaryAxis = d3.svg.axis().scale(salaryScale)
            .tickSize(1)
            .ticks(5)
            .tickFormat(function(d){ return String(d / 1000) + 'k'; })
            .orient("bottom");
        var costAxis = d3.svg.axis().scale(costScale)
            .tickSize(1)
            .tickFormat(function(d){ return String(d / 1000) + 'k'; })
            .orient("left");
        var admissionAxis = d3.svg.axis().scale(admissionScale)
            .tickSize(1)
            .tickFormat(function(d){ return String(d * 100) + '%'; })
            .orient("left");
        var incomeAxis = d3.svg.axis().scale(incomeScale)
            .tickSize(1)
            .tickFormat(function(d){ return String(d / 1000) + 'k'; })
            .orient("left");
        var expenditureAxis = d3.svg.axis().scale(expenditureScale)
            .tickSize(1)
            .tickFormat(function(d){ return String(d / 1000) + 'k'; })
            .orient("left");

        // DRAW AXES
        chart1
            .append("g")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(debtAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("x", width / 2)
                .attr("y", 50)
                .style("text-anchor", "middle")
                .text("Debt");
        chart1
            .append("g")
            .attr("transform", "translate(" + padding.left + ", 0)")
            .call(costAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("dx", -height / 2)
                .style("text-anchor", "middle")
                .text("Cost of Attendance");
        chart2
            .append("g")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(salaryAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("x", width / 2)
                .attr("y", 50)
                .style("text-anchor", "middle")
                .text("Salary");
        chart2
			.append("g")
			.attr("transform", "translate(" + padding.left + ", 0)")
			.call(admissionAxis)
			.append("text")
                .attr("class", "axes-label")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("dx", -height / 2)
                .style("text-anchor", "middle")
                .text("Admission Rate");
        chart3
            .append("g")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(debtAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("x", width / 2)
                .attr("y", 50)
                .style("text-anchor", "middle")
                .text("Debt");
        chart3
			.append("g")
			.attr("transform", "translate(" + padding.left + ", 0)")
			.call(incomeAxis)
			.append("text")
                .attr("class", "axes-label")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("dx", -height / 2)
                .style("text-anchor", "middle")
                .text("Average Family Income");
        chart4
            .append("g")
            .attr("transform", "translate(0," + (height - padding.bottom) + ")")
            .call(salaryAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("x", width / 2)
                .attr("y", 50)
                .style("text-anchor", "middle")
                .text("Salary");
        chart4
            .append("g")
            .attr("transform", "translate(" + padding.left + ", 0)")
            .call(expenditureAxis)
            .append("text")
                .attr("class", "axes-label")
                .attr("transform", "rotate(-90)")
                .attr("y", -60)
                .attr("dx", -height / 2)
                .style("text-anchor", "middle")
                .text("Expenditure Per Student");

        // DRAW SVG ELEMENTS
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
                onClick(d);
            })
        chart2.selectAll("circle")
            .data(csvTrimmed)
            .enter()
            .append("circle")
            .attr("id", function(d, i) { return i; })
            .attr("stroke", "black")
            .attr("cx", function(d) { return salaryScale(d.salary); })
            .attr("cy", function(d) { return admissionScale(d.admission); })
            .attr("r", radius)
            .attr("class", "dots")
            .on("click", function(d, i) {
                onClick(d);
            })
        chart3.selectAll("circle")
            .data(csvTrimmed)
            .enter()
            .append("circle")
            .attr("id", function(d, i) { return i; })
            .attr("stroke", "black")
            .attr("cx", function(d) { return debtScale(d.debt); })
            .attr("cy", function(d) { return incomeScale(d.income); })
            .attr("r", radius)
            .attr("class", "dots")
            .on("click", function(d, i) {
                onClick(d);
            })
        chart4.selectAll("circle")
            .data(csvTrimmed)
            .enter()
            .append("circle")
            .attr("id", function(d, i) { return i; })
            .attr("stroke", "black")
            .attr("cx", function(d) { return salaryScale(d.salary); })
            .attr("cy", function(d) { return expenditureScale(d.expenditure); })
            .attr("r", radius)
            .attr("class", "dots")
            .on("click", function(d, i) {
                onClick(d);
            })
    });
}

function onClick(d) {
    // highlight clicked datapoint on all graphs
    console.log(d);
    chart1.selectAll('circle').classed('clicked', (circle) => (circle.index === d.index));
    chart2.selectAll('circle').classed('clicked', (circle) => (circle.index === d.index));
    chart3.selectAll('circle').classed('clicked', (circle) => (circle.index === d.index));
    chart4.selectAll('circle').classed('clicked', (circle) => (circle.index === d.index));

}

function mouseover() {

}


    //sat
    var satslider = document.getElementById("SAT");
    var satoutput = document.getElementById("satScore");
    satoutput.innerHTML = document.getElementById("SAT").value;

    satslider.oninput = function() {
      satoutput.innerHTML = this.value;
    }
    
    //act
    var actslider = document.getElementById("ACT");
    var actoutput = document.getElementById("actScore");
    actoutput.innerHTML = document.getElementById("ACT").value;
    
    actslider.oninput = function() {
        actoutput.innerHTML = this.value;
    }

//Widgets :)



// function test() {
//     console.log(document.getElementById("SAT").value);
//     console.log(document.getElementById("ACT").value);
// }

function change() {
    chart1.selectAll('circle')
    .style('visibility', function(d){
        return select(d);
    })
    chart2.selectAll('circle')
    .style('visibility', function(d){
        return select(d);
    })
    chart3.selectAll('circle')
    .style('visibility', function(d){
        return select(d);
    })
    chart4.selectAll('circle')
    .style('visibility', function(d){
        return select(d);
    })
    
    
}

function select(d) {
    var r = false;
    var l = false;
    var s = false;
    var a = false;
    if (document.getElementById("region").value == "all") {
        //return "visible";
        r = true;
    }
    if (d.Region == document.getElementById("region").value) {
        //return "visible";
        r = true;
    }
    if (document.getElementById("locale").value == "all") {
        l = true;
    }
    if (d.Locale == document.getElementById("locale").value) {
        l = true;
    }
    if (document.getElementById("SAT").value == 400) {
        s = true;
    }
    if (d.satData >= document.getElementById("SAT").value) {
        s = true;
    }
    if (document.getElementById("ACT").value == 1) {
        a = true;
    }
    if (d.actData >= document.getElementById("ACT").value) {
        a = true;
    }
    if (r & l & s & a) {
        return "visible";
    }
    else {
        return "hidden";
    }
}


