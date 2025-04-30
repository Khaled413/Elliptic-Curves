"use client"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Lock, Shield, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import EllipticCurveVisualizer from "@/components/elliptic-curve-visualizer"
import MathEquation from "@/components/math-equation"

const HomeSection = () => {
  const introRef = useRef<HTMLDivElement>(null)
  const mathRef = useRef<HTMLDivElement>(null)
  const cryptoRef = useRef<HTMLDivElement>(null)
  const applicationsRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 mb-6">
            Elliptic Curves
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">The Mathematical Foundation of Modern Cryptography</p>
          <Button
            onClick={() => scrollToSection(introRef)}
            className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-3 rounded-md transition-all duration-300 flex items-center gap-2"
          >
            Explore <ArrowDown size={16} />
          </Button>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-6">What are Elliptic Curves?</h2>
              <p className="text-gray-300 mb-4">
                Elliptic curves are mathematical structures that have become fundamental in modern cryptography. Despite
                their name, they are not elliptical in shape, but rather curves defined by equations of the form:
              </p>
              <div className="bg-gray-900 p-4 rounded-md mb-4 font-mono text-center">
                <MathEquation equation="y^2 = x^3 + ax + b" />
              </div>
              <p className="text-gray-300">
                These elegant mathematical objects provide the foundation for some of the most secure encryption systems
                used today, offering stronger security with smaller key sizes compared to traditional methods.
              </p>
              <Button onClick={() => scrollToSection(mathRef)} variant="outline" className="mt-6">
                Learn about the Mathematical Foundation
              </Button>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <EllipticCurveVisualizer a={-3} b={3} width={500} height={400} className="rounded-md w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mathematical Foundation Section */}
      <section ref={mathRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-6 text-center">Mathematical Foundation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <EllipticCurveVisualizer
                    a={-3}
                    b={3}
                    showPointAddition={true}
                    width={500}
                    height={400}
                    className="rounded-md w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">Point Operations on Elliptic Curves</h3>
                <p className="text-gray-300 mb-4">
                  The magic of elliptic curves lies in their algebraic structure. Points on an elliptic curve form an
                  abelian group, allowing operations such as point addition and scalar multiplication.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-md font-mono">
                    <p className="text-purple-300">Point Addition:</p>
                    <p className="text-gray-300">P + Q = R</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-md font-mono">
                    <p className="text-purple-300">Scalar Multiplication:</p>
                    <p className="text-gray-300">k × P = P + P + ... + P (k times)</p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">
                  These operations form the basis of elliptic curve cryptography, where the difficulty of the Elliptic
                  Curve Discrete Logarithm Problem (ECDLP) provides the necessary security.
                </p>
                <Button onClick={() => scrollToSection(cryptoRef)} variant="outline" className="mt-6">
                  Learn about Cryptographic Applications
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cryptography Section */}
      <section ref={cryptoRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-6 text-center">
              Elliptic Curves in Cryptography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-900/70 rounded-lg p-6 border border-gray-800 hover:border-indigo-500 transition-all duration-300">
                <div className="h-12 w-12 bg-indigo-700 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-purple-300 mb-3">ECDSA</h3>
                <p className="text-gray-300">
                  Elliptic Curve Digital Signature Algorithm is used for digital signatures, providing authentication
                  and non-repudiation in blockchain technologies like Bitcoin and Ethereum.
                </p>
              </div>
              <div className="bg-gray-900/70 rounded-lg p-6 border border-gray-800 hover:border-indigo-500 transition-all duration-300">
                <div className="h-12 w-12 bg-indigo-700 rounded-full flex items-center justify-center mb-4">
                  <Key className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-purple-300 mb-3">ECDH</h3>
                <p className="text-gray-300">
                  Elliptic Curve Diffie-Hellman key exchange protocol enables secure key exchange over insecure
                  channels, allowing two parties to establish a shared secret without prior contact.
                </p>
              </div>
              <div className="bg-gray-900/70 rounded-lg p-6 border border-gray-800 hover:border-indigo-500 transition-all duration-300">
                <div className="h-12 w-12 bg-indigo-700 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-purple-300 mb-3">TLS/SSL</h3>
                <p className="text-gray-300">
                  Transport Layer Security and Secure Sockets Layer protocols use elliptic curve cryptography to secure
                  internet communications, providing better performance with smaller key sizes.
                </p>
              </div>
            </div>
            <div className="mt-12 bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">
                    Advantages of Elliptic Curves over Traditional Cryptography
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Smaller key sizes for equivalent security levels</li>
                    <li>Lower computational requirements</li>
                    <li>Reduced bandwidth consumption</li>
                    <li>Ideal for resource-constrained environments like IoT devices</li>
                    <li>Relative resistance to quantum attacks (compared to RSA)</li>
                  </ul>
                  <Button onClick={() => scrollToSection(applicationsRef)} variant="outline" className="mt-6">
                    Explore Real-World Applications
                  </Button>
                </div>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-indigo-800/50 rounded-full flex items-center justify-center">
                        <Lock className="h-12 w-12 text-indigo-300" />
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">Security Comparison</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">RSA-2048</span>
                        <span className="text-gray-300">112-bit security</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ECC-256</span>
                        <span className="text-gray-300">128-bit security</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">RSA-3072</span>
                        <span className="text-gray-300">128-bit security</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Applications Section */}
      <section ref={applicationsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-6 text-center">Real-World Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <ApplicationCard
                title="Blockchain"
                description="Securing cryptocurrency transactions in Bitcoin, Ethereum, and other blockchain platforms."
                icon="🔗"
              />
              <ApplicationCard
                title="Secure Messaging"
                description="End-to-end encryption in messaging applications like Signal and WhatsApp."
                icon="💬"
              />
              <ApplicationCard
                title="IoT Security"
                description="Lightweight encryption for resource-constrained Internet of Things devices."
                icon="🔌"
              />
              <ApplicationCard
                title="Bioinformatics"
                description="Secure genomic data processing and storage with privacy-preserving computations."
                icon="🧬"
              />
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                Ready to see elliptic curves in action? Head to the Practice section to solve interactive problems and
                gain hands-on experience with elliptic curve operations.
              </p>
              <Button
                onClick={() => {
                  // This would be handled by the parent component
                  const event = new CustomEvent("changeSection", { detail: "practice" })
                  window.dispatchEvent(event)
                }}
                className="bg-indigo-700 hover:bg-indigo-600 text-white"
              >
                Try the Practice Section
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

interface ApplicationCardProps {
  title: string
  description: string
  icon: string
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-900/70 rounded-lg p-6 border border-gray-800 hover:border-indigo-500 transition-all duration-300"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-300 mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

export default HomeSection
