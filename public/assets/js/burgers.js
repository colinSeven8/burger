$(function () {
  $(".change-devoured").on("click", function (event) {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newdevoured");
    console.log(`id ${id}`);
    console.log(`newDevoured ${newDevoured}`);

    const newDevouredState = { devoured: newDevoured };
    $.ajax(`/api/burgers/ ${id}`, {
      type: "PUT",
      data: newDevouredState
    }).then(function () {
      console.log(`Changed devoured to ${newDevouredState}`);
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    let newBurger = $(this).children("#enter_text").val();
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
});
