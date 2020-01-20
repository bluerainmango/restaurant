$(document).ready(async () => {
  // If you are on table page
  if ($("#tables").length > 0) {
    const res = await $.ajax({
      method: "GET",
      url: "/api/reservations",
      dataType: "json"
    });

    const { maxReservations, reservDB, waitDB } = res.data;

    console.log(maxReservations, reservDB, waitDB);

    renderList(reservDB, "#tables");
    renderList(waitDB, "#wait");

    function renderList(db, target) {
      for (let i = 0; i < db.length; i++) {
        const { name, phone, email, id } = db[i];

        let html = `<li class="table"><p><span class="num">${i +
          1}</span></span><span class="name">${name}</span><span class="id">[ ID: ${id} ]</span></p><p><span class="email">${email}</span><span class="phone">${phone}</span></p></li>`;

        $(target).append(html);
      }
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
        url: "/api/reservations",
        data: {
          name,
          email,
          phone,
          id
        },
        dataType: "json"
      });

      location.assign("/tables");
    });
  }
});
