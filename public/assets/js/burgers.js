$(document).ready(function () {
  $(".devour-form").on("submit", function (event) {
    event.preventDefault();
    let id = $(this).children(".burger_id").val();
    console.log(`id ${id}`);
    $.ajax({
      method: "PUT",
      url: "/burgers/" + id
    }).then(function () {
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    let newBurger = $(this).children("#bu").val();
    console.log(`newBurger ${newBurger}`);

    $.ajax({
      type: "POST",
      url: "/burgers/create",
      data: {newBurger:newBurger}
    }).then(function () {
      console.log("created new burger");
      location.reload();
    });
  });

  $(".make-again-form").on("submit", function (event) {
    event.preventDefault();
    let remadeBurger = $(this);
    console.log(`remadeBurger ${remadeBurger}`);

    $.ajax({

    }).then(function () {
      console.log("Re-made burger");
      location.reload();
    })
  });
});
