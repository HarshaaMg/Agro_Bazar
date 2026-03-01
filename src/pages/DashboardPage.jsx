import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';

function DashboardPage() {
  const [userDashboardData, setUserDashboardData] = useState({
    jobsPosted: [],
    jobsApplied: [],
    toolsPosted: [],
    toolsRequested: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/dashboard`, { withCredentials: true });
        setUserDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const handleApplicantAction = async (appId, applicantName, action) => {
    try {
      const res = await axios.post(`http://localhost:8001/user/application/${appId}/status`,
        { status: action },
        { withCredentials: true }
      );
      alert(res.data.message || `${action} action for ${applicantName} successful.`);
      // Refresh page to show new status
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  const handleToolRequestAction = async (reqId, requesterName, action) => {
    try {
      const res = await axios.post(`http://localhost:8001/user/request/${reqId}/status`,
        { status: action },
        { withCredentials: true }
      );
      alert(res.data.message || `${action} action for ${requesterName} successful.`);
      // Refresh page to show new status
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading dashboard...</div>;

  return (
    <div className="bg-green-50 min-h-screen text-gray-800 font-sans">
      {/* Dashboard Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Jobs You Have Posted</h2>
          <div className="space-y-6" id="jobs-posted">
            {userDashboardData.jobsPosted?.map(job => (
              <div key={job.id} className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold mb-1">

                  <Link to={`/job-details/${job.id}`} className="job-link">
                    {job.title}
                  </Link>
                  {' '} - {job.location}
                </h3>
                {job.applicants?.length > 0 ? (
                  <>
                    <p className="mt-2 font-medium">Applicants:</p>
                    <ul className="list-disc list-inside space-y-2">
                      {job.applicants?.map((applicant, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                          <strong>{applicant.name}</strong> - {applicant.phone}<br />
                          <small className="text-gray-600">Applied on: {applicant.appliedAt}</small><br />
                          <span className="font-semibold mr-2 block mt-1 mb-2">Status:
                            <span className={
                              applicant.status === 'Accepted' ? 'text-green-600 ml-1' :
                                applicant.status === 'Rejected' ? 'text-red-600 ml-1' : 'text-yellow-600 ml-1'
                            }>{applicant.status}</span>
                          </span>

                          {applicant.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApplicantAction(applicant.id, applicant.name, 'Accepted')}
                                className="mt-1 mr-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleApplicantAction(applicant.id, applicant.name, 'Rejected')}
                                className="mt-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500 mt-2">No one has applied yet.</p>
                )}
              </div>
            ))}
          </div>
          {userDashboardData.jobsPosted?.length === 0 && <p className="text-gray-600 italic">No jobs posted yet.</p>}

        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Tools You Have Posted</h2>
          <div className="space-y-6">
            {userDashboardData.toolsPosted?.map(tool => (
              <div key={tool.id} className="bg-white shadow-md rounded-lg mx-auto p-5 border border-green-100">
                <h3 className="text-xl font-semibold mb-2 text-green-800">
                  {tool.name} (₹{tool.price})
                </h3>
                {tool.requests && tool.requests.length > 0 ? (
                  <>
                    <p className="mt-2 text-green-700 font-medium border-b border-gray-100 pb-1">Requests to Rent/Buy:</p>
                    <ul className="list-disc list-inside space-y-3 pt-2">
                      {tool.requests.map((reqs, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                          <strong>{reqs.name}</strong> - {reqs.phone}<br />
                          <small className="text-gray-600">Requested on: {reqs.requestedAt}</small><br />
                          <span className="font-semibold block mt-1 mb-2">Status:
                            <span className={
                              reqs.status === 'Accepted' ? 'text-green-600 ml-1' :
                                reqs.status === 'Rejected' ? 'text-red-600 ml-1' : 'text-yellow-600 ml-1'
                            }>{reqs.status}</span>
                          </span>

                          {reqs.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleToolRequestAction(reqs.id, reqs.name, 'Accepted')}
                                className="mt-1 mr-2 bg-green-600 text-white px-3 py-1 rounded text-sm shadow hover:bg-green-700 transition"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleToolRequestAction(reqs.id, reqs.name, 'Rejected')}
                                className="mt-1 bg-red-600 text-white px-3 py-1 rounded text-sm shadow hover:bg-red-700 transition"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500 mt-2 italic bg-gray-50 p-2 rounded">No requests received yet.</p>
                )}
              </div>
            ))}
          </div>
          {(!userDashboardData.toolsPosted || userDashboardData.toolsPosted.length === 0) && <p className="text-gray-600 italic">No tools posted yet.</p>}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Jobs You Have Applied To</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userDashboardData.jobsApplied?.map(job => (
              <div key={job.id} className="bg-white shadow rounded-lg p-5 border border-gray-100 relative">
                <h3 className="text-lg font-semibold mb-1 text-green-700">
                  {job.title}
                </h3>
                <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-green-50 text-green-800 border border-green-200">
                  {job.status}
                </div>
              </div>
            ))}
          </div>
          {userDashboardData.jobsApplied?.length === 0 && <p className="text-gray-600 italic">You haven't applied to any jobs yet.</p>}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Tools You Have Requested</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userDashboardData.toolsRequested?.map(tool => (
              <div key={tool.id} className="bg-white shadow rounded-lg p-5 border border-gray-100 relative">
                <h3 className="text-lg font-semibold mb-1 text-green-700">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Owner:</span> {tool.owner}</p>
                <p className="text-sm text-gray-500 mt-2">Requested on: {tool.requestedAt}</p>

                <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {tool.status}
                </div>
              </div>
            ))}
          </div>
          {(!userDashboardData.toolsRequested || userDashboardData.toolsRequested.length === 0) && <p className="text-gray-600 italic">You haven't requested any tools yet.</p>}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
