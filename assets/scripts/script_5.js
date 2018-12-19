var data = [
  ['Lithuania', 'Latvia', 'Estonia'],
  [299, 218, 79],
  [296, 179, 101],
  [302, 177, 87],
  [256, 279, 81],
  [267, 212, 78],
  [242, 188, 67],
  [192, 158, 71]
];

$(function() {

  // Initial chart
  var chart = c3.generate({
    data: {
      rows: data,
      type: 'bar'
    }
  });

  // Redraw chart depending on which option is selected
  $("#chartType").change(function(evt) {
    var chartSelection = $("#chartType").val();
    var chart = c3.generate({
      data: {
        rows: data,
        type: chartSelection
      }
    });
  });

});
