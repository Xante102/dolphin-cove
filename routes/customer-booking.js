const express = require('express');
const router = express.Router();
const conn = require("../lib/db");




// Get Customers View

router.get("/customer-booking", (req, res, next) => {
    const sql = "SELECT * FROM programs";
          conn.query(sql, (err, rows) => {
        if (err) {
          //
        } else {
          res.render("customer-booking", {
            data: rows,
            page_title: "Dolphin Cove",
          });
        }
      });
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
  
        conn.query(`INSERT INTO bookings SET ?`, sql, (err, results) => {
          if (err) throw err;
  
          res.redirect("/customer-booking");
        });
       
      }
    );
  });
  
  
module.exports = router;