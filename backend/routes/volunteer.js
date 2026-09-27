
// const express = require("express");
// const router = express.Router();
// const Complaint = require("../models/Complaint");
// const User = require("../models/User");
// const auth = require("../Middlewares/auth");

// // ✅ CORRECTED: Route changed to /summary to match the frontend API call
// // It now correctly uses the logged-in user's ID from the auth token
// router.get("/summary", auth(["volunteer"]), async (req, res) => {
//   try {
//     const volunteerId = req.user.id;
//     const totalAssigned = await Complaint.countDocuments({ assigned_to: volunteerId });
//     const resolved = await Complaint.countDocuments({ assigned_to: volunteerId, status: "resolved" });
//     const pending = await Complaint.countDocuments({ 
//         assigned_to: volunteerId, 
//         status: { $in: ["assigned", "in_review"] } 
//     });

//     res.json({ totalAssigned, resolved, pending });
//   } catch (err) {
//     console.error("Error in volunteer summary:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // ✅ CORRECTED: This route is now consistent and secure
// router.get("/history", auth(["volunteer"]), async (req, res) => {
//   try {
//     const complaints = await Complaint.find({ assigned_to: req.user.id })
//       .sort({ createdAt: -1 })
//       .populate("user_id", "name"); // Populate user name for context

//     res.json(complaints);
//   } catch (err) {
//     console.error("Error in volunteer history:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const User = require("../models/User");
const auth = require("../Middlewares/auth");

// GET: Volunteer's dashboard summary statistics
router.get("/summary", auth(["volunteer"]), async (req, res) => {
  try {
    const volunteerId = req.user.id;
    const totalAssigned = await Complaint.countDocuments({ assigned_to: volunteerId });
    const resolved = await Complaint.countDocuments({ assigned_to: volunteerId, status: "resolved" });
    const pending = await Complaint.countDocuments({ 
        assigned_to: volunteerId, 
        status: { $in: ["assigned", "in_review"] } 
    });

    res.json({ totalAssigned, resolved, pending });
  } catch (err) {
    console.error("Error in volunteer summary:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET: All complaints assigned to the logged-in volunteer
router.get("/history", auth(["volunteer"]), async (req, res) => {
  try {
    const complaints = await Complaint.find({ assigned_to: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user_id", "name"); // Populate reporter's name for context

    res.json(complaints);
  } catch (err) {
    console.error("Error in volunteer history:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all solved complaints for the logged-in volunteer
/* router.get("/solved", auth, async (req, res) => {
  try {
    const volunteerId = req.user.id; // volunteer id from token

    const solvedComplaints = await Complaint.find({
      resolvedBy: volunteerId,   // <-- change this if your field is different
      status: "resolved"          // <-- change if your field is `isResolved: true`
    });

    res.json({
      count: solvedComplaints.length,
      complaints: solvedComplaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch solved complaints" });
  }
}); */


/* router.get("/solved", auth(["volunteer"]), async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { notes } = req.body;
    const volunteerId = req.user.id;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { 
        status: "resolved",
        resolvedBy: volunteerId,   // <-- Add this line
        resolutionNotes: notes,
        resolvedAt: new Date()     // optional, for solved date
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    res.json({ msg: "Complaint resolved successfully", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}); */

// GET: All solved complaints for the logged-in volunteer
/* router.put("/:id/resolved", auth(["volunteer"]), async (req, res) => {
  try {
    const volunteerId = mongoose.Types.ObjectId(req.user.id);

    const resolvedComplaints = await Complaint.find({
      resolvedBy: volunteerId ,
      status: "resolved"
    }).sort({ resolvedAt: -1 }); // optional: latest first

    res.json({
      count: resolvedComplaints.length,
      complaints: resolvedComplaints,
    });
  } catch (err) {
    console.error("Error fetching resolved complaints:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

 */

// ✅ Resolve a complaint (Volunteer only)
router.put("/:id/resolve", auth(["volunteer"]), async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    // Allow only the assigned volunteer to resolve
    if (complaint.assigned_to?.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    // ✅ Update status and mark resolved
    complaint.status = "resolved";
    complaint.resolutionNotes = req.body.resolutionNotes || "";
    complaint.resolvedAt = new Date();
    complaint.resolvedBy = mongoose.Types.ObjectId(req.user.id);

    await complaint.save();

    res.json({ msg: "Complaint resolved successfully", complaint });
  } catch (err) {
    console.error("Error resolving complaint:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🧪 (Other routes like GET all complaints, POST new complaint etc.)


// ✅ All resolved complaints by the logged-in volunteer
router.get("/resolved", auth, async (req, res) => {
  try {
    const resolvedComplaints = await Complaint.find({
      resolvedBy: mongoose.Types.ObjectId(req.user.id),
      status: "resolved",
    })
    .sort({ resolvedAt: -1 })
    .populate("user_id", "name");

    res.json({
      count: resolvedComplaints.length,
      complaints: resolvedComplaints,
    });
  } catch (err) {
    console.error("Error fetching resolved complaints:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;