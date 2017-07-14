// DO COLOR MIXING WITH RED AND BLUE!!!! DO PURPLE!!!


$(document).ready(function() {
	d3.csv("data/crystal-palace-catalog-V3.csv", function(error, data) {
		populateClasses();
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

    datadict = filldataArray(data);
    buildfloorplan(data, datadict);
    alert("This is best used on Chrome. Use the start over button to clear a selected query.");
    var massqueries = [];
    var query1selected = []; // the items on the map that are selected and colored
    var query2selected = [];

    $('#countries').on("change", { items: 'data' }, function(event) {
			var countryelements = $('#countries option');
      var classelements = $('#itemclasses option');
      var oppcountryelements = $('#countries2 option');
      var oppclasselements = $('#itemclasses2 option');
      query1selected = []; // the items that are selected in query 1
      var itemselected = [];
      var countryvalues = []; // the countries that are selected
      var classvalues = []; // the classes that are selected
      var count = 0; // the count
      var locationdictionary = {}; // the dictionary of locations per option
      var countryfound = false; // country found in query
      var classfound = false; // class found in query
      var oppcountryfound = false; // country found in other query
      var oppclassfound = false; // class found in other query      
      for (var a = 0; a < countryelements.length; a++) {
        if (countryelements[a].selected == true) {
          countryfound = true;
          if (countryelements[a].text[0] != "\u2713") {
            var countrytext = countryelements[a].text;
            countryelements[a].text = "\u2713" + " " + countrytext;
          }
          countryvalues.push(countryelements[a].value);
          locationdictionary[countryelements[a].value] = [];
        } else if (countryelements[a].selected == false && countryelements[a].text[0] == "\u2713") {
          countryelements[a].text = countryelements[a].text.substring(2, countryelements[a].text.length);
        }
        if (oppcountryelements[a].selected == true) {
          oppcountryfound = true;
        }
      }
      for (var b = 0; b < classelements.length; b++) {
        if (classelements[b].selected == true) {
          classfound = true;
          classvalues.push(classelements[b].value);
          locationdictionary[classelements[b].value] = [];
        }
        if (oppclasselements[b].selected == true) {
          oppclassfound = true;
        }
      }
      console.log(classvalues);
      console.log(countryvalues);
      for (var i = 0; i < data.length; i++) {
        // have to check if the item's country corresponds with any of the countries selected
        // if statements are for filling in the location dictionary
        if (classvalues.length == 0) {
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              itemselected.push(data[i]);
              var result = fillMapItem([data[i].country], data[i], locationdictionary, count, "query1");
              count = result[0]
              locationdictionary = result[1];
            }
          }
        } else if (countryvalues.length == 0) { 
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              itemselected.push(data[i]);
              var result = fillMapItem([data[i].class], data[i], locationdictionary, count, "query1");
              count = result[0];
              locationdictionary = result[1];
            }
          }
        } else {
          // going to need to do an AND operator
          console.log('AND');
          for (var a = 0; a < countryvalues.length; a++) {
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                itemselected.push(data[i]);
                var result = fillMapItem([data[i].country, data[i].class], data[i], locationdictionary, count, "query1");
                count = result[0];
                locationdictionary = result[1];
                classfound = true;
                countryfound = true;
              }
            }
          }
        }
        if (countryfound == false || classfound == false) {
          // then the data item is not in any of the countries selected and we can make sure that its color mapping
          // is transparent
          transparentMapItem(data[i], query1selected);
        } 
      }
      query1selected = colorItems(countryvalues, classvalues, locationdictionary, query2selected, "query1");
      displayResults(itemselected, 1, count);
			var dimdiv = document.getElementById('dimensionality1');
			dimdiv.innerHTML = 'The number of items: ' + count.toString();
	   });

  
      $('#itemclasses').on("change", { items: 'data' }, function(event) {
        var countryelements = $('#countries option');
        var classelements = $('#itemclasses option');
        var oppcountryelements = $('#countries2 option');
        var oppclasselements = $('#itemclasses2 option');
        query1selected = [];
        var itemselected = [];
        var countryvalues = [];
        var classvalues = [];
        var count = 0;
        var locationdictionary = {};
        var countryfound = false;
        var classfound = false;
        var oppcountryfound = false;
        var oppclassfound = false;
        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
            locationdictionary[countryelements[a].value] = [];
            countryfound = true;
          }
          if (oppcountryelements[a].selected == true) {
            oppcountryfound = true;
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            classfound = true;
            if (classelements[b].text[0] != "\u2713") {
              var classtext = classelements[b].text;
              classelements[b].text = "\u2713" + " " + classtext;
            }
            classvalues.push(classelements[b].value);
            locationdictionary[classelements[b].value] = [];
          } else if (classelements[b].selected == false && classelements[b].text[0] == "\u2713") {
            classelements[b].text = classelements[b].text.substring(2, classelements[b].text.length);
          }
          if (oppclasselements[b].selected == true) {
            oppclassfound = true;
          }
        }


        for (var i = 0; i < data.length; i++) {
          if (classvalues.length == 0) {
            for (var a = 0; a < countryvalues.length; a++) {
              if (data[i].country == countryvalues[a]) {
                itemselected.push(data[i]);
                var result = fillMapItem([data[i].country], data[i], locationdictionary, count, "query1");
                count = result[0]
                locationdictionary = result[1];
              }
            }
          } else if (countryvalues.length == 0) { 
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].class == classvalues[b]) {
                itemselected.push(data[i]);
                var result = fillMapItem([data[i].class], data[i], locationdictionary, count, "query1");
                count = result[0];
                locationdictionary = result[1];
              }
            }
          } else {
            // going to need to do an AND operator
            for (var a = 0; a < countryvalues.length; a++) {
              for (var b = 0; b < classvalues.length; b++) {
                if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                  itemselected.push(data[i]);
                  var result = fillMapItem([data[i].country, data[i].class], data[i], locationdictionary, count, "query1");
                  count = result[0];
                  locationdictionary = result[1];
                }
              }
            }
          }
          if (countryfound) {
            // then the data item is not in any of the countries selected and we can make sure that its color mapping
            // is transparent
            transparentMapItem(data[i], query1selected);
          } 
        }
        console.log(locationdictionary);
        console.log(query2selected);
        query1selected = colorItems(countryvalues, classvalues, locationdictionary, query2selected, "query1");
        displayResults(itemselected, 1, count);
        var dimdiv = document.getElementById('dimensionality1');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });

      $('#countries2').on("change", { items: 'data' }, function(event) {
      var countryelements = $('#countries2 option');
      var classelements = $('#itemclasses2 option');
      var oppcountryelements = $('#countries option');
      var oppclasselements = $('#itemclasses option');
      query2selected = []; // the items that are selected in query 1
      var itemselected = [];
      var countryvalues = []; // the countries that are selected
      var classvalues = []; // the classes that are selected
      var count = 0; // the count
      var locationdictionary = {}; // the dictionary of locations per option
      var countryfound = false; // country found in query
      var classfound = false; // class found in query
      var oppcountryfound = false; // country found in other query
      var oppclassfound = false; // class found in other query      
      for (var a = 0; a < countryelements.length; a++) {
        if (countryelements[a].selected == true) {
          countryfound = true;
          if (countryelements[a].text[0] != "\u2713") {
            var countrytext = countryelements[a].text;
            countryelements[a].text = "\u2713" + " " + countrytext;
          }
          countryvalues.push(countryelements[a].value);
          locationdictionary[countryelements[a].value] = [];
        } else if (countryelements[a].selected == false && countryelements[a].text[0] == "\u2713") {
          countryelements[a].text = countryelements[a].text.substring(2, countryelements[a].text.length);
        }
        if (oppcountryelements[a].selected == true) {
          oppcountryfound = true;
        }
      }
      for (var b = 0; b < classelements.length; b++) {
        if (classelements[b].selected == true) {
          classfound = true;
          classvalues.push(classelements[b].value);
          locationdictionary[classelements[b].value] = [];
        }
        if (oppclasselements[b].selected == true) {
          oppclassfound = true;
        }
      }
      console.log(classvalues);
      console.log(countryvalues);
      for (var i = 0; i < data.length; i++) {
        // have to check if the item's country corresponds with any of the countries selected
        // if statements are for filling in the location dictionary
        if (classvalues.length == 0) {
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              itemselected.push(data[i]);
              var result = fillMapItem([data[i].country], data[i], locationdictionary, count, "query2");
              count = result[0]
              locationdictionary = result[1];
            }
          }
        } else if (countryvalues.length == 0) { 
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              itemselected.push(data[i]);
              var result = fillMapItem([data[i].class], data[i], locationdictionary, count, "query2");
              count = result[0];
              locationdictionary = result[1];
            }
          }
        } else {
          // going to need to do an AND operator
          console.log('AND');
          for (var a = 0; a < countryvalues.length; a++) {
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                itemselected.push(data[i]);
                var result = fillMapItem([data[i].country, data[i].class], data[i], locationdictionary, count, "query2");
                count = result[0];
                locationdictionary = result[1];
                classfound = true;
                countryfound = true;
              }
            }
          }
        }
        if (countryfound == false || classfound == false) {
          // then the data item is not in any of the countries selected and we can make sure that its color mapping
          // is transparent
          transparentMapItem(data[i], query1selected);
        } 
      }
      console.log(locationdictionary);
      console.log(query1selected)
      query2selected = colorItems(countryvalues, classvalues, locationdictionary, query1selected, "query2");
      displayResults(itemselected, 1, count);
      var dimdiv = document.getElementById('dimensionality1');
      dimdiv.innerHTML = 'The number of items: ' + count.toString();
     });

  
      $('#itemclasses2').on("change", { items: 'data' }, function(event) {
        var countryelements = $('#countries2 option');
        var classelements = $('#itemclasses2 option');
        var oppcountryelements = $('#countries option');
        var oppclasselements = $('#itemclasses option');
        query2selected = [];
        var itemselected = [];
        var countryvalues = [];
        var classvalues = [];
        var count = 0;
        var locationdictionary = {};
        var countryfound = false;
        var classfound = false;
        var oppcountryfound = false;
        var oppclassfound = false;
        for (var a = 0; a < countryelements.length; a++) {
          if (countryelements[a].selected == true) {
            countryvalues.push(countryelements[a].value);
            locationdictionary[countryelements[a].value] = [];
            countryfound = true;
          }
          if (oppcountryelements[a].selected == true) {
            oppcountryfound = true;
          }
        }

        for (var b = 0; b < classelements.length; b++) {
          if (classelements[b].selected == true) {
            classfound = true;
            if (classelements[b].text[0] != "\u2713") {
              var classtext = classelements[b].text;
              classelements[b].text = "\u2713" + " " + classtext;
            }
            classvalues.push(classelements[b].value);
            locationdictionary[classelements[b].value] = [];
          } else if (classelements[b].selected == false && classelements[b].text[0] == "\u2713") {
            classelements[b].text = classelements[b].text.substring(2, classelements[b].text.length);
          }
          if (oppclasselements[b].selected == true) {
            oppclassfound = true;
          }
        }


        for (var i = 0; i < data.length; i++) {
          if (classvalues.length == 0) {
            for (var a = 0; a < countryvalues.length; a++) {
              if (data[i].country == countryvalues[a]) {
                itemselected.push(data[i]);
                var result = fillMapItem([data[i].country], data[i], locationdictionary, count, "query2");
                count = result[0]
                locationdictionary = result[1];
              }
            }
          } else if (countryvalues.length == 0) { 
            for (var b = 0; b < classvalues.length; b++) {
              if (data[i].class == classvalues[b]) {
                itemselected.push(data[i]);
                var result = fillMapItem([data[i].class], data[i], locationdictionary, count, "query2");
                count = result[0];
                locationdictionary = result[1];
              }
            }
          } else {
            // going to need to do an AND operator
            for (var a = 0; a < countryvalues.length; a++) {
              for (var b = 0; b < classvalues.length; b++) {
                if (data[i].country == countryvalues[a] && data[i].class == classvalues[b]) {
                  itemselected.push(data[i]);
                  var result = fillMapItem([data[i].country, data[i].class], data[i], locationdictionary, count, "query2");
                  count = result[0];
                  locationdictionary = result[1];
                }
              }
            }
          }
          if (countryfound == false || classfound == false) {
            // then the data item is not in any of the countries selected and we can make sure that its color mapping
            // is transparent
            transparentMapItem(data[i], query1selected);
          } 
        }
        console.log(locationdictionary);
        console.log(query1selected);
        query2selected = colorItems(countryvalues, classvalues, locationdictionary, query1selected, "query2");
        displayResults(itemselected, 1, count);
        var dimdiv = document.getElementById('dimensionality1');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
      });

    });
	});

function fillMapItem(matchedattrs, dataitem, locationdictionary, count, query) {
  //matchedattrs is the attribute(s) of the dataitem that corresponds to the query
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
            for (var i = 0; i < matchedattrs.length; i++) {
              if (locationdictionary[matchedattrs[i]].indexOf(section + square) < 0) {
                locationdictionary[matchedattrs[i]].push(section + square);
              }
            }
          } else {}
        } else if (section === "Gallery" && Number.isInteger(parseInt(square)) == false && square) {
          for (var i = 0; i < matchedattrs.length; i++) {
            if (locationdictionary[matchedattrs[i]].indexOf(gallerydict[square]) < 0) {
              locationdictionary[matchedattrs[i]].push(gallerydict[square]);
            }
          }
        } else if (square === "Machine Arcade") {
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

function colorItems(countryvalues, classvalues, locationdictionary, oppositequery, query) {
  var countries = [];
  var classes = [];
  console.log(oppositequery);
  countryvalues.forEach(function(country) {
    countries = countries.concat(locationdictionary[country]);
  });
  classvalues.forEach(function(category) {
    classes = classes.concat(locationdictionary[category]);
  });
  if (classes.length == 0) {
    if (oppositequery.length != 0) {
      // then we know that we have to do an AND between the items of the two queries
      console.log('here first');
      var commonloc = checkIntersection(countries, oppositequery);
      commonloc.forEach(function(loc) {
        $('.' + loc).css({ fill: "purple" });
      });
      return commonloc;
    } 
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
    if (oppositequery.length != 0) {
      // then we know that we have to do an AND between the items of the two queries
      console.log('yeehooo');
      var commonloc = checkIntersection(classes, oppositequery);
      commonloc.forEach(function(loc) {
        $('.' + loc).css({ fill: "purple" });
      });
      return commonloc;
    } 
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
    console.log('here');
    var commonloc = checkIntersection(classes, countries);
    console.log(commonloc);
    if (oppositequery.length != 0) {
    // then we know that we have to do an AND between the items of the two queries
      console.log(oppositequery.length);
      var combinedlocs = checkIntersection(commonloc, oppositequery);
      combinedlocs.forEach(function(loc) {
        $('.' + loc).css({ fill: "purple" });
      });
      return combinedlocs;
    } 
    clearFloors();
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
  /* checks for the common strings into two arrays containing strings */
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
  /* populates the classes in the drop down menu */
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
	}
};

function filldataArray(data) {
  /* fills out the data dictionary to be used in the floor plan */
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
  /* displays the results in the table */
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
  /*opens the query table by clicking on the tab*/
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

function clearFloors() {
  var secondfloor = ['ENG','NG','NEG','NWG','EEG','EG','SEG','ESG','SG','SWG','EWG','WG'];
  var letters = ['A', 'B', 'C', 'D'];
  for (var i = 0; i < 30; i++) {
    letters.forEach(function(letter) {
      $('.' + letter + String(i)).css({ fill: "transparent" });
    });
  }
  secondfloor.forEach(function(loc) {
    $('.' + loc).css({ fill: "transparent" });
  });
  $('.machinearcade').css({ fill: "transparent" });
}

function clearAll(evt) {
  /* clears everything in the sense that all of the squares in the visualization have the color removed, 
   and the sets the options to all be false and removes checkmarks*/
  query1selected = [];
  query2selected = [];
  clearFloors();
  var classes = $('#countries option');
  var countries = $('#itemclasses option');
  var classes2 = $('#countries2 option');
  var countries2 = $('#itemclasses2 option');
  for (var a = 0; a < classes.length; a++) {
    if (classes[a].selected == true) {
      if (classes[a].text[0] == "\u2713") {
        classes[a].text = classes[a].text.substring(2, classes[a].text.length);
      }
      classes[a].selected = false;
    }
    if (classes2[a].selected == true) {
      if (classes2[a].text[0] == "\u2713") {
        classes2[a].text = classes2[a].text.substring(2, classes2[a].text.length);
      }
    }
  }
  for (var b = 0; b < countries.length; b++) {
    if (countries[b].selected == true) {
      if (countries[b].text[0] == "\u2713") {
        countries[b].text = countries[b].text.substring(2, countries[b].text.length);
      }
      countries[b].selected = false;
    }
    if (countries2[b].selected == true) {
      if (countries2[b].text[0] == "\u2713") {
        countries2[b].text = countries2[b].text.substring(2, countries2[b].text.length);
      }
      countries2[b].selected = false;
    }
  }
  displayResults([], 1, 0);
  var dimdiv = document.getElementById('dimensionality1');
  dimdiv.innerHTML = 'The number of items: 0';
}