function buildfloorplan(data, datadict) {
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 700,
    height = 700;
    //width = 700 - margin.left - margin.right,
    //height = 700 - margin.top - margin.bottom;

	var svg = d3.select("svg")
		.attr("width", width+margin.left+margin.right)
	    .attr("height", height+margin.top+margin.bottom);

	// var floor = svg.selectAll(".floor")
	//     .data(datadict)
	//   .enter().append("g")
	//     .attr("class", "floor")
	//     .attr("transform", function(d) { return "translate(" + 0 + "," + 0 + ")"; });

	//var rectangles = svg.selectAll("rect")
	//	.data(datadict)
	//	.enter();
	//console.log(rectangles);
	var div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);

	var firstfloor = svg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "transparent")
		.attr("stroke", "black")
		.attr("stroke-width", 2);

	// now have to separate based on section and enter the data into the svg's so 
	// we can visualize the tooltip with the dictionary of section squares to objects

	var machinearcade = svg.append("rect")
	 	.attr("x", 7)
	 	.attr("y", 0)
	 	.attr("width", 693)
	 	.attr("height", 39)
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2)
	 	.on("mouseover", function(d) {	
	 		console.log(datadict["Machine Arcade"])	
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html(extractData(datadict, "Machine Arcade"))	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

	var leftcbox = svg.append("rect")
	 	.attr("x", 0)
	 	.attr("y", 39)
	 	.attr("width", 143)
	 	.attr("height", 87)
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	var rightcbox = svg.append("rect")
	 	.attr("x", 557)
	 	.attr("y", 39)
	 	.attr("width", 143)
	 	.attr("height", 87)
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	var octogonfloor = svg.append('polygon')
	     .attr('points', '230, 39 469, 39 629, 199 629, 431 469, 591 230, 591 70, 431 70, 199')
	     .attr("fill", "transparent")
	     .attr("stroke", "black")
	     .attr("stroke-width", 2);

	var squarewidth = 40, 
		squareheight = 40;

	// drawing section A, which does not have a #20
	var Aoriginalx = 230;
	var A1x = Aoriginalx, 
		A1y = 239;
	for (var i = 1; i < 6; i++)
 	{
 		var square = svg.append("rect")
 			.attr("x", A1x)
 			.attr("y", A1y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "transparent")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("id", "A" + i);
 		svg.append("text")
 	    	.attr("x", A1x + (squarewidth / 2) - 10)
 	    	.attr("y", A1y + (squareheight / 2))
 	    	.attr("dy", ".30em")
 	    	.text("A" + i);
 		A1x -= squarewidth;
 	}
 	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 6; i < 12; i++)
	{
		var square = svg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 12; i < 17; i++)
	{
		var square = svg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = svg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = svg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = svg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	svg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);

	// starting on section B
	var Boriginalx = 429;
	var B1x = Boriginalx,
		B1y = 239;
	for (var i = 1; i < 6; i++)
	{
		var square = svg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 6; i < 12; i++)
	{
		var square = svg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 12; i < 17; i++)
	{
		var square = svg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = svg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = svg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = svg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	svg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);

	// section D
	var Doriginalx = 230;
	var D1x = Doriginalx, 
		D1y = 351;
	for (var i = 1; i < 6; i++)
	{
		var square = svg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 6; i < 12; i++)
	{
		var square = svg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 12; i < 17; i++)
	{
		var square = svg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = svg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = svg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = svg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	svg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);

	// starting on section C
	var Coriginalx = 429;
	var C1x = Coriginalx,
		C1y = 351;
	for (var i = 1; i < 6; i++)
	{
		var square = svg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 6; i < 12; i++)
	{
		var square = svg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 12; i < 17; i++)
	{
		var square = svg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = svg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = svg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = svg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = svg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	svg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
 	    	.text("C" + i);
  }

  function extractData(dataobject, attr) {
  	var length = dataobject[attr].length;
  	if (length == 0) {
  		return null;
  	} else {
  		var infosentence = dataobject[attr][0].person + ", " + dataobject[attr][0].product + ", " + dataobject[attr][0].country;
  		for (var i = 1; i < length; i++) {
  			infosentence = infosentence.concat("\n");
  			infosentence = infosentence.concat(dataobject[attr][i].person + ", " + dataobject[attr][i].product + ", " + dataobject[attr][i].country);
  		}
  		return infosentence;
  	}
  }

  function displayCountry() {

  }

  function displayClass() {

  }

  function displayBoth() {
  	
  }