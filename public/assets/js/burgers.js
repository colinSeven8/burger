$(function () {
  $(".change-devoured").on("click", (event) => {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newdevoured");
    console.log('This is the devoured state ' + newDevoured);
    let newDevouredState = {
      devoured: newDevoured
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      () => {
        console.log("changed devoured to  ", newDevoured);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", (event) => {
    event.preventDefault();
    let newBurger = {
      burger_name: $("#bu").val().trim(),
      devoured: 0
    };
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      () => {
        console.log("created new burger");
        location.reload();
      }
    );
  });
});