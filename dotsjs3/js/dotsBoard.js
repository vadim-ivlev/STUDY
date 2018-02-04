var DotsBoard = function (config) {
    this.canvas_el = document.getElementById(config.canvas_id || 'graphCanvas');
    this.canvas = this.canvas_el.getContext("2d");
    this.canvas_area = config.canvas_area;
    this.pagination_el = config.pagination_el;
    this.chart_id = config.chart_id;

    this.title_el = document.getElementById(config.title_id || 'title');
    this.sub_title_el = document.getElementById(config.sub_title_id || 'sub-title');
    this.below_text = document.getElementById(config.below_text || 'below-text');
    this.additional_note = document.getElementById(config.additional_note || 'additional-note');

    this.width = config.width || 890;
    this.height = config.height || 300;

    this.steps = config.steps || [];

    this.backgroundColor = config.backgroundColor || '#999';

    this.wdot_step = 28;
    this.hdot_step = 30;

    this.canvas_el.width = this.width;
    this.canvas_el.height = this.height;

    // this.title_el.style.width = 920 + 'px';
    this.title_el.innerHTML = this.steps[0].text;

    // this.sub_title_el.style.width = 920 + 'px';
    this.sub_title_el.innerHTML = this.steps[0].subTitle;

    // this.below_text.style.width = 920 + 'px';
    this.below_text.innerHTML = this.steps[0].below_text;

    // this.additional_note.style.width = 920 + 'px';
    this.additional_note.innerHTML = this.steps[0].additional_note;

    this.current_step = 0;

    this.__show_next = function () {
        if (this.current_step + 1 < this.steps.length) {
            this.current_step += 1;
            this.performStep();
        }
    };

    this.__search_in_doc = function (selector, el) {
        return document.evaluate(
            selector,
            el,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }

    this.canvas_el.onclick = this.__show_next.bind(this);

    this.coordinates = [];

    this.last_flash_color = null;
    this.flashing_interval = null;

}

DotsBoard.prototype = {
    defaultBackground: function () {
        // this.canvas.lineWidth=5;
        this.canvas.beginPath();
        this.canvas.strokeStyle = this.backgroundColor;
        for (var i=0; i<=this.width; i+=this.wdot_step){
            for (var j=0; j<=this.height; j+=this.hdot_step) {
                this.canvas.moveTo(i,j);
                this.canvas.lineTo(i+0.2,j);
            }
        }

        this.canvas.stroke();
        this.canvas.closePath();
    },

    clearCanvas: function () {
        this.canvas.clearRect(0, 0, this.canvas_el.width, this.canvas_el.height);
        this.coordinates = [];
        this.defaultBackground();
    },

    changeCanvasWidth: function (size) {
        this.canvas_el.width = this.width + Math.ceil(size / this.height * this.hdot_step) * this.wdot_step - 20;
        if (size !== 0) {
            this.canvas_el.style.marginLeft =  "-" + (size + 50).toString() + "px";
        } else {
            this.canvas_el.style.marginLeft = "0px";
        }
    },

    drawArea: function (step) {
        // Prepare calculations
        var start_col = 0;
        var start_row = 0;
        var rows = this.height;
        var columns = (step.dots / (rows / this.hdot_step)) * this.wdot_step;
        var portion = (step.dots / 10) * Math.ceil((columns / 10 % 10) * 10);
        var faded = Math.abs((step.fade / (step.dots / this.hdot_step) * this.wdot_step) - columns);
        var fade_color = step.fade_color;
        var fade_portion = (step.dots / 100) * Math.ceil((faded % 10) * 10);
        var flashing = Math.abs((step.flash / (rows / this.hdot_step) * this.wdot_step) - columns);
        var colors = step.colors;

        // Expand canvas with additional dots (size changing)
        if (step.expand) {
            this.changeCanvasWidth(step.expand);
        }

        // Draw related steps one by one (recursively !!!) or clear canvas
        if (step.related_step) {
            var prev_step = this.steps[step.related_step - 1];
            var indexes = this.drawArea(prev_step);
            start_col = indexes[0];
            start_row = indexes[1] + 5;
        } else {
            this.clearCanvas();
        }

        // Check if item should start from special position or have indent
        if (step.start != undefined) {
            start_col = step.start;
        } else if (step.indent) {
            start_col += (step.indent / (rows / this.hdot_step)) * this.wdot_step;
        }

        this.canvas.beginPath();
        this.canvas.strokeStyle = step.color || this.backgroundColor;

        // First cycle will add more color
        for(var r=0; r<3; r++) {
            var cportion = portion;

            // Set from where dots should be faded or not
            if (r > 0 && (faded || faded == 0)) {
                var ccolumns = faded + start_col;
                cportion = fade_portion;
                this.canvas.strokeStyle = step.color || this.backgroundColor;
            } else {
                var ccolumns = columns + start_col;
                this.canvas.strokeStyle = fade_color;
            }

            // Columns cycle
            for (var i = start_col + 5; i <= ccolumns; i += this.wdot_step) {
                // Set rows count in last column
                var crows = rows;
                if (i == ccolumns || i + this.hdot_step > ccolumns) {
                    crows = cportion;
                }

                // Get rows column in first column (if was previous dots)
                var cstart = 0;
                if (start_row && i == start_col){
                    cstart = start_row;
                } else if (cstart == 0) {
                    cstart = 8;
                }

                // Rows cycle
                if (crows == 99) {
                    crows = 300;
                }
                // console.log(crows);
                for (var j = cstart + 5; j <= crows; j += this.hdot_step) {
                    this.coordinates.push([[i, j], [i + 19, j]])

                    for (dots in colors) {
                        var current_dot = parseInt((i - 5) / this.wdot_step * 10 + (j - 5) / this.hdot_step);
                        // console.log(current_dot);
                        if (current_dot >= parseInt(dots) && colors.hasOwnProperty(current_dot)) {
                            this.canvas.strokeStyle = colors[current_dot];
                        }
                        if (Object.keys(colors).length > 0){
                            this.draw();
                        }
                    }
                }
                this.draw();
            }
        }

        this.draw();
        this.canvas.closePath();

        // Start flashing part of dots if it's required
        if (step.flash) this.flash(step, flashing, columns, rows, portion);

        return [columns + start_col, portion];
    },

    draw: function () {
        this.canvas.lineWidth = 20;
        while (this.coordinates.length) {
            var index = Math.floor(Math.random() * this.coordinates.length);
            var item = this.coordinates[index];
            this.coordinates.splice(index, 1);
            this.canvas.moveTo(item[0][0], item[0][1]);
            this.canvas.lineTo(item[1][0], item[1][1]);
        }
        this.canvas.stroke();
        this.canvas.closePath();
        this.canvas.beginPath();
    },

    flash: function (step, flashing, columns, rows, portion) {
        // Function for timeout
        var flash_start = function (step, flashing, columns, rows, portion) {
            var colors = ['#fff', step.color];

            // Change color after each run
            if (this.last_flash_color == '#fff') {
                this.last_flash_color = colors[1];
            } else {
                this.last_flash_color = colors[0];
            }

            this.defaultBackground();

            // Get from what rows flashing should start
            var rows_c_c = (rows / 100) * Math.ceil((flashing % 1) * 100);
            flashing = Math.ceil(flashing);

            this.canvas.beginPath()

            // First cycle will add more color
            for (var r=0; r<3; r++) {

                // Columns cycle
                for (var i = 0; i <= columns; i += this.wdot_step) {
                    // Set rows count in last column
                    var crows = rows;
                    if (i == columns || i + this.hdot_step > columns) {
                        crows = portion;
                    }

                    // Change color for flashing
                    if (i > flashing) {
                        this.canvas.strokeStyle = this.last_flash_color;
                    } else {
                        this.canvas.strokeStyle = step.color;
                    }

                    // Rows cycle
                    for (var j = 0; j <= crows; j += this.hdot_step) {
                        // Change color for first flashing column part
                        if ((i == flashing || (i < flashing && i + this.hdot_step > flashing)) && j < rows_c_c) {
                            this.canvas.strokeStyle = step.color;
                        } else if ((i == flashing || (i < flashing && i + this.hdot_step > flashing)) && j > rows_c_c) {
                            this.canvas.strokeStyle = this.last_flash_color;
                        }
                        this.coordinates.push([[i, j], [i + 5, j]])
                        // this.coordinates.push([[i, j], [i + 1.4, j]])
                    }
                    this.draw();
                }
            }
            this.canvas.stroke();
            this.canvas.closePath();
        };
        // Run flashing each second
        this.flashing_interval = setInterval(flash_start.bind(this), 1000, step, flashing, columns, rows, portion);
    },

    performStep: function (e) {
        // Remove flashing
        clearInterval(this.flashing_interval);
        // Set default size for canvas
        this.changeCanvasWidth(0);

        if (e) {
            var step = e.target.data;
            // If click was performed by chart else by pagination button
            if (step == undefined) {
                step = this.current_step + 1;
                this.current_step += 1;
            } else {
                this.current_step = step;
            }

            var active_a = e.target.parentNode.getElementsByClassName('active');
            // If click was performed by pagination button else by chart
            if (active_a.length) {
                active_a[0].className = '';
                e.target.className = 'active';
            } else {
                // Remove 'active' class from precious pagination button
                var active_a = this.pagination_el.getElementsByClassName('active');
                if (active_a.length) active_a[0].className = '';
                // Set 'active' class for current pagination button
                var current_a = this.__search_in_doc("a[text()='"+(step+1)+"']", this.pagination_el)
                current_a.className = 'active';
            }
        } else {
            var step = this.current_step;
            // Remove 'active' class from precious pagination button
            var active_a = this.pagination_el.getElementsByClassName('active');
            if (active_a.length) active_a[0].className = '';
            // Set 'active' class for current pagination button
            var current_a = this.__search_in_doc("a[text()='"+(step+1)+"']", this.pagination_el)
            current_a.className = 'active';
        }

        // Hide/Show chart/canvas depends from step
        var chart = document.getElementById(this.chart_id);
        if (step == 0) {
            this.canvas_area.style.display = 'None';
            if (chart) chart.style.display = 'block';
        } else {
            this.canvas_area.style.display = 'block';
            if (chart) chart.style.display = 'None';
        }

        var current_step = this.steps[step];
        this.title_el.innerHTML = current_step.text;
        this.sub_title_el.innerHTML = current_step.subTitle;
        this.below_text.innerHTML = current_step.below_text;
        if (current_step.additional_note !== undefined){
            this.additional_note.innerHTML = current_step.additional_note;
        } else {
            this.additional_note.innerHTML = '';
        }
        this.clearCanvas();
        this.drawArea(current_step);

        // Attach text to canvas for specified step
        if (step == 1) {
            this.canvas.font = "20px 'PT Sans'";
            this.canvas.clearRect(this.width/2-335, this.height/2-40, this.width/2+190, this.height/2-93)
            this.canvas.fillText(
                'Each box equals $100 million in unfunded pension promises ',
                this.width/2-310, this.height/2 - 5
            );
            // Build arrow
            this.canvas.lineWidth = 2;
            this.canvas.strokeStyle = '#000';
            var arrow_h = this.height/2 - 9.5;
            var arrow_w = this.width/2+242;
            this.canvas.moveTo(arrow_w, arrow_h);
            this.canvas.lineTo(arrow_w - 10, arrow_h - 7);
            this.canvas.moveTo(arrow_w, arrow_h);
            this.canvas.lineTo(arrow_w - 10, arrow_h + 7);
            this.canvas.moveTo(arrow_w, arrow_h);
            this.canvas.lineTo(arrow_w - 25, arrow_h);
            this.canvas.stroke();

            this.canvas.font = "37px 'PT Sans'";
            this.canvas.fillText('◼︎', this.width/2+250, this.height/2+6);
        }
    },
    
    buildPagination: function () {
        for (var i=1; i<this.steps.length + 1; i++) {
            var list_el = document.createElement('a');
            // Set active page
            if (i == 1) {
                list_el.className = 'active';
                this.canvas_area.style.display = 'None';
            }
            list_el.data = i - 1;
            list_el.addEventListener('click', this.performStep.bind(this), false);
            list_el.textContent = i;
            this.pagination_el.appendChild(list_el);
        }
    },

    buildChart: function () {
        if (google.visualization != undefined) {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Unfunded Liabilities'],
                ['2000',  -1.460],
                ['2001',  0.431],
                ['2002',  4.041],
                ['2003',  9.895],
                ['2004',  12.814],
                ['2005',  12.478],
                ['2006',  12.803],
                ['2007',  13.043],
                ['2008',  16.812],
                ['2009',  16.937],
                ['2010',  20.108],
                ['2011',  23.549],
                ['2012',  22.710],
                ['2013',  25.797],
                ['2014',  25.874],
                ['2015',  26.824],
                ['2016',  32.241],
            ]);

            var options = {
                title: "All Divisions Combined, including Denver Public Schools",
                titlePosition: 'none',
                //width:500,
                // height:400,
                hAxis: { 
                    // title: 'Year', 
                    titleTextStyle: { color: '#333' },
                    textStyle : {
                        fontSize: 13 
                    }
                },
                vAxis: { title: 'Unfunded Liability in $ Billions', 
                    minValue: 0, 
                    ticks: [-5, 0, 5, 10, 15, 20, 25, 30, 35],
                    textStyle : {
                        fontSize: 13 
                    }
                },
                chartArea: { 
                    width: this.width 
                    // , width:830
                    // ,height: this.height 
                    ,left: 70
                    , top: 20 
                    , bottom: 30 
                    , right: 40 
                },
                colors: ['#FF0000'],
                legend: { position: 'none' }
            };

            var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }

    }
}
