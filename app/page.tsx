"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import HomeSection from "@/components/home-section"
import PracticeSection from "@/components/practice-section"
import EducationalSection from "@/components/educational-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 150)
    }
  }, [isScrolling])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Listen for custom events from child components
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail)
    }

    window.addEventListener("changeSection", handleSectionChange as EventListener)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("changeSection", handleSectionChange as EventListener)
    }
  }, [handleScroll])

  return (
    <main className="relative min-h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <AnimatedBackground isScrolling={isScrolling} />

      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-950">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="w-16 h-16 mb-4 mx-auto"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,10 Q70,30 50,50 Q30,70 50,90 Q70,70 50,50 Q30,30 50,10"
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="4"
                />
                <rect x="40" y="40" width="20" height="20" rx="2" fill="url(#logoGradient)" />
              </svg>
            </motion.div>
            <p className="text-purple-300 font-mono">جاري التحميل...</p>
          </motion.div>
        </div>
      ) : (
        <>
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          <AnimatePresence mode="wait">
            {activeSection === "home" ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={isScrolling ? "will-change-transform" : ""}
              >
                <HomeSection />
              </motion.div>
            ) : activeSection === "practice" ? (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={isScrolling ? "will-change-transform" : ""}
              >
                <PracticeSection />
              </motion.div>
            ) : (
              <motion.div
                key="educational"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={isScrolling ? "will-change-transform" : ""}
              >
                <EducationalSection />
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
        </>
      )}
    </main>
  )
}
