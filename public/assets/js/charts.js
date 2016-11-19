// <!DOCTYPE html>
// <html>
// <!-- Example -->
// <head>
//   <!--With few exceptions, all web pages with Google Charts should include the following lines in the <head> of the web page -->
//   <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
//   <script type="text/javascript">
//     Lines 14 and 15 normally go here, but because we have two I think they should go down there.
//   </script>
// </head>

// Not sure if the following two lines have to go in the head also or if they can go here.  
// Because we have two charts it might be a little different than the examples.
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');
    data.addRows([
    ['Positive', 0.78],
    ['Negative', 0.21],
    ['Neutral', 0.01]
    ]);

    // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
    chart.draw(data, null);
    }

    //google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawScatterChart);
    function drawScatterChart() {
    var data = google.visualization.arrayToDataTable([
        ['Magnitude', 'Score'],
        [1, -1],
        [0.9, -1],
        [0.6, -0.8],
        [3, -0.5],
        [0.2, -0.4],
        [0, 0],
        [0.2, 0.4],
        [4, 0.4],
        [2, 0.9],
        [0.8, 1],
        [1, 1]
    ]);

    var options = {
        title: 'Sentiment',
        hAxis: {title: 'Magnitude', minValue: 0, maxValue: 4},
        vAxis: {title: 'Score', minValue: -1, maxValue: 1},
        legend: 'none',
        width: 400,
        height: 300
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('scatterChart'));

    chart.draw(data, options);
    }

// <body>
//   <!-- Identify where the chart should be drawn. -->
//   <div id="myPieChart"></div>
//   <div id="scatterChart"></div>
// </body>