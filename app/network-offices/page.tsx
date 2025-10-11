'use client'
import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Phone, Mail, Building2,  ArrowUpRight } from "lucide-react"
import { DecorativeBottomWave } from "@/components/DecorativeBottomWave"

export default function NetworkOfficesPage() {
  const [selectedRegion, setSelectedRegion] = useState("all")
   const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const offices = [
    {
      country: "Rwanda",
      city: "Kigali",
      address: "KG 9 Ave, Nyarugenge District",
      phone: "+250 788 123 456",
      email: "kigali@oncg.rw",
      isHeadquarters: true,
      employees: 150
    },
    {
      country: "Kenya",
      city: "Nairobi",
      address: "Westlands Road, Nairobi",
      phone: "+254 712 345 678",
      email: "nairobi@oncg.com",
      employees: 120
    },
    {
      country: "Uganda",
      city: "Kampala",
      address: "Kampala Road, Central Division",
      phone: "+256 772 123 456",
      email: "kampala@oncg.com",
      employees: 85
    },
    {
      country: "Tanzania",
      city: "Dar es Salaam",
      address: "Ali Hassan Mwinyi Road",
      phone: "+255 754 123 456",
      email: "daressalaam@oncg.com",
      employees: 95
    },
    {
      country: "Nigeria",
      city: "Lagos",
      address: "Victoria Island, Lagos",
      phone: "+234 803 123 4567",
      email: "lagos@oncg.com",
      employees: 180
    },
    {
      country: "Ghana",
      city: "Accra",
      address: "Airport Residential Area",
      phone: "+233 24 123 4567",
      email: "accra@oncg.com",
      employees: 110
    },
    {
      country: "South Africa",
      city: "Johannesburg",
      address: "Sandton City, Johannesburg",
      phone: "+27 11 123 4567",
      email: "johannesburg@oncg.com",
      employees: 200
    },
    {
      country: "Zambia",
      city: "Lusaka",
      address: "Cairo Road, Lusaka",
      phone: "+260 97 123 4567",
      email: "lusaka@oncg.com",
      employees: 75
    }
  ]

  const regions = ["all", ...Array.from(new Set(offices.map(office => office.country)))]

  const filteredOffices = selectedRegion === "all" 
    ? offices 
    : offices.filter(office => office.country === selectedRegion)


  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
          <motion.div 
            style={{ y }}
            className="absolute inset-0 opacity-20"
          >
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </motion.div>
          {/* Overlay */}

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full translate-y-32 -translate-x-32" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
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


        <div className="relative container mx-auto px-6 z-10">
          <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            variants={fadeInUp}
            className="text-left max-w-6xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 text-white">
              Our Global Network
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              With offices across Africa, we bring world-class consulting services closer to you. 
              Our extensive network ensures local expertise with global standards.
            </p>
          </motion.div>

    
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region === "all" ? "All Regions" : region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-6 relative">
        <div className="container mx-auto px-6 mb-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-500">{office.city}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{office.country}</h3>
                    </div>
                    {office.isHeadquarters && (
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        HQ
                      </span>
                    )}
                  </div>

                  <div className="h-px bg-gray-200 my-4"></div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-sm text-blue-600 hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-sm text-blue-600 hover:underline">
                        {office.email}
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 my-4"></div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                   
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      Get Directions
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    <DecorativeBottomWave/>
      </section>
    </div>
  )
}