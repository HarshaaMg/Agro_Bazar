import React from 'react';
import { API_BASE_URL } from '../api';

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-800 min-h-screen">
      {/* Main Section */}
      <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden" style={{ backgroundImage: "url('/farm.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent leading-tight">
            Let's grow more, <br className="md:hidden" />spend less together
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 font-light">
            Connecting farmers and labourers for a better future.
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-green-500/50"
          >
            Get Started →
          </a>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-green-800 bg-clip-text text-transparent">
              What do you want to do?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rent/Buy Tools Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  Rent / Buy Tools
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  Find affordable agricultural tools and machines near you with verified sellers.
                </p>
                <a
                  href="/rent-buy-tools"
                  className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 group-hover:translate-x-2 transition-all duration-300"
                >
                  Explore Tools
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Sell Tools Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  Sell Tools
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  List your second-hand or new tools to earn money from them easily and securely.
                </p>
                <a
                  href="/sell-tools"
                  className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 group-hover:translate-x-2 transition-all duration-300"
                >
                  Sell Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Post Labour Job Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  Post Labour Job
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  Need helping hands? Post your job and connect with nearby skilled workers.
                </p>
                <a
                  href="/post-labour-jobs"
                  className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 group-hover:translate-x-2 transition-all duration-300"
                >
                  Post Job
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Find Work Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                  Find Work
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  Looking for farming work near you? Browse available jobs easily and apply instantly.
                </p>
                <a
                  href="/find-work"
                  className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 group-hover:translate-x-2 transition-all duration-300"
                >
                  Browse Jobs
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <img
                src="/working_farmers.jpg"
                alt="Working Farmer"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="md:w-1/2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-green-800 bg-clip-text text-transparent">
                Why Agro Bazar?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-6"></div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Agro Bazar empowers farmers and laborers by providing a comprehensive digital platform for renting, selling, and hiring in agriculture. It's designed to be simple, effective, and accessible—even for those with minimal smartphone experience.
            </p>

            <div className="space-y-4">
              {[
                { icon: "💰", text: "Affordable access to quality tools" },
                { icon: "🔒", text: "Secure and verified listings" },
                { icon: "👥", text: "Nearby labour connection" },
                { icon: "📱", text: "One-stop digital solution for farming needs" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;