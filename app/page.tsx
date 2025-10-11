"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { servicesData } from "@/lib/data/services";

export default function HomePage() {
    const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  const heroRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white">
      {/* ================= HERO SECTION ================= */}
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


        <div className="relative container px-6 mx-auto z-10">
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
              Leading Professional Services in Africa
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold mb-6 leading-tight"
            >
             
               Empowering Africa Through Insight,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-primary bg-clip-text text-transparent">
                Innovation
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Impact
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-8 max-w-6xl"
            >
              ONCG Global Holdings is a multidisciplinary consulting and research firm committed to transforming organizations through evidence-based insights, strategic advisory, and cutting-edge technology.

From socio-economic research and data analytics to business consulting, IT solutions, and capacity building, we partner with governments, private institutions, and development agencies across Africa to create sustainable, data-driven growth and measurable impact.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4">
              <Link
                href="/services"
                className="bg-gradient-to-r from-primary to-blue-600 border border-white/30 px-8 py-3 rounded-full font-semibold text-white transition"
              >
                Explore Services
              </Link>
              <Link
                href="/contact-us"
                className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
  {/* ================= SERVICES OVERVIEW ================= */}

<section className="py-10 bg-white relative overflow-hidden">
  {/* Subtle Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-60 z-0" />

  <div className="container mx-auto px-6 relative z-10">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h2 className="text-4xl font-bold mb-4 text-slate-900">
        Our{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Core Services
        </span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Comprehensive solutions designed to drive growth and transform
        organizations across Africa.
      </p>
    </motion.div>

    {/* Services Grid */}
    <div className="p-4 overflow-hidden">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            className="group hover:bg-gray-50 rounded-2xl p-4 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              {/* Icon Container with Gradient */}
              <div
                className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color}
                flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-6 h-6" />
              </div>

              {/* Service Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                    {service.title}
                  </h4>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {service.details.slice(0, 120)}...
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why Partner With <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">ONCG Global</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We bring together expertise, innovation, and local knowledge to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Pan-African Expertise", desc: "Deep understanding of African markets and contexts", stat: "15+ Countries" },
              { title: "Multidisciplinary Team", desc: "Experts across consulting, research, and technology", stat: "50+ Specialists" },
              { title: "Proven Impact", desc: "Measurable results for governments and organizations", stat: "98% Satisfaction" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-cyan-400/50 transition-all h-[180px] flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent mb-3">
                    {item.stat}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES WE SERVE ================= */}
      {/* <section className="py-10 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900">
              Industries We <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Delivering specialized solutions across diverse sectors throughout Africa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Government & Public Sector", icon: "🏛️" },
              { name: "Financial Services", icon: "🏦" },
              { name: "Healthcare", icon: "⚕️" },
              { name: "Education", icon: "📚" },
              { name: "Agriculture", icon: "🌾" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Energy & Infrastructure", icon: "⚡" },
              { name: "Telecommunications", icon: "📡" },
              { name: "NGOs & Development", icon: "🤝" },
              { name: "Retail & Consumer Goods", icon: "🛒" },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="text-5xl mb-3">{industry.icon}</div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-cyan-400 transition-colors">
                  {industry.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

    {/* ================= OUR APPROACH ================= */}
<section className="py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
  {/* Background overlay */}
  <div className="absolute inset-0 z-0">
    <div
      className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-white/95"
      style={{ mixBlendMode: "multiply" }}
    />
  </div>
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
          
  {/* Content container */}
  <div className="container mx-auto px-6 relative z-10">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 text-white">
        Our{" "}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Methodology
        </span>
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        A proven framework that ensures successful outcomes for every
        engagement
      </p>
    </motion.div>

    {/* Steps Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          step: "01",
          title: "Discovery & Assessment",
          desc: "We begin by understanding your unique challenges, goals, and operational context through comprehensive stakeholder engagement.",
        },
        {
          step: "02",
          title: "Strategy Development",
          desc: "Our experts craft tailored solutions backed by data, research, and industry best practices.",
        },
        {
          step: "03",
          title: "Implementation Support",
          desc: "We work alongside your team to execute strategies, ensuring smooth adoption and minimal disruption.",
        },
        {
          step: "04",
          title: "Impact Measurement",
          desc: "We track progress, measure results, and refine approaches to maximize sustainable value creation.",
        },
      ].map((phase, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="relative"
        >
          <div className="bg-primary backdrop-blur-sm border border-white/10 rounded-xl p-6 border-blue-400 hover:bg-primary transition-all h-full">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              {phase.step}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              {phase.title}
            </h3>
            <p className="text-gray-200 text-sm font-semibold leading-relaxed">
              {phase.desc}
            </p>
          </div>

          {/* Arrow between cards (desktop only) */}
          {index < 3 && (
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <ArrowRight className="text-blue-400" />
            </div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Call to Action */}
    <motion.div
      className="text-center mt-5 mb-5"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/contact-us"
            className="inline-flex items-center bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-primary hover:to-blue-700 transition-all duration-300 group shadow-xl hover:shadow-cyan-500/25"
          >
            Contact Us
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </motion.div>
  </div>

  {/* Decorative Bottom Wave */}
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
  );
}