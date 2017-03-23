$(document).ready(function() {
	d3.csv("data/crystal-palace-catalog.csv", function(error, data) {
		colordict = populateClasses();
		populateCountries();
	    console.log(data);
	    datadict = filltooltipArray(data);
	    console.log(datadict);
	    buildfloorplan(data, datadict);
	    $('#countries').on("change", { items: 'data' }, function(event) {
  			var objects = [];
  			var elements = $('#countries option');
  			var countryitems = 0;
  			for (var j = 0; j < elements.length; j++) {
  				if (elements[j].selected == true) {
  					var country = elements[j].value;
  					if (document.getElementById("andoperation").checked == true) {
  						for (var h = 0; h < $('#itemclasses option').length; h++) {
  							if ($('#itemclasses option')[h].selected == true) {
  								var classitems = $('#itemclasses option')[h].value;
  								for (var i = 0; i < data.length; i++) {
  									if (data[i].class == classitems && data[i].country == country) {
  										var objectsection = data[i].Division;
  										var numberPattern = /\d+/g;
										var squares = data[i].Court.match(numberPattern);
  										if (data[i].Court === "Machine Arcade") {
  											$('#machinearcade').css({ fill: "blue" });
  											countryitems++;
  											console.log('country');
	  									} else if (squares != null) {
  											squares.forEach(function(d) {
  												$('#' + objectsection + d).css({ fill: colordict[classitems] });
  												countryitems++;
  												console.log('country');
  											});
  										}
  									}
  								}
  							}
  						}
  					}
  					else {
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
  			var counted = 0
  			for (var j = 0; j < elements.length; j++) {
  				if (elements[j].selected == true) {
  					var classitems = elements[j].value;
  					if (document.getElementById("andoperation").checked == true) {
  						for (var h = 0; h < $('#countries option').length; h++) {
  							if ($('#countries option')[h].selected == true) {
  								var country = $('#countries option')[h].value;
  								for (var i = 0; i < data.length; i++) {
  									if (data[i].class == classitems && data[i].country == country) {
  										var objectsection = data[i].Division;
  										var numberPattern = /\d+/g;
										var squares = data[i].Court.match(numberPattern);
  										if (data[i].Court === "Machine Arcade") {
  											$('#machinearcade').css({ fill: "pink" });
  											counted++;
  											selected.push('machinearcade');
  											console.log('class');
  										} else if (squares != null) {
  											squares.forEach(function(d) {
  												$('#' + objectsection + d).css({ fill: colordict[classitems] });
  												counted++;
  												selected.push(objectsection + d);
  												console.log('class');
  											});
  										}
  									}
  								}
  							}
  						}
  					} else {
  						for (var i = 0; i < data.length; i++) {
  							if (data[i].class == classitems) {
  								var objectsection = data[i].Division;
  								var numberPattern = /\d+/g;
								var squares = data[i].Court.match(numberPattern);
  								if (data[i].Court === "Machine Arcade") {
  									$('#machinearcade').css({ fill: "blue" });
  									counted++;
  									selected.push('machinearcade');
  								} else if (squares != null) {
  									squares.forEach(function(d) {
  										$('#' + objectsection + d).css({ fill: colordict[classitems] });
  										selected.push(objectsection + d);
  										counted++;
  									});
  								}
  							}
  						}
  					}
  				}
  			}
  			var dimdiv = document.getElementById('dimensionality');
  			dimdiv.innerHTML = 'The number of items: ' + counted.toString();
  			for (var j = 0; j < elements.length; j++) {
      			if (elements[j].selected == false) {
      				var classitems = elements[j].value;
      				for (var k = 0; k < data.length; k++) {
  						if (data[k].class == classitems) {
  							var objectsection = data[k].Division;
  							var numberPattern = /\d+/g;
							var squares = data[k].Court.match(numberPattern);
  							if (data[k].Court === "Machine Arcade") {
  								if (document.getElementById('machinearcade').style.fill != "transparent" && selected.indexOf('machinearcade') == -1) {
  									$('#machinearcade').css({ fill: "transparent" });
  									console.log('here');
  								}
  							} else if (squares != null) {
  								squares.forEach(function(d) {
  									if (document.getElementById(objectsection + d).style.fill != "transparent" && selected.indexOf(objectsection + d) == -1) {
  										$('#' + objectsection + d).css({ fill: "transparent" });
  										console.log('here here');
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
	colordict = {}
	classesdict = {
		1: 'Minerals, Mining and Metallurgy', 
		2: 'Chemical and Pharmaceutical',
		3: 'Substances used as Food',
		4: 'Vegetable and Animal Substances',
		5: 'Machines and Railway',
		6: 'Machinery and Tools for Manufacturing',
		7: 'Civil Engineering, Architectural and Building',
		8: 'Naval Architecture and Military Engineering',
		9: 'Agricultural, Horticultural, and Dairy Machinery', 
		10: 'Philosophical Instruments (including Daguerreotypes)', 
		11: 'Manufacturers of Cotton',
		12: 'Manufactures of Wool',
		13: 'Manufactures of Silk',
		14: 'Manufactures of Flax and Hemp',
		15: 'Mixed Fabrics',
		16: 'Leather, Furs, and Hair',
		17: 'Paper and Stationery, Types, Printing and Bookbinding',
		18: 'Dyed and Printed Fabrics',
		19: 'Tapestry &c.',
		20: 'Wearing Apparel',
		21: 'Cutlery and Edge Tools',
		22: 'Iron, Brass, Pewter, and General Hardware',
		23: 'Work in Precious Metals',
		24: 'Glass Manufactures',
		25: 'Porcelain and other Ceramic Manufactures',
		26: 'Decorative Furniture and Upholstery',
		27: 'Manufactures in Marble, Slate, etc.',
		28: 'Other Manufactures from Animal and Vegetable Substances',
		29: 'Miscellaneous Manufactures',
		30: 'Musical Instruments' }

	for (var i = 1; i < 31; i++)
	{
		$('#itemclasses').append($('<option>', {
    		value: i.toString(),
    		text: i.toString() + ": " + classesdict[i]
		}));
		if (i < 5) {
			colordict[i] = '#00FFFF';
		} else if (i >= 5 && i < 11) {
			colordict[i] = '#00FF00'
		} else if (i >= 11 && i < 21) {
			colordict[i] = '#FFFF00'
		} else if (i >= 21 && i < 30) {
			colordict[i] = '#FF00FF'
		} else {
			colordict[i] = '#0000FF'
		}
	}
	return colordict;
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