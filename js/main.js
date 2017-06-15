$(document).ready(function() {
	d3.csv("data/crystal-palace-catalog-V3.csv", function(error, data) {
		colordict = populateClasses();
		populateCountries();
    gallerydict = {
      'Extreme North': 'ENG',
      'North': 'NG',
      'Northeast': 'NEG',
      'Northwest': 'NWG',
      'Extreme East': 'EEG',
      'East': 'EG',
      'Southeast': 'SEG',
      'Extreme South': 'ESG',
      'South': 'SG',
      'Southwest': 'SWG',
      'Extreme West': 'EWG',
      'West': 'WG',
    }
    hexcodes = {
      "pink": [255,192,203],
      "magenta": [255,0,255],
      "blue": [0,0,255],
      "aqua": [0,255,255],
      "lime": [0,255,0],
      "yellow": [255,255,0],
      "maroon": [128,0,0],
      "green": [0,128,0],
      "black": [0,0,0],
      "white": [255,255,255]
    }
    coloradder = {
      // mixing of colors

    }
    datadict = filldataArray(data);
    buildfloorplan(data, datadict);
    var massqueries = [];
    var query1selected = []; // the items on the map that are selected and colored
    var query2selected = [];
    $('#countries').on("change", { items: 'data' }, function(event) {
			var countryelements = $('#countries option');
      var classelements = $('#itemclasses option');
      query1selected = []; // the items that are selected in query 1
      var itemselected = [];
      var countryvalues = []; // the countries that are selected
      var classvalues = []; // the classes that are selected
      // right now everything works as an AND, if both class and country are selected then it will do an AND, 
      // since the two queries allow an OR to be done, if you want a class or a country, you select a class for
      // 1 query and a country for the other (check to make sure this logic is true)
      var count = 0;
      for (var a = 0; a < countryelements.length; a++) {
        if (countryelements[a].selected == true) {
          countryvalues.push(countryelements[a].value);
        }
      }
      for (var b = 0; b < classelements.length; b++) {
        if (classelements[b].selected == true) {
          classvalues.push(classelements[b].value);
        }
      }
      for (var i = 0; i < data.length; i++) {
        // have to check if the item's country corresponds with any of the countries selected
        var countryfound = false;
        var classfound = false;
        for (var a = 0; a < countryvalues.length; a++) {
          if (data[i].country == countryvalues[a]) {
            colorMapItem(itemselected, data[i], query1selected, colordict, count);
            countryfound = true;
          }
        }
        if (countryfound == false) {
          // then the data item is not in any of the countries selected and we can make sure that its color mapping
          // is transparent
          massqueries = query1selected;
          massqueries = massqueries.concat(query2selected);
          transparentMapItem(data[i], massqueries);
        }
        for (var b = 0; b < classvalues.length; b++) {
          if (data[i].class == classvalues[b]) {
            colorMapItem(itemselected, data[i], query1selected, colordict, count);
            classfound = true;
          }
        }
        if (classfound == false) {
          // then the data item's class is not in any of the classes selected and we can make sure it's transparent
          massqueries = query1selected;
          massqueries = massqueries.concat(query2selected);
          transparentMapItem(data[i], massqueries);
        }
      }
      displayResults(itemselected, 1);
			var dimdiv = document.getElementById('dimensionality1');
			dimdiv.innerHTML = 'The number of items: ' + count.toString();
	   });

  
      $('#itemclasses').on("change", { items: 'data' }, function(event) {
        var countryelements = $('#countries option');
        var classelements = $('#itemclasses option');
        query1selected = [];
        var itemselected = [];
        var countryvalues = [];
        var classvalues = [];
        var count = 0;

        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            classvalues.push(classelements[b].value);
          }
        }


        for (var i = 0; i < data.length; i++) {
          var classfound = false;
          var countryfound = false;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              colorMapItem(itemselected, data[i], query1selected, colordict, count);
              countryfound = true;
            }
          }
          if (countryfound == false) {
            massqueries = query1selected;
            massqueries = massqueries.concat(query2selected);
            transparentMapItem(data[i], massqueries);
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              colorMapItem(itemselected, data[i], query1selected, colordict, count);
              classfound = true;
            }
          }
          if (classfound == false) {
            massqueries = query1selected;
            massqueries = massqueries.concat(query2selected);
            transparentMapItem(data[i], massqueries);
          }
        }
        displayResults(itemselected, 1);
        var dimdiv = document.getElementById('dimensionality1');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });


      $('#countries2').on("change", { items: 'data' }, function(event) {
        var countryelements = $('#countries2 option');
        var classelements = $('#itemclasses2 option');
        query2selected = [];
        var itemselected = [];
        var countryvalues = [];
        var classvalues = [];
        var count = 0;

        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            classvalues.push(classelements[b].value);
          }
        }

        for (var i = 0; i < data.length; i++) {
          var countryfound = false;
          var classfound = false;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              colorMapItem(itemselected, data[i], query2selected, colordict, count);
              countryfound = true;
            }
          }
          if (countryfound == false) {
            massqueries = query2selected;
            massqueries = massqueries.concat(query1selected);
            transparentMapItem(data[i], massqueries);
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              colorMapItem(itemselected, data[i], query2selected, colordict, count);
              classfound = true;
            }
          }
          if (classfound == false) {
            massqueries = query2selected;
            massqueries = massqueries.concat(query1selected);
            transparentMapItem(data[i], massqueries);
          }
        }
        displayResults(itemselected, 2);
        var dimdiv = document.getElementById('dimensionality2');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });

      $('#itemclasses2').on("change", { items: 'data' }, function(event) {
        var countryelements = $('#countries2 option');
        var classelements = $('#itemclasses2 option');
        //var countryitems = 0;
        query2selected = [];
        var itemselected = [];

        var countryvalues = [];
        var classvalues = [];
        var count = 0;

        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            classvalues.push(classelements[b].value);
          }
        }


        for (var i = 0; i < data.length; i++) {
          var countryfound = false;
          var classfound = false;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              colorMapItem(itemselected, data[i], query2selected, colordict, count);
              countryfound = true;
            }
          }
          if (countryfound == false) {
            massqueries = query2selected;
            massqueries = massqueries.concat(query1selected);
            transparentMapItem(data[i], massqueries);
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              colorMapItem(itemselected, data[i], query2selected, colordict, count);
              classfound = true;
            }
          }
          if (classfound == false) {
            massqueries = query2selected;
            massqueries = massqueries.concat(query1selected);
            transparentMapItem(data[i], massqueries);
          }
        }
        displayResults(itemselected, 2);
        var dimdiv = document.getElementById('dimensionality2');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });
    });
	});

function colorMapItem(itemselected, dataitem, queryselected, colordict, count) {
  itemselected.push(dataitem);
  var objectsection = dataitem.Division;
  objectsection = objectsection.split(", ");
  if (objectsection[0] == false) {
    return;
    // meaning that this item is not an actual item in the dataset, and we've reached the end,
    // since we can't place an item without knowing if it's even on the 1st or 2nd floor
  }
  var itemclass = dataitem.class;
  var courtsquares = dataitem.Court;
  courtsquares = courtsquares.split(", ");
  count++;
  if (courtsquares[0]) {
    courtsquares.forEach(function(square) {
      objectsection.forEach(function(section) {
        if (section !== "Gallery" && Number.isInteger(parseInt(square))) {
          // if the section is not on the 2nd floor and has a number attached to it, such as A1 or whatever
          if (parseInt(square) < 30) {
            $('#' + section + square).css({ fill: colordict[itemclass]})
            //$('#' + section + square).css({ fill: "pink"});
            queryselected.push(section + square);
          } else {
            // just color the whole section
            for (var index = 1; index < 30; index++) {
              $('#' + section + String(index)).css({ fill: colordict[itemclass]});
              //$('#' + section + String(index)).css({ fill: "pink"});
              queryselected.push(section + String(index));
            }
          }
        } else if (section === "Gallery" && Number.isInteger(parseInt(square)) == false) {
          $('.' + gallerydict[square]).css({ fill: colordict[itemclass]});
          //$('.' + gallerydict[square]).css({ fill: "pink"});
          queryselected.push(gallerydict[square]);
        } else if (square === "Machine Arcade") {
          $('#machinearcade').css({ fill: "pink" });
          queryselected.push('machinearcade');
        } else if ((section === "A" || section === "B" || section === "C" || section === "D") && Number.isInteger(parseInt(square)) == false) {
          for (var index = 1; index < 30; index++) {
            $('#' + section + String(index)).css({ fill: colordict[itemclass]});
            //$('#' + section + String(index)).css({ fill: "pink"});
            queryselected.push(section + String(index));
          }
        }
      });
    });
  }
}

function transparentMapItem(dataitem, queryselected) {
  var objectsection = dataitem.Division;
  objectsection = objectsection.split(", ");
  if (objectsection[0] == false) {
    return;
  }
  var courtsquares = dataitem.Court;
  courtsquares = courtsquares.split(", ");
  var classitems = dataitem.class;
  if (courtsquares[0]) {
    courtsquares.forEach(function(square) {
      objectsection.forEach(function(section) {
        if (section !== "Gallery" && Number.isInteger(square)) {
          if (parseInt(square) < 30) {
            if (queryselected.indexOf(section + square) < 0) {
              $('#' + section + square).css({ fill: "transparent" });
            }
          } else {
            // just color the whole section
            for (var index = 1; index < 30; index++) {
              if (queryselected.indexOf(section + String(index)) < 0) {
                $('#' + section + String(index)).css({ fill: "transparent"});
              }
            }
          }
        } else if (section === "Gallery" && Number.isInteger(square) == false) {
          if (queryselected.indexOf(gallerydict[square]) < 0) {
            $('.' + gallerydict[square]).css({ fill: "transparent"});  
          }
        } else if (square === "Machine Arcade") {
          if (queryselected.indexOf('machinearcade') < 0) {
            $('#machinearcade').css({ fill: "transparent" });
          }
        } else if ((section === "A" || section === "B" || section === "C" || section === "D") && Number.isInteger(square) == false) {
          for (var index = 1; index < 30; index++) {
            if (queryselected.indexOf(section + String(index)) < 0) {
              $('#' + section + String(index)).css({ fill: "transparent"});
            }
          }
        }
      });
    });
  }
}




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
    $('#itemclasses2').append($('<option>', {
        value: i.toString(),
        text: i.toString() + ": " + classesdict[i]
    }));
		if (i < 5) {
			colordict[i] = 'aqua';
		} else if (i >= 5 && i < 11) {
			colordict[i] = 'lime'
		} else if (i >= 11 && i < 21) {
			colordict[i] = 'yellow'
		} else if (i >= 21 && i < 30) {
			colordict[i] = 'magenta'
		} else {
			colordict[i] = 'blue'
		}
	}
	return colordict;
};

function extractRGB(rgbstring) {
  var re = /(.*rgb\s+)(.*)(\s+\).*)/;
  var newtext = rgbstring.replace(re, "$2");
  var rgbtext = newtext.split(", ");
  return [parseInt(rgbtext[0]), parseInt(rgbtext[1]), parseInt(rgbtext[2])];
}

function populateCountries() {
	var countries = ["USA", "UK", "Germany", "France", "Belgium", "Austria", "British-Guiana", 
		"Holland", "Italy", "Newfoundland", "Switzerland", "Swedish-Norway"]
	for (var i = 0; i < countries.length; i++)
	{
		$('#countries').append($('<option>', {
    		value: countries[i],
    		text: countries[i]
		}));
    $('#countries2').append($('<option>', {
        value: countries[i],
        text: countries[i]
    }));
	}
}

function filldataArray(data) {
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
      //console.log(d);
      //console.log(squares);
  		if (d.Court === "Machine Arcade") {
  			datadict[d.Court].push(d);
  		} else if (squares != null) {
  			 squares.forEach(function(section) {
          //console.log(datadict);
          //console.log(objectsection+section);
          // what is this business of 2009???
          if (parseInt(section) <= 30) {
  				  datadict[objectsection + section].push(d);
          }
  			});
  		}
  	});
	return datadict;
}

function displayResults(dataitems, query) {
  $("#resultstable" + query.toString() + " tr").remove();
  document.getElementById('resultstable' + query.toString()).innerHTML = "";
  var tablediv = document.getElementById('resultstable' + query.toString());
  var tablestring = "<tr><th>Class</th><th>Description</th><th>Name</th><th>Place</th></tr>";
  for (var i = 0; i < dataitems.length; i++) {
    tablestring = tablestring + "<tr><td>" + dataitems[i].class + "</td>";
    tablestring = tablestring + "<td>" + dataitems[i].product + "</td>";
    tablestring = tablestring + "<td>" + dataitems[i].person + "</td>";
    tablestring = tablestring + "<td>" + dataitems[i]['Town-Country'] + "</td></tr>";
  }
  document.getElementById('results' + query.toString()).style.height = "200px";
  tablediv.innerHTML = tablestring;
}

function ColorLuminance(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}

function colorMixer(rgb1,rgb2) {
  var r = (rgb1[0] + rgb2[0]) / 2;
  var g = (rgb1[1] + rgb2[1]) / 2;
  var b = (rgb1[2] + rgb2[2]) / 2;
  return [Math.round(r),Math.round(g),Math.round(b)];
}

function openQueryTable(evt, queryName) {
  //console.log('here1!');
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  var x = document.getElementById(queryName);
  if (x.style.display === 'none') {
      x.style.display = 'block';
  } else {
      x.style.display = 'none';
  }
  if (queryName === 'query1') {
    var y = document.getElementById('query2');
    y.style.display = 'none';
  } else if (queryName == 'query2') {
    var y = document.getElementById('query1');
    y.style.display = 'none';
  }
}