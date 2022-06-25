const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Dashboard Screen

router.get("/dashboard", (req, res, next) => {
  // if (req.session.isLoggedIn == true) {
  const query = "SELECT COUNT(id) AS total_bookings FROM bookings"
  // const query =     "SELECT bk.*, tc.*, pg.*" +
  // " FROM bookings bk, programs pg, tour_companies tc" ;
  // const query2 = `SELECT COUNT(bk.id) total_bookings,
  //                       COUNT(tc.id) AS total_companies, 
  //                       COUNT(pg.id) AS total_programs FROM bookings bk, programs pg, tour_companies tc`;

  // conn.query(query, (err, rows) => {
  // if (err) throw err;

  conn.query(query, (err, rows, aggregateRows) => {
    // if (err) throw err;

    res.render("dashboard", {
      page_title: "Dashboard",
      data: rows,
      aggregate: aggregateRows[0],
    });
  });
});

// } else {
//   res.redirect("/auth/login");
// }
// });

module.exports = router;

// const express = require('express')
// const router = express.Router()
// const conn = require('../lib/db')

// router.get('/dashboard', (req, res) => {

// 	// const query = 'SELECT * FROM students'
// 	// const query2 = `SELECT SUM(fees_paid) AS total_fees_paid,
//     //                   COUNT(id) AS total_students,
//     //        AVG(fees_paid) AS average_fees,
//     //        MIN(fees_paid) AS lowest_fee,
//     //       MAX(fees_paid) AS highest_fee FROM students`

//             // if (req.session.isLoggedIn == true) {

// 	conn.query(query, (err, rows) => {
// 		if (err) throw err;

// 		conn.query(query2, (err) => {
// 			if (err) throw err;

//  			res.render('dashboard', { page_title: 'Dashboard', data: rows});
// });
// 	});
// //     } else {
// //     res.redirect("/auth/login");
// //   }
// });

// const express = require('express')
// const router = express.Router()
// const conn = require('../lib/db')

// router.get('/', (req, res) => {

// 	// const query = 'SELECT * FROM students'
// 	// const query2 = `SELECT SUM(fees_paid) AS total_fees_paid,
//     //                   COUNT(id) AS total_students,
//     //        AVG(fees_paid) AS average_fees,
//     //        MIN(fees_paid) AS lowest_fee,
//     //       MAX(fees_paid) AS highest_fee FROM students`

//             // if (req.session.isLoggedIn == true) {

// 	conn.query(query, (err, rows) => {
// 		if (err) throw err;

// 		conn.query(query2, (err, aggregateRows) => {
// 			if (err) throw err;

//  			res.render('dashboard', { page_title: 'Dashboard', data: rows, aggregate: aggregateRows[0] });
// });
// 	});
// //     } else {
// //     res.redirect("/auth/login");
// //   }
// });
