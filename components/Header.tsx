"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, X, Menu, Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

  // Define your services with their slugs
  const services = [
    { name: "Audit & Assurance", slug: "audit-assurance" },
    { name: "Tax Advisory", slug: "tax-advisory" },
    { name: "Business Consulting", slug: "business-consulting" },
    { name: "Risk Management", slug: "risk-management" },
    { name: "Financial Advisory", slug: "financial-advisory" },
  ]

  // Define subsidiaries with their slugs and external URLs
  const subsidiaries = [
    { 
      name: "Oncg Ltd", 
      slug: "oncg-ltd",
    },
    { 
      name: "Skills Hub International Ltd", 
      slug: "skills-hub-international",
    },
    { 
      name: "Cantours Analytics Ltd", 
      slug: "cantours-analytics",
    },
    { 
      name: "Ingata Technologies Ltd", 
      slug: "ingata-technologies",
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

            {/* Services Dropdown */}
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
                    className="fixed inset-0 bg-transparent z-40"
                    onClick={() => setActiveService(null)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
                    <div className="p-2">
                      <div className="pt-2">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services?service=${service.slug}`}
                            onClick={() => setActiveService(null)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                          >
                            <div>
                              <h3 className="font-medium text-sm">{service.name}</h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Subsidiaries Dropdown */}
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
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
                    <div className="p-2">
                      <div className="pt-2">
                        {subsidiaries.map((subsidiary) => (
                          <Link
                            key={subsidiary.slug}
                            href={`/subsidiaries?company=${subsidiary.slug}`}
                            onClick={() => setActiveService(null)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                          >
                            <div>
                              <h3 className="font-medium text-sm">{subsidiary.name}</h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
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
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-xl z-50">
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
                      src="/images/oncg-logo1.jpg"
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

                  {/* Services Dropdown Mobile */}
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
                          <div className="pl-4 pt-2 space-y-1">
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services?service=${service.slug}`}
                                onClick={closeMobileMenu}
                                className="block p-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subsidiaries Dropdown Mobile */}
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
                          <div className="pl-4 pt-2 space-y-1">
                            {subsidiaries.map((subsidiary) => (
                              <Link
                                key={subsidiary.slug}
                                href={`/subsidiaries?company=${subsidiary.slug}`}
                                onClick={closeMobileMenu}
                                className="block p-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                {subsidiary.name}
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