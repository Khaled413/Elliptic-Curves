"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "@/components/logo"

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo className="h-12 w-12 mr-3" />
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
              Elliptic Curves
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink isActive={activeSection === "home"} onClick={() => setActiveSection("home")}>
                Home
              </NavLink>
              <NavLink isActive={activeSection === "educational"} onClick={() => setActiveSection("educational")}>
                Learn
              </NavLink>
              <NavLink isActive={activeSection === "practice"} onClick={() => setActiveSection("practice")}>
                Practice
              </NavLink>
            </div>
          </div>

          <div className="md:hidden">
            <MobileMenu activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

interface NavLinkProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive ? "text-white" : "text-gray-300 hover:text-white hover:bg-gray-800/50"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
          layoutId="navbar-indicator"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  )
}

interface MobileMenuProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (section: string) => {
    setActiveSection(section)
    setIsOpen(false)
  }

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 left-0 bg-gray-900 shadow-lg rounded-b-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => handleNavigation("home")}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeSection === "home"
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("educational")}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeSection === "educational"
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Learn
              </button>
              <button
                onClick={() => handleNavigation("practice")}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeSection === "practice"
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Practice
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
