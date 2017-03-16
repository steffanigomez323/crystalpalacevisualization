$(document).ready(function() {
	populateClasses();
	populateCountries();
	d3.csv("data/crystal-palace-catalog.csv", function(error, data) {
	    console.log(data);
	    datadict = filltooltipArray(data);
	    console.log(datadict);
	    buildfloorplan(data, datadict);
	    //var tip = d3.tip()
	  	//	.attr('class', 'd3-tip')
	  	//	.offset([-10, 0]);
	  		//.style("opacity", 0);
	  	//d3.select("svg").call(tip);
	  	// var sections = ["A", "B", "C", "D"];
	  	// for (var i = 0; i < 4; i++)
	  	// {
	  	// 	for (var j = 1; j < 30; j++)
	  	// 	{
	  	// 		d3.select("#" + sections[i] + j.toString())
	  	// 			.on('mouseover', function(d) {
			 //            //tip.style("opacity", .9);      
			 //            tip.html("tooltip");//(formatTime(d.date) + "<br/>"  + d.close)  
			 //                //.style("left", (d3.event.pageX) + "px")     
			 //                //.style("top", (d3.event.pageY - 28) + "px");    
			 //        })
	  	// 			.on('mouseout', tip.hide);
	  	//	}
	//  	}
	});
});

function populateClasses() {
	for (var i = 1; i < 32; i++)
	{
		$('#classes').append($('<option>', {
    		value: i.toString(),
    		text: i.toString()
		}));
	}
};

function populateCountries() {
	var countries = ["USA", "UK", "Germany", "France", "Belgium", "Austria", "British-Guiana", 
		"Holland", "Italy", "Newfoundland", "Switzerland"]
	for (var i = 0; i < countries.length; i++)
	{
		$('#countries').append($('<option>', {
    		value: countries[i],
    		text: countries[i]
		}));
	}
}

function filltooltipArray(data)
{
	var datadict = {};
	var sections = ["A", "B", "C", "D"];
  	for (var i = 0; i < 4; i++)
  	{
  		for (var j = 1; j < 30; j++)
  		{
  			datadict[sections[i] + j.toString()] = [];
  		}
  	}
  	datadict["Machine Arcade"] = [];
  	data.forEach(function(d) {
  		var objectsection = d.Division;
  		var numberPattern = /\d+/g;
		var squares = d.Court.match(numberPattern);
  		if (d.Court === "Machine Arcade") {
  			datadict[d.Court].push(d);
  		} else if (squares != null) {
  			squares.forEach(function(d) {
  				datadict[objectsection + d].push(d);
  			});
  		}
  	});
	return datadict;
}