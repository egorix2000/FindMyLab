function displayTop() {

  $.ajax({
	  url: url,
	  dataType: 'json',
	  data: data,
	  success: callback
	});

  
}


var input = document.getElementById("searchInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("findLabButton").click();
  }
});