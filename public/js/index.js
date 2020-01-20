$("document").ready(async () => {
  // If you are on table page
  if ($("#tables").length > 0) {
    const res = await $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/reservations",
      dataType: "json"
    });

    const { maxReservations, reservDB, waitDB } = res.data;

    console.log(maxReservations, reservDB, waitDB);

    for (let i = 0; i < reservDB.length; i++) {
      const { name, phone, email, id } = reservDB[i];

      let html = `<li id="table"><p><span id="num">${i +
        1}</span><span id="id">${id}</span></span><span id="name">${name}</span></p><p><span>${email}</span><span>${phone}</span></p></li>`;

      $("#tables").append(html);
    }
  }

  // If you are on reservation page
  if ($("form").length > 0) {
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
