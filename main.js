window.onload = start;

function start() {
    var width = 500, height = 500;
    var chart1 = d3.select('#chart1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    d3.csv("colleges.csv", function(csv) {
        for (var i = 0; i < csv.length; ++i) {
            csv[i]['Median Debt'] = Number(csv[i]['Median Debt']); //Dont know which debt we wanted to use we can change if wanted
            csv[i]['Mean Earnings 8 years After Entry'] = Number(csv[i]['Mean Earnings 8 years After Entry']);
            csv[i]['Attendance Cost'] = Number(csv[i]['Attendance Cost']);
            csv[i]['Median Family Income'] = Number(csv[i]['Median Family Income']);
            csv[i]['Admission Rate'] = Number(csv[i]['Admission Rate']);
            csv[i]['Expenditure Per Student'] = Number(csv[i]['Expenditure Per Student']);
            csv[i]['index'] = Number(i); //Use this index for brushing
        }
        var debtExtent = d3.extent(csv, function(row) { return row['Median Debt']; });
        var salaryExtent = d3.extent(csv, function(row) { return row['Mean Earnings 8 Years After Entry']; });
        var costExtent = d3.extent(csv, function(row) { return row['Attendance Cost']; });
        var incomeExtent = d3.extent(csv, function(row) { return row['Median Family Income']; });
        var admissionExtent = d3.extent(csv, function(row) { return row['Admission Rate']; });
        var expenditureExtent = d3.extent(csv, function(row) { return row['Expenditure Per Student']; });
        
        var debtScale = d3.scale.linear().domain(debtExtent).range([50, 450]);
        var salaryScale = d3.scale.linear().domain(salaryExtent).range([50, 450]);
        var costScale = d3.scale.linear().domain(costExtent).range([450, 50]);
        var admissionScale = d3.scale.linear().domain(admissionExtent).range([450, 50]);
        var incomeScale = d3.scale.linear().domain(incomeExtent).range([450, 50])
        var expenditureScale = d3.scale.linear().domain(expenditureExtent).range([450, 50]);
    });
}