
// // // // import React, { useEffect, useState, useCallback } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   getAdminSummary,
// // // //   getAllComplaints,
// // // //   getAllUsers,
// // // //   getAdminVolunteers,
// // // //   assignComplaint,
// // // //   getAdminActivityLog,
// // // //   deleteComplaintByAdmin,
// // // //   getIssueTypeSummary
// // // // } from "../utils/api";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // // // import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
// // // // import "leaflet/dist/leaflet.css";
// // // // import "./AdminDashboard.css";

// // // // // Helper Component for the centered Logout Confirmation Modal
// // // // const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
// // // //     if (!isOpen) return null;
// // // //     return (
// // // //       <div className="modal-overlay">
// // // //         <div className="modal-content">
// // // //           <h3>Confirm Logout</h3>
// // // //           <p>Are you sure you want to log out?</p>
// // // //           <div className="modal-actions">
// // // //             <button className="btn-secondary" onClick={onClose}>Cancel</button>
// // // //             <button className="btn-danger" onClick={onConfirm}>Logout</button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // // };

// // // // const issueTypeColors = {
// // // //   pothole: "#8B4513", garbage_dump: "#FF4500", water_leak: "#1E90FF",
// // // //   streetlight: "#FFD700", broken_sidewalk: "#A0522D", graffiti: "#800080",
// // // //   noise_pollution: "#FF1493", other: "#32CD32",
// // // // };

// // // // const AdminDashboard = () => {
// // // //   const { logout } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const [summary, setSummary] = useState({ total: 0, pending: 0, assigned: 0, in_review: 0, resolved: 0, activeUsers: 0 });
// // // //   const [activeTab, setActiveTab] = useState("overview");
// // // //   const [data, setData] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [search, setSearch] = useState("");
// // // //   const [activityLog, setActivityLog] = useState([]);
// // // //   const [showLogoutModal, setShowLogoutModal] = useState(false);

// // // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // // //   const [selectedComplaint, setSelectedComplaint] = useState(null);
// // // //   const [volunteers, setVolunteers] = useState([]);
// // // //   const [selectedVolunteer, setSelectedVolunteer] = useState("");
// // // //   const [issueTypeData, setIssueTypeData] = useState([]);

// // // //   // ✅ CORRECTED: This function now loads data independently.
// // // //   // If one part fails, the others will still load.
// // // //   const fetchSummaryAndLog = useCallback(async () => {
// // // //     // Fetch summary cards data
// // // //     try {
// // // //       const summaryRes = await getAdminSummary();
// // // //       setSummary(summaryRes.data);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch admin summary:", err);
// // // //     }
// // // //     // Fetch activity log data
// // // //     try {
// // // //       const logRes = await getAdminActivityLog();
// // // //       setActivityLog(logRes.data);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch activity log:", err);
// // // //     }
// // // //     // Fetch pie chart data
// // // //     try {
// // // //       const issueTypeRes = await getIssueTypeSummary();
// // // //       setIssueTypeData(issueTypeRes.data);
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch issue type summary:", err);
// // // //     }
// // // //   }, []);
  
// // // //   const fetchComplaints = useCallback(async (status) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await getAllComplaints(status);
// // // //       setData(res.data);
// // // //     } catch (err) { console.error("Error fetching complaints:", err); }
// // // //     finally { setLoading(false); }
// // // //   }, []);

// // // //   const fetchUsers = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await getAllUsers();
// // // //       setData(res.data);
// // // //     } catch (err) { console.error("Error fetching users:", err); }
// // // //     finally { setLoading(false); }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (activeTab === 'overview') {
// // // //         fetchSummaryAndLog();
// // // //     } else if (activeTab === 'map') {
// // // //         fetchComplaints("all");
// // // //     } else if (activeTab === 'users') {
// // // //         fetchUsers();
// // // //     } else if (activeTab === 'manage') {
// // // //         fetchComplaints("all");
// // // //     } else if (activeTab === 'pending') {
// // // //         fetchComplaints("received");
// // // //     } else if (activeTab === 'resolved') {
// // // //         fetchComplaints("resolved");
// // // //     }
    
// // // //     getAdminVolunteers().then(res => setVolunteers(res.data || [])).catch(err => console.error("Error fetching volunteers:", err));
    
// // // //     const intervalId = setInterval(() => {
// // // //         if (activeTab === 'overview') {
// // // //             fetchSummaryAndLog();
// // // //         }
// // // //     }, 20000);

// // // //     return () => clearInterval(intervalId);
// // // //   }, [activeTab, fetchSummaryAndLog, fetchComplaints, fetchUsers]);
  
// // // //   const handleDelete = async (complaintId) => {
// // // //     if (!window.confirm("Are you sure you want to permanently delete this complaint?")) return;
// // // //     try {
// // // //       await deleteComplaintByAdmin(complaintId);
// // // //       setData(prev => prev.filter(c => c._id !== complaintId));
// // // //       alert("Complaint deleted successfully.");
// // // //       fetchSummaryAndLog();
// // // //     } catch (err) {
// // // //       console.error("Error deleting complaint:", err);
// // // //       alert("Failed to delete complaint.");
// // // //     }
// // // //   };

// // // //   const handleAssign = async () => {
// // // //     if (!selectedVolunteer) return alert("Please select a volunteer");
// // // //     try {
// // // //       await assignComplaint(selectedComplaint._id, selectedVolunteer);
// // // //       setShowAssignModal(false);
// // // //       setSelectedVolunteer("");
// // // //       fetchComplaints(activeTab === "pending" ? "received" : "all");
// // // //       fetchSummaryAndLog();
// // // //     } catch (err) { console.error("Error assigning complaint:", err); }
// // // //   };
  
// // // //   const handleConfirmLogout = () => {
// // // //     logout();
// // // //     setShowLogoutModal(false);
// // // //      navigate('/');
// // // //   };

// // // //   const filteredData = data.filter((item) => {
// // // //     if (activeTab === "users") {
// // // //       return item.name?.toLowerCase().includes(search.toLowerCase()) || item.email?.toLowerCase().includes(search.toLowerCase());
// // // //     }
// // // //     return item.title?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase());
// // // //   });

// // // //   const getStatusColor = (status) => {
// // // //     switch (status) {
// // // //       case "resolved": return "#28a745";
// // // //       case "assigned": return "#3182CE";
// // // //       case "in_review": return "#D69E2E";
// // // //       default: return "#E53E3E";
// // // //     }
// // // //   };

// // // //   const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

// // // //   return (
// // // //     <div className="admin-dashboard">
// // // //       <aside className="sidebar">
// // // //         <h2>Admin Panel</h2>
// // // //         <ul>
// // // //           <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>📊 Overview</li>
// // // //           <li className={activeTab === "manage" ? "active" : ""} onClick={() => setActiveTab("manage")}>📋 All Complaints</li>
// // // //           <li className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>🕒 Pending</li>
// // // //           <li className={activeTab === "resolved" ? "active" : ""} onClick={() => setActiveTab("resolved")}>✅ Resolved</li>
// // // //           <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>👥 Users</li>
// // // //           <li className={activeTab === "map" ? "active" : ""} onClick={() => setActiveTab("map")}>🗺️ Issue Map</li>
// // // //         </ul>
// // // //         <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>Logout</button>
// // // //       </aside>

// // // //       <main className="main-content">
// // // //         {activeTab === "overview" && (
// // // //           <>
// // // //             <h1>System Overview</h1>
// // // //             <div className="cards">
// // // //               <div className="card" onClick={() => setActiveTab('manage')}><h2>{summary.total || 0}</h2><p>Total Complaints</p></div>
// // // //               <div className="card" onClick={() => setActiveTab('pending')}><h2>{summary.pending || 0}</h2><p>Pending</p></div>
// // // //               <div className="card"><h2>{summary.assigned || 0}</h2><p>Assigned</p></div>
// // // //               <div className="card"><h2>{summary.in_review || 0}</h2><p>In Review</p></div>
// // // //               <div className="card" onClick={() => setActiveTab('resolved')}><h2>{summary.resolved || 0}</h2><p>Resolved</p></div>
// // // //               <div className="card" onClick={() => setActiveTab('users')}><h2>{summary.activeUsers || 0}</h2><p>Active Users</p></div>
// // // //             </div>

// // // //             <div className="overview-layout">
// // // //               <div className="overview-main">
// // // //                 <div className="pie-chart-container">
// // // //                   <h2>Complaints by Issue Type</h2>
// // // //                   {issueTypeData.length > 0 ? (
// // // //                     <ResponsiveContainer width="100%" height={300}>
// // // //                       <PieChart>
// // // //                         <Pie
// // // //                           data={issueTypeData}
// // // //                           cx="50%"
// // // //                           cy="50%"
// // // //                           labelLine={false}
// // // //                           outerRadius={100}
// // // //                           fill="#8884d8"
// // // //                           dataKey="value"
// // // //                           nameKey="name"
// // // //                           label={(entry) => `${entry.name.replace("_", " ")}: ${entry.value}`}
// // // //                         >
// // // //                           {issueTypeData.map((entry, index) => (
// // // //                             <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
// // // //                           ))}
// // // //                         </Pie>
// // // //                         <Tooltip />
// // // //                         <Legend />
// // // //                       </PieChart>
// // // //                     </ResponsiveContainer>
// // // //                   ) : <p>No complaint data available to display chart.</p>}
// // // //                 </div>
// // // //               </div>

// // // //               <div className="overview-sidebar">
// // // //                 <div className="activity-log-container">
// // // //                   <h2>Recent Activity</h2>
// // // //                   {activityLog.length > 0 ? (
// // // //                     <ul className="activity-log-list">
// // // //                       {activityLog.map(activity => (<li key={activity._id} className="activity-log-item"><span className="activity-message">{activity.message}</span><span className="activity-time">{new Date(activity.createdAt).toLocaleString()}</span></li>))}
// // // //                     </ul>
// // // //                   ) : (<p>No recent volunteer activity to show.</p>)}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )}

// // // //         {(activeTab === "manage" || activeTab === "pending" || activeTab === "resolved") && (
// // // //             <>
// // // //                 <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Complaints</h1>
// // // //                 <div className="filter-bar"><input type="text" placeholder="Search complaints..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
// // // //                 <div className="complaints-grid-admin">
// // // //                     {loading ? <p>Loading...</p> : filteredData.map((c) => (
// // // //                         <div key={c._id} className="complaint-card-admin">
// // // //                             <div className="card-clickable-content" onClick={() => navigate(`/complaints/${c._id}`)}>
// // // //                                 <img src={`http://localhost:5000/uploads/${c.images[0]}`} alt={c.title} className="card-img-admin"/>
// // // //                                 <div className="card-content">
// // // //                                     <div className="card-content-header">
// // // //                                         <h4>{c.title}</h4>
// // // //                                         <span className="status-badge-admin" style={{ backgroundColor: getStatusColor(c.status) }}>
// // // //                                             {c.status.replace("_", " ")}
// // // //                                         </span>
// // // //                                     </div>
// // // //                                     <p>{c.description.slice(0, 80)}...</p>
// // // //                                 </div>
// // // //                                 <div className="card-footer-admin">
// // // //                                     <span>By: {c.user_id?.name || 'N/A'}</span>
// // // //                                     <span>To: {c.assigned_to?.name || 'Unassigned'}</span>
// // // //                                 </div>
// // // //                             </div>
// // // //                             {c.status !== 'resolved' && (
// // // //                                 <div className="card-actions">
// // // //                                     <button className="action-btn-assign" onClick={() => { setSelectedComplaint(c); setShowAssignModal(true); }}>Assign</button>
// // // //                                     <button className="action-btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //             </>
// // // //         )}
        
// // // //         {activeTab === "map" && (
// // // //           <div className="map-view-container">
// // // //             <h1>Issue Map Overview</h1>
// // // //             {loading ? <p>Loading map...</p> :
// // // //             <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
// // // //               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// // // //               {data.map((c) => c.location?.coordinates ? (<CircleMarker key={c._id} center={[c.location.coordinates[1], c.location.coordinates[0]]} radius={8} color={issueTypeColors[c.issueType] || "#000"} fillOpacity={0.7}><LeafletTooltip>{c.title}</LeafletTooltip><Popup><div><h4>{c.title}</h4><p>Status: {c.status}</p><button onClick={() => navigate(`/complaints/${c._id}`)}>View Details</button></div></Popup></CircleMarker>) : null )}
// // // //             </MapContainer>}
// // // //           </div>
// // // //         )}

// // // //         {activeTab === "users" && (
// // // //             <div className="table-container">
// // // //                 <h1>User Management</h1>
// // // //                 <table>
// // // //                   <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
// // // //                   <tbody>{filteredData.map(u => (<tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td></tr>))}</tbody>
// // // //                 </table>
// // // //             </div>
// // // //         )}
// // // //       </main>
      
// // // //       {showAssignModal && (
// // // //         <div className="modal-overlay">
// // // //           <div className="modal-content">
// // // //             <h3>Assign Complaint</h3>
// // // //             <p>"{selectedComplaint?.title}"</p>
// // // //             <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)}>
// // // //               <option value="">Select Volunteer</option>
// // // //               {volunteers.map((v) => (<option key={v._id} value={v._id}>{v.name} ({v.email})</option>))}
// // // //             </select>
// // // //             <div className="modal-actions">
// // // //               <button className="btn-secondary" onClick={() => setShowAssignModal(false)}>Cancel</button>
// // // //               <button className="btn-primary" onClick={handleAssign}>Confirm</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <ConfirmationModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminDashboard;


// // // import React, { useEffect, useState, useCallback } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   getAdminSummary,
// // //   getAllComplaints,
// // //   getAllUsers,
// // //   getAdminVolunteers,
// // //   assignComplaint,
// // //   getAdminActivityLog,
// // //   deleteComplaintByAdmin,
// // //   getIssueTypeSummary
// // // } from "../utils/api";
// // // import { useAuth } from "../context/AuthContext";
// // // import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // // import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
// // // import jsPDF from 'jspdf';
// // // import autoTable from 'jspdf-autotable';
// // // import "leaflet/dist/leaflet.css";
// // // import "./AdminDashboard.css";

// // // const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
// // //     if (!isOpen) return null;
// // //     return (
// // //       <div className="modal-overlay">
// // //         <div className="modal-content">
// // //           <h3>Confirm Logout</h3>
// // //           <p>Are you sure you want to log out?</p>
// // //           <div className="modal-actions">
// // //             <button className="btn-secondary modal-btn" onClick={onClose}>Cancel</button>
// // //             <button className="btn-danger modal-btn" onClick={onConfirm}>Logout</button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // // };

// // // const issueTypeColors = {
// // //   pothole: "#8B4513", garbage_dump: "#FF4500", water_leak: "#1E90FF",
// // //   streetlight: "#FFD700", broken_sidewalk: "#A0522D", graffiti: "#800080",
// // //   noise_pollution: "#FF1493", other: "#32CD32",
// // // };

// // // const AdminDashboard = () => {
// // //   const { logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const [summary, setSummary] = useState({ total: 0, pending: 0, assigned: 0, in_review: 0, resolved: 0, activeUsers: 0 });
// // //   const [activeTab, setActiveTab] = useState("overview");
// // //   const [data, setData] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [reportLoading, setReportLoading] = useState(false);
// // //   const [search, setSearch] = useState("");
// // //   const [activityLog, setActivityLog] = useState([]);
// // //   const [showLogoutModal, setShowLogoutModal] = useState(false);
// // //   const [issueTypeData, setIssueTypeData] = useState([]);
// // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // //   const [selectedComplaint, setSelectedComplaint] = useState(null);
// // //   const [volunteers, setVolunteers] = useState([]);
// // //   const [selectedVolunteer, setSelectedVolunteer] = useState("");

// // //   const fetchSummaryAndLog = useCallback(async () => {
// // //     try {
// // //       const summaryRes = await getAdminSummary();
// // //       setSummary(summaryRes.data);
// // //     } catch (err) { console.error("Failed to fetch admin summary:", err); }
// // //     try {
// // //       const logRes = await getAdminActivityLog();
// // //       setActivityLog(logRes.data);
// // //     } catch (err) { console.error("Failed to fetch activity log:", err); }
// // //     try {
// // //       const issueTypeRes = await getIssueTypeSummary();
// // //       setIssueTypeData(issueTypeRes.data);
// // //     } catch (err) { console.error("Failed to fetch issue type summary:", err); }
// // //   }, []);
  
// // //   const fetchComplaints = useCallback(async (status) => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await getAllComplaints(status);
// // //       setData(res.data);
// // //     } catch (err) { console.error("Error fetching complaints:", err); }
// // //     finally { setLoading(false); }
// // //   }, []);

// // //   const fetchUsers = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await getAllUsers();
// // //       setData(res.data);
// // //     } catch (err) { console.error("Error fetching users:", err); }
// // //     finally { setLoading(false); }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (activeTab === 'overview') { fetchSummaryAndLog(); } 
// // //     else if (activeTab === 'map') { fetchComplaints("all"); } 
// // //     else if (activeTab === 'users') { fetchUsers(); } 
// // //     else if (activeTab === 'manage') { fetchComplaints("all"); } 
// // //     else if (activeTab === 'pending') { fetchComplaints("received"); } 
// // //     else if (activeTab === 'resolved') { fetchComplaints("resolved"); }
    
// // //     getAdminVolunteers().then(res => setVolunteers(res.data || [])).catch(err => console.error("Error fetching volunteers:", err));
    
// // //     const intervalId = setInterval(() => {
// // //         if (activeTab === 'overview') { fetchSummaryAndLog(); }
// // //     }, 20000);

// // //     return () => clearInterval(intervalId);
// // //   }, [activeTab, fetchSummaryAndLog, fetchComplaints, fetchUsers]);
  
// // //   const handleDownloadReport = async () => {
// // //     setReportLoading(true);
// // //     try {
// // //       const res = await getAllComplaints("all");
// // //       const complaints = res.data;
// // //       const doc = new jsPDF();
// // //       const tableColumns = ["Title", "Status", "Priority", "Reported By", "Assigned To", "Date"];
// // //       const tableRows = complaints.map(c => [
// // //         c.title, c.status.replace("_", " "), c.priority,
// // //         c.user_id?.name || "N/A", c.assigned_to?.name || "Unassigned",
// // //         new Date(c.createdAt).toLocaleDateString()
// // //       ]);
// // //       doc.text("CleanStreet - All Complaints Report", 14, 15);
// // //       autoTable(doc, { head: [tableColumns], body: tableRows, startY: 20 });
// // //       doc.save('complaints-report.pdf');
// // //     } catch (err) {
// // //       console.error("Failed to download PDF report:", err);
// // //       alert("Could not download the report.");
// // //     } finally {
// // //       setReportLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (complaintId) => {
// // //     if (!window.confirm("Are you sure you want to permanently delete this complaint?")) return;
// // //     try {
// // //       await deleteComplaintByAdmin(complaintId);
// // //       setData(prev => prev.filter(c => c._id !== complaintId));
// // //       alert("Complaint deleted successfully.");
// // //       fetchSummaryAndLog();
// // //     } catch (err) {
// // //       console.error("Error deleting complaint:", err);
// // //       alert("Failed to delete complaint.");
// // //     }
// // //   };

// // //   const handleAssign = async () => {
// // //     if (!selectedVolunteer) return alert("Please select a volunteer");
// // //     try {
// // //       await assignComplaint(selectedComplaint._id, selectedVolunteer);
// // //       setShowAssignModal(false);
// // //       setSelectedVolunteer("");
// // //       fetchComplaints(activeTab === "pending" ? "received" : "all");
// // //       fetchSummaryAndLog();
// // //     } catch (err) { console.error("Error assigning complaint:", err); }
// // //   };
  
// // //   const handleConfirmLogout = () => {
// // //     logout();
// // //     navigate('/');
// // //   };

// // //   const filteredData = data.filter((item) => {
// // //     if (activeTab === "users") {
// // //       return item.name?.toLowerCase().includes(search.toLowerCase()) || item.email?.toLowerCase().includes(search.toLowerCase());
// // //     }
// // //     return item.title?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase());
// // //   });

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "resolved": return "#28a745";
// // //       case "assigned": return "#3182CE";
// // //       case "in_review": return "#D69E2E";
// // //       default: return "#E53E3E";
// // //     }
// // //   };

// // //   const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

// // //   return (
// // //     <div className="admin-dashboard">
// // //       <aside className="sidebar">
// // //         <h2>Admin Panel</h2>
// // //         <ul>
// // //           <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>📊 Overview</li>
// // //           <li className={activeTab === "manage" ? "active" : ""} onClick={() => setActiveTab("manage")}>📋 All Complaints</li>
// // //           <li className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>🕒 Pending</li>
// // //           <li className={activeTab === "resolved" ? "active" : ""} onClick={() => setActiveTab("resolved")}>✅ Resolved</li>
// // //           <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>👥 Users</li>
// // //           <li className={activeTab === "map" ? "active" : ""} onClick={() => setActiveTab("map")}>🗺️ Issue Map</li>
// // //         </ul>
// // //         <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>Logout</button>
// // //       </aside>

// // //       <main className="main-content">
// // //         {activeTab === "overview" && (
// // //           <>
// // //             <div className="main-header">
// // //                 <h1>System Overview</h1>
// // //             </div>
// // //             <div className="cards">
// // //               <div className="card" onClick={() => setActiveTab('manage')}><h2>{summary.total || 0}</h2><p>Total Complaints</p></div>
// // //               <div className="card" onClick={() => setActiveTab('pending')}><h2>{summary.pending || 0}</h2><p>Pending</p></div>
// // //               <div className="card"><h2>{summary.assigned || 0}</h2><p>Assigned</p></div>
// // //               <div className="card"><h2>{summary.in_review || 0}</h2><p>In Review</p></div>
// // //               <div className="card" onClick={() => setActiveTab('resolved')}><h2>{summary.resolved || 0}</h2><p>Resolved</p></div>
// // //               <div className="card" onClick={() => setActiveTab('users')}><h2>{summary.activeUsers || 0}</h2><p>Active Users</p></div>
// // //             </div>
// // //             <div className="overview-layout">
// // //               <div className="overview-main">
// // //                 <div className="pie-chart-container">
// // //                   <h2>Complaints by Issue Type</h2>
// // //                   {issueTypeData.length > 0 ? (
// // //                     <ResponsiveContainer width="100%" height={300}>
// // //                       <PieChart>
// // //                         <Pie data={issueTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name.replace("_", " ")}: ${entry.value}`}>
// // //                           {issueTypeData.map((entry, index) => (
// // //                             <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
// // //                           ))}
// // //                         </Pie>
// // //                         <Tooltip />
// // //                         <Legend />
// // //                       </PieChart>
// // //                     </ResponsiveContainer>
// // //                   ) : <p>No complaint data available to display chart.</p>}
// // //                 </div>
// // //               </div>
// // //               <div className="overview-sidebar">
// // //                 <div className="activity-log-container">
// // //                   <h2>Recent Activity</h2>
// // //                   {activityLog.length > 0 ? (
// // //                     <ul className="activity-log-list">
// // //                       {activityLog.map(activity => (<li key={activity._id} className="activity-log-item"><span className="activity-message">{activity.message}</span><span className="activity-time">{new Date(activity.createdAt).toLocaleString()}</span></li>))}
// // //                     </ul>
// // //                   ) : (<p>No recent volunteer activity to show.</p>)}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </>
// // //         )}

// // //         {(activeTab === "manage" || activeTab === "pending" || activeTab === "resolved") && (
// // //             <>
// // //                 <div className="main-header">
// // //                     <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Complaints</h1>
// // //                     <button className="btn-primary" onClick={handleDownloadReport} disabled={reportLoading}>
// // //                         {reportLoading ? 'Generating...' : 'Download PDF Report'}
// // //                     </button>
// // //                 </div>
// // //                 <div className="filter-bar"><input type="text" placeholder="Search complaints..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
// // //                 <div className="complaints-grid-admin">
// // //                     {loading ? <p>Loading...</p> : filteredData.map((c) => (
// // //                         <div key={c._id} className="complaint-card-admin">
// // //                             <div className="card-clickable-content" onClick={() => navigate(`/complaints/${c._id}`)}>
// // //                                 <img src={c.images[0] ? `http://localhost:5000/uploads/${c.images[0]}` : 'https://via.placeholder.com/300'} alt={c.title} className="card-img-admin"/>
// // //                                 <div className="card-content">
// // //                                     <div className="card-content-header">
// // //                                         <h4>{c.title}</h4>
// // //                                         <span className="status-badge-admin" style={{ backgroundColor: getStatusColor(c.status) }}>{c.status.replace("_", " ")}</span>
// // //                                     </div>
// // //                                     <p>{c.description.slice(0, 80)}...</p>
// // //                                 </div>
// // //                                 <div className="card-footer-admin">
// // //                                     <span>By: {c.user_id?.name || 'N/A'}</span>
// // //                                     <span>To: {c.assigned_to?.name || 'Unassigned'}</span>
// // //                                 </div>
// // //                             </div>
// // //                             {c.status !== 'resolved' && (
// // //                                 <div className="card-actions">
// // //                                     <button className="action-btn-assign" onClick={() => { setSelectedComplaint(c); setShowAssignModal(true); }}>Assign</button>
// // //                                     <button className="action-btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             </>
// // //         )}
        
// // //         {activeTab === "map" && (
// // //           <div className="map-view-container">
// // //             <h1>Issue Map Overview</h1>
// // //             {loading ? <p>Loading map...</p> :
// // //             <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
// // //               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// // //               {data.map((c) => c.location?.coordinates ? (<CircleMarker key={c._id} center={[c.location.coordinates[1], c.location.coordinates[0]]} radius={8} color={issueTypeColors[c.issueType] || "#000"} fillOpacity={0.7}><LeafletTooltip>{c.title}</LeafletTooltip><Popup><div><h4>{c.title}</h4><p>Status: {c.status}</p><button onClick={() => navigate(`/complaints/${c._id}`)}>View Details</button></div></Popup></CircleMarker>) : null )}
// // //             </MapContainer>}
// // //           </div>
// // //         )}

// // //         {activeTab === "users" && (
// // //             <div className="table-container">
// // //                 <h1>User Management</h1>
// // //                 <table>
// // //                   <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
// // //                   <tbody>{filteredData.map(u => (<tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td></tr>))}</tbody>
// // //                 </table>
// // //             </div>
// // //         )}
// // //       </main>
      
// // //       {showAssignModal && (
// // //         <div className="modal-overlay">
// // //           <div className="modal-content">
// // //             <h3>Assign Complaint</h3>
// // //             <p>"{selectedComplaint?.title}"</p>
// // //             <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)}>
// // //               <option value="">Select Volunteer</option>
// // //               {volunteers.map((v) => (<option key={v._id} value={v._id}>{v.name} ({v.email})</option>))}
// // //             </select>
// // //             <div className="modal-actions">
// // //               <button className="btn-secondary modal-btn" onClick={() => setShowAssignModal(false)}>Cancel</button>
// // //               <button className="btn-primary modal-btn" onClick={handleAssign}>Confirm</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <ConfirmationModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;
// // // src/pages/AdminDashboard.jsx

// // import React, { useEffect, useState, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   getAdminSummary,
// //   getAllComplaints,
// //   getAllUsers,
// //   getAdminVolunteers,
// //   assignComplaint,
// //   getAdminActivityLog,
// //   deleteComplaintByAdmin,
// //   getIssueTypeSummary
// // } from "../utils/api";
// // import { useAuth } from "../context/AuthContext";
// // import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';
// // import "leaflet/dist/leaflet.css";
// // import { LayoutDashboard, FileText, Clock, CheckCircle, Users, BarChart2, LogOut, Search, SlidersHorizontal, Eye, Edit, Trash2, Settings, File } from "lucide-react";
// // import "./AdminDashboard.css";

// // // Your Original ConfirmationModal (Unchanged)
// // const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
// //     if (!isOpen) return null;
// //     return (
// //       <div className="modal-overlay">
// //         <div className="modal-content">
// //           <h3>Confirm Logout</h3>
// //           <p>Are you sure you want to log out?</p>
// //           <div className="modal-actions">
// //             <button className="btn-secondary modal-btn" onClick={onClose}>Cancel</button>
// //             <button className="btn-danger modal-btn" onClick={onConfirm}>Logout</button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// // };

// // // --- NEW VIEW-ONLY COMPONENTS FOR CLEANER CODE ---
// // // These components just render the UI and receive data/handlers as props.

// // // View for the main dashboard stats and charts
// // const DashboardView = ({ summary, issueTypeData }) => {
// //   const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// //   return (
// //     <div className="admin-page-container">
// //       <div className="page-header"><h1>Dashboard</h1><p>Overview of system metrics and performance.</p></div>
// //       <div className="stats-grid">
// //         <div className="stat-card"><div className="stat-info"><p>Cases Solved</p><span>{summary.resolved || 0}</span></div><div className="stat-icon green"><CheckCircle /></div></div>
// //         <div className="stat-card"><div className="stat-info"><p>Pending Cases</p><span>{summary.pending || 0}</span></div></div>
// //         <div className="stat-card"><div className="stat-info"><p>Total Users</p><span>{summary.activeUsers || 0}</span></div><div className="stat-icon purple"><Users /></div></div>
// //         <div className="stat-card"><div className="stat-info"><p>Total Complaints</p><span>{summary.total || 0}</span></div></div>
// //       </div>
// //       <div className="pie-chart-card">
// //         <h2>Complaints by Issue Type</h2>
// //         {issueTypeData.length > 0 ? (
// //           <ResponsiveContainer width="100%" height={300}>
// //             <PieChart><Pie data={issueTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name.replace("_", " ")}: ${entry.value}`}>{issueTypeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}</Pie><Tooltip /><Legend /></PieChart>
// //           </ResponsiveContainer>
// //         ) : <p>No complaint data available for chart.</p>}
// //       </div>
// //     </div>
// //   );
// // };

// // // View for the main complaints table
// // const ManageComplaintsView = ({ complaintList, title, loading, onDownload }) => (
// //     <div className="admin-page-container">
// //       <div className="page-header"><h1>{title}</h1><button className="download-all-btn" onClick={onDownload}>Download All</button></div>
// //       <div className="filter-bar">
// //         <div className="search-wrapper"><Search size={20} /><input type="text" placeholder="Search complaints..." /></div>
// //         <button className="filter-btn"><SlidersHorizontal size={16} /> Filter</button>
// //       </div>
// //       <div className="table-card">
// //         <table className="main-table">
// //           <thead><tr><th>ID</th><th>Title</th><th>Complainant</th><th>Assigned To</th><th>Status</th><th>Priority</th><th>Date</th><th>Actions</th></tr></thead>
// //           <tbody>
// //             {loading ? (<tr><td colSpan="8" style={{textAlign: 'center'}}>Loading...</td></tr>) : (complaintList.map(c => (
// //               <tr key={c._id}>
// //                 <td>{c._id.slice(-5).toUpperCase()}</td><td className="title-cell">{c.title}</td><td>{c.user_id?.name || 'N/A'}</td><td>{c.assigned_to?.name || 'Unassigned'}</td>
// //                 <td><span className={`status-pill status-${c.status.replace(/ /g, '_').toLowerCase()}`}>{c.status.replace("_", " ")}</span></td>
// //                 <td><span className={`priority-pill priority-${c.priority?.toLowerCase() || 'medium'}`}>{c.priority || 'Medium'}</span></td>
// //                 <td>{new Date(c.createdAt).toLocaleDateString()}</td>
// //                 <td className="actions-cell"><button className="icon-btn"><Eye size={16} /></button><button className="icon-btn"><Edit size={16} /></button><button className="icon-btn delete"><Trash2 size={16} /></button></td>
// //               </tr>
// //             )))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// // );

// // // View for pending complaints cards
// // const PendingComplaintsView = ({ complaintList }) => (
// //     <div className="admin-page-container">
// //         <div className="page-header"><h1>Pending Complaints</h1><p>Complaints awaiting assignment and review</p></div>
// //         <div className="pending-card">
// //             <div className="pending-header"><h2>Unassigned Complaints ({complaintList.length})</h2><button className="assign-all-btn">Assign All</button></div>
// //             <div className="pending-list">
// //                 {complaintList.map(c => (
// //                   <div className="pending-item" key={c._id}>
// //                       <div className="item-main"><Clock size={20} className="item-icon" /><div><h3>{c.title} <span>#{c._id.slice(-5).toUpperCase()}</span></h3><p>Complainant: {c.user_id?.name || 'N/A'}</p></div></div>
// //                       <div className="item-details"><span className={`priority-pill priority-${c.priority?.toLowerCase() || 'medium'}`}>{c.priority || 'Medium'}</span><p>Submitted: {new Date(c.createdAt).toLocaleDateString()}</p><button className="assign-btn">Assign</button></div>
// //                   </div>
// //                 ))}
// //             </div>
// //         </div>
// //     </div>
// // );


// // // --- MAIN ADMIN DASHBOARD COMPONENT ---
// // const AdminDashboard = () => {
// //   // --- YOUR EXISTING STATE AND LOGIC (UNCHANGED) ---
// //   const { logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [summary, setSummary] = useState({ total: 0, pending: 0, assigned: 0, in_review: 0, resolved: 0, activeUsers: 0 });
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [reportLoading, setReportLoading] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [activityLog, setActivityLog] = useState([]);
// //   const [showLogoutModal, setShowLogoutModal] = useState(false);
// //   const [issueTypeData, setIssueTypeData] = useState([]);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedComplaint, setSelectedComplaint] = useState(null);
// //   const [volunteers, setVolunteers] = useState([]);
// //   const [selectedVolunteer, setSelectedVolunteer] = useState("");

// //   const fetchSummaryAndLog = useCallback(async () => {
// //     try {
// //       const summaryRes = await getAdminSummary(); setSummary(summaryRes.data);
// //     } catch (err) { console.error("Failed to fetch admin summary:", err); }
// //     try {
// //       const logRes = await getAdminActivityLog(); setActivityLog(logRes.data);
// //     } catch (err) { console.error("Failed to fetch activity log:", err); }
// //     try {
// //       const issueTypeRes = await getIssueTypeSummary(); setIssueTypeData(issueTypeRes.data);
// //     } catch (err) { console.error("Failed to fetch issue type summary:", err); }
// //   }, []);
  
// //   const fetchComplaints = useCallback(async (status) => {
// //     setLoading(true);
// //     try {
// //       const res = await getAllComplaints(status); setData(res.data);
// //     } catch (err) { console.error("Error fetching complaints:", err); }
// //     finally { setLoading(false); }
// //   }, []);

// //   const fetchUsers = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getAllUsers(); setData(res.data);
// //     } catch (err) { console.error("Error fetching users:", err); }
// //     finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => {
// //     if (activeTab === 'dashboard') { fetchSummaryAndLog(); } 
// //     else if (activeTab === 'complaints') { fetchComplaints("all"); } 
// //     else if (activeTab === 'pending') { fetchComplaints("received"); } 
// //     else if (activeTab === 'resolved') { fetchComplaints("resolved"); }
// //     else if (activeTab === 'users') { fetchUsers(); }
    
// //     getAdminVolunteers().then(res => setVolunteers(res.data || [])).catch(err => console.error("Error fetching volunteers:", err));
// //   }, [activeTab, fetchSummaryAndLog, fetchComplaints, fetchUsers]);
  
// //   const handleDownloadReport = async () => {
// //     setReportLoading(true);
// //     try {
// //       const res = await getAllComplaints("all");
// //       const complaints = res.data;
// //       const doc = new jsPDF();
// //       const tableColumns = ["Title", "Status", "Priority", "Reported By", "Assigned To", "Date"];
// //       const tableRows = complaints.map(c => [
// //         c.title, c.status.replace("_", " "), c.priority,
// //         c.user_id?.name || "N/A", c.assigned_to?.name || "Unassigned",
// //         new Date(c.createdAt).toLocaleDateString()
// //       ]);
// //       doc.text("CleanStreet - All Complaints Report", 14, 15);
// //       autoTable(doc, { head: [tableColumns], body: tableRows, startY: 20 });
// //       doc.save('complaints-report.pdf');
// //     } catch (err) {
// //       console.error("Failed to download PDF report:", err);
// //       alert("Could not download the report.");
// //     } finally {
// //       setReportLoading(false);
// //     }
// //   };

// //   const handleDelete = async (complaintId) => {
// //     if (!window.confirm("Are you sure you want to permanently delete this complaint?")) return;
// //     try {
// //       await deleteComplaintByAdmin(complaintId);
// //       setData(prev => prev.filter(c => c._id !== complaintId));
// //       fetchSummaryAndLog();
// //     } catch (err) { console.error("Error deleting complaint:", err); }
// //   };

// //   const handleAssign = async () => {
// //     if (!selectedVolunteer) return alert("Please select a volunteer");
// //     try {
// //       await assignComplaint(selectedComplaint._id, selectedVolunteer);
// //       setShowAssignModal(false);
// //       fetchComplaints(activeTab === "pending" ? "received" : "all");
// //       fetchSummaryAndLog();
// //     } catch (err) { console.error("Error assigning complaint:", err); }
// //   };
  
// //   const handleConfirmLogout = () => { logout(); navigate('/'); };

// //   // --- UI RENDERING LOGIC ---
// //   const renderActiveTab = () => {
// //     const filteredComplaints = data.filter(c => {
// //         // You can expand this search logic
// //         return c.title?.toLowerCase().includes(search.toLowerCase());
// //     });

// //     switch(activeTab) {
// //       case 'dashboard': 
// //         return <DashboardView summary={summary} issueTypeData={issueTypeData} />;
// //       case 'complaints': 
// //         return <ManageComplaintsView complaintList={filteredComplaints} title="Manage Complaints" loading={loading} onDownload={handleDownloadReport} />;
// //       case 'pending':
// //         return <PendingComplaintsView complaintList={filteredComplaints.filter(c => c.status === 'pending' || c.status === 'received')} />;
// //       case 'resolved':
// //         return <ManageComplaintsView complaintList={filteredComplaints.filter(c => c.status === 'resolved')} title="Resolved Complaints" loading={loading} onDownload={handleDownloadReport} />;
// //       case 'users':
// //         return <div className="admin-page-container"><h1>Users</h1><p>User management table will be here.</p></div>
// //       default: 
// //         return <DashboardView summary={summary} issueTypeData={issueTypeData} />;
// //     }
// //   };

// //   return (
// //     <div className="admin-dashboard-container">
// //       {/* --- NEW SIDEBAR UI --- */}
// //       <aside className="admin-sidebar">
// //         <div className="sidebar-header"><h2 className="sidebar-brand">CleanStreet</h2></div>
// //         <nav className="sidebar-nav">
// //           <ul>
// //             <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}><LayoutDashboard size={20} /><span>Dashboard</span></li>
// //             <li className={activeTab === "complaints" ? "active" : ""} onClick={() => setActiveTab("complaints")}><FileText size={20} /><span>Manage Complaints</span></li>
// //             <li className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}><Clock size={20} /><span>Pending Complaints</span></li>
// //             <li className={activeTab === "resolved" ? "active" : ""} onClick={() => setActiveTab("resolved")}><CheckCircle size={20} /><span>Resolved</span></li>
// //             <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}><Users size={20} /><span>Users</span></li>
// //             <li className={activeTab === "reports" ? "active" : ""} onClick={() => setActiveTab("reports")}><BarChart2 size={20} /><span>Reports & Analytics</span></li>
// //           </ul>
// //         </nav>
// //         <div className="sidebar-footer"><button onClick={() => setShowLogoutModal(true)} className="logout-btn"><LogOut size={20} /><span>Logout</span></button></div>
// //       </aside>

// //       {/* --- MAIN CONTENT AREA WITH NEW UI --- */}
// //       <main className="admin-content">{renderActiveTab()}</main>

// //       {/* --- YOUR EXISTING MODALS (UNCHANGED) --- */}
// //       {showAssignModal && (
// //         <div className="modal-overlay">
// //           <div className="modal-content">
// //             <h3>Assign Complaint</h3><p>"{selectedComplaint?.title}"</p>
// //             <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)}><option value="">Select Volunteer</option>{volunteers.map((v) => (<option key={v._id} value={v._id}>{v.name} ({v.email})</option>))}</select>
// //             <div className="modal-actions"><button className="btn-secondary modal-btn" onClick={() => setShowAssignModal(false)}>Cancel</button><button className="btn-primary modal-btn" onClick={handleAssign}>Confirm</button></div>
// //           </div>
// //         </div>
// //       )}
// //       <ConfirmationModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getAdminSummary,
//   getAllComplaints,
//   getAllUsers,
//   getAdminVolunteers,
//   assignComplaint,
//   getAdminActivityLog,
//   deleteComplaintByAdmin,
//   getIssueTypeSummary
// } from "../utils/api";
// import { useAuth } from "../context/AuthContext";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
// import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import "leaflet/dist/leaflet.css";
// import "./AdminDashboard.css";

// const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
//     if (!isOpen) return null;
//     return (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <h3>Confirm Logout</h3>
//           <p>Are you sure you want to log out?</p>
//           <div className="modal-actions">
//             <button className="btn-secondary modal-btn" onClick={onClose}>Cancel</button>
//             <button className="btn-danger modal-btn" onClick={onConfirm}>Logout</button>
//           </div>
//         </div>
//       </div>
//     );
// };

// const issueTypeColors = {
//   pothole: "#8B4513", garbage_dump: "#FF4500", water_leak: "#1E90FF",
//   streetlight: "#FFD700", broken_sidewalk: "#A0522D", graffiti: "#800080",
//   noise_pollution: "#FF1493", other: "#32CD32",
// };

// // --- MOCK DATA FOR NEW CHARTS ---
// const priorityData = [
//   { name: 'High', count: 15 },
//   { name: 'Medium', count: 28 },
//   { name: 'Low', count: 12 },
// ];
// const monthlyData = [
//     { month: 'Jan', count: 20 }, { month: 'Feb', count: 45 }, { month: 'Mar', count: 30 },
//     { month: 'Apr', count: 55 }, { month: 'May', count: 40 }, { month: 'Jun', count: 60 }
// ];


// const AdminDashboard = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const [summary, setSummary] = useState({ total: 0, pending: 0, assigned: 0, in_review: 0, resolved: 0, activeUsers: 0 });
//   const [activeTab, setActiveTab] = useState("overview");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [activityLog, setActivityLog] = useState([]);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [issueTypeData, setIssueTypeData] = useState([]);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [volunteers, setVolunteers] = useState([]);
//   const [selectedVolunteer, setSelectedVolunteer] = useState("");

//   const fetchSummaryAndLog = useCallback(async () => {
//     try {
//       const summaryRes = await getAdminSummary();
//       setSummary(summaryRes.data);
//     } catch (err) { console.error("Failed to fetch admin summary:", err); }
//     try {
//       const logRes = await getAdminActivityLog();
//       setActivityLog(logRes.data);
//     } catch (err) { console.error("Failed to fetch activity log:", err); }
//     try {
//       const issueTypeRes = await getIssueTypeSummary();
//       setIssueTypeData(issueTypeRes.data);
//     } catch (err) { console.error("Failed to fetch issue type summary:", err); }
//   }, []);
  
//   const fetchComplaints = useCallback(async (status) => {
//     setLoading(true);
//     try {
//       const res = await getAllComplaints(status);
//       setData(res.data);
//     } catch (err) { console.error("Error fetching complaints:", err); }
//     finally { setLoading(false); }
//   }, []);

//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await getAllUsers();
//       setData(res.data);
//     } catch (err) { console.error("Error fetching users:", err); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'overview') { fetchSummaryAndLog(); } 
//     else if (activeTab === 'map') { fetchComplaints("all"); } 
//     else if (activeTab === 'users') { fetchUsers(); } 
//     else if (activeTab === 'manage') { fetchComplaints("all"); } 
//     else if (activeTab === 'pending') { fetchComplaints("received"); } 
//     else if (activeTab === 'resolved') { fetchComplaints("resolved"); }
    
//     getAdminVolunteers().then(res => setVolunteers(res.data || [])).catch(err => console.error("Error fetching volunteers:", err));
    
//     const intervalId = setInterval(() => {
//         if (activeTab === 'overview') { fetchSummaryAndLog(); }
//     }, 20000);

//     return () => clearInterval(intervalId);
//   }, [activeTab, fetchSummaryAndLog, fetchComplaints, fetchUsers]);
  
//   const handleDownloadReport = async () => {
//     setReportLoading(true);
//     try {
//       const res = await getAllComplaints("all");
//       const complaints = res.data;
//       const doc = new jsPDF();
//       const tableColumns = ["Title", "Status", "Priority", "Reported By", "Assigned To", "Date"];
//       const tableRows = complaints.map(c => [
//         c.title, c.status.replace("_", " "), c.priority,
//         c.user_id?.name || "N/A", c.assigned_to?.name || "Unassigned",
//         new Date(c.createdAt).toLocaleDateString()
//       ]);
//       doc.text("CleanStreet - All Complaints Report", 14, 15);
//       autoTable(doc, { head: [tableColumns], body: tableRows, startY: 20 });
//       doc.save('complaints-report.pdf');
//     } catch (err) {
//       console.error("Failed to download PDF report:", err);
//       alert("Could not download the report.");
//     } finally {
//       setReportLoading(false);
//     }
//   };

//   const handleDelete = async (complaintId) => {
//     if (!window.confirm("Are you sure you want to permanently delete this complaint?")) return;
//     try {
//       await deleteComplaintByAdmin(complaintId);
//       setData(prev => prev.filter(c => c._id !== complaintId));
//       alert("Complaint deleted successfully.");
//       fetchSummaryAndLog();
//     } catch (err) {
//       console.error("Error deleting complaint:", err);
//       alert("Failed to delete complaint.");
//     }
//   };

//   const handleAssign = async () => {
//     if (!selectedVolunteer) return alert("Please select a volunteer");
//     try {
//       await assignComplaint(selectedComplaint._id, selectedVolunteer);
//       setShowAssignModal(false);
//       setSelectedVolunteer("");
//       fetchComplaints(activeTab === "pending" ? "received" : "all");
//       fetchSummaryAndLog();
//     } catch (err) { console.error("Error assigning complaint:", err); }
//   };
  
//   const handleConfirmLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const filteredData = data.filter((item) => {
//     if (activeTab === "users") {
//       return item.name?.toLowerCase().includes(search.toLowerCase()) || item.email?.toLowerCase().includes(search.toLowerCase());
//     }
//     return item.title?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase());
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "resolved": return "#28a745";
//       case "assigned": return "#3182CE";
//       case "in_review": return "#D69E2E";
//       default: return "#E53E3E";
//     }
//   };

//   const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

//   return (
//     <div className="admin-dashboard">
//       <aside className="sidebar">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>📊 Overview</li>
//           <li className={activeTab === "manage" ? "active" : ""} onClick={() => setActiveTab("manage")}>📋 All Complaints</li>
//           <li className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>🕒 Pending</li>
//           <li className={activeTab === "resolved" ? "active" : ""} onClick={() => setActiveTab("resolved")}>✅ Resolved</li>
//           <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>👥 Users</li>
//           <li className={activeTab === "map" ? "active" : ""} onClick={() => setActiveTab("map")}>🗺️ Issue Map</li>
//         </ul>
//         <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>Logout</button>
//       </aside>

//       <main className="main-content">
//         {/* ====================================================== */}
//         {/* ========= NEW OVERVIEW PAGE UI STARTS HERE ========= */}
//         {/* ====================================================== */}
//         {activeTab === "overview" && (
//           <>
//             <div className="main-header">
//               <h1>System Overview</h1>
//             </div>

//             <div className="cards">
//               <div className="card" onClick={() => setActiveTab('manage')}><h2>{summary.total || 0}</h2><p>Total Complaints</p></div>
//               <div className="card" onClick={() => setActiveTab('pending')}><h2>{summary.pending || 0}</h2><p>Pending</p></div>
//               <div className="card"><h2>{summary.assigned || 0}</h2><p>Assigned</p></div>
//               <div className="card"><h2>{summary.in_review || 0}</h2><p>In Review</p></div>
//               <div className="card" onClick={() => setActiveTab('resolved')}><h2>{summary.resolved || 0}</h2><p>Resolved</p></div>
//               <div className="card" onClick={() => setActiveTab('users')}><h2>{summary.activeUsers || 0}</h2><p>Active Users</p></div>
//             </div>

//             <div className="overview-charts-grid">
//               <div className="pie-chart-container">
//                 <h2>Complaints by Issue Type</h2>
//                 {issueTypeData.length > 0 ? (
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie data={issueTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name.replace("_", " ")}: ${entry.value}`}>
//                         {issueTypeData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 ) : <p>No complaint data to display chart.</p>}
//               </div>

//               <div className="priority-chart-container">
//                 <h2>Complaints by Priority</h2>
//                  <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={priorityData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis type="number" />
//                         <YAxis type="category" dataKey="name" width={60} />
//                         <Tooltip />
//                         <Bar dataKey="count" fill="#8884d8">
//                             <Cell fill="#ef4444" />
//                             <Cell fill="#f59e0b" />
//                             <Cell fill="#22c55e" />
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="monthly-chart-container">
//                <h2>Monthly Case Trends</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
            
//             <div className="activity-log-container">
//               <h2>Recent Activity</h2>
//               {activityLog.length > 0 ? (
//                 <ul className="activity-log-list">
//                   {activityLog.map(activity => (<li key={activity._id} className="activity-log-item"><span className="activity-message">{activity.message}</span><span className="activity-time">{new Date(activity.createdAt).toLocaleString()}</span></li>))}
//                 </ul>
//               ) : (<p>No recent volunteer activity to show.</p>)}
//             </div>
//           </>
//         )}
//         {/* ==================================================== */}
//         {/* ========= NEW OVERVIEW PAGE UI ENDS HERE ========= */}
//         {/* ==================================================== */}


//         {(activeTab === "manage" || activeTab === "pending" || activeTab === "resolved") && (
//             <>
//                 <div className="main-header">
//                     <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Complaints</h1>
//                     <button className="btn-primary" onClick={handleDownloadReport} disabled={reportLoading}>
//                         {reportLoading ? 'Generating...' : 'Download PDF Report'}
//                     </button>
//                 </div>
//                 <div className="filter-bar"><input type="text" placeholder="Search complaints..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
//                 <div className="complaints-grid-admin">
//                     {loading ? <p>Loading...</p> : filteredData.map((c) => (
//                         <div key={c._id} className="complaint-card-admin">
//                             <div className="card-clickable-content" onClick={() => navigate(`/complaints/${c._id}`)}>
//                                 <img src={c.images[0] ? `http://localhost:5000/uploads/${c.images[0]}` : 'https://via.placeholder.com/300'} alt={c.title} className="card-img-admin"/>
//                                 <div className="card-content">
//                                     <div className="card-content-header">
//                                         <h4>{c.title}</h4>
//                                         <span className="status-badge-admin" style={{ backgroundColor: getStatusColor(c.status) }}>{c.status.replace("_", " ")}</span>
//                                     </div>
//                                     <p>{c.description.slice(0, 80)}...</p>
//                                 </div>
//                                 <div className="card-footer-admin">
//                                     <span>By: {c.user_id?.name || 'N/A'}</span>
//                                     <span>To: {c.assigned_to?.name || 'Unassigned'}</span>
//                                 </div>
//                             </div>
//                             {c.status !== 'resolved' && (
//                                 <div className="card-actions">
//                                     <button className="action-btn-assign" onClick={() => { setSelectedComplaint(c); setShowAssignModal(true); }}>Assign</button>
//                                     <button className="action-btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </>
//         )}
        
//         {activeTab === "map" && (
//           <div className="map-view-container">
//             <h1>Issue Map Overview</h1>
//             {loading ? <p>Loading map...</p> :
//             <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               {data.map((c) => c.location?.coordinates ? (<CircleMarker key={c._id} center={[c.location.coordinates[1], c.location.coordinates[0]]} radius={8} color={issueTypeColors[c.issueType] || "#000"} fillOpacity={0.7}><LeafletTooltip>{c.title}</LeafletTooltip><Popup><div><h4>{c.title}</h4><p>Status: {c.status}</p><button onClick={() => navigate(`/complaints/${c._id}`)}>View Details</button></div></Popup></CircleMarker>) : null )}
//             </MapContainer>}
//           </div>
//         )}

//         {activeTab === "users" && (
//             <div className="table-container">
//                 <h1>User Management</h1>
//                 <table>
//                   <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
//                   <tbody>{filteredData.map(u => (<tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td></tr>))}</tbody>
//                 </table>
//             </div>
//         )}
//       </main>
      
//       {showAssignModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Assign Complaint</h3>
//             <p>"{selectedComplaint?.title}"</p>
//             <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)}>
//               <option value="">Select Volunteer</option>
//               {volunteers.map((v) => (<option key={v._id} value={v._id}>{v.name} ({v.email})</option>))}
//             </select>
//             <div className="modal-actions">
//               <button className="btn-secondary modal-btn" onClick={() => setShowAssignModal(false)}>Cancel</button>
//               <button className="btn-primary modal-btn" onClick={handleAssign}>Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ConfirmationModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminSummary,
  getAllComplaints,
  getAllUsers,
  getAdminVolunteers,
  assignComplaint,
  getAdminActivityLog,
  deleteComplaintByAdmin,
  getIssueTypeSummary,
  getComplaintPrioritySummary,
  getMonthlyComplaintSummary
} from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "leaflet/dist/leaflet.css";
import "./AdminDashboard.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to log out?</p>
          <div className="modal-actions">
            <button className="btn-secondary modal-btn" onClick={onClose}>Cancel</button>
            <button className="btn-danger modal-btn" onClick={onConfirm}>Logout</button>
          </div>
        </div>
      </div>
    );
};

const issueTypeColors = {
  pothole: "#8B4513", garbage_dump: "#FF4500", water_leak: "#1E90FF",
  streetlight: "#FFD700", broken_sidewalk: "#A0522D", graffiti: "#800080",
  noise_pollution: "#FF1493", other: "#32CD32",
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState({ total: 0, pending: 0, assigned: 0, in_review: 0, resolved: 0, activeUsers: 0 });
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [issueTypeData, setIssueTypeData] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [priorityData, setPriorityData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchSummaryAndLog = useCallback(async () => {
    try {
      const summaryRes = await getAdminSummary();
      setSummary(summaryRes.data);
    } catch (err) { console.error("Failed to fetch admin summary:", err); }
    try {
      const logRes = await getAdminActivityLog();
      setActivityLog(logRes.data);
    } catch (err) { console.error("Failed to fetch activity log:", err); }
    try {
      const issueTypeRes = await getIssueTypeSummary();
      setIssueTypeData(issueTypeRes.data);
    } catch (err) { console.error("Failed to fetch issue type summary:", err); }
    try {
      const priorityRes = await getComplaintPrioritySummary();
      setPriorityData(priorityRes.data);
    } catch (err) { console.error("Failed to fetch priority summary:", err); }
    try {
      const monthlyRes = await getMonthlyComplaintSummary();
      setMonthlyData(monthlyRes.data);
    } catch (err) { console.error("Failed to fetch monthly summary:", err); }
  }, []);
  
  const fetchComplaints = useCallback(async (status) => {
    setLoading(true);
    try {
      const res = await getAllComplaints(status);
      setData(res.data);
    } catch (err) { console.error("Error fetching complaints:", err); }
    finally { setLoading(false); }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setData(res.data);
    } catch (err) { console.error("Error fetching users:", err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (activeTab === 'overview') { fetchSummaryAndLog(); } 
    else if (activeTab === 'map') { fetchComplaints("all"); } 
    else if (activeTab === 'users') { fetchUsers(); } 
    else if (activeTab === 'manage') { fetchComplaints("all"); } 
    else if (activeTab === 'pending') { fetchComplaints("received"); } 
    else if (activeTab === 'resolved') { fetchComplaints("resolved"); }
    
    getAdminVolunteers().then(res => setVolunteers(res.data || [])).catch(err => console.error("Error fetching volunteers:", err));
    
    const intervalId = setInterval(() => {
        if (activeTab === 'overview') { fetchSummaryAndLog(); }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [activeTab, fetchSummaryAndLog, fetchComplaints, fetchUsers]);
  
  const handleDownloadReport = async () => {
    setReportLoading(true);
    try {
      const res = await getAllComplaints("all");
      const complaints = res.data;
      const doc = new jsPDF();
      const tableColumns = ["Title", "Status", "Priority", "Reported By", "Assigned To", "Date"];
      const tableRows = complaints.map(c => [
        c.title, c.status.replace("_", " "), c.priority,
        c.user_id?.name || "N/A", c.assigned_to?.name || "Unassigned",
        new Date(c.createdAt).toLocaleDateString()
      ]);
      doc.text("CleanStreet - All Complaints Report", 14, 15);
      autoTable(doc, { head: [tableColumns], body: tableRows, startY: 20 });
      doc.save('complaints-report.pdf');
    } catch (err) {
      console.error("Failed to download PDF report:", err);
      alert("Could not download the report.");
    } finally {
      setReportLoading(false);
    }
  };

  const handleDelete = async (complaintId) => {
    if (!window.confirm("Are you sure you want to permanently delete this complaint?")) return;
    try {
      await deleteComplaintByAdmin(complaintId);
      setData(prev => prev.filter(c => c._id !== complaintId));
      alert("Complaint deleted successfully.");
      fetchSummaryAndLog();
    } catch (err) {
      console.error("Error deleting complaint:", err);
      alert("Failed to delete complaint.");
    }
  };

  const handleAssign = async () => {
    if (!selectedVolunteer) return alert("Please select a volunteer");
    try {
      await assignComplaint(selectedComplaint._id, selectedVolunteer);
      setShowAssignModal(false);
      setSelectedVolunteer("");
      fetchComplaints(activeTab === "pending" ? "received" : "all");
      fetchSummaryAndLog();
    } catch (err) { console.error("Error assigning complaint:", err); }
  };
  
  const handleConfirmLogout = () => {
    logout();
    navigate('/');
  };

  const filteredData = data.filter((item) => {
    if (activeTab === "users") {
      return item.name?.toLowerCase().includes(search.toLowerCase()) || item.email?.toLowerCase().includes(search.toLowerCase());
    }
    return item.title?.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase());
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "#28a745";
      case "assigned": return "#3182CE";
      case "in_review": return "#D69E2E";
      default: return "#E53E3E";
    }
  };

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>📊 Overview</li>
          <li className={activeTab === "manage" ? "active" : ""} onClick={() => setActiveTab("manage")}>📋 All Complaints</li>
          <li className-={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>🕒 Pending</li>
          <li className={activeTab === "resolved" ? "active" : ""} onClick={() => setActiveTab("resolved")}>✅ Resolved</li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>👥 Users</li>
          <li className={activeTab === "map" ? "active" : ""} onClick={() => setActiveTab("map")}>🗺️ Issue Map</li>
        </ul>
        <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>Logout</button>
      </aside>

      <main className="main-content">
        {activeTab === "overview" && (
          <>
            <div className="main-header">
              <h1>System Overview</h1>
            </div>
            <div className="cards">
              <div className="card" onClick={() => setActiveTab('manage')}><h2>{summary.total || 0}</h2><p>Total Complaints</p></div>
              <div className="card" onClick={() => setActiveTab('pending')}><h2>{summary.pending || 0}</h2><p>Pending</p></div>
              <div className="card"><h2>{summary.assigned || 0}</h2><p>Assigned</p></div>
              <div className="card"><h2>{summary.in_review || 0}</h2><p>In Review</p></div>
              <div className="card" onClick={() => setActiveTab('resolved')}><h2>{summary.resolved || 0}</h2><p>Resolved</p></div>
              <div className="card" onClick={() => setActiveTab('users')}><h2>{summary.activeUsers || 0}</h2><p>Active Users</p></div>
            </div>
            <div className="pie-chart-container">
              <h2>Complaints by Issue Type</h2>
              {issueTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={issueTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name.replace("_", " ")}: ${entry.value}`}>
                      {issueTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie><Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p>No complaint data to display chart.</p>}
            </div>
            <div className="priority-list-container">
              <h2>Complaints by Priority</h2>
              {priorityData.length > 0 ? (
                priorityData.map((item, index) => (
                  <div className="priority-item" key={index}>
                    <div className="priority-info">
                      <span className={`priority-color ${item.name.toLowerCase()}`}></span>
                      <p>{item.name}</p>
                    </div>
                    <span className="priority-count">{item.count}</span>
                  </div>
                ))
              ) : <p>No priority data available.</p>}
            </div>
            <div className="monthly-chart-container">
               <h2>Monthly Case Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="activity-log-container">
              <h2>Recent Activity</h2>
              {activityLog.length > 0 ? (
                <ul className="activity-log-list">
                  {activityLog.map(activity => (<li key={activity._id} className="activity-log-item"><span className="activity-message">{activity.message}</span><span className="activity-time">{new Date(activity.createdAt).toLocaleString()}</span></li>))}
                </ul>
              ) : (<p>No recent volunteer activity to show.</p>)}
            </div>
          </>
        )}

        {(activeTab === "manage" || activeTab === "pending" || activeTab === "resolved") && (
            <>
                <div className="main-header">
                    <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Complaints</h1>
                    <button className="btn-primary" onClick={handleDownloadReport} disabled={reportLoading}>
                        {reportLoading ? 'Generating...' : 'Download PDF Report'}
                    </button>
                </div>
                <div className="filter-bar"><input type="text" placeholder="Search complaints..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                <div className="complaints-grid-admin">
                    {loading ? <p>Loading...</p> : filteredData.map((c) => (
                        <div key={c._id} className="complaint-card-admin">
                            <div className="card-clickable-content" onClick={() => navigate(`/complaints/${c._id}`)}>
                                <img src={c.images[0] ? `http://localhost:5000/uploads/${c.images[0]}` : 'https://via.placeholder.com/300'} alt={c.title} className="card-img-admin"/>
                                <div className="card-content">
                                    <div className="card-content-header">
                                        <h4>{c.title}</h4>
                                        <span className="status-badge-admin" style={{ backgroundColor: getStatusColor(c.status) }}>{c.status.replace("_", " ")}</span>
                                    </div>
                                    <p>{c.description.slice(0, 80)}...</p>
                                </div>
                                <div className="card-footer-admin">
                                    <span>By: {c.user_id?.name || 'N/A'}</span>
                                    <span>To: {c.assigned_to?.name || 'Unassigned'}</span>
                                </div>
                            </div>
                            {c.status !== 'resolved' && (
                                <div className="card-actions">
                                    <button className="action-btn-assign" onClick={() => { setSelectedComplaint(c); setShowAssignModal(true); }}>Assign</button>
                                    <button className="action-btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </>
        )}
        
        {activeTab === "map" && (
          <div className="map-view-container">
            <h1>Issue Map Overview</h1>
            {loading ? <p>Loading map...</p> :
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {data.map((c) => c.location?.coordinates ? (<CircleMarker key={c._id} center={[c.location.coordinates[1], c.location.coordinates[0]]} radius={8} color={issueTypeColors[c.issueType] || "#000"} fillOpacity={0.7}><LeafletTooltip>{c.title}</LeafletTooltip><Popup><div><h4>{c.title}</h4><p>Status: {c.status}</p><button onClick={() => navigate(`/complaints/${c._id}`)}>View Details</button></div></Popup></CircleMarker>) : null )}
            </MapContainer>}
          </div>
        )}

        {activeTab === "users" && (
            <div className="table-container">
                <h1>User Management</h1>
                <table>
                  <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
                  <tbody>{filteredData.map(u => (<tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td></tr>))}</tbody>
                </table>
            </div>
        )}
      </main>
      
      {showAssignModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign Complaint</h3>
            <p>"{selectedComplaint?.title}"</p>
            <select value={selectedVolunteer} onChange={(e) => setSelectedVolunteer(e.target.value)}>
              <option value="">Select Volunteer</option>
              {volunteers.map((v) => (<option key={v._id} value={v._id}>{v.name} ({v.email})</option>))}
            </select>
            <div className="modal-actions">
              <button className="btn-secondary modal-btn" onClick={() => setShowAssignModal(false)}>Cancel</button>
              <button className="btn-primary modal-btn" onClick={handleAssign}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
};

export default AdminDashboard;