"use client";

import { DecorativeBottomWave } from "@/components/DecorativeBottomWave";
import ServicesClickModal from "@/components/ServicesClickModal";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Sparkles, ArrowRight, Lightbulb} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function AboutUsPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const heroRef = useRef(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const values = [
    {
      title: "Sustainability",
      desc: "We build lasting solutions that create long-term value for our clients and communities, ensuring resources are used responsibly",
 
    },
    {
      title: "Professionalism",
      desc: "We maintain the highest standards of integrity, ethics, and expertise in all our engagements and interactions",

    },
    {
      title: "Acuity",
      desc: "We bring sharp insight and keen understanding to solve complex challenges with precision and clarity",
    },
    {
      title: "Client-centricity",
      desc: "We put our clients at the heart of everything we do, tailoring solutions to their unique needs and objectives",
    },
    {
      title: "Excellency",
      desc: "We strive for excellence in every project, delivering exceptional results that exceed expectations consistently",
    },
    {
      title: "Impact",
      desc: "We measure our success by the positive transformation we create for organizations and societies across Africa",

    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        className="relative py-10 flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
      >
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </motion.div>

        {/* Overlay Circles */}
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
              className="inline-flex items-center px-3 py-1 bg-blue-500/30 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-6 hover:bg-blue-500/40 transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Building Africa's Future Since 2013
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-4xl font-bold mb-6 leading-tight text-white"
            >
              About{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                ONCG Global Holdings
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-6xl"
            >
              A continental consulting hub committed to transforming African organizations through expertise, innovation, and measurable impact. We partner with governments, private institutions, and development agencies to create sustainable, data-driven growth.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <ServicesClickModal />
              <Link href="/contact-us" className="border-2 border-white/30 hover:bg-white/10 px-5 py-2 w-40 rounded-full font-semibold text-white transition">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
    <section className="py-8 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Our <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Journey</span>
          </h2>
         
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-1 gap-12 items-center mb-8">
     
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-5">


              <div className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-xl">
The idea of <span className="font-semibold text-blue-600">ONCG Global Holdings</span>  started from 2013 with creation of <span className="font-semibold text-blue-600">Skills Hub international Ltd </span>by its founder. It started with the aim of building capabilities of human capital through training offerings evolving with labour market dynamics. Later on, other specialised consulting firms were created. We are now a continental consulting hub operating across Africa.
                </p>
              </div>

              <div className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-xl">
            We are a networking of African consultants who strive to create value for our cherished clients. We are now a multidisciplinary consulting hub offering a wide range of services including capacity building, training business consulting, IT consulting and Solutions, Socio-economic research and consulting, Data analytics, Actuarial and other assurance services.
                </p>
              </div>
            </div>
          </motion.div>
          </div>
          </div>
          </section>


      {/* ================= VISION & MISSION ================= */}
      <section className="py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-2 border-white/30 rounded-3xl p-4 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full filter blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-10 h-10 text-white" />
                  <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-xl leading-relaxed text-white/95">
                  We shall be the point of reference for consulting services across the African continent, recognized for our innovation, integrity, and transformative impact on organizations and societies.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-2 border-white/30 rounded-3xl p-4 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300 rounded-full filter blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-10 h-10 text-white" />
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-xl leading-relaxed text-white/95">
                  To provide comprehensive, evidence-based consulting and research services that empower African organizations to achieve sustainable growth, enhance operational efficiency, and create measurable positive impact in their communities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl  font-bold mb-4 text-slate-900">
              Our <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Our values, beliefs, and operational philosophies create a space for professionals to interact with clients in a friendly, creative, and solution-oriented manner
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-blue-50 border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full -translate-y-12 translate-x-12" style={{backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`}}></div>
                  
                  <div className="relative z-10">
                    
                    <h3 className="text-2xl font-bold mb-3 text-slate-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-10 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900">
              Why Partner With <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">ONCG Global</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              What sets us apart in the African consulting landscape
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stat: "15+",
                title: "Countries",
                desc: "Operating across multiple African nations with deep local expertise"
              },
              {
                stat: "1000+",
                title: "Projects",
                desc: "Successfully delivered comprehensive solutions to diverse clients"
              },
              {
                stat: "50+",
                title: "Specialists",
                desc: "Expert team across consulting, research, and technology domains"
              },
              {
                stat: "98%",
                title: "Satisfaction",
                desc: "Proven track record of client satisfaction and measurable impact"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-5 text-center hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-10 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-white/95"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

        <div className="relative container mx-auto px-6  z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl  font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Let's create sustainable impact together across the African continent. Our team is ready to understand your challenges and deliver tailored solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition inline-flex items-center justify-center gap-2">
                Get in Touch
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition">
                Explore Our Services
              </button>
            </div>
          </motion.div>
        </div>
       <DecorativeBottomWave/>
      </section>
    </div>
  );
}