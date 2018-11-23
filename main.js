window.onload = start;
var width = 500, height = 500;


function start() {
    var chart1 = d3.select('#chart1')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
}