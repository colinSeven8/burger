$(function() {
  $(".change-devoured").on("click", function(event) {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newdevoured");
    console.log('This is the devoured state '+ newDevoured);
    let newDevouredState = {
      devoured: newDevoured
    };
    $.ajax("/api/burgers" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to  ", newDevoured);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    let newBurger = {
      burger_name: $("#bu").val().trim(),
      devoured: 0
    };
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
      let id = $(this).data("id");
      $.ajax("api/burgers" + id, {
          type: "DELETE"
      }).then(
          function() {
              console.log("Deleted burger", id);
              location.reload();
          }
      );
  });
});