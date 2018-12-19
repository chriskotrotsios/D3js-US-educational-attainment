var dataset = [
	  { label: 'Toyota 8.7%', count: 8.7 }, 
	  { label: 'Peugot 10.1%', count: 10.1 },
	  { label: 'Volskwagen 8.6%', count: 8.6 },
	  { label: 'Fiat 8.1%', count: 8.1 },
	  { label: 'Nissan 6.5%', count: 6.5 },
	  { label: 'Suzuki 6.7%', count: 6.7 },
	  { label: 'Opel 7.1%', count: 7.1 },
	  { label: 'Citroen 5.1%', count: 5.1 },
	  { label: 'Mercedes 4.9%', count: 4.9 },
	  { label: 'BMW 4%', count: 4 },
	  { label: 'Άλλο 30.2%', count: 30.2 }
	];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 60;

var legendRectSize = 14;
var legendSpacing = 4;

//var color = d3.scale.category20b();

var color = d3.scale.ordinal()
  .range(['#3e5b98', '#4da7de', '#45556c', '#FF9ECB', '#3e345f', '#940016', '#afdf68', '#6c6c62', '#716000', '#51ec68', '#f5d800']);

var svg = d3.select('#chart-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    return color(d.data.label);
  })
   .each(function(d) { this._current = d; });

path.on('mouseover', function(d) {
  var total = d3.sum(dataset.map(function(d) {
    return d.count;
  }));
  var percent = Math.round(1000 * d.data.count / total) / 10;
  tooltip.select('.label').html(d.data.label);
  tooltip.select('.count').html(d.data.count); 
  tooltip.select('.percent').html(percent + '%'); 
  tooltip.style('display', 'block');
});

path.on('mouseout', function(d) {
  tooltip.style('display', 'none');
});



var legend = svg.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

var tooltip = d3.select('#chart-container')
  .append('div')                 
  .attr('class', 'tooltip');     

tooltip.append('div')            
  .attr('class', 'label');       

tooltip.append('div')            
  .attr('class', 'count');       

tooltip.append('div')            
  .attr('class', 'percent');     


legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d; });
