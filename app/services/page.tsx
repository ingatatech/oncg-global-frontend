'use client';
import { ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesPage() {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };



  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-10 flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
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
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center px-3 py-1 bg-blue-500/30 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-6 hover:bg-blue-500/40 transition-colors"
            >
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Comprehensive Solutions for Your Business
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold mb-6 leading-tight text-white"
            >
              Transform Your Organization With{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Expert Services
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-8 max-w-6xl"
            >
              Discover our comprehensive suite of professional services designed to drive growth, enhance efficiency, and create lasting impact across your organization. From audit and advisory to digital transformation and capacity building, we deliver results.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-semibold text-white transition inline-flex items-center justify-center gap-2">
                Explore Services
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-white transition">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>


          

 

      {/* ================= SERVICE PROCESS ================= */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How We <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Deliver</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our proven methodology ensures consistent, measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                desc: "We understand your unique needs and challenges through detailed consultations"
              },
              {
                step: "2",
                title: "Analysis",
                desc: "Comprehensive assessment using data and industry best practices"
              },
              {
                step: "3",
                title: "Implementation",
                desc: "Seamless execution with ongoing support and guidance"
              },
              {
                step: "4",
                title: "Results",
                desc: "Measurement and reporting of impact and outcomes achieved"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-10 bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Let our experts help you achieve your organizational goals with tailored solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition inline-flex items-center justify-center gap-2">
                Schedule Consultation
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}