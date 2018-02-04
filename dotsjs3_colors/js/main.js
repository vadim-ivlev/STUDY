var onLoad = function () {
    // Get main elements
    var pagination_el = document.getElementById('pagination');
    var canvas_area = document.getElementById('canvas-area');

    // Create DotsBoard object
    DB = new DotsBoard({
        canvas_id: 'graphCanvas',
        title_id: 'title',
        sub_title_id: 'sub-title',
        below_test: 'below-text',
        steps: steps,
        pagination_el: pagination_el,
        canvas_area: canvas_area,
        chart_id: 'chart_div',
        additional_note: 'additional-note',
        width:892,
        height:300
    });

    // Make default representation of DotsBoard
    DB.defaultBackground();
    DB.buildPagination();

    // Build chart for first step
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(DB.buildChart);

    // Set click action on chart
    chart_el = document.getElementById('chart_div');
    chart_el.onclick = DB.performStep.bind(DB);

};

window.onload = onLoad;

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback, element){
                window.setTimeout(callback, 1000 / 60, element);
          };
})();
