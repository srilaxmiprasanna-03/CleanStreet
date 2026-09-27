
// const express = require("express");
// const router = express.Router();
// const Complaint = require("../models/Complaint");
// const User = require("../models/User");
// const auth = require("../Middlewares/auth");
// const Notification = require("../models/Notification");
// //  Dashboard Summary
// router.get("/summary", auth(["admin"]), async (req, res) => {
//   try {
//     const total = await Complaint.countDocuments();
//     const pending = await Complaint.countDocuments({ status: "received" });
//     const assigned = await Complaint.countDocuments({ status: "assigned" });
//     const inReview = await Complaint.countDocuments({ status: "in_review" });
//     const resolved = await Complaint.countDocuments({ status: "resolved" });
//     const activeUsers = await User.countDocuments({ role: { $in: ["user", "volunteer", "admin"] } });

//     res.json({ total, pending, assigned, inReview, resolved, activeUsers });
//   } catch (err) {
//     console.error("Error in /api/admin/summary:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Complaints Trend (daily count)
// router.get("/trends", auth(["admin"]), async (req, res) => {
//   try {
//     const data = await Complaint.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     res.json(data.map(d => ({ date: d._id, count: d.count })));
//   } catch (err) {
//     console.error("Error in /api/admin/trends:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// //  All Complaints (Admin View)
// router.get("/complaints", auth(["admin"]), async (req, res) => {
//   try {
//     const { status } = req.query;
//     const query = status && status !== "all" ? { status } : {};

//     const complaints = await Complaint.find(query)
//       .sort({ createdAt: -1 })
//       .populate("user_id", "name email")
//       .populate("assigned_to", "name email");

//     res.json(complaints);
//   } catch (err) {
//     console.error("Error in /api/admin/complaints:", err);
//     res.status(500).json({ msg: "Error fetching complaints" });
//   }
// });

// //  All Users (Admin View)
// router.get("/users", auth(["admin"]), async (req, res) => {
//   try {
//     const users = await User.find().select("-password").sort({ createdAt: -1 });
//     res.json(users);
//   } catch (err) {
//     console.error("Error in /api/admin/users:", err);
//     res.status(500).json({ msg: "Error fetching users" });
//   }
// });

// // ✅ CORRECTED ROUTE: Gets all users with the role "volunteer"
// // The frontend calls "/api/admin/volunteers" (plural)
// router.get("/volunteers", auth(["admin"]), async (req, res) => {
//   try {
//     const volunteers = await User.find({ role: "volunteer" }).select("name email");
//     res.json(volunteers);
//   } catch (err) {
//     console.error("Error fetching volunteers:", err);
//     res.status(500).json({ msg: "Error fetching volunteers" });
//   }
// });

// router.get("/activity-log", auth(["admin"]), async (req, res) => {
//     try {
//         const activities = await Notification.find().sort({ createdAt: -1 }).limit(15); // Get latest 15 activities
//         res.json(activities);
//     } catch (err) {
//         console.error("Error fetching activity log:", err);
//         res.status(500).json({ msg: "Server Error" });
//     }
// });

// // ✅ Admin route to delete any complaint
// router.delete("/complaints/:id", auth(["admin"]), async (req, res) => {
//     try {
//         const complaint = await Complaint.findById(req.params.id);
//         if (!complaint) {
//             return res.status(404).json({ msg: "Complaint not found" });
//         }

//         // Optional: Also delete any notifications related to this complaint
//         await Notification.deleteMany({ complaintId: req.params.id });
        
//         await complaint.deleteOne();
        
//         res.json({ msg: "Complaint removed successfully" });
//     } catch (err) {
//         console.error("Error deleting complaint by admin:", err);
//         res.status(500).json({ msg: "Server Error" });
//     }
// });
// // ✅ NEW: Route to get complaint counts grouped by issue type for the pie chart
// router.get("/issue-type-summary", auth(["admin"]), async (req, res) => {
//   try {
//     const issueData = await Complaint.aggregate([
//       { $group: { _id: "$issueType", count: { $sum: 1 } } },
//       { $project: { name: "$_id", value: "$count", _id: 0 } },
//       { $sort: { value: -1 } }
//     ]);
//     res.json(issueData);
//   } catch (err) {
//     console.error("Error fetching issue type summary:", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const User = require("../models/User");
const auth = require("../Middlewares/auth");
const Notification = require("../models/Notification");

//  Dashboard Summary
router.get("/summary", auth(["admin"]), async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "received" });
    const assigned = await Complaint.countDocuments({ status: "assigned" });
    const inReview = await Complaint.countDocuments({ status: "in_review" });
    const resolved = await Complaint.countDocuments({ status: "resolved" });
    const activeUsers = await User.countDocuments({ role: { $in: ["user", "volunteer", "admin"] } });

    res.json({ total, pending, assigned, inReview, resolved, activeUsers });
  } catch (err) {
    console.error("Error in /api/admin/summary:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Route to get complaint counts for the pie chart
router.get("/issue-type-summary", auth(["admin"]), async (req, res) => {
  try {
    const issueData = await Complaint.aggregate([
      { $group: { _id: "$issueType", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count", _id: 0 } },
      { $sort: { value: -1 } }
    ]);
    res.json(issueData);
  } catch (err) {
    console.error("Error fetching issue type summary:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//  All Complaints (Admin View)
router.get("/complaints", auth(["admin"]), async (req, res) => {
  try {
    const { status } = req.query;
    const query = status && status !== "all" ? { status } : {};
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .populate("user_id", "name email")
      .populate("assigned_to", "name email");
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching complaints" });
  }
});

//  All Users (Admin View)
router.get("/users", auth(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
});

// Gets all users with the role "volunteer"
router.get("/volunteers", auth(["admin"]), async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" }).select("name email");
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching volunteers" });
  }
});

// Get recent activities
router.get("/activity-log", auth(["admin"]), async (req, res) => {
    try {
        const activities = await Notification.find().sort({ createdAt: -1 }).limit(15);
        res.json(activities);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// Admin route to delete any complaint
router.delete("/complaints/:id", auth(["admin"]), async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ msg: "Complaint not found" });
        }
        await Notification.deleteMany({ complaintId: req.params.id });
        await complaint.deleteOne();
        res.json({ msg: "Complaint removed successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;