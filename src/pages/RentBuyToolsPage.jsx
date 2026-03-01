import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_UPLOADS_URL } from '../api';

function RentBuyToolsPage() {
  const [tools, setTools] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('both');
  const [loadedCount, setLoadedCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ img: '', title: '', desc: '' });

  // ✅ Fetch from backend once on mount
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/rent-buy`, { withCredentials: true });
        const fetchedTools = res.data.tools.map(tool => ({
          ...tool,
          image: `${API_UPLOADS_URL}/${tool.image.replace(/\\/g, '/').split("uploads/")[1]}`
        }));
        setTools(fetchedTools);
        setLoadedCount(fetchedTools.length); // no batching
      } catch (err) {
        console.error("Failed to fetch tools:", err);
      }
    };
    fetchTools();
  }, []);

  const filteredTools = tools.filter(tool => {
    if (currentFilter === 'both') return true;
    return tool.type === currentFilter;
  });

  const openModal = (img, title, desc) => {
    setModalContent({ img, title, desc });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="bg-green-50 min-h-screen text-gray-800 font-sans">
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Tools</h2>
        <div className="flex justify-center gap-4 mb-6">
          {['rent', 'buy', 'both'].map(filter => (
            <button
              key={filter}
              className={`px-4 py-2 rounded border border-green-700 ${currentFilter === filter ? 'text-white bg-green-700' : 'text-green-700 bg-white'}`}
              onClick={() => setCurrentFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool._id} className="bg-white rounded shadow p-4">
              <img src={tool.image} alt={tool.name} className="card-image rounded mb-3" />
              <h3 className="text-xl font-semibold">{tool.name}</h3>
              <p className="text-sm text-gray-600">Type: {tool.type.toUpperCase()}</p>
              <p className="text-sm text-gray-600">Price: ₹{tool.price}</p>
              <p className="text-sm text-gray-600">Availability: <span className={tool.available ? 'text-green-600' : 'text-red-600'}>{tool.available ? 'Available' : 'Not Available'}</span></p>
              <button onClick={() => openModal(tool.image, tool.name, tool.description)} className="bg-blue-600 text-white w-full py-2 rounded mb-2 hover:bg-blue-700">
                View
              </button>
              <button
                onClick={async () => {
                  try {
                    const res = await axios.post(`${API_BASE_URL}/user/request-tool/${tool._id}`, {}, { withCredentials: true });
                    alert(res.data.message || "Request sent successfully!");
                  } catch (err) {
                    alert(err.response?.data?.error || "Failed to send request");
                  }
                }}
                className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
              >
                Request
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div id="modal" className="modal" onClick={(e) => { if (e.target.id === 'modal') closeModal(); }}>
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-red-600 text-xl font-bold hover:text-red-800" aria-label="Close modal">&times;</button>
            <div className="flex justify-center mb-4">
              <img src={modalContent.img} alt="Tool Image" className="modal-image rounded" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">{modalContent.title}</h3>
            <p className="text-gray-700 text-center">{modalContent.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentBuyToolsPage;
