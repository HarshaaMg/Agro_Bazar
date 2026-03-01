import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

function SellToolsPage() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    location: '',
    latitude: '',
    longitude: '',
    available: true,
    image: null,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "location") {
      const match = value.trim().match(/^([-+]?[0-9]*\.?[0-9]+)\s*,\s*([-+]?[0-9]*\.?[0-9]+)$/);
      if (match) {
        setFormData(prev => ({
          ...prev,
          location: value,
          latitude: match[1],
          longitude: match[2]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          location: value,
          latitude: '',
          longitude: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
      }));
    }
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

    if (!formData.latitude || !formData.longitude) {
      alert("Please provide a valid location (use location input or button).");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("available", formData.available);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(`${API_BASE_URL}/user/post/product`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      alert(res.data.message || "Tool submitted successfully!");

      // Clear form after successful submit
      setFormData({
        name: '',
        type: '',
        price: '',
        location: '',
        latitude: '',
        longitude: '',
        available: true,
        image: null,
        description: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to post tool. Make sure you're logged in.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen text-gray-800 font-sans">
      <section className="max-w-3xl mx-auto p-6 bg-white mt-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Post Your Tool</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="tool-name">Tool Name</label>
            <input
              type="text"
              id="tool-name"
              name="name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Type</label>
            <div className="flex gap-6">
              {['rent', 'buy'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value={option}
                    className="accent-green-600"
                    checked={formData.type === option}
                    onChange={handleChange}
                    required
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="tool-price">Price (₹)</label>
            <input
              type="number"
              id="tool-price"
              name="price"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="tool-location">Location (lat, lng)</label>
            <input
              type="text"
              id="tool-location"
              name="location"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. 28.61, 77.20"
              required
            />
            <button
              type="button"
              onClick={handleUseLocation}
              className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
            >
              Use My Current Location
            </button>
            {formData.latitude && formData.longitude && (
              <p className="text-sm text-gray-600 mt-1">
                Latitude: {formData.latitude}, Longitude: {formData.longitude}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                className="accent-green-600"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="tool-image">Upload Image</label>
            <input
              type="file"
              id="tool-image"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="tool-description">Description</label>
            <textarea
              id="tool-description"
              name="description"
              rows="4"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-2 rounded"
          >
            Submit Tool
          </button>
        </form>
      </section>
    </div>
  );
}

export default SellToolsPage;
