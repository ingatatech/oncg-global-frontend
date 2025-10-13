"use client"
import { X, Calendar, FileText, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Publication {
  id: string
  title: string
  description: string
  type: string
  fileUrl: string
  fileType: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface PublicationModalProps {
  publication: Publication | null
  isOpen: boolean
  onClose: () => void
}

export default function PublicationModal({ publication, isOpen, onClose }: PublicationModalProps) {
  if (!publication) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Icon */}
              <div className="relative h-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                  <div className="absolute top-20 right-10 w-40 h-40 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                </div>
                
                <div className="relative h-full flex items-center justify-center">
                  <FileText className="w-32 h-32 text-white opacity-30" />
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-700" />
                </button>

                {/* Type Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white">
                    {publication.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Meta Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(publication.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span className="uppercase">{publication.fileType}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {publication.title}
                </h1>

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {publication.description}
                  </p>
                </div>

                {/* Download Button */}
                <div className="flex gap-3">
                  <a
                    href={publication.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold"
                  >
                    <Download className="h-5 w-5" />
                    Download Publication
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}