const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Bookings List Screen
router.get("/list", (req, res, next) => {
  const sql =
    "SELECT bk.*, pg.id, pg.program_name, pg.program_cost, pm.id,pm.payment_method, tc.id, tc.co_name" +
    " FROM bookings bk, programs pg, payment_methods pm, tour_companies tc" +
    " WHERE bk.payment_method_id = pm.id" +
    " AND bk.program_id = pg.id" +
    " AND bk.booked_through = tc.id";
  //   if (req.session.isLoggedIn == true) {
  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.render("./bookings/bookings-list", {
        data: rows,
        page_title: "Bookings",
      });
    }
  });
  //   } else {
  //     res.redirect("/auth/login");
  //   }
});

// Get Route to display the Create Booking Screen
router.get("/create", (req, res, next) => {
  // if (req.session.isLoggedIn == true) {
  res.render("./bookings/add-booking", {
    page_title: "Create Booking",
  });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Add Booking Route
router.post("/add", (req, res) => {
  const varSql = "SELECT program_cost FROM programs WHERE id = ?";

  const varSql2 = conn.query(
    varSql,
    [parseInt(req.body.programID)],
    (err, rows) => {
      if (err) {
        console.log(err);
      }

      const voucher = Date.now().toString().slice(-5);

      const total_amt = rows[0].program_cost * parseInt(req.body.tGuests);

      const sql = {
        f_name: req.body.fName,
        l_name: req.body.lName,
        hotel_name: req.body.hotelName,
        total_guests: req.body.tGuests,
        excursion_date: req.body.eDate,
        date_booked: req.body.dateBooked,
        total_cost: total_amt,
        program_id: req.body.programID,
        payment_method_id: req.body.pmID,
        booked_through: req.body.bookedThrough,
        voucher_no: voucher,
      };

      // if (req.session.isLoggedIn == true) {
      conn.query(`INSERT INTO bookings SET ?`, sql, (err, results) => {
        if (err) throw err;

        res.redirect("/bookings/list");
      });
      // } else {
      //   res.redirect("/auth/login");
      // }
    }
  );
});

// Edit Booking Route
router.get("/edit/:id", (req, res, next) => {
  const sql = "SELECT * FROM bookings WHERE id =" + req.params.id;

  // if (req.session.isLoggedIn == true) {
  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.render("./bookings/edit-booking", {
        page_title: "Edit Booking",
        data: rows[0],
      });
    }
  });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Update Booking Route
router.post("/update", (req, res, next) => {
  const sql =
    "UPDATE bookings SET f_name ='" +
    req.body.fName +
    "', l_name ='" +
    req.body.lName +
    "', title ='" +
    req.body.title +
    "', email ='" +
    req.body.email +
    "', phone_num ='" +
    req.body.pNum +
    "'WHERE id =" +
    req.body.id;

  // if (req.session.isLoggedIn == true) {
  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.redirect("/bookings/list");
    }
  });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Delete Booking Route
router.get("/delete/:id", (req, res, next) => {
  const sql = "DELETE FROM bookings WHERE id=" + req.params.id;

  // if (req.session.isLoggedIn == true) {
  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.redirect("/bookings/list");
    }
  });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

module.exports = router;
