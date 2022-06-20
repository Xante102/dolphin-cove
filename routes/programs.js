const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Programs List Screen
router.get("/list", (req, res, next) => {
  const sql = "SELECT * FROM programs";
//   if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./programs/programs-list", {
          data: rows,
          page_title: "Programs",
        });
      }
    });
//   } else {
//     res.redirect("/auth/login");
//   }
});

// Get Route to display the Create Program Screen
router.get("/create", (req, res, next) => {
  // if (req.session.isLoggedIn == true) {
    res.render("./programs/add-program", {
      page_title: "Create Tour Company",
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Add Program Route
router.post("/add", (req, res) => {
  const sql = {
    program_name: req.body.pName,
    program_description: req.body.pDescription,
    program_cost: req.body.pCost,
    schedule: req.body.schedule,
  };


  // if (req.session.isLoggedIn == true) {
    conn.query(`INSERT INTO programs SET ?`, sql, (err, results) => {
      if (err) throw err;

      res.redirect("/programs/list");
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Edit Program Route
router.get("/edit/:id", (req, res, next) => {
  const sql = "SELECT * FROM programs WHERE id =" + req.params.id;

  // if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./programs/edit-program", {
          page_title: "Edit Tour Company",
          data: rows[0],
        });
      }
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Update Program Route
router.post("/update", (req, res, next) => {
  const sql =
    "UPDATE programs SET program_name ='" +
    req.body.pName +
    "', program_description ='" +
    req.body.pDescription +
    "', program_cost ='" +
    req.body.pCost +
    "', schedule ='" +
    req.body.schedule +
    "'WHERE id =" +
    req.body.id;

  // if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/programs/list");
      }
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

// Delete Program Route
router.get("/delete/:id", (req, res, next) => {
  const sql = "DELETE FROM programs WHERE id=" + req.params.id;

  // if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/programs/list");
      }
    });
  // } else {
  //   res.redirect("/auth/login");
  // }
});

module.exports = router;
