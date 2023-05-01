var delayTime = 1000;
var updateTime = 500;

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var width = 960 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var xScale = d3.scaleBand().rangeRound([10, width]).padding(0.1);

var yScale = d3.scaleLinear().rangeRound([height, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale).ticks(10);

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var data = [4, 8, 15, 16, 23, 42];

function updateXScaleDomain(){
    xScale.domain([0,data.length])
}

function updateYScaleDomain(){
    yScale.domain([0, d3.max(data)]);    
}