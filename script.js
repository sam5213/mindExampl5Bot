document.addEventListener("DOMContentLoaded", function() {
   const questionDiv = document.getElementById("questions");
   questionDiv.innerHTML = "Loading questions...";
   fetch("/get-questions")
       .then(response => response.json())
       .then(data => {
           questionDiv.innerHTML = data.question; 
       });
});
