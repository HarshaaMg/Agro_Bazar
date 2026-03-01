import React, { useState, useEffect } from 'react';

function FindWorkPage() {
  const initialJobs = [
    {
      title: "Harvest Helper",
      description: "Need laborers to help with wheat harvest.",
      location: "Indore, MP",
      wage: "₹300/day",
      jobType: "fulltime",
      seasonal: "yes",
      date: "2025-06-28"
    },
    {
      title: "Watering Plants",
      description: "Light work for watering and weeding.",
      location: "Lucknow, UP",
      wage: "₹200/day",
      jobType: "parttime",
      seasonal: "no",
      date: "2025-06-22"
    },
    {
      title: "Field Clearing",
      description: "Remove old crops and clean the field.",
      location: "Nagpur, MH",
      wage: "₹400/day",
      jobType: "fulltime",
      seasonal: "yes",
      date: "2025-07-01"
    }
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [currentFilter, setCurrentFilter] = useState('all');

  // Function to render jobs based on the current filter
  const renderJobs = () => {
    const filtered = currentFilter === 'all'
      ? initialJobs
      : initialJobs.filter(job => job.jobType === currentFilter);
    setJobs(filtered);
  };

  useEffect(() => {
    renderJobs(); // Initial render and re-render on filter change
  }, [currentFilter]); 

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
  };

  return (
    <div className="bg-green-50 min-h-screen text-gray-800 font-sans">
      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Find Labour Jobs</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`job-filter px-4 py-2 rounded border border-green-700 ${currentFilter === 'all' ? 'text-white bg-green-700' : 'text-green-700 bg-white'}`}
            onClick={() => handleFilterChange('all')}
            data-type="all"
          >
            All
          </button>
          <button
            className={`job-filter px-4 py-2 rounded border border-green-700 ${currentFilter === 'fulltime' ? 'text-white bg-green-700' : 'text-green-700 bg-white'}`}
            onClick={() => handleFilterChange('fulltime')}
            data-type="fulltime"
          >
            Full-Time
          </button>
          <button
            className={`job-filter px-4 py-2 rounded border border-green-700 ${currentFilter === 'parttime' ? 'text-white bg-green-700' : 'text-green-700 bg-white'}`}
            onClick={() => handleFilterChange('parttime')}
            data-type="parttime"
          >
            Part-Time
          </button>
        </div>

        {/* Job Cards */}
        <div id="job-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Type: {job.jobType.toUpperCase()}</p>
              <p className="text-sm text-gray-600 mb-1">Wage: {job.wage}</p>
              <p className="text-sm text-gray-600 mb-1">Location: {job.location}</p>
              <p className="text-sm text-gray-600 mb-1">Seasonal: {job.seasonal === 'yes' ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-600 mb-3">Date: {job.date}</p>
              <button className="bg-green-700 text-white w-full py-2 rounded">Apply</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FindWorkPage;
