'use client'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, Download, Calendar, Search, ArrowRight } from "lucide-react"
import { DecorativeBottomWave } from "@/components/DecorativeBottomWave"
import api from "@/lib/axios"
import PublicationModal from "@/components/publication-modal"

export interface Publication {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Fetch publications
  const fetchPublications = async () => {
    try {
      const { data } = await api.get("/publications");
      setPublications(data.data || data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Handle opening the modal
  const handleViewPublication = (publication: Publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>

        <div className="relative container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            variants={fadeInUp}
            className="text-left max-w-6xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 text-white">
              Publications
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Access our comprehensive library of research reports, whitepapers, and industry insights 
              to stay ahead in the dynamic African business landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Publications</h2>
            <p className="text-gray-600">
              {loading ? 'Loading publications...' : `${filteredPublications.length} ${filteredPublications.length === 1 ? 'publication' : 'publications'} found`}
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group p-6 animate-pulse">
                  <div className="h-28 bg-gray-200 rounded mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((publication, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  {/* Card Header with Icon */}
                  <div className="h-28 bg-gradient-to-br from-slate-900 via-primary to-slate-800 flex items-center justify-center relative overflow-hidden">
                    <FileText className="w-20 h-20 text-white opacity-20 absolute" />
                    <span className="relative z-10 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                      {publication.type}
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {publication.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {publication.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(publication.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a 
                        href={publication.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-br from-slate-900 via-primary to-slate-800 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Download className="h-4 w-4" />
                        Download File
                      </a>
                      <button 
                        onClick={() => handleViewPublication(publication)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-6 bg-gradient-to-br from-slate-900 via-primary to-slate-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Our Latest Publications
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              Subscribe to receive notifications when we publish new research, reports, and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
        <DecorativeBottomWave/>
      </section>

      {/* Publication Modal */}
      <PublicationModal
        publication={selectedPublication}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}