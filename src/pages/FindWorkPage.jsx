import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

function FindWorkPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsWithLocation = async (latitude, longitude) => {
      try {
        const res = await axios.get(`${API_BASE_URL}/find`, {
          params: { lat: latitude, lng: longitude },
          withCredentials: true
        });

        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        if (err.response && err.response.status === 401) {
          navigate("/login"); // only redirect if not authenticated
        }
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchJobsWithLocation(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Please allow location access to view nearby jobs.");
        setLoading(false);
      }
    );
  }, []);


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Available Jobs Near You</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available near your location.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-green-700">{job.title}</h2>
              <p className="text-gray-700 mt-2">{job.description}</p>

              <button
                onClick={async () => {
                  try {
                    const res = await axios.post(`${API_BASE_URL}/user/apply-job/${job._id}`, {}, { withCredentials: true });
                    alert(res.data.message || "Applied successfully!");
                  } catch (err) {
                    alert(err.response?.data?.error || "Failed to apply");
                  }
                }}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Apply
              </button>

              {job.location?.coordinates && (
                <p className="text-sm text-gray-500 mt-2">
                  Location: Lat {job.location.coordinates[1]}, Lng {job.location.coordinates[0]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindWorkPage;
