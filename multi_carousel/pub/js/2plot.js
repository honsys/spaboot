// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 40, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

// Define the axes
var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(5);

var	ylAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);

var	yrAxis = d3.svg.axis().scale(y)
	.orient("right").ticks(5);

// Define the line
var	valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
    
// Adds the svg canvas
var	svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.tsv("data/data.tsv", function(error, data) {
	data.forEach(function(d) {
	  d.date = parseDate(d.date);
	  d.close = +d.close;
	});
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.close; })]);

	// Add the X Axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Add left Y Axis
	svg.append("g")
		.attr("class", "y axis")
                .style("fill", "green")
		.call(ylAxis);

	// Add the left axis valueline path.
	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(data));

        // 2nd (right axis) data -- reset left axis data object	
        data.forEach(function(d) {
	  d.close = 700 - d.close;
	});

	// Add right Y Axis
	svg.append("g")	
		.attr("class", "y axis")
                .attr("transform", "translate(" + width + " ,0)") // move to the right
                .style("fill", "blue")
		.call(yrAxis);

	// Add the right axis valueline path.
	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(data));

});

