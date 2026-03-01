import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

function PostLabourJobsPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    wage: '',
    jobType: '',
    seasonal: '',
    date: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "location") {
      const match = value.trim().match(/^([-+]?[0-9]*\.?[0-9]+)\s*,\s*([-+]?[0-9]*\.?[0-9]+)$/);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          location: value,
          latitude: match[1],
          longitude: match[2]
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          location: value,
          latitude: '',
          longitude: ''
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value
      }));
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(6);
          const lng = pos.coords.longitude.toFixed(6);
          const formatted = `${lat}, ${lng}`;
          setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            location: formatted
          }));
        },
        (err) => {
          alert("Unable to fetch location");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      latitude,
      longitude,
      title,
      description,
      wage,
      jobType,
      seasonal,
      date,
      image
    } = formData;

    if (!latitude || !longitude) {
      alert("Please provide a valid location (use button or manual entry).");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("latitude", latitude);
      data.append("longitude", longitude);
      data.append("wage", wage);
      data.append("jobType", jobType);
      data.append("seasonal", seasonal);
      data.append("date", date);
      if (image) data.append("image", image);

      const res = await axios.post(`${API_BASE_URL}/user/post/work`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert(res.data.message || "Job posted successfully!");
      window.location.reload()
    } catch (err) {
      console.error(err);
      alert("Failed to post job. Make sure you're logged in.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen text-gray-800 font-sans">
      <section className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Post Labour Job</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">

          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">Job Title</label>
            <input type="text" id="title" name="title" className="w-full border px-3 py-2 rounded"
              value={formData.title} onChange={handleChange} required />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-semibold mb-1">Description</label>
            <textarea id="description" name="description" className="w-full border px-3 py-2 rounded"
              rows="4" value={formData.description} onChange={handleChange} required />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-semibold mb-1">Location (lat, lng)</label>
            <input type="text" id="location" name="location" className="w-full border px-3 py-2 rounded"
              value={formData.location} onChange={handleChange} placeholder="e.g. 28.61, 77.20" required />
            <button type="button" onClick={handleUseLocation}
              className="mt-2 text-sm text-blue-600 underline hover:text-blue-800">
              Use My Current Location
            </button>
          </div>

          {/* Wage */}
          <div>
            <label htmlFor="wage" className="block font-semibold mb-1">Wage Offered (₹)</label>
            <input type="number" id="wage" name="wage" className="w-full border px-3 py-2 rounded"
              value={formData.wage} onChange={handleChange} required />
          </div>

          {/* Job Type */}
          <div>
            <label className="block font-semibold mb-1">Job Type</label>
            <div className="flex gap-4">
              {['fulltime', 'parttime'].map(type => (
                <label key={type} className={`option-label ${formData.jobType === type ? 'active' : ''}`}>
                  <input type="radio" name="jobType" value={type}
                    className="hidden-radio" checked={formData.jobType === type}
                    onChange={handleRadioChange} required /> {type === 'fulltime' ? 'Full-Time' : 'Part-Time'}
                </label>
              ))}
            </div>
          </div>

          {/* Seasonal */}
          <div>
            <label className="block font-semibold mb-1">Is it Seasonal/Temporary?</label>
            <div className="flex gap-4">
              {['yes', 'no'].map(val => (
                <label key={val} className={`option-label ${formData.seasonal === val ? 'active' : ''}`}>
                  <input type="radio" name="seasonal" value={val}
                    className="hidden-radio" checked={formData.seasonal === val}
                    onChange={handleRadioChange} required /> {val === 'yes' ? 'Yes' : 'No'}
                </label>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block font-semibold mb-1">Job Date</label>
            <input type="date" id="date" name="date" className="w-full border px-3 py-2 rounded"
              value={formData.date} onChange={handleChange} required />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block font-semibold mb-1">Upload Image (optional)</label>
            <input type="file" id="image" name="image" accept="image/*" className="w-full"
              onChange={handleChange} />
          </div>

          {/* Submit */}
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded w-full font-semibold hover:bg-green-800">
            Post Job
          </button>
        </form>
      </section>
    </div>
  );
}

export default PostLabourJobsPage;
