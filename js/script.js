var url = "http://127.0.0.1:5000";

function getCities() {
  var cities;

  $.getJSON(
    url + "/cities", 
    function(data) {
      cities = data.cities;
    });
  return cities;
}

function getUniversities(city) {
  var universities;
  var dataToServer = JSON.stringify({
      city: city,
  });

  $.post( 
    url + "/universities", 
    dataToServer,
    function(data) {
      universities = data.universities;
  });

  return universities;
}

function getSubjects(city, university) {
  var subjects;
  var dataToServer = JSON.stringify({
      city: city,
      organisation: university,
  });

  $.post( 
    url + "/subjects", 
    dataToServer,
    function(data) {
      subjects = data.subjects;
  });
  return subjects;
}

function getTopLaboratories(city, university, subject, search) {
  var topLabs;
  var dataToServer = JSON.stringify({
      city: city,
      organisation: university,
      subject: subject,
      searchText: search
  });

  $.post( 
    url + "/top", 
    dataToServer,
    function(data) {
      topLabs = data.laboratories;
  });
  return topLabs;
}

function setOptions(selectorId, optionsArray) {
  //clear select
  $('#'+selectorId).find('option').slice(1).remove();
  $('#'+ selectorId + ' option[value]').attr('selected','selected');
  
  optionsArray.sort();
  for (var i = 0; i < optionsArray.length; i++) {
    $('#'+selectorId).append('<option value="' + optionsArray[i] + '">' + optionsArray[i] + '</option>');
  }
}

function displayTop(topLabId) {
  //get top
  var top = getTopLaboratories(
    $('#citySelect').find(":selected").val(),
    $('#universitySelect').find(":selected").val(),
    $('#subjectSelect').find(":selected").val(),
    $('#searchInput').val());

  /*var top = [
  {
    id: "b1",
    name:"BestLab1",
    university: "BSU",
    academicDepartment :"High math"
  },
  {
    id: "b2",
    name:"BestLab2",
    university: "BSUIR",
    academicDepartment :"Physics"
  },
  {
    id: "b3",
    name:"BestLab3",
    university: "BSUIR",
    academicDepartment :"Computer science"
  },
  {
    id: "b4",
    name:"BestLab4",
    university: "MIT",
    academicDepartment :"High math"
  },
  {
    id: "b5",
    name:"BestLab5",
    university: "BSMU",
    academicDepartment :"Natural sciences"
  },
  {
    id: "b6",
    name:"BestLab6",
    university: "BSPU",
    academicDepartment :"Physics"
  },
  {
    id: "b7",
    name:"BestLab7",
    university: "BSU",
    academicDepartment :"Statistics"
  },
  {
    id: "b8",
    name:"BestLab8",
    university: "MIT",
    academicDepartment :"Computer science"
  },
  {
    id: "b9",
    name:"BestLab9",
    university: "MIT",
    academicDepartment :"High math"
  },
  {
    id: "b10",
    name:"BestLab10",
    university: "BSUIR",
    academicDepartment :"Natural sciences"
  },

  ];*/
  //clear previous top
  $('#' + topLabId).empty();

  for (var i = 0; i < top.length; i++) {
    labDiv = "<div class='topLabItem' href='laboratory.html'>";
    labDiv += "   <div class='topLabName'><span>" + top[i].name + "</span></div>";
    labDiv += "   <div class='topUniversityName'>Organisation: <span>" + top[i].university + "</span></div>";

    top[i].keywords = top[i].keywords.split(", ");

    labDiv += "   <div class='topResearchName'>Research field: ";
    labDiv += "       <ul>";
    for (var keywordIndex = 0; keywordIndex < top[i].keywords.length; keywordIndex++) {
      
      labDiv += "          <li>" + top[i].keywords[keywordIndex] + "</li>";
    }
    labDiv += "       </ul>";
    labDiv += "   </div>"

    labDiv += "</div>";
    $('#' + topLabId).append(labDiv);
  }

  $('#topLabs tr').on("click", function() {
      window.location.href = 'laboratory.html';
  });

  $('#topLabs').scrollTop(0);
}

$(document).ready(function() {

    $.ajaxSetup({
    async: false
    });

    //get all cities array
    var all_cities = getCities();

    //all_cities = ["New York", "Minsk", "Moscow", "Milan"];
    setOptions("citySelect", all_cities);

    //get all universities array
    var all_universities = getUniversities(
      $('#citySelect').find(":selected").val());

    //var all_universities = ["MIT", "BSU", "BSUIR", "BSMU", "BSPU"];
    setOptions("universitySelect", all_universities);

    //get all subject array
    var all_subjects = getSubjects(
      $('#citySelect').find(":selected").val(),
      $('#universitySelect').find(":selected").val(),
    );

    //var all_subjects = ["Math", "Physics", "Computer Science", "Algorithm", "Medicine", "Chemistry"];
    setOptions("subjectSelect", all_subjects);


    var input = document.getElementById("searchInput");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("findLabButton").click();
      }
    });

    $("#findLabButton").click(function () {
      displayTop("topLabs");
    });

    $( "#citySelect" ).change(function () {
      if($(this).val() != null) {
        //get universities array
        var universities = getUniversities(
          $('#citySelect').find(":selected").val());

        //universities = ["MIT", "BSU", "BSUIR", "BSMU"];
        setOptions("universitySelect", universities);

        //get subject array
        var subjects = getSubjects(
          $('#citySelect').find(":selected").val(),
          $('#universitySelect').find(":selected").val(),
        );

        //subjects = ["Math", "ComputerScience"];
        setOptions("subjectSelect", subjects);
      }

    }).change();

    $( "#universitySelect" ).change(function () {
      if($(this).val() != null) {
        //get subject array
        var subjects = getSubjects(
          $('#citySelect').find(":selected").val(),
          $('#universitySelect').find(":selected").val(),
        );

        //subjects = ["Math", "ComputerScience"];
        setOptions("subjectSelect", subjects);
      }

    }).change();

    displayTop("topLabs");
});










