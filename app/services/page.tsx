'use client';
import { Sparkles, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { servicesData } from '@/lib/data/services';
import { Suspense } from 'react';

 function ServicesPageContent() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get('service');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const currentServiceData = serviceSlug
    ? servicesData.find((s) => s.slug === serviceSlug)
    : null;

  // ========= Split text into 2 paragraphs =========
  const getTwoParagraphs = (text: string) => {
    if (!text) return ["", ""];
    const sentences = text.split(/(?<=\.)\s+/);
    const half = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, half).join(" "),
      sentences.slice(half).join(" "),
    ];
  };

  if (currentServiceData) {
    const [firstParagraph, secondParagraph] = getTwoParagraphs(currentServiceData.details);

    return (
      <div className="bg-white">
        {/* ================= HERO SECTION ====================== */}
        <section className="relative py-8 flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {/* Animated Background Elements */}
          <motion.div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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
                {currentServiceData.title}
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold mb-6 leading-tight text-white"
              >
                {currentServiceData.title}
              </motion.h1>

              <motion.div variants={fadeInUp} className="text-lg text-gray-200 mb-8 max-w-6xl space-y-6">
                <p>{firstParagraph}</p>
                <p>{secondParagraph}</p>
              </motion.div>

              {/* View More Details Button */}
              <motion.a
                href={currentServiceData.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                View More Details
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </div>

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

  return null;
}


export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Services...</div>}>
      <ServicesPageContent />
    </Suspense>
  );
}