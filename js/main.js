// DO COLOR MIXING WITH RED AND BLUE!!!! DO PURPLE!!!


$(document).ready(function() {
	d3.csv("data/crystal-palace-catalog-V3.csv", function(error, data) {
		colordict = populateClasses();
		//populateCountries();
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
      var count = 0;
      var locationdictionary = {};
      for (var a = 0; a < countryelements.length; a++) {
        if (countryelements[a].selected == true) {
          if (countryelements[a].text[0] != "\u2713") {
            var countrytext = countryelements[a].text;
            countryelements[a].text = "\u2713" + " " + countrytext;
          }
          countryvalues.push(countryelements[a].value);
          locationdictionary[countryelements[a].value] = [];
        } else if (countryelements[a].selected == false && countryelements[a].text[0] == "\u2713") {
          countryelements[a].text = countryelements[a].text.substring(2, countryelements[a].text.length);
        }
      }
      for (var b = 0; b < classelements.length; b++) {
        if (classelements[b].selected == true) {
          classvalues.push(classelements[b].value);
          locationdictionary[classelements[b].value] = [];
        }
      }
      for (var i = 0; i < data.length; i++) {
        // have to check if the item's country corresponds with any of the countries selected
        var countryfound = false;
        var classfound = false;
        if (classvalues.length == 0) {
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              var result = fillMapItem([countryvalues[a]], data[i], locationdictionary, count, "query1");
              count = result[0]
              locationdictionary = result[1];
              countryfound = true;
            }
          }
        } else if (countryvalues.length == 0) { 
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              var result = fillMapItem([classvalues[b]], data[i], locationdictionary, count, "query1");
              count = result[0];
              locationdictionary = result[1];
              classfound = true;
            }
          }
        } else {
          // going to need to do an AND operator
          for (var a = 0; a < countryvalues.length; a++) {
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                var result = fillMapItem([countryvalues[a], classvalues[b]], data[i], locationdictionary, count, "query1");
                count = result[0];
                locationdictionary = result[1];
                classfound = true;
                countryfound = true;
              }
            }
          }
        }
        query1selected = colorItems(countryvalues, classvalues, locationdictionary, "query1");
        if (countryfound == false || classfound == false) {
          // then the data item is not in any of the countries selected and we can make sure that its color mapping
          // is transparent
          //massqueries = query1selected;
          //massqueries = massqueries.concat(query2selected);
          transparentMapItem(data[i], query1selected);
        }
      }
      displayResults(itemselected, 1, count);
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
        var locationdictionary = {};

        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
            locationdictionary[countryelements[a].value] = [];
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            if (classelements[b].text[0] != "\u2713") {
              var classtext = classelements[b].text;
              classelements[b].text = "\u2713" + " " + classtext;
            }
            classvalues.push(classelements[b].value);
            locationdictionary[classelements[b].value] = [];
          } else if (classelements[b].selected == false && classelements[b].text[0] == "\u2713") {
            classelements[b].text = classelements[b].text.substring(2, classelements[b].text.length);
          }
        }


        for (var i = 0; i < data.length; i++) {
          var classfound = false;
          var countryfound = false;


          if (classvalues.length == 0) {
            for (var a = 0; a < countryvalues.length; a++) {
              if (data[i].country == countryvalues[a]) {
                var result = fillMapItem([countryvalues[a]], data[i], locationdictionary, count, "query1");
                count = result[0]
                locationdictionary = result[1];
                countryfound = true;
              }
            }
          } else if (countryvalues.length == 0) { 
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].class == classvalues[b]) {
                var result = fillMapItem([classvalues[b]], data[i], locationdictionary, count, "query1");
                count = result[0];
                locationdictionary = result[1];
                classfound = true;
              }
            }
          } else {
            // going to need to do an AND operator
            for (var a = 0; a < countryvalues.length; a++) {
              for (var b = 0; b < classvalues.length; b++) {
                if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                  var result = fillMapItem([countryvalues[a], classvalues[b]], data[i], locationdictionary, count, "query1");
                  count = result[0];
                  locationdictionary = result[1];
                  classfound = true;
                  countryfound = true;
                }
              }
            }
          }
          query1selected = colorItems(countryvalues, classvalues, locationdictionary, "query1");
          if (countryfound == false || classfound == false) {
            // then the data item is not in any of the countries selected and we can make sure that its color mapping
            // is transparent
            //massqueries = query1selected;
            //massqueries = massqueries.concat(query2selected);
            transparentMapItem(data[i], query1selected);
          }
        }
        displayResults(itemselected, 1, count);
        var dimdiv = document.getElementById('dimensionality1');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });

      $('#countries2').on("change", { items: 'data' }, function(event) {
      var countryelements = $('#countries2 option');
      var classelements = $('#itemclasses2 option');
      query2selected = []; // the items that are selected in query 1
      var itemselected = [];
      var countryvalues = []; // the countries that are selected
      var classvalues = []; // the classes that are selected
      var count = 0;
      var locationdictionary = {};
      for (var a = 0; a < countryelements.length; a++) {
        if (countryelements[a].selected == true) {
          if (countryelements[a].text[0] != "\u2713") {
            var countrytext = countryelements[a].text;
            countryelements[a].text = "\u2713" + " " + countrytext;
          }
          countryvalues.push(countryelements[a].value);
          locationdictionary[countryelements[a].value] = [];
        } else if (countryelements[a].selected == false && countryelements[a].text[0] == "\u2713") {
          countryelements[a].text = countryelements[a].text.substring(2, countryelements[a].text.length);
        }
      }
      for (var b = 0; b < classelements.length; b++) {
        if (classelements[b].selected == true) {
          classvalues.push(classelements[b].value);
          locationdictionary[classelements[b].value] = [];
        }
      }
      for (var i = 0; i < data.length; i++) {
        // have to check if the item's country corresponds with any of the countries selected
        var countryfound = false;
        var classfound = false;
        if (classvalues.length == 0) {
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              var result = fillMapItem([countryvalues[a]], data[i], locationdictionary, count, "query2");
              count = result[0]
              locationdictionary = result[1];
              countryfound = true;
            }
          }
        } else if (countryvalues.length == 0) { 
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              var result = fillMapItem([classvalues[b]], data[i], locationdictionary, count, "query2");
              count = result[0];
              locationdictionary = result[1];
              classfound = true;
            }
          }
        } else {
          // going to need to do an AND operator
          for (var a = 0; a < countryvalues.length; a++) {
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                var result = fillMapItem([countryvalues[a], classvalues[b]], data[i], locationdictionary, count, "query2");
                count = result[0];
                locationdictionary = result[1];
                classfound = true;
                countryfound = true;
              }
            }
          }
        }
        query2selected = colorItems(countryvalues, classvalues, locationdictionary, "query2");
        if (countryfound == false || classfound == false) {
          // then the data item is not in any of the countries selected and we can make sure that its color mapping
          // is transparent
          //massqueries = query1selected;
          //massqueries = massqueries.concat(query2selected);
          transparentMapItem(data[i], query2selected);
        }
      }
      displayResults(itemselected, 1, count);
      var dimdiv = document.getElementById('dimensionality1');
      dimdiv.innerHTML = 'The number of items: ' + count.toString();
     });

  
      $('#itemclasses2').on("change", { items: 'data' }, function(event) {
        var countryelements = $('#countries2 option');
        var classelements = $('#itemclasses2 option');
        query2selected = [];
        var itemselected = [];
        var countryvalues = [];
        var classvalues = [];
        var count = 0;
        var locationdictionary = {};

        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
            locationdictionary[countryelements[a].value] = [];
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            if (classelements[b].text[0] != "\u2713") {
              var classtext = classelements[b].text;
              classelements[b].text = "\u2713" + " " + classtext;
            }
            classvalues.push(classelements[b].value);
            locationdictionary[classelements[b].value] = [];
          } else if (classelements[b].selected == false && classelements[b].text[0] == "\u2713") {
            classelements[b].text = classelements[b].text.substring(2, classelements[b].text.length);
          }
        }


        for (var i = 0; i < data.length; i++) {
          var classfound = false;
          var countryfound = false;


          if (classvalues.length == 0) {
            for (var a = 0; a < countryvalues.length; a++) {
              if (data[i].country == countryvalues[a]) {
                var result = fillMapItem([countryvalues[a]], data[i], locationdictionary, count, "query2");
                count = result[0]
                locationdictionary = result[1];
                countryfound = true;
              }
            }
          } else if (countryvalues.length == 0) { 
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].class == classvalues[b]) {
                var result = fillMapItem([classvalues[b]], data[i], locationdictionary, count, "query2");
                count = result[0];
                locationdictionary = result[1];
                classfound = true;
              }
            }
          } else {
            // going to need to do an AND operator
            for (var a = 0; a < countryvalues.length; a++) {
              for (var b = 0; b < classvalues.length; b++) {
                if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                  var result = fillMapItem([countryvalues[a], classvalues[b]], data[i], locationdictionary, count, "query2");
                  count = result[0];
                  locationdictionary = result[1];
                  classfound = true;
                  countryfound = true;
                }
              }
            }
          }
          query1selected = colorItems(countryvalues, classvalues, locationdictionary, "query2");
          if (countryfound == false || classfound == false) {
            // then the data item is not in any of the countries selected and we can make sure that its color mapping
            // is transparent
            //massqueries = query1selected;
            //massqueries = massqueries.concat(query2selected);
            transparentMapItem(data[i], query2selected);
          }
        }
        displayResults(itemselected, 1, count);
        var dimdiv = document.getElementById('dimensionality1');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });

    });
	});

function fillMapItem(matchedattrs, dataitem, locationdictionary, count, query) {
  var objectsection = dataitem.Division;
  objectsection = objectsection.split(",");
  if (objectsection[0] == false) {
    return [count, locationdictionary];
    // meaning that this item is not an actual item in the dataset, and we've reached the end,
    // since we can't place an item without knowing if it's even on the 1st or 2nd floor
  }
  var itemclass = dataitem.class;
  var courtsquares = dataitem.Court;
  courtsquares = courtsquares.split(",");
  count++;
  if (courtsquares[0]) {
    courtsquares.forEach(function(square) {
      objectsection.forEach(function(section) {
        square = square.trim();
        section = section.trim();
        if (section !== "Gallery" && Number.isInteger(parseInt(square))) {
          // if the section is not on the 2nd floor and has a number attached to it, such as A1 or whatever
          if (parseInt(square) < 30) {
            //if (query === "query1") {
            //  $('#' + section + square).css({ fill: "red"});
            //} else {
            //  $('#' + section + square).css({ fill: "blue"});//colordict[itemclass]});
            //}
            //$('#' + section + square).css({ fill: "pink"});
            //queryselected.push(section + square);
            for (var i = 0; i < matchedattrs.length; i++) {
              if (locationdictionary[matchedattrs[i]].indexOf(section + square) < 0) {
                locationdictionary[matchedattrs[i]].push(section + square);
              }
            }
          } else {}
        } else if (section === "Gallery" && Number.isInteger(parseInt(square)) == false && square) {
          // if the section is on the second floor and does not have a number, as it should be
          //$('.' + gallerydict[square]).css({ fill: colordict[itemclass]});
          //$('.' + gallerydict[square]).css({ fill: "pink"});
          //if (query === "query1") {
          //  $('.' + gallerydict[square]).css({ fill: "red"});
          //} else {
          //  $('.' + gallerydict[square]).css({ fill: "blue"});
          //}
          //queryselected.push(gallerydict[square]);
          for (var i = 0; i < matchedattrs.length; i++) {
            if (locationdictionary[matchedattrs[i]].indexOf(gallerydict[square]) < 0) {
              locationdictionary[matchedattrs[i]].push(gallerydict[square]);
            }
          }
        } else if (square === "Machine Arcade") {
          // if the section is in the machine arcade section
          //if (query === "query1") {
          //  $('#machinearcade').css({ fill: "red" });
          //} else {
          //  $('#machinearcade').css({ fill: "blue" });
          //}
          //queryselected.push('machinearcade');
          for (var i = 0; i < matchedattrs.length; i++) {
            if (locationdictionary[matchedattrs[i]].indexOf("machinearcade") < 0) {
              locationdictionary[matchedattrs[i]].push("machinearcade");
            }
          }
        } else if ((section === "A" || section === "B" || section === "C" || section === "D") && Number.isInteger(parseInt(square)) == false) {
          // if the section has an "A" or "B" etc. associatec with it but no number then just leave it out
        }
      });
    });
  }
  return [count, locationdictionary];
}

function locationinDictionary(location, locationdictionary) {
  Object.keys(locationdictionary).forEach(function(key) {
    if (locationdictionary[key].indexOf(location)) {
      return true;
    }
  });
  return false;
}

function transparentMapItem(dataitem, queryselected) {

  var objectsection = dataitem.Division;
  objectsection = objectsection.split(",");
  if (objectsection[0] == false) {
    return;
    // meaning that this item is not an actual item in the dataset, and we've reached the end,
    // since we can't place an item without knowing if it's even on the 1st or 2nd floor
  }
  var itemclass = dataitem.class;
  var courtsquares = dataitem.Court;
  courtsquares = courtsquares.split(",");
  if (courtsquares[0]) {
    courtsquares.forEach(function(square) {
      objectsection.forEach(function(section) {
        square = square.trim();
        section = section.trim();
        if (section !== "Gallery" && Number.isInteger(parseInt(square))) {
          if (parseInt(square) < 30) {// && locationinDictionary(section + square, locationdictionary) == false) {
            if (queryselected.indexOf(section + square) < 0) {
              $('.' + section + square).css({ fill: "transparent"});
            }
          } else {}
        } else if (section === "Gallery" && Number.isInteger(square) == false && square) {
          if (queryselected.indexOf(gallerydict[square]) < 0) {//locationinDictionary(gallerydict[square]) == false) {
            $('.' + gallerydict[square]).css({ fill: "transparent"});  
          }
        } else if (square === "Machine Arcade") {
          if (queryselected.indexOf('machinearcade') < 0) {//locationinDictionary('machinearcade', locationdictionary) == false) {
            $('.machinearcade').css({ fill: "transparent" });
          }
        } else if ((section === "A" || section === "B" || section === "C" || section === "D") && Number.isInteger(square) == false) {}
      });
    });
  }
}

function colorItems(countryvalues, classvalues, locationdictionary, query) {
  var countries = [];
  var classes = [];
  countryvalues.forEach(function(country) {
    countries = countries.concat(locationdictionary[country]);
  });
  classvalues.forEach(function(category) {
    classes = classes.concat(locationdictionary[category]);
  });
  if (classes.length == 0) {
    if (query === "query1") {
      countries.forEach(function(loc) {
        $('.' + loc).css({ fill: "red" });
      });
    } else {
      countries.forEach(function(loc) {
        $('.' + loc).css({ fill: "blue" });
      });
    }
    return countries;
  } else if (countries.length == 0) {
    if (query == "query1") {
      classes.forEach(function(loc) {
        $('.' + loc).css({ fill: "red" });
      });
    } else {
      classes.forEach(function(loc) {
        $('.' + loc).css({ fill: "blue" });
      });
    }
    return classes;
  } else {
    var commonloc = checkIntersection(classes, countries);
    if (query === "query1") {
      commonloc.forEach(function(loc) {
        $('.' + loc).css({ fill: "red"});
      });
    } else {
      commonloc.forEach(function(loc) {
        $('.' + loc).css({fill: "blue" });
      });
    }
    return commonloc;
  }
}

function checkIntersection(array1, array2) {
  var result = [];
  array1.forEach(function(a1) {
    array2.forEach(function(b1) {
      if (a1 === b1) {
        result.push(a1);
      }
    });
  });
  return result;
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
		//if (i < 5) {
		//	colordict[i] = 'aqua';
		//} else if (i >= 5 && i < 11) {
		//	colordict[i] = 'lime'
		//} else if (i >= 11 && i < 21) {
		//	colordict[i] = 'yellow'
		//} else if (i >= 21 && i < 30) {
		//	colordict[i] = 'magenta'
		//} else {
		//	colordict[i] = 'blue'
		//}
	}
	return colordict;
};

/*function populateCountries() {
	var countries = ["USA", "UK", "Germany", "France", "Belgium", "Austria", "British-Guiana", 
		"Holland", "Italy", "Newfoundland", "Switzerland", "Swedish-Norway"]
	for (var i = 0; i < countries.length; i++)
	{
		// $('#countries').append($('<option>', {
  //   		value: countries[i],
  //   		text: countries[i]
		// }));
    $('#countries2').append($('<option>', {
        value: countries[i],
        text: countries[i]
    }));
	}
}*/

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
  		if (d.Court === "Machine Arcade") {
  			datadict[d.Court].push(d);
  		} else if (squares != null) {
  			 squares.forEach(function(section) {
          // what is this business of 2009???
          if (parseInt(section) <= 30) {
  				  datadict[objectsection + section].push(d);
          }
  			});
  		}
  	});
	return datadict;
}

function displayResults(dataitems, query, count) {
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
  if (count > 0) {
    $('#query'+query.toString()+'button').trigger( "click" );
  }
}

function openQueryTable(evt, queryName) {
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