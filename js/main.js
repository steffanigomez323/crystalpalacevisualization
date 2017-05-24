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

    }
	    datadict = filltooltipArray(data);
	    buildfloorplan(data, datadict);
      var massqueries = [];
      var query1selected = [];
      var query2selected = [];
	    $('#countries').on("change", { items: 'data' }, function(event) {
  			var objects = [];
  			var countryelements = $('#countries option');
        var classelements = $('#itemclasses option');
  			//var countryitems = 0;
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
          var countryfound = false;
          var classfound = false;
          var country = null;
          var classitem = null;
          var num = 0;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              countryfound = true;
              country = countryvalues[a];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                              $('#' + section + square).css({ fill: "pink"});
                              query1selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                              $('.' + gallerydict[square]).css({ fill: "pink"});
                              query1selected.push(gallerydict[square]);

                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "pink" });
                      query1selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        
                              $('#' + section + String(index)).css({ fill: "pink"});
                              query1selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        
                              $('#' + section + String(index)).css({ fill: "pink"});
                              query1selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              classfound = true;
              classitem = classvalues[b];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                        $('#' + section + square).css({ fill: "pink"});
                        query1selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                      $('.' + gallerydict[square]).css({ fill: "pink"});
                      query1selected.push(gallerydict[square]);
                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "pink" });
                      query1selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: "pink"});
                        query1selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: "pink"});
                        query1selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
        }
        displayResults(itemselected, 1);
  			var dimdiv = document.getElementById('dimensionality1');
  			dimdiv.innerHTML = 'The number of items: ' + count.toString();
        massqueries = query1selected;
        massqueries = massqueries.concat(query2selected);
        console.log(query1selected);
        console.log(query2selected);
        console.log(massqueries);
  			for (var j = 0; j < countryelements.length; j++) {
          checkTransparentCountry(countryelements[j], massqueries, data, gallerydict);
    		}
	    });

  
      $('#itemclasses').on("change", { items: 'data' }, function(event) {
        var objects = [];
        var countryelements = $('#countries option');
        var classelements = $('#itemclasses option');
        //var countryitems = 0;
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
          var countryfound = false;
          var classfound = false;
          var country = null;
          var classitem = null;
          var num = 0;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              countryfound = true;
              country = countryvalues[a];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                        $('#' + section + square).css({ fill: colordict[classitem]});
                        query1selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                      $('.' + gallerydict[square]).css({ fill: "pink"});
                      query1selected.push(gallerydict[square]);
                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "green" });
                      query1selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query1selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query1selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              classfound = true;
              classitem = classvalues[b];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                        $('#' + section + square).css({ fill: colordict[classitem]});
                        query1selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                      $('.' + gallerydict[square]).css({ fill: "pink"});
                      query1selected.push(gallerydict[square]);
                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "green" });
                      query1selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query1selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query1selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
        }
        displayResults(itemselected, 1);
        var dimdiv = document.getElementById('dimensionality1');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
        massqueries = query1selected;
        massqueries = massqueries.concat(query2selected);
        console.log(query1selected);
        console.log(query2selected);
        console.log(massqueries);
        for (var j = 0; j < countryelements.length; j++) {
          checkTransparentCountry(countryelements[j], massqueries, data, gallerydict);
        }
      });


      $('#countries2').on("change", { items: 'data' }, function(event) {
        var objects = [];
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
          var country = null;
          var classitem = null;
          var num = 0;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              countryfound = true;
              country = countryvalues[a];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                              $('#' + section + square).css({ fill: "maroon"});
                              query2selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                              $('.' + gallerydict[square]).css({ fill: "maroon"});
                              query2selected.push(gallerydict[square]);

                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "maroon" });
                      query2selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        
                              $('#' + section + String(index)).css({ fill: "maroon"});
                              query2selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        
                              $('#' + section + String(index)).css({ fill: "maroon"});
                              query2selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              classfound = true;
              classitem = classvalues[b];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                        $('#' + section + square).css({ fill: "maroon"});
                        query1selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                      $('.' + gallerydict[square]).css({ fill: "maroon"});
                      query1selected.push(gallerydict[square]);
                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "maroon" });
                      query2selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: "maroon"});
                        query2selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: "maroon"});
                        query2selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
        }
        displayResults(itemselected, 2);
        var dimdiv = document.getElementById('dimensionality2');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
        massqueries = query2selected;
        massqueries = massqueries.concat(query1selected);
        console.log(query1selected);
        console.log(query2selected);
        console.log(massqueries);
        for (var j = 0; j < countryelements.length; j++) {
          checkTransparentCountry(countryelements[j], massqueries, data, gallerydict);
        }
      });

      $('#itemclasses2').on("change", { items: 'data' }, function(event) {
        var objects = [];
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
          var country = null;
          var classitem = null;
          var num = 0;
          for (var a = 0; a < countryvalues.length; a++) {
            if (data[i].country == countryvalues[a]) {
              countryfound = true;
              country = countryvalues[a];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                        $('#' + section + square).css({ fill: colordict[classitem]});
                        query2selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                      $('.' + gallerydict[square]).css({ fill: "maroon"});
                      query2selected.push(gallerydict[square]);
                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "green" });
                      query2selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query2selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query2selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
          for (var b = 0; b < classvalues.length; b++) {
            if (data[i].class == classvalues[b]) {
              classfound = true;
              classitem = classvalues[b];
              itemselected.push(data[i]);
              var objectsection = data[i].Division;
              objectsection = objectsection.split(", ");
              if (objectsection[0] == false) {
                break;
              }
              var courtsquares = data[i].Court;//.match(numberPattern); // Court
              courtsquares = courtsquares.split(", ");
              if (classitem == null) {
                classitem = data[i].class;
              }
              count++;
              if (courtsquares[0]) {
                courtsquares.forEach(function(square) {
                  objectsection.forEach(function(section) {
                    if (section !== "Gallery" && Number.isInteger(square)) {
                      if (parseInt(square) >= 30) {
                        $('#' + section + square).css({ fill: colordict[classitem]});
                        query2selected.push(section + square);
                      }
                    } else if (section === "Gallery" && Number.isInteger(square) == false) {
                      $('.' + gallerydict[square]).css({ fill: "maroon"});
                      query2selected.push(gallerydict[square]);
                    } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                      $('#machinearcade').css({ fill: "green" });
                      query2selected.push('machinearcade');
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query2selected.push(section + String(index));
                      }
                    }
                    else if (section !== "Gallery" && Number.isInteger(square) == false) {
                      for (var index = 1; index < 30; index++) {
                        $('#' + section + String(index)).css({ fill: colordict[classitem] });
                        query2selected.push(section + String(index));
                      }
                    }
                  });
                });
              }
            }
          }
        }
        displayResults(itemselected, 2);
        var dimdiv = document.getElementById('dimensionality2');
        dimdiv.innerHTML = 'The number of items: ' + count.toString();
        massqueries = query2selected;
        massqueries = massqueries.concat(query1selected);
        console.log(query1selected);
        console.log(query2selected);
        console.log(massqueries);
        for (var j = 0; j < countryelements.length; j++) {
          checkTransparentCountry(countryelements[j], massqueries, data, gallerydict);
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

function checkTransparentCountry(optionelement, queryselected, data, gallerydict) {
  if (optionelement.selected == false) {
  //if (countryelements[j].selected == false) {
    var country = optionelement.value;//countryelements[j].value;
    for (var k = 0; k < data.length; k++) {
      if (data[k].country == country) {
        var objectsection = data[k].Division;
        objectsection = objectsection.split(", ");
        if (objectsection[0] == false) {
          break;
        }
        var courtsquares = data[k].Court;
        courtsquares = courtsquares.split(", ");
        var classitems = data[k].class;
        if (courtsquares[0]) {
          courtsquares.forEach(function(square) {
            objectsection.forEach(function(section) {
              if (section !== "Gallery" && Number.isInteger(square)) {
                if (parseInt(square) >= 30) {
                  if (queryselected.indexOf(objectsection + d) < 0) {
                    $('#' + section + square).css({ fill: "transparent" });
                  }
                }
              } else if (section === "Gallery" && Number.isInteger(square) == false) {
                if (queryselected.indexOf(gallerydict[square]) < 0) {
                  $('.' + gallerydict[square]).css({ fill: "transparent"});                
                }
              } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                if (queryselected.indexOf(machinearcade) < 0) {
                  $('#machinearcade').css({ fill: "transparent" });
                }
                for (var index = 1; index < 30; index++) {
                  if (queryselected.indexOf(section + String(index)) < 0) {
                    $('#' + section + String(index)).css({ fill: "transparent" });
                  }
                }
              }
              else if (section !== "Gallery" && Number.isInteger(square) == false) {
                for (var index = 1; index < 30; index++) {
                  if (queryselected.indexOf(section + String(index)) < 0) {
                    $('#' + section + String(index)).css({ fill: "transparent" });
                  }
                }
              }
            });
          });
        }
      }
    }  
  }
}

function checkTransparentClass(optionelement, queryselected, data, gallerydict) {
  if (optionelement.selected == false) {
  //if (countryelements[j].selected == false) {
    var classselected = optionelement.value;//countryelements[j].value;
    for (var k = 0; k < data.length; k++) {
      if (data[k].class == classselected) {
        var objectsection = data[k].Division;
        objectsection = objectsection.split(", ");
        if (objectsection[0] == false) {
          break;
        }
        var courtsquares = data[k].Court;
        courtsquares = courtsquares.split(", ");
        var classitems = data[k].class;
        if (courtsquares[0]) {
          courtsquares.forEach(function(square) {
            objectsection.forEach(function(section) {
              if (section !== "Gallery" && Number.isInteger(square)) {
                if (parseInt(square) >= 30) {
                  if (queryselected.indexOf(objectsection + d) < 0) {
                    $('#' + section + square).css({ fill: "transparent" });
                  }
                }
              } else if (section === "Gallery" && Number.isInteger(square) == false) {
                if (queryselected.indexOf(gallerydict[square]) < 0) {
                  $('.' + gallerydict[square]).css({ fill: "transparent"});                
                }
              } else if ((section === "A" || section === "B" || section === "C" || section === "D") && square === "Machine Arcade") {
                if (queryselected.indexOf(machinearcade) < 0) {
                  $('#machinearcade').css({ fill: "transparent" });
                }
                for (var index = 1; index < 30; index++) {
                  if (queryselected.indexOf(section + String(index)) < 0) {
                    $('#' + section + String(index)).css({ fill: "transparent" });
                  }
                }
              }
              else if (section !== "Gallery" && Number.isInteger(square) == false) {
                for (var index = 1; index < 30; index++) {
                  if (queryselected.indexOf(section + String(index)) < 0) {
                    $('#' + section + String(index)).css({ fill: "transparent" });
                  }
                }
              }
            });
          });
        }
      }
    }  
  }
}

function displayResults(dataitems, query) {
  $("#resultstable" + query.toString() + " tr").remove();
  document.getElementById('resultstable' + query.toString()).innerHTML = "";
  //console.log(document.getElementById('resultstable').innerHTML);
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

function openCity(evt, cityName) {
  console.log('here1!');
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    //for (i = 0; i < tablinks.length; i++) {
    //    tablinks[i].className = tablinks[i].className.replace(" active", "");
    //}
    //document.getElementById(cityName).style.display = "block";
    //evt.currentTarget.className += " active";



    var x = document.getElementById(cityName);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    if (cityName === 'query1') {
      var y = document.getElementById('query2');
      y.style.display = 'none';
    } else if (cityName == 'query2') {
      var y = document.getElementById('query1');
      y.style.display = 'none';
    }



}