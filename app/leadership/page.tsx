'use client'
import {  Award,  Linkedin, ArrowRight, } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchTeam } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { TeamMember } from "@/components/admin/Team";
import ServicesClickModal from "@/components/ServicesClickModal";



export default function LeadershipPage() {

  const [leaders, setLeaders] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchTeam("isActive=true&limit=200&sortBy=sortOrder&sortOrder=asc");
        const data = response.leaders || response.data || response;
        
        // Handle both array response and object with leaders property
        const leadersArray = Array.isArray(data) ? data : (data.leaders || []);
        setLeaders(leadersArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaders');
        console.error('Error loading leaders:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, []);


 
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Hero Section */}
        <section className="relative py-10 flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {/* Background Effects */}
          <motion.div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-32 right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-15, 15],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 container px-3 text-left max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-6xl mx-auto"
            >
              {/* Tagline */}
              <motion.div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8">
                Meet Our Exceptional Leaders
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-4xl md:text-4xl lg:text-4xl font-bold text-white mb-3 leading-tight"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                Leadership{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Team
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                className="text-xl text-gray-300 mb-5 max-w-6xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Our leadership team combines decades of industry experience with innovative thinking to drive exceptional results for our clients. Each leader brings unique expertise and a shared commitment to excellence, integrity, and client success.
              </motion.p>

              {/* CTA */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <Link href="#team" className="inline-flex items-center w-56 bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-white hover:text-primary transition-all duration-300 group">
                  Meet the Leadership
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact-us" className=" w-56 inline-flex items-center border-2 border-white/30 text-white px-5 py-2 rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group">
                  Connect With Us
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-10 bg-white relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl  font-bold text-gray-800 mb-4">Our Leadership Team</h2>
              {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto text-left">
                Experienced professionals dedicated to delivering excellence and driving innovation in every client engagement
              </p> */}
            </motion.div>


            {/* Leaders Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-600 text-lg mb-4">Failed to load leadership team</div>
                <p className="text-gray-600 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : leaders.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-600 text-lg mb-4">No leaders found</div>
                <p className="text-gray-500">Please check back later or contact us for more information.</p>
              </div>
            ) : (
 <AnimatePresence mode="wait">
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {leaders.map((leader, index) => (
        <motion.div
          key={leader.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -12 }}
          className="relative group cursor-pointer"
        >
          {/* Main Card */}
          <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 h-[300px]">
            
        
            {/* LinkedIn Badge */}
            {leader.linkedin && (
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-6 right-6 z-20 flex items-center justify-center w-11 h-11 rounded-xl bg-white shadow-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {/* Avatar Section */}
            <div className="relative pt-8 pb-4 px-6">
              <div className="flex flex-col items-center">
                <div className="relative group/avatar">
                  {/* Glow Ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-110" />
                  
                  {/* Avatar Container */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1 shadow-xl group-hover/avatar:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden">
                      <img
                        src={leader.image || "/api/placeholder/300/400"}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full p-2 shadow-lg">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative px-6 pb-3">
              {/* Name and Title */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                  {leader.name}
                </h3>
                <p className="text-sm font-semibold text-blue-600 mb-3" dangerouslySetInnerHTML={{ __html: leader.position}}/>
            
              </div>

            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>

          {/* Floating Shadow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105" />
        </motion.div>
      ))}
    </motion.div>
  </>
</AnimatePresence>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-10 bg-primary">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-white/95"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
                Ready to Work with Our Expert Team?
              </h2>
              <p className="text-xl text-white mb-8 text-pretty leading-relaxed">
                Connect with our leadership team to discuss how we can help transform your business and achieve your strategic goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ServicesClickModal />
                <a
                  href="/contact-us"
                  className="bg-transparent border-2 border-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  Contact Us Today
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom wave */}
          <div className="absolute left-0 right-0 bottom-0 z-20 pointer-events-none -mb-3">
            <svg
              viewBox="0 0 1920 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-10 md:h-14"
            >
              <path d="M0,40 Q480,80 960,40 T1920,40 V80 H0 Z" fill="#305ca7" />
            </svg>
          </div>
        </section>
      </div>

    </>
  )
}