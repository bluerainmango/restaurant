$("document").ready(async () => {
  // If you are on table page
  if ($("#tables").length > 0) {
    console.log("this is table");

    const res = await $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/reservations",
      dataType: "json"
    });

    console.log("this is raw db: ", res.data);
    const tablesArr = res.data;
    console.log(tablesArr.length);

    for (let i = 0; i < tablesArr.length; i++) {
      const { name, phone, email, id } = tablesArr[i];

      let html = `<li id="table"><span id="num">${i +
        1}</span><span id="id">${id}</span></span><span id="name">${name}</span</li>`;

      console.log(html);

      $("#tables").append(html);
    }
  }

  // If you are on reservation page
  if ($("form").length > 0) {
    console.log("this is form page");

    $("form").on("submit", e => {
      e.preventDefault();

      const name = $("#name").val();
      const email = $("#email").val();
      const phone = $("#phone").val();
      const id = $("#id").val();

      $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/reservations",
        data: {
          name,
          email,
          phone,
          id
        },
        dataType: "json"
      });
    });
  }
});
