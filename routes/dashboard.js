const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Dashboard Screen

router.get("/dashboard", (req, res, next) => {
  const query = "SELECT COUNT(id) AS total_bookings FROM bookings"
  if (req.session.isLoggedIn == true) {


  conn.query(query, (err, rows, aggregateRows) => {
    // if (err) throw err;

    res.render("dashboard", {
      page_title: "Dashboard",
      data: rows,
      aggregate: aggregateRows[0],
    });
  });
  } else {
  res.redirect("/auth/login");
}
});



module.exports = router;

