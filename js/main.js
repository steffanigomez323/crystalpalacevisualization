$(document).ready(function() {
	populateClasses();
	populateCountries();
	d3.csv("data/crystal-palace-catalog.csv", function(error, data) {
	    console.log(data);
	    datadict = filltooltipArray(data);
	    console.log(datadict);
	    buildfloorplan(data, datadict);
	    $('#countries').on("change", { items: 'data' }, function(event) {
  			var objects = [];
  			var elements = $('#countries option');
  			var countryitems = 0;
  			for (var h = 0; h < elements.length; h++) {
  				if (elements[h].selected == true) {
  					var country = elements[h].value;
  					for (var i = 0; i < data.length; i++) {
  						if (data[i].country == country) {
  							var objectsection = data[i].Division;
  							var numberPattern = /\d+/g;
							var squares = data[i].Court.match(numberPattern);
  							if (data[i].Court === "Machine Arcade") {
  								$('#machinearcade').css({ fill: "pink" });
  								countryitems++;
  							} else if (squares != null) {
  								squares.forEach(function(d) {
  									$('#' + objectsection + d).css({ fill: "pink" });
  									countryitems++;
  								});
  							}
  						}
  					}
  				}
  			}
  			var dimdiv = document.getElementById('dimensionality');
  			dimdiv.innerHTML = 'The number of items: ' + countryitems.toString();
  			for (var j = 0; j < elements.length; j++) {
      			if (elements[j].selected == false) {
      				var country = elements[j].value;
      				for (var k = 0; k < data.length; k++) {
  						if (data[k].country == country) {
  							var objectsection = data[k].Division;
  							var numberPattern = /\d+/g;
							var squares = data[k].Court.match(numberPattern);
  							if (data[k].Court === "Machine Arcade") {
  								$('#machinearcade').css({ fill: "transparent" });
  							} else if (squares != null) {
  								squares.forEach(function(d) {
  									$('#' + objectsection + d).css({ fill: "transparent" });
  								});
  							}
  						}
  					}
      			}
    		}
	    });
	    $('#itemclasses').on("change", { extra: 'extraneous' }, function(event) {
  			var objects = [];
  			var elements = $('#itemclasses option');
  			var selected = []
  			var classitems = 0;
  			for (var h = 0; h < elements.length; h++) {
  				if (elements[h].selected == true) {
  					var classitems = elements[h].value;
  					for (var i = 0; i < data.length; i++) {
  						if (data[i].class == classitems) {
  							var objectsection = data[i].Division;
  							var numberPattern = /\d+/g;
							var squares = data[i].Court.match(numberPattern);
  							if (data[i].Court === "Machine Arcade") {
  								$('#machinearcade').css({ fill: "blue" });
  								selected.push('machinearcade');
  								classitems++;
  							} else if (squares != null) {
  								squares.forEach(function(d) {
  									$('#' + objectsection + d).css({ fill: "blue" });
  									selected.push(objectsection + d);
  									classitems++;
  								});
  							}
  						}
  					}
  				}
  			}
  			var dimdiv = document.getElementById('dimensionality');
  			dimdiv.innerHTML = 'The number of items: ' + classitems.toString();
  			for (var j = 0; j < elements.length; j++) {
      			if (elements[j].selected == false) {
      				var classitems = elements[j].value;
      				for (var k = 0; k < data.length; k++) {
  						if (data[k].class == classitems) {
  							var objectsection = data[k].Division;
  							var numberPattern = /\d+/g;
							var squares = data[k].Court.match(numberPattern);
  							if (data[k].Court === "Machine Arcade") {
  								if (document.getElementById('machinearcade').style.fill == "blue" && selected.indexOf('machinearcade') == -1) {
  									$('#machinearcade').css({ fill: "transparent" });
  								}
  							} else if (squares != null) {
  								squares.forEach(function(d) {
  									if (document.getElementById(objectsection + d).style.fill == "blue" && selected.indexOf(objectsection + d) == -1) {
  										$('#' + objectsection + d).css({ fill: "transparent" });
  									}
  								});
  							}
  						}
  					}
      			}
    		}
	    });
	});
});

function populateClasses() {
	for (var i = 1; i < 32; i++)
	{
		$('#itemclasses').append($('<option>', {
    		value: i.toString(),
    		text: i.toString()
		}));
	}
};

function populateCountries() {
	var countries = ["USA", "UK", "Germany", "France", "Belgium", "Austria", "British-Guiana", 
		"Holland", "Italy", "Newfoundland", "Switzerland", "Swedish-Norway"]
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
  			squares.forEach(function(section) {
  				datadict[objectsection + section].push(d);
  			});
  		}
  	});
	return datadict;
}

function displayBoth() {
  	
}