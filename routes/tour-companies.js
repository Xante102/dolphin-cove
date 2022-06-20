const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Tour Companies List Screen
router.get("/list", (req, res, next) => {
  const sql = "SELECT * FROM tour_companies";
//   if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./tour-companies/company-list", {
          data: rows,
          page_title: "Tour Companies",
        });
      }
    });
//   } else {
//     res.redirect("/auth/login");
//   }
});

// Get Route to display the Create Tour Company Screen
router.get("/create", (req, res, next) => {
  // if (req.session.isLoggedIn == true) {
    res.render("./tour-companies/add-company", {
      page_title: "Create Tour Company",
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Add Company Route
router.post("/add", (req, res) => {
  const sql = {
    co_name: req.body.coName,
    co_addr: req.body.coAddress,
    phone_num: req.body.pNum,
  };

  // if (req.session.isLoggedIn == true) {
    conn.query(`INSERT INTO tour_companies SET ?`, sql, (err, results) => {
      if (err) throw err;

      res.redirect("/tour-companies/list");
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Edit Company Route
router.get("/edit/:id", (req, res, next) => {
  const sql = "SELECT * FROM tour_companies WHERE id =" + req.params.id;

  // if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./tour-companies/edit-company", {
          page_title: "Edit Tour Company",
          data: rows[0],
        });
      }
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Update Company Route
router.post("/update", (req, res, next) => {
  const sql =
    "UPDATE tour_companies SET co_name ='" +
    req.body.coName +
    "', co_addr ='" +
    req.body.coAddress +
    "', phone_num ='" +
    req.body.pNum +
    "'WHERE id =" +
    req.body.id;

  // if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/tour-companies/list");
      }
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Delete Company Route
router.get("/delete/:id", (req, res, next) => {
  const sql = "DELETE FROM tour_companies WHERE id=" + req.params.id;

  // if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/tour-companies/list");
      }
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

module.exports = router;
