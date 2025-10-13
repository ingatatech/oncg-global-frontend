"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { servicesData } from "@/lib/data/services"

export default function ExploreServicesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Add/remove blur effect and manage body scroll
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      
      // Create a wrapper div to blur everything except the modal
      const blurWrapper = document.createElement('div')
      blurWrapper.id = 'blur-overlay'
      blurWrapper.style.position = 'fixed'
      blurWrapper.style.inset = '0'
      blurWrapper.style.zIndex = '9998'
      blurWrapper.style.pointerEvents = 'none'
      blurWrapper.style.backdropFilter = 'blur(8px)'
      blurWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
      
      document.body.appendChild(blurWrapper)
      
      // Also blur the main content directly
      const mainContent = document.getElementById('__next')
      if (mainContent) {
        mainContent.style.filter = 'blur(8px)'
        mainContent.style.transition = 'filter 0.3s ease-in-out'
      }
    } else {
      document.body.style.overflow = 'auto'
      
      // Remove blur overlay
      const blurWrapper = document.getElementById('blur-overlay')
      if (blurWrapper) {
        blurWrapper.remove()
      }
      
      // Remove blur from main content
      const mainContent = document.getElementById('__next')
      if (mainContent) {
        mainContent.style.filter = 'none'
      }
    }

    return () => {
      document.body.style.overflow = 'auto'
      const blurWrapper = document.getElementById('blur-overlay')
      if (blurWrapper) {
        blurWrapper.remove()
      }
      const mainContent = document.getElementById('__next')
      if (mainContent) {
        mainContent.style.filter = 'none'
      }
    }
  }, [isModalOpen])

  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-y-auto px-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <motion.div
             initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="relative top-16 lg:top-20 mx-auto max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 text-white flex items-center justify-between">
              <h2 className="font-semibold text-lg">Our Services</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <X className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Scrollable Services Content */}
            <div className="overflow-y-auto p-4 sm:p-6 max-h-[calc(100vh-150px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesData.map((service, index) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={`/services?service=${service.slug}`}
                      onClick={() => setIsModalOpen(false)}
                      className="group/item block h-full p-3 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} text-white
                          flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover/item:scale-110 transition-transform duration-300 mb-3`}
                        >
                          <service.icon />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover/item:text-blue-600 transition-colors mb-2 leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-xs  text-gray-600 leading-relaxed">
                              {service.details.slice(0, 60)}{service.details.length > 60 ? "..." : ""}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <div className="relative inline-block">
        {/* Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-primary to-blue-600 border border-white/30 px-5 py-2 rounded-full font-semibold text-white transition hover:shadow-lg"
        >
          Explore Services
        </button>
      </div>

      {/* Render modal as portal */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}