var url = "http://127.0.0.1:5000";

function getCities() {
  var cities;

  $.getJSON(
    url + "/vacancyCities", 
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
    url + "/vacancyUniversities", 
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
    url + "/vacancySubjects", 
    dataToServer,
    function(data) {
      subjects = data.subjects;
  });
  return subjects;
}

function getTopVacancies(city, university, subject, search) {
  var topVacancies;
  var dataToServer = JSON.stringify({
      city: city,
      organisation: university,
      subject: subject,
      searchText: search
  });

  $.post( 
    url + "/vacanciesTop", 
    dataToServer,
    function(data) {
      topVacancies = data.vacancies;
  });
  return topVacancies;
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

function displayTop(topVacancyId) {

  //get top
  //var top = getTopVacancies(
  //  $('#citySelect').find(":selected").val(),
  //  $('#universitySelect').find(":selected").val(),
  //  $('#subjectSelect').find(":selected").val(),
  //  $('#searchInput').val());

  var top = [
  {
    name:"Engeneer",
    university: "Skoltech",
    position: "Junior",
    emaill: "bestJob@gmail.com",
    requirements: "c++/c, English: B1, SQL",
    description: "Office located near metro, friendly staff, high salary"
  },
  {
    name:"Python developer",
    university: "Skoltech",
    position: "Middle",
    emaill: "job@gmail.com",
    requirements: "Python, English: C1",
    description: "3.1415926535 8979323846 2643383279 5028841971"
  },
  {
    name:"ML expert",
    university: "Skoltech",
    position: "Senior",
    emaill: "ml@gmail.com",
    requirements: "Python, English: c1, Numpy/Pandas, Machine learning, Strong knowledge in statistics",
    description: "Office located near metro, friendly staff, high salary"
  },

  ];
  //clear previous top
  $('#' + topVacancyId).empty();

  for (var i = 0; i < top.length; i++) {
    var vacancyDiv = "<div class='vacancyItem'>";
    vacancyDiv += "   <div class='vacancyName'><span>" + top[i].name + "</span></div>";
    vacancyDiv += "   <div class='vacancyUniversity'>Organisation: <span>" + top[i].university + "</span></div>";
    vacancyDiv += "   <div class='vacancyEmail'>Email: <span>" + top[i].university + "</span></div>";

    top[i].requirements = top[i].requirements.split(", ");

    vacancyDiv += "   <div class='vacancyRequirements'>Requirements: ";
    vacancyDiv += "       <ul>";
    for (var requirementIndex = 0; requirementIndex < top[i].requirements.length; requirementIndex++) {
      vacancyDiv += "          <li>" + top[i].requirements[requirementIndex] + "</li>";
    }
    vacancyDiv += "       </ul>";
    vacancyDiv += "   </div>"

    vacancyDiv += "   <div class='vacancyDescription'>Description: <span>" + top[i].description + "</span></div>";

    vacancyDiv += "</div>";
    $('#' + topVacancyId).append(vacancyDiv);
  }

  $('#topVacancies').scrollTop(0);
}

$(document).ready(function() {

    $.ajaxSetup({
    async: false
    });

    //get all cities array
    //var all_cities = getCities();

    var all_cities = ["New York", "Moscow", "Milan"];
    setOptions("citySelect", all_cities);

    //get all universities array
    //var all_universities = getUniversities(
    //  $('#citySelect').find(":selected").val());

    var all_universities = ["MIT", "Skoltech"];
    setOptions("universitySelect", all_universities);

    //get all subject array
    //var all_subjects = getSubjects(
    //  $('#citySelect').find(":selected").val(),
    //  $('#universitySelect').find(":selected").val()
    //);

    var all_subjects = ["Math", "Physics", "Computer Science", "Algorithm", "Medicine", "Chemistry"];
    setOptions("subjectSelect", all_subjects);


    var input = document.getElementById("searchInput");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("findVacancyButton").click();
      }
    });

    $("#findVacancyButton").click(function () {
      displayTop("topVacancies");
    });

    $("#backButton").click(function () {
      window.location.href = 'index.html';
    });

    //city select triggen
    $( "#citySelect" ).change(function () {
      if($(this).val() != null) {
        //get universities array
        //var universities = getUniversities(
        //  $('#citySelect').find(":selected").val());

        var universities = ["MIT", "Skoltech"];
        setOptions("universitySelect", universities);

        //get subject array
        //var subjects = getSubjects(
        //  $('#citySelect').find(":selected").val(),
        //  $('#universitySelect').find(":selected").val()
        //);

        var subjects = ["Computer Science", "Algorithm", "Medicine"];
        setOptions("subjectSelect", subjects);
      }

    }).change();

    //univercity select trigger
    $( "#universitySelect" ).change(function () {
      if($(this).val() != null) {
        //get subject array
        //var subjects = getSubjects(
        //  $('#citySelect').find(":selected").val(),
        //  $('#universitySelect').find(":selected").val()
        //);

        var subjects = ["Computer Science", "Algorithm", "Medicine"];
        setOptions("subjectSelect", subjects);
      }

    }).change();

    displayTop("topVacancies");
});










