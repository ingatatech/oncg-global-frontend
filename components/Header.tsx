"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, X, Menu, Plus, Minus, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { servicesData } from "@/lib/data/services"

export default function Header() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileWhoWeAreOpen, setMobileWhoWeAreOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileSubsidiariesOpen, setMobileSubsidiariesOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileWhoWeAreOpen(false)
    setMobileServicesOpen(false)
    setMobileSubsidiariesOpen(false)
  }

  const toggleWhoWeAreDropdown = () => {
    setActiveService(activeService === "who-we-are" ? null : "who-we-are")
  }

  const toggleSubsidiariesDropdown = () => {
    setActiveService(activeService === "subsidiaries" ? null : "subsidiaries")
  }

  const toggleServicesDropdown = () => {
    setActiveService(activeService === "services" ? null : "services")
  }

  const subsidiaries = [
    { 
      name: "Oncg Ltd", 
      slug: "oncg-ltd",
      description: "Audit & Financial Services",
    },
    { 
      name: "Skills Hub International Ltd", 
      slug: "skills-hub-international",
      description: "Training & Development",
    },
    { 
      name: "Cantours Analytics Ltd", 
      slug: "cantours-analytics",
      description: "Data & Analytics Solutions",
    },
    { 
      name: "Ingata Technologies Ltd", 
      slug: "ingata-technologies",
      description: "IT Solutions & Innovation",
    },
  ]

  return (
    <header className="border-b border-border shadow-md sticky top-0 z-50 bg-white">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center pl-5">
            <Image
              src="/images/logo.png"
              alt="ONCG"
              width={200}
              height={80}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>

            {/* Services Dropdown - REDESIGNED */}
            <div className="relative group">
              <button
                onClick={toggleServicesDropdown}
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2"
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeService === "services" && (
                <>
                  <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setActiveService(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/3 -translate-x-1/2 mt-2 w-[900px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden"
                  >
              {/* Header */}
            <div className="bg-primary px-4 py-3 text-white flex items-center justify-between">
              <h2 className="font-semibold text-lg">Our Services</h2>
              <button
                onClick={() => setActiveService(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <X className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

                    {/* Services Grid */}
                    <div className="overflow-y-auto p-4 sm:p-6 max-h-[calc(100vh-150px)]">
                      <div className="grid grid-cols-2 gap-3">
                        {servicesData.map((service, index) => (
                          <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <Link
                              href={`/services?service=${service.slug}`}
                              onClick={() => setActiveService(null)}
                              className="group/item block p-4 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-lg"
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-2xl shadow-lg group-hover/item:scale-110 transition-transform duration-300`}>
                                  <service.icon />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-gray-900 text-sm group-hover/item:text-blue-600 transition-colors line-clamp-1">
                                      {service.title}
                                    </h4>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all flex-shrink-0 ml-2" />
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
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
                </>
              )}
            </div>

            {/* Subsidiaries Dropdown - ENHANCED */}
            <div className="relative group">
              <button
                onClick={toggleSubsidiariesDropdown}
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2"
              >
                <span>Subsidiaries</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeService === "subsidiaries" && (
                <>
                  <div 
                    className="fixed inset-0 bg-transparent z-40"
                    onClick={() => setActiveService(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden"
                  >
                    <div className="p-3">
                      {subsidiaries.map((subsidiary) => (
                        <Link
                          key={subsidiary.slug}
                          href={`/subsidiaries?company=${subsidiary.slug}`}
                          onClick={() => setActiveService(null)}
                          className="group/sub flex items-start space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md"
                        >
                          {/* <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-xl shadow-sm group-hover/sub:scale-110 transition-transform">
                            {subsidiary.icon}
                          </div> */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-gray-900 group-hover/sub:text-blue-600 transition-colors">
                              {subsidiary.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {subsidiary.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover/sub:text-blue-600 group-hover/sub:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            <Link href="/network-offices" className="text-foreground hover:text-primary transition-colors">
              Network Offices
            </Link>

            <Link href="/insights" className="text-foreground hover:text-primary transition-colors">
              Insights
            </Link>

            <Link href="/publications" className="text-foreground hover:text-primary transition-colors">
              Publications
            </Link>

            {/* Who We Are Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleWhoWeAreDropdown}
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2"
              >
                <span>Who we are</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeService === "who-we-are" && (
                <>
                  <div 
                    className="fixed inset-0 bg-transparent z-40"
                    onClick={() => setActiveService(null)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-50">
                    <div className="p-2">
                      <div className="pt-2">
                        <Link
                          href="/about"
                          onClick={() => setActiveService(null)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                        >
                          <div>
                            <h3 className="font-medium text-sm">About us</h3>
                          </div>
                        </Link>
                        <Link
                          href="/leadership"
                          onClick={() => setActiveService(null)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                        >
                          <h3 className="font-medium text-sm">Leadership</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link href="/contact-us" className="text-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>

            <Link href="/admin/login" className="text-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
          </nav>

          {/* Desktop CTA and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center pl-5">
                    <Image
                      src="/images/logo.png"
                      alt="ONCG"
                      width={120}
                      height={48}
                      className="h-12 w-auto"
                    />
                  </Link>
                  <button onClick={closeMobileMenu} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="block p-3 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Home
                  </Link>

                  {/* Services Dropdown Mobile - ENHANCED */}
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-900">Services</span>
                      {mobileServicesOpen ? (
                        <Minus className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 pt-2 space-y-1">
                            {servicesData.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services?service=${service.slug}`}
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors group"
                              >
                                <span className="text-lg"><service.icon /></span>
                                <span className="flex-1">{service.title}</span>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subsidiaries Dropdown Mobile - ENHANCED */}
                  <div>
                    <button
                      onClick={() => setMobileSubsidiariesOpen(!mobileSubsidiariesOpen)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-900">Subsidiaries</span>
                      {mobileSubsidiariesOpen ? (
                        <Minus className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {mobileSubsidiariesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 pt-2 space-y-1">
                            {subsidiaries.map((subsidiary) => (
                              <Link
                                key={subsidiary.slug}
                                href={`/subsidiaries?company=${subsidiary.slug}`}
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors group"
                              >
                                {/* <span className="text-lg">{subsidiary.icon}</span> */}
                                <div className="flex-1">
                                  <div className="font-medium">{subsidiary.name}</div>
                                  <div className="text-xs text-gray-500">{subsidiary.description}</div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/insights"
                    onClick={closeMobileMenu}
                    className="block p-3 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Insights
                  </Link>

                  {/* Who We Are Dropdown */}
                  <div>
                    <button
                      onClick={() => setMobileWhoWeAreOpen(!mobileWhoWeAreOpen)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-900">Who we are</span>
                      {mobileWhoWeAreOpen ? (
                        <Minus className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {mobileWhoWeAreOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pt-2 space-y-1">
                            <Link
                              href="/about"
                              onClick={closeMobileMenu}
                              className="block p-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              About us
                            </Link>
                            <Link
                              href="/leadership"
                              onClick={closeMobileMenu}
                              className="block p-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              Leadership
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/contact-us"
                    onClick={closeMobileMenu}
                    className="block p-3 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/admin/login"
                    onClick={closeMobileMenu}
                    className="block p-3 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}