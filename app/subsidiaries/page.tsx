"use client"

import { useSearchParams } from "next/navigation"
import { ExternalLink, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Suspense, useRef } from "react"
import { DecorativeBottomWave } from "@/components/DecorativeBottomWave"

function SubsidiaryPageContent () {
  const searchParams = useSearchParams()
  const companySlug = searchParams.get("company")
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Define subsidiary data
  const subsidiariesData = {
    "oncg-ltd": {
      name: "ONCG Ltd",
      tagline: "Leading Professional Services in Africa",
      description: "ON Consulting Group Ltd “ONCG” is a business consulting firm registered and domiciled in the Republic of Rwanda with principal activities of Business Consulting, Social and Economic Consulting Services, Audit and Assurance Services, Accountancy, Tax, and other management Consultancy services. ONCG Ltd is whole-owned subsidiary of ONCG Global Holdings Ltd, a multidisciplinary consulting group operating across African Continent.",
      url: "https://oncg.rw",
      established: "1995",
      employees: "500+",
      offices: "15",
      services: [
        "Audit & Assurance",
        "Tax Advisory",
        "Business Consulting",
        "Risk Management"
      ],
      highlights: [
        "ISO 9001:2015 Certified",
        "Member of leading international networks",
        "Serving 1000+ clients across Africa",
        "Award-winning professional services"
      ]
    },
    "skills-hub-international": {
      name: "Skills Hub International Ltd",
      tagline: "Empowering Africa Through Skills Development",
      description: "SKILLS HUB INTERNATIONAL (SHI) Ltd is a subsidiary of ONCG GLOBAL HOLDINGS LTD a multidisciplinary consulting group operating across African continent. SKILLS HUB INTERNATIONAL is registered in Rwanda since 2013 to offer a wide range of world-class training services, recruitment services and employment services to corporate and individual clients.It also offers cutting edge business and management customized training programs. Our training services Professional training services, Executive Training and in-house training services. Training services are provided via two schools namely School of Business Professionals and School of Business Executives.",
      url: "https://skillshub-international.com/",
      established: "2010",
      employees: "200+",
      offices: "8",
      services: [
        "Corporate Training",
        "Vocational Education",
        "Professional Certification",
        "Skills Assessment"
      ],
      highlights: [
        "Trained over 50,000 professionals",
        "Partnerships with leading universities",
        "Accredited training provider",
        "Digital learning platform"
      ]
    },
    "contours-analytics": {
      name: "Contours Analytics Ltd",
      tagline: "Data-Driven Business Intelligence",
      description: "We are a leading provider of comprehensive data analytics and actuarial services. With a team of highly skilled professionals and cutting-edge technology, we empower businesses to make informed decisions and mitigate risks effectively. Our integrated approach combines advanced statistical modeling, predictive analytics, and actuarial expertise to deliver actionable insights across various industries.",
      url: "https://contoursanalytics.com/",
      established: "2015",
      employees: "150+",
      offices: "5",
      services: [
        "Data Analytics",
        "Business Intelligence",
        "Predictive Modeling",
        "Data Visualization"
      ],
      highlights: [
        "AI-powered analytics platform",
        "Real-time data processing",
        "Industry-leading data scientists",
        "Cloud-based solutions"
      ]
    },
    "ingata-technologies": {
      name: "Ingata Technologies Ltd",
      tagline: "Innovative Technology Solutions",
      description: "At IngataTech, we are passionate about leveraging technology to empower businesses and institutions. With a dedicated team of experienced professionals, we strive to deliver top-notch IT solutions that drive efficiency, productivity, and growth. Our commitment to excellence and customer satisfaction sets us apart in the industry.",
      url: "https://ingatatech.com",
      established: "2012",
      employees: "300+",
      offices: "10",
      services: [
        "Software Development",
        "Cloud Solutions",
        "Cybersecurity",
        "IT Infrastructure"
      ],
      highlights: [
        "100+ successful digital transformations",
        "24/7 technical support",
        "ISO 27001 certified",
        "Award-winning development team"
      ]
    }
  }

  const subsidiary = companySlug ? subsidiariesData[companySlug as keyof typeof subsidiariesData] : null

  if (!subsidiary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Subsidiary Not Found</h1>
          <p className="text-gray-600 mb-8">The subsidiary you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className=" bg-gray-50">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-10 flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-slate-800"
      >
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

        <div className="relative  px-6 mx-auto z-10">
          <motion.div
            className="text-left max-w-6xl"
             initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-3 py-1 bg-primary/30 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-6 hover:bg-primary/40 transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Part of ONCG Global Holdings
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold mb-6 leading-tight text-white"
            >
              {subsidiary.name}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-8 max-w-6xl"
            >
              {subsidiary.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href={subsidiary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-52 inline-flex items-center space-x-2 bg-white text-primary px-5 py-2 rounded-full font-semibold transition"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              <Link
                href="/contact-us"
                className=" w-52 border border-white/30 hover:bg-white/10 px-5 py-2 rounded-full font-semibold text-white transition"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
<DecorativeBottomWave/>
      </section>
    
    </div>
  )
}


export default function SubsidiaryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading subsidiary...</div>}>
      <SubsidiaryPageContent />
    </Suspense>
  );
}