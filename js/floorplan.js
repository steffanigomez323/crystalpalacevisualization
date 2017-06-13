function scalespixels(range, x, newrange) {
	var perc = x / range;
	return newrange * perc
}

function buildfloorplan(data, datadict) {
	var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 350,
    height = 350;


	var firstsvg = d3.select("#firstfloor")
		.attr("width", width+margin.left+margin.right)
	    .attr("height", height+margin.top+margin.bottom);

	var secondsvg = d3.select("#secondfloor")
		.attr("width", width+margin.left+margin.right)
		.attr("height", height+margin.top+margin.bottom);

	var firstfloor = firstsvg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "transparent")
		.attr("stroke", "black")
		.attr("stroke-width", 2);

	
	var secondfloor = secondsvg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "transparent")
		.attr("stroke", "black")
		.attr("stroke-width", 2);

	// now have to separate based on section and enter the data into the svg's so 
	// we can visualize the tooltip with the dictionary of section squares to objects

	var machinearcade = firstsvg.append("rect")
	 	.attr("x", scalespixels(700, 7, 350))
	 	.attr("y", 0)
	 	.attr("width", scalespixels(700, 693, 350))
	 	.attr("height", scalespixels(700, 39, 350))
	 	.attr("id", "machinearcade")
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

    var picturegallery = secondsvg.append("rect")
	 	.attr("x", 3.5)
	 	.attr("y", 0)
	 	.attr("width", 346.5)
	 	.attr("height", 19.5)
	 	.attr("id", "picturegallery")
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	var firstleftcbox = firstsvg.append("rect")
	 	.attr("x", 0)
	 	.attr("y", 19.5)
	 	.attr("width", 71.5)
	 	.attr("height", 43.5)
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	 var secondleftcbox = secondsvg.append("rect")
	 	.attr("x", 0)
	 	.attr("y", scalespixels(700, 39, 350))
	 	.attr("width", scalespixels(700, 143, 350))
	 	.attr("height", 43.5)
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	var firstrightcbox = firstsvg.append("rect")
	 	.attr("x", scalespixels(700, 557, 350))
	 	.attr("y", scalespixels(700, 39, 350))
	 	.attr("width", scalespixels(700, 143, 350))
	 	.attr("height", scalespixels(700, 87, 350))
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	var secondrightcbox = secondsvg.append("rect")
	 	.attr("x", scalespixels(700, 557, 350))
	 	.attr("y", scalespixels(700, 39, 350))
	 	.attr("width", scalespixels(700, 143, 350))
	 	.attr("height", scalespixels(700, 87, 350))
	 	.attr("fill", "transparent")
	 	.attr("stroke", "black")
	 	.attr("stroke-width", 2);

	var firstoctogonfloor = firstsvg.append('polygon')
	     .attr('points', scalespixels(700, 230, 350).toString() + ", " + scalespixels(700, 39, 350).toString() + " " + scalespixels(700, 230, 350).toString() + ", " + 
	     	scalespixels(700, 39, 350).toString() + " " + scalespixels(700, 469, 350).toString() + ", " + scalespixels(700, 39, 350).toString() + " " + scalespixels(700, 629, 350).toString() + ", " + 
	     	scalespixels(700, 199, 350).toString() + " " + scalespixels(700, 629, 350).toString() + ", " + scalespixels(700, 431, 350).toString() + " " + scalespixels(700, 469, 350).toString() + ", " +
	     	scalespixels(700, 591, 350).toString() + " " + scalespixels(700, 230, 350) + ", " + scalespixels(700, 591, 350).toString() + " " + scalespixels(700, 70, 350).toString() + ", " + 
	     	scalespixels(700, 431, 350).toString() + " " + scalespixels(700, 70, 350).toString() + ", " + scalespixels(700, 199, 350).toString())
	     .attr("fill", "transparent")
	     .attr("stroke", "black")
	     .attr("stroke-width", 2);

	var secondoctogonfloor = secondsvg.append('polygon')
	     .attr('points', scalespixels(700, 230, 350).toString() + ", " + scalespixels(700, 39, 350).toString() + " " + scalespixels(700, 470, 350).toString() + ", " +  
	     	scalespixels(700, 39, 350).toString() + " " + scalespixels(700, 630, 350) + ", " + scalespixels(700, 199, 350).toString() + " " + scalespixels(700, 630, 350).toString() + ", " + 
	     	scalespixels(700, 439, 350) + " " + scalespixels(700, 470, 350).toString() + ", " + scalespixels(700, 599, 350).toString() + " " + scalespixels(700, 230, 350).toString() + ", " +  
	     	scalespixels(700, 599, 350).toString() + " " + scalespixels(700, 70, 350) + ", " + scalespixels(700, 439, 350).toString() + " " + scalespixels(700, 70, 350).toString() + ", " + 
	     	scalespixels(700, 199, 350))//'230, 39 470, 39 630, 199 630, 439 470, 599 230, 599 70, 439 70, 199')
	     .attr("fill", "transparent")
	     .attr("stroke", "black")
	     .attr("stroke-width", 2);

	var squarewidth = scalespixels(700, 40, 350);
		squareheight = scalespixels(700, 40, 350);

	// drawing section A, which does not have a #20
	var Aoriginalx = scalespixels(700, 230, 350);
	var A1x = Aoriginalx, 
		A1y = scalespixels(700, 239, 350);
	for (var i = 1; i < 6; i++)
 	{
 		var square = firstsvg.append("rect")
 			.attr("x", A1x)
 			.attr("y", A1y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "transparent")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("id", "A" + i);
 		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
	A1y -= squareheight;
	A1x = Aoriginalx + squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", A1x)
			.attr("y", A1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "A" + i);
		firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);
		A1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (A1x+squarewidth).toString() + ', ' + A1y.toString() + " " + (A1x + squarewidth).toString() + ", " + (A1y + squareheight).toString() + " " + A1x.toString() + ", " + (A1y + squareheight).toString())
	    .attr("stroke", "black")
	    .attr("fill", "transparent")
	    .attr("stroke-width", 2)
	    .attr("id", "A" + i);
	firstsvg.append("text")
	    	.attr("x", A1x + (squarewidth / 2) - 10)
	    	.attr("y", A1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("A" + i);

	// starting on section B
	var Boriginalx = scalespixels(700, 429, 350);
	var B1x = Boriginalx,
		B1y = scalespixels(700, 239, 350);
	for (var i = 1; i < 6; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
	B1y -= squareheight;
	B1x = Boriginalx - squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", B1x)
			.attr("y", B1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "B" + i);
		firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);
		B1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (B1x+squarewidth).toString() + ', ' + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + (B1y+squareheight).toString() + " " + B1x.toString() + ", " + B1y.toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "B" + i);
	firstsvg.append("text")
	    	.attr("x", B1x + (squarewidth / 2) - 10)
	    	.attr("y", B1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("B" + i);

	// section D
	var Doriginalx = scalespixels(700, 230, 350);
	var D1x = Doriginalx, 
		D1y = scalespixels(700, 351, 350);
	for (var i = 1; i < 6; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
	D1y += squareheight;
	D1x = Doriginalx + squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", D1x)
			.attr("y", D1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "D" + i);
		firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);
		D1x -= squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (D1x+squarewidth).toString() + ', ' + D1y.toString() + " " + D1x.toString() + ", " + (D1y).toString() + " " + (D1x+squarewidth).toString() + ", " + (D1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "D" + i);
	firstsvg.append("text")
	    	.attr("x", D1x + (squarewidth / 2) - 10)
	    	.attr("y", D1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("D" + i);

	// starting on section C
	var Coriginalx = scalespixels(700, 429, 350);
	var C1x = Coriginalx,
		C1y = scalespixels(700, 351, 350);
	for (var i = 1; i < 6; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		firstsvg.append("text")
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
		var square = firstsvg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 18; i < 22; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 23; i < 26; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
	C1y += squareheight;
	C1x = Coriginalx - squarewidth;
	for (var i = 27; i < 29; i++)
	{
		var square = firstsvg.append("rect")
			.attr("x", C1x)
			.attr("y", C1y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "transparent")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("id", "C" + i);
		firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
	    	.text("C" + i);
		C1x += squarewidth;
	}
	var triangle = firstsvg.append('polygon')
	    .attr('points', (C1x+squarewidth).toString() + ', ' + C1y.toString() + " " + C1x.toString() + ", " + C1y.toString() + " " + C1x.toString() + ", " + (C1y+squareheight).toString())
	    .attr("fill", "transparent")
	    .attr("stroke", "black")
	    .attr("stroke-width", 2)
	    .attr("id", "C" + i);
	firstsvg.append("text")
	    	.attr("x", C1x + (squarewidth / 2) - 10)
	    	.attr("y", C1y + (squareheight / 2))
	    	.attr("dy", ".30em")
 	    	.text("C" + i);


 	// drawing west gallery, 2nd floor
 	// west and east gallery are switched
	var originalx = scalespixels(700, 270, 350);
	var x = originalx, 
		y = scalespixels(700, 159, 350) + squareheight;
	for (var i = 1; i < 3; i++)
 	{
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "NEG");
 		x -= squarewidth;
 	}
	x = originalx + (4 * squarewidth);
	for (var i = 3; i < 5; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SEG");
		x -= squarewidth;
	}
	x = originalx
	y -= squareheight
	for (var i = 5; i < 7; i++)
 	{
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "NEG");
 		x -= squarewidth;
 	}
	x = originalx + (4 * squarewidth);
	for (var i = 7; i < 9; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SEG");
		x -= squarewidth;
	}
 	y -= squareheight;
	x = originalx;
	for (var i = 9; i < 11; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NEG");
		x -= squarewidth;
	}
	x = originalx + (4 * squarewidth);
	for (var i = 11; i < 13; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SEG");
		x -= squarewidth;
	}
	y -= squareheight;
	x = originalx + (4 * squarewidth);
	// extreme east gallery
	for (var i = 13; i < 19; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "EG");
		x -= squarewidth;
	}
	y -= squareheight;
	x = originalx + (4 * squarewidth);
	for (var i = 19; i < 25; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "EEG");
		x -= squarewidth;
	}

	// drawing south gallery, 2nd floor
	var originalx = scalespixels(700, 270, 350) + (4 * squarewidth);
	var x = originalx, 
		y = scalespixels(700, 159, 350) + (squareheight);
	for (var i = 1; i < 4; i++)
 	{
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "SEG");
 		x += squarewidth;
 	}
 	for (var i = 4; i < 5; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "SG");
 		x += squarewidth;
 	}
 	for (var i = 5; i < 6; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "ESG");
		x += squarewidth;
	}
	x = originalx;
	y += squareheight;
	for (var i = 6; i < 9; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SEG");
		x += squarewidth;
	}
	for (var i = 9; i < 10; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SG");
		x += squarewidth;
	}
	for (var i = 10; i < 11; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "ESG");
		x += squarewidth;
	}
 	y += squareheight;
	x = originalx + (3 * squarewidth);
	for (var i = 11; i < 12; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SG");
		x += squarewidth;
	}
	for (var i = 12; i < 13; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "ESG");
		x += squarewidth;
	}
	x = originalx + (3 * squarewidth);
	y += squareheight
	for (var i = 13; i < 14; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SG");
		x += squarewidth;
	}
	for (var i = 14; i < 15; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "ESG");
		x += squarewidth;
	}
	x = originalx;
	y += squareheight;
	for (var i = 15; i < 18; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SWG");
		x += squarewidth;
	}
	for (var i = 18; i < 19; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SG");
		x += squarewidth;
	}
	for (var i = 19; i < 20; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "ESG");
		x += squarewidth;
	}
	x = originalx;
	y += squareheight;
	for (var i = 20; i < 23; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SWG");
		x += squarewidth;
	}
	for (var i = 23; i < 24; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SG");
		x += squarewidth;
	}
	for (var i = 24; i < 25; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "ESG");
		x += squarewidth;
	}


	// drawing north gallery, 2nd floor
	var originalx = scalespixels(700, 270, 350) - squarewidth;
	var x = originalx, 
		y = scalespixels(700, 159, 350) + (squareheight);
	for (var i = 1; i < 4; i++)
 	{
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "NEG");
 		x -= squarewidth;
 	}
 	for (var i = 4; i < 5; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "NG");
 		x -= squarewidth;
 	}
 	for (var i = 5; i < 6; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "ENG");
 		x -= squarewidth;
 	}
	x = originalx;
	y += squareheight;
	for (var i = 6; i < 9; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NEG");
		x -= squarewidth;
	}
	for (var i = 9; i < 10; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NG");
		x -= squarewidth;
	}
	for (var i = 10; i < 11; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "ENG");
 		x -= squarewidth;
 	}
 	y += squareheight;
	x = originalx - (3 * squarewidth);
	for (var i = 11; i < 12; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NG");
		x -= squarewidth;
	}
	for (var i = 12; i < 13; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "ENG");
 		x -= squarewidth;
 	}
	x = originalx - (3 * squarewidth);
	y += squareheight
	for (var i = 13; i < 14; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NG");
		x -= squarewidth;
	}
	for (var i = 14; i < 15; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "ENG");
 		x -= squarewidth;
 	}
	x = originalx;
	y += squareheight;
	for (var i = 15; i < 18; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NWG");
		x -= squarewidth;
	}
	for (var i = 18; i < 19; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NG");
		x -= squarewidth;
	}
	for (var i = 19; i < 20; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "ENG");
 		x -= squarewidth;
 	}
	x = originalx;
	y += squareheight;
	for (var i = 20; i < 23; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NWG");
		x -= squarewidth;
	}
	for (var i = 23; i < 24; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NG");
		x -= squarewidth;
	}
	for (var i = 24; i < 25; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "ENG");
 		x -= squarewidth;
 	}



	// drawing east gallery, 2nd floor
	// gotta switch east and west
	var originalx = scalespixels(700, 230, 350);
	var originaly = scalespixels(700, 439, 350) - (squareheight)
	var x = originalx, 
		y = originaly;
	for (var i = 1; i < 4; i++)
 	{
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "NWG");
 		y += squareheight;
 	}
 	for (var i = 4; i < 5; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "WG");
 		y += squareheight;
 	}
 	for (var i = 5; i < 6; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "EWG");
 		y += squareheight;
 	}
	x += squarewidth;
	y = originaly;
	for (var i = 6; i < 9; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "NWG");
		y += squareheight;
	}
	for (var i = 9; i < 10; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "WG");
		y += squareheight;
	}
	for (var i = 10; i < 11; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "EWG");
 		y += squareheight;
 	}
 	x += squarewidth;
	y = originaly + (3 * squarewidth);
	for (var i = 11; i < 12; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "WG");
		y += squareheight;
	}
	for (var i = 12; i < 13; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "EWG");
 		y += squareheight;
 	}
	y = originaly + (3 * squareheight);
	x += squarewidth
	for (var i = 13; i < 14; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "WG");
		y += squareheight;
	}
	for (var i = 14; i < 15; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "EWG");
 		y += squareheight;
 	}
	y = originaly;
	x += squarewidth;
	for (var i = 15; i < 18; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SWG");
		y += squareheight;
	}
	for (var i = 18; i < 19; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "WG");
		y += squareheight;
	}
	for (var i = 19; i < 20; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "EWG");
 		y += squareheight;
 	}
	y = originaly;
	x += squarewidth;
	for (var i = 20; i < 23; i++)
	{
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "SWG");
		y += squareheight;
	}
	for (var i = 23; i < 24; i++) {
		var square = secondsvg.append("rect")
			.attr("x", x)
			.attr("y", y)
			.attr("width", squarewidth)
			.attr("height", squareheight)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("class", "WG");
		y += squareheight;
	}
	for (var i = 24; i < 25; i++) {
 		var square = secondsvg.append("rect")
 			.attr("x", x)
 			.attr("y", y)
 			.attr("width", squarewidth)
 			.attr("height", squareheight)
 			.attr("fill", "none")
 			.attr("stroke", "black")
 			.attr("stroke-width", 2)
  			.attr("class", "EWG");
 		y += squareheight;
 	}

	var circlestairs = secondsvg.append("circle")
		.attr("cx", scalespixels(700, 350, 350))
		.attr("cy", scalespixels(700, 319, 350))
		.attr("r", squarewidth * 2)
		.attr("fill", "transparent")
		.attr("stroke", "black")
		.attr("stroke-width", 2)
		.attr("id", "circlestairs");
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