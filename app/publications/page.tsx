'use client'
import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Download, Calendar, Search,  ArrowRight } from "lucide-react"
import { DecorativeBottomWave } from "@/components/DecorativeBottomWave"

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const publications = [
    {
      title: "African Business Outlook 2025",
      date: "2025-01-15",
      description: "Comprehensive analysis of business trends, opportunities, and challenges across African markets for 2025.",
      type: "Report",
      downloadUrl: "#"
    },
    {
      title: "Tax Compliance Guide for East Africa",
      date: "2024-12-10",
      description: "A complete guide to navigating tax regulations and compliance requirements in East African countries.",
      type: "Guide",
      downloadUrl: "#"
    },
    {
      title: "Digital Transformation in African Enterprises",
      date: "2024-11-20",
      description: "Insights into how African businesses are leveraging digital technologies to drive growth and innovation.",
      type: "Whitepaper",
      downloadUrl: "#"
    },
    {
      title: "Risk Management Best Practices 2024",
      date: "2024-11-20",
      description: "Essential strategies and frameworks for effective risk management in modern organizations.",
      type: "Guide",
      downloadUrl: "#"
    },
    {
      title: "Financial Services Sector Review Q4 2024",
      date: "2024-10-01",
      description: "Quarterly analysis of trends, performance, and outlook for the financial services sector across Africa.",
      type: "Report",
      downloadUrl: "#"
    },
    {
      title: "Sustainable Business Practices in Africa",
      date: "2024-09-15",
      description: "Exploring ESG initiatives and sustainable business models driving positive impact in African markets.",
      type: "Whitepaper",
      downloadUrl: "#"
    },
    {
      title: "Audit Standards & Compliance Framework",
      date: "2024-08-28",
      description: "Updated audit standards and compliance requirements for organizations operating in multiple jurisdictions.",
      type: "Technical Guide",
      downloadUrl: "#"
    },
    {
      title: "Investment Opportunities in East Africa",
      date: "2024-08-10",
      description: "In-depth analysis of emerging investment opportunities and market dynamics in East African economies.",
      type: "Report",
      downloadUrl: "#"
    },
    {
      title: "HR & Talent Management Trends 2024",
      date: "2024-07-22",
      description: "Latest trends in talent acquisition, retention, and development strategies for African businesses.",
      type: "Whitepaper",
      downloadUrl: "#"
    }
  ]



  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchQuery.toLowerCase())
    return  matchesSearch
  })



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
              {filteredPublications.length} {filteredPublications.length === 1 ? 'publication' : 'publications'} found
            </p>
          </div>

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
                      <span>{new Date(publication.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-br from-slate-900 via-primary to-slate-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-2xl  font-bold text-white mb-4">
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
    </div>
  )
}