"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, BookOpen, Calculator, Lock, Code, Key } from "lucide-react"
import EllipticCurveVisualizer from "@/components/elliptic-curve-visualizer"
import MathEquation from "@/components/math-equation"

const EducationalSection = () => {
  const [currentLesson, setCurrentLesson] = useState(0)
  const lessons = [
    {
      id: "intro",
      title: "Introduction to Elliptic Curves",
      content: <IntroLesson />,
    },
    {
      id: "math",
      title: "Mathematical Foundation",
      content: <MathLesson />,
    },
    {
      id: "group",
      title: "Group Structure",
      content: <GroupStructureLesson />,
    },
    {
      id: "crypto",
      title: "Applications in Cryptography",
      content: <CryptoLesson />,
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      content: <AdvancedLesson />,
    },
  ]

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-4">Learn Elliptic Curves</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Explore the fundamental concepts of elliptic curves and their applications in modern cryptography through
            these interactive lessons.
          </p>
        </motion.div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">{lessons[currentLesson].title}</h2>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevLesson}
                disabled={currentLesson === 0}
                className="border-gray-700"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextLesson}
                disabled={currentLesson === lessons.length - 1}
                className="border-gray-700"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          <div className="p-6">{lessons[currentLesson].content}</div>
          <div className="flex justify-between items-center p-4 border-t border-gray-800">
            <div className="text-sm text-gray-400">
              Lesson {currentLesson + 1} of {lessons.length}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevLesson}
                disabled={currentLesson === 0}
                className="border-gray-700"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextLesson}
                disabled={currentLesson === lessons.length - 1}
                className="border-gray-700"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const IntroLesson = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-4">What are Elliptic Curves?</h3>
          <p className="text-gray-300 mb-4">
            Elliptic curves are cubic curves defined by equations of the third degree. Despite their name, they are not
            elliptical in shape. The general form of an elliptic curve in Weierstrass form is:
          </p>
          <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
            <MathEquation equation="y^2 = x^3 + ax + b" />
          </div>
          <p className="text-gray-300 mb-4">
            Where <span className="text-indigo-400">a</span> and <span className="text-indigo-400">b</span> are
            constants that determine the shape of the curve. For the curve to be smooth (without sharp points or
            self-intersections), we must have:
          </p>
          <div className="bg-gray-800 p-4 rounded-md mb-4 text-center">
            <MathEquation equation="4a^3 + 27b^2 \neq 0" />
          </div>
          <p className="text-gray-300">
            This condition ensures that the curve has no singular points, making it suitable for use in cryptographic
            applications.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <EllipticCurveVisualizer a={-3} b={3} width={500} height={350} className="rounded-md w-full h-auto" />
          <p className="text-sm text-gray-400 mt-4 text-center">
            An elliptic curve with equation <MathEquation equation="y^2 = x^3 - 3x + 3" inline />
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Key Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Symmetry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Elliptic curves are symmetric about the x-axis. If the point (x, y) is on the curve, then the point (x,
                -y) is also on the curve.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Point at Infinity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Elliptic curves have a special point called the "point at infinity" (∞), which serves as the identity
                element in point addition operations.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Group Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Points on an elliptic curve form an abelian group, allowing for well-defined addition and scalar
                multiplication operations.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Elliptic curves are used in cryptography, random number generation, digital signature verification, and
                blockchain technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Why are Elliptic Curves Important?</h3>
        <p className="text-gray-300 mb-4">
          Elliptic curves derive their importance from their unique mathematical properties that make them ideal for
          cryptographic applications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>They provide higher security with smaller key sizes compared to traditional methods like RSA</li>
          <li>
            They require fewer computational resources, making them ideal for resource-constrained devices like IoT
          </li>
          <li>They offer relatively better resistance to quantum attacks compared to other cryptographic algorithms</li>
          <li>They are used in cryptocurrencies like Bitcoin and Ethereum to secure transactions</li>
          <li>They support secure key exchange protocols and digital signature systems</li>
        </ul>
      </div>
    </div>
  )
}

const MathLesson = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Mathematical Forms of Elliptic Curves</h3>
          <p className="text-gray-300 mb-4">
            Elliptic curves can be represented in several mathematical forms, the most common being the long and short
            Weierstrass forms:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-purple-300 mb-2">Long Weierstrass Form:</p>
              <div className="text-center">
                <MathEquation equation="y^2 + a_1xy + a_3y = x^3 + a_2x^2 + a_4x + a_6" />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-purple-300 mb-2">Short Weierstrass Form:</p>
              <div className="text-center">
                <MathEquation equation="y^2 = x^3 + ax + b" />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Where <MathEquation equation="4a^3 + 27b^2 \neq 0" inline /> to ensure no singular points
              </p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            In cryptography, we typically work with elliptic curves over finite fields rather than real numbers, giving
            the curve different properties useful for cryptographic applications.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Finite Fields</h3>
          <p className="text-gray-300 mb-4">
            In elliptic curve cryptography, we use curves defined over finite fields, and there are two main types:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-purple-300 mb-2">Curves over Prime Fields:</p>
              <div className="text-center">
                <MathEquation equation="E(F_p): y^2 \equiv x^3 + ax + b \pmod{p}" />
              </div>
              <p className="text-gray-400 text-sm mt-2">Where p is a large prime number</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <p className="text-purple-300 mb-2">Curves over Binary Fields:</p>
              <div className="text-center">
                <MathEquation equation="E(F_{2^m}): y^2 + xy = x^3 + ax^2 + b" />
              </div>
              <p className="text-gray-400 text-sm mt-2">Where operations are performed in a binary field</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            Using finite fields makes elliptic curves suitable for cryptographic applications, as the Elliptic Curve
            Discrete Logarithm Problem (ECDLP) becomes computationally difficult.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Curve Parameters and Their Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Effect of Parameter a</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-md mb-4">
                <EllipticCurveVisualizer a={-3} b={3} width={300} height={200} className="rounded-md w-full h-full" />
              </div>
              <p className="text-gray-300">
                Parameter a affects the curvature of the curve. Negative values tend to produce a wider "belly" in the
                curve, while positive values make the curve more compressed.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Effect of Parameter b</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-md mb-4">
                <EllipticCurveVisualizer a={0} b={5} width={300} height={200} className="rounded-md w-full h-full" />
              </div>
              <p className="text-gray-300">
                Parameter b affects the position of the curve on the vertical axis. Increasing b moves the curve upward,
                while decreasing it moves the curve downwar Increasing b moves the curve upward, while decreasing it
                moves the curve downward.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Special Curves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-md mb-4">
                <EllipticCurveVisualizer a={0} b={0} width={300} height={200} className="rounded-md w-full h-full" />
              </div>
              <p className="text-gray-300">
                When a=0 and b=0, the curve becomes singular and unsuitable for cryptography. Curves used in
                cryptography are carefully chosen to achieve specific security properties.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Standard Curves Used in Cryptography</h3>
        <p className="text-gray-300 mb-4">
          Several standard elliptic curves are used in cryptographic applications, carefully chosen to provide high
          security levels:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 p-3 text-left text-indigo-400">Curve</th>
                <th className="border border-gray-700 p-3 text-left text-indigo-400">Field</th>
                <th className="border border-gray-700 p-3 text-left text-indigo-400">Key Size</th>
                <th className="border border-gray-700 p-3 text-left text-indigo-400">Security Level</th>
                <th className="border border-gray-700 p-3 text-left text-indigo-400">Uses</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-900">
                <td className="border border-gray-700 p-3 text-gray-300">NIST P-256 (secp256r1)</td>
                <td className="border border-gray-700 p-3 text-gray-300">
                  <MathEquation equation="F_p" inline />
                </td>
                <td className="border border-gray-700 p-3 text-gray-300">256 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">128 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">TLS, Digital Signatures</td>
              </tr>
              <tr className="bg-gray-800">
                <td className="border border-gray-700 p-3 text-gray-300">Curve25519</td>
                <td className="border border-gray-700 p-3 text-gray-300">
                  <MathEquation equation="F_p" inline />
                </td>
                <td className="border border-gray-700 p-3 text-gray-300">256 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">128 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">Key Exchange, Encryption</td>
              </tr>
              <tr className="bg-gray-900">
                <td className="border border-gray-700 p-3 text-gray-300">secp256k1</td>
                <td className="border border-gray-700 p-3 text-gray-300">
                  <MathEquation equation="F_p" inline />
                </td>
                <td className="border border-gray-700 p-3 text-gray-300">256 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">128 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">Bitcoin, Ethereum</td>
              </tr>
              <tr className="bg-gray-800">
                <td className="border border-gray-700 p-3 text-gray-300">BrainpoolP384r1</td>
                <td className="border border-gray-700 p-3 text-gray-300">
                  <MathEquation equation="F_p" inline />
                </td>
                <td className="border border-gray-700 p-3 text-gray-300">384 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">192 bits</td>
                <td className="border border-gray-700 p-3 text-gray-300">Government Applications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const GroupStructureLesson = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Group Structure of Elliptic Curves</h3>
          <p className="text-gray-300 mb-4">
            Points on an elliptic curve form an abelian group with the addition operation defined geometrically. An
            abelian group is a mathematical group that satisfies the following properties:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
            <li>
              <span className="text-indigo-400">Closure:</span> If P and Q are points on the curve, then P + Q is also a
              point on the curve
            </li>
            <li>
              <span className="text-indigo-400">Commutativity:</span> For any two points P and Q, P + Q = Q + P
            </li>
            <li>
              <span className="text-indigo-400">Associativity:</span> For any three points P, Q, and R, (P + Q) + R = P
              + (Q + R)
            </li>
            <li>
              <span className="text-indigo-400">Identity:</span> There exists a point O (the point at infinity) such
              that P + O = P for any point P
            </li>
            <li>
              <span className="text-indigo-400">Inverse:</span> For every point P, there exists a point -P such that P +
              (-P) = O
            </li>
          </ul>
          <p className="text-gray-300">
            This algebraic structure is what makes elliptic curves useful in cryptography, as it allows for the
            definition of mathematical operations that can be used in cryptographic algorithms.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Point Addition Geometrically</h3>
          <div className="aspect-video bg-gray-900 rounded-md mb-4">
            <EllipticCurveVisualizer
              a={-3}
              b={3}
              showPointAddition={true}
              width={500}
              height={300}
              className="rounded-md w-full h-full"
            />
          </div>
          <p className="text-gray-300">
            To add two points P and Q on an elliptic curve, we follow these steps:
            <br />
            1. Draw a straight line through points P and Q
            <br />
            2. This line will intersect the curve at a third point, called -R
            <br />
            3. Reflect -R across the x-axis to get point R
            <br />
            4. Point R is the result of P + Q
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Special Operations on Elliptic Curves</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Point Doubling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Point doubling is a special case of point addition when P = Q. In this case, we draw a tangent line to
                the curve at point P, then follow the same steps to obtain 2P.
              </p>
              <div className="bg-gray-900 p-3 rounded-md mt-2">
                <MathEquation equation="2P = P + P" />
              </div>
              <p className="text-gray-300 mt-2">
                This operation is very important in elliptic curve cryptography, especially in scalar multiplication.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-indigo-400">Scalar Multiplication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Scalar multiplication is the process of adding a point to itself multiple times. If k is a positive
                integer and P is a point on the curve, then:
              </p>
              <div className="bg-gray-900 p-3 rounded-md mt-2">
                <MathEquation equation="kP = P + P + ... + P \text{ (k times)}" />
              </div>
              <p className="text-gray-300 mt-2">
                This operation is the foundation of elliptic curve cryptography, as it's easy to compute kP given k and
                P, but difficult to find k given only P and kP.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Algebraic Formulas for Point Operations</h3>
        <p className="text-gray-300 mb-4">
          In addition to the geometric interpretation, point operations can be expressed algebraically using the
          following formulas:
        </p>
        <div className="bg-gray-800 p-4 rounded-md mb-4">
          <p className="text-purple-300 mb-2">Adding two different points P = (x₁, y₁) and Q = (x₂, y₂):</p>
          <div className="space-y-2">
            <MathEquation equation="\lambda = \frac{y_2 - y_1}{x_2 - x_1}" />
            <MathEquation equation="x_3 = \lambda^2 - x_1 - x_2" />
            <MathEquation equation="y_3 = \lambda(x_1 - x_3) - y_1" />
          </div>
          <p className="text-gray-400 text-sm mt-2">Where (x₃, y₃) are the coordinates of the resulting point P + Q</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-md">
          <p className="text-purple-300 mb-2">Doubling a point P = (x₁, y₁):</p>
          <div className="space-y-2">
            <MathEquation equation="\lambda = \frac{3x_1^2 + a}{2y_1}" />
            <MathEquation equation="x_3 = \lambda^2 - 2x_1" />
            <MathEquation equation="y_3 = \lambda(x_1 - x_3) - y_1" />
          </div>
          <p className="text-gray-400 text-sm mt-2">Where (x₃, y₃) are the coordinates of the resulting point 2P</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">
          Elliptic Curve Discrete Logarithm Problem (ECDLP)
        </h3>
        <p className="text-gray-300 mb-4">
          The security of elliptic curve cryptography relies on the difficulty of the Elliptic Curve Discrete Logarithm
          Problem (ECDLP). This problem states:
        </p>
        <div className="bg-gray-800 p-4 rounded-md mb-4">
          <p className="text-gray-300">
            Given a point G on an elliptic curve and another point Q = kG, the ECDLP is to find the integer k.
          </p>
        </div>
        <p className="text-gray-300">
          While it's easy to calculate Q = kG if we know k and G, the reverse operation (finding k when we know G and Q)
          is computationally difficult for suitable elliptic curves. This computational difficulty is the foundation of
          security for elliptic curve cryptographic algorithms.
        </p>
      </div>
    </div>
  )
}

const CryptoLesson = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Applications of Elliptic Curves in Cryptography</h3>
        <p className="text-gray-300 mb-4">
          Elliptic curves form the basis for several modern cryptographic algorithms and protocols. Here are their key
          applications:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-indigo-400">ECDSA - Digital Signature</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Elliptic Curve Digital Signature Algorithm (ECDSA) is a variant of the Digital Signature Algorithm (DSA)
              that uses elliptic curves. It's used in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Cryptocurrencies like Bitcoin and Ethereum</li>
              <li>Security protocols like TLS/SSL</li>
              <li>Digital signatures for documents and software</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">Simplified example of signing a message with ECDSA:</p>
              <ol className="list-decimal list-inside text-xs text-gray-300 mt-2 space-y-1">
                <li>Choose an elliptic curve and a generator point G</li>
                <li>Generate a private key d (random number)</li>
                <li>Calculate the public key Q = dG</li>
                <li>Hash the message to get value e</li>
                <li>Generate a random number k and calculate point (x, y) = kG</li>
                <li>Calculate r = x mod n and s = k⁻¹(e + rd) mod n</li>
                <li>The signature is the pair (r, s)</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-indigo-400">ECDH - Key Exchange</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Elliptic Curve Diffie-Hellman (ECDH) key exchange protocol allows two parties to establish a shared secret
              over an insecure channel. It's used in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Securing web communications (HTTPS)</li>
              <li>Encrypted messaging applications</li>
              <li>Virtual Private Networks (VPNs)</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">How ECDH works:</p>
              <ol className="list-decimal list-inside text-xs text-gray-300 mt-2 space-y-1">
                <li>Alice chooses a private key a and calculates public key A = aG</li>
                <li>Bob chooses a private key b and calculates public key B = bG</li>
                <li>Alice and Bob exchange public keys A and B</li>
                <li>Alice calculates S = aB = abG</li>
                <li>Bob calculates S = bA = baG</li>
                <li>Both now have the same shared secret S = abG</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-indigo-400">ECIES - Encryption</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Elliptic Curve Integrated Encryption Scheme (ECIES) is a hybrid encryption system that combines public key
              and symmetric key encryption. It's used in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Encrypting sensitive data</li>
              <li>Key management systems</li>
              <li>Securing financial transactions</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">ECIES encryption steps:</p>
              <ol className="list-decimal list-inside text-xs text-gray-300 mt-2 space-y-1">
                <li>Generate a random temporary key pair (r, R = rG)</li>
                <li>Derive a symmetric key K from shared secret S = rQ</li>
                <li>Encrypt the message M using symmetric key K</li>
                <li>Send point R along with the ciphertext</li>
                <li>Recipient uses private key d to calculate S = dR</li>
                <li>Derive the same symmetric key K and decrypt the message</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-indigo-400">Blockchain Applications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Elliptic curves play a pivotal role in blockchain technologies and cryptocurrencies. They're used in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Generating wallet addresses</li>
              <li>Signing transactions</li>
              <li>Verifying blocks and transactions</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">Elliptic curves in Bitcoin:</p>
              <ul className="list-disc list-inside text-xs text-gray-300 mt-2 space-y-1">
                <li>Bitcoin uses the secp256k1 curve</li>
                <li>Private key is a random 256-bit number</li>
                <li>Public key is calculated as a point on the curve</li>
                <li>Wallet address is derived from a hash of the public key</li>
                <li>Signatures are created using ECDSA to prove ownership of coins</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Advantages of Elliptic Curve Cryptography</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-md">
            <h4 className="text-lg font-medium text-indigo-400 mb-2">Smaller Keys</h4>
            <p className="text-gray-300">
              A 256-bit ECC key provides equivalent security to a 3072-bit RSA key, saving on storage and transmission.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <h4 className="text-lg font-medium text-indigo-400 mb-2">Better Performance</h4>
            <p className="text-gray-300">
              Encryption and decryption operations are faster and require fewer computational resources, making them
              ideal for resource-constrained devices.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <h4 className="text-lg font-medium text-indigo-400 mb-2">Relative Quantum Resistance</h4>
            <p className="text-gray-300">
              Compared to RSA, elliptic curves require a larger quantum computer to break, providing relatively better
              resistance to quantum attacks.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Challenges and Limitations</h3>
        <p className="text-gray-300 mb-4">Despite their many advantages, elliptic curves face some challenges:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <span className="text-indigo-400">Weak Curves:</span> Some curves may be vulnerable to specific attacks if
            not chosen carefully
          </li>
          <li>
            <span className="text-indigo-400">Secure Implementation:</span> Incorrect implementation can lead to
            security vulnerabilities such as side-channel attacks
          </li>
          <li>
            <span className="text-indigo-400">Quantum Threat:</span> Shor's quantum algorithm can theoretically break
            elliptic curve cryptography
          </li>
          <li>
            <span className="text-indigo-400">Suspicious Standards:</span> Some standardized curves proposed by
            government agencies have raised concerns about potential backdoors
          </li>
        </ul>
      </div>
    </div>
  )
}

const AdvancedLesson = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Advanced Topics in Elliptic Curves</h3>
        <p className="text-gray-300 mb-4">
          After understanding the basics, there are several advanced topics in the field of elliptic curves worth
          exploring:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-indigo-400">Elliptic Curves over Finite Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              In cryptographic applications, we use elliptic curves defined over finite fields rather than real numbers.
              This means:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>All arithmetic operations are performed modulo a prime number (mod p)</li>
              <li>The curve consists of a finite number of points</li>
              <li>The curve's shape is completely different from its appearance over real numbers</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">Example: Elliptic curve over field F₁₇</p>
              <div className="text-center my-2">
                <MathEquation equation="y^2 \equiv x^3 + 2x + 2 \pmod{17}" />
              </div>
              <p className="text-xs text-gray-300">
                This curve has a finite number of points, which can be calculated by testing all values of x and y from
                0 to 16 and checking the equation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-indigo-400">Hasse's Theorem and Curve Order</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              The order of an elliptic curve is the number of points on the curve (including the point at infinity).
              Hasse's theorem gives bounds for the curve order:
            </p>
            <div className="bg-gray-900 p-3 rounded-md text-center mb-4">
              <MathEquation equation="p + 1 - 2\sqrt{p} \leq \#E(F_p) \leq p + 1 + 2\sqrt{p}" />
            </div>
            <p className="text-gray-300 mb-2">The curve order is important for security reasons:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>The order should be divisible by a large prime number n</li>
              <li>n should be large enough to resist computational attacks</li>
              <li>The order should not equal p (to avoid the Anomalous Curve attack)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-indigo-400">Pairings on Elliptic Curves</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              A pairing is a mathematical transformation that takes two points from an elliptic curve and returns an
              element of a finite field. It has important applications in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Identity-Based Encryption</li>
              <li>Aggregate Signatures</li>
              <li>Secure Multi-party Computation</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">Common types of pairings:</p>
              <ul className="list-disc list-inside text-xs text-gray-300 mt-2 space-y-1">
                <li>Weil Pairing</li>
                <li>Tate Pairing</li>
                <li>Ate Pairing</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-indigo-400">Elliptic Curves in Post-Quantum Cryptography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              With the development of quantum computing, there's a need for cryptographic techniques resistant to
              quantum attacks. Some directions include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Hyperelliptic Curves</li>
              <li>Elliptic Curves over Extension Fields</li>
              <li>Elliptic Curve-based Lattice Cryptography</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-400">Post-quantum alternatives:</p>
              <ul className="list-disc list-inside text-xs text-gray-300 mt-2 space-y-1">
                <li>Lattice-based Cryptography</li>
                <li>Multivariate Cryptography</li>
                <li>Code-based Cryptography</li>
                <li>Hash-based Signatures</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Advanced Research Applications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-md">
            <h4 className="text-lg font-medium text-indigo-400 mb-2">Zero-Knowledge Proofs</h4>
            <p className="text-gray-300">
              Elliptic curves enable efficient zero-knowledge proofs, allowing one party to prove knowledge of
              information without revealing it. Used in privacy-focused cryptocurrencies and electronic voting systems.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <h4 className="text-lg font-medium text-indigo-400 mb-2">Secure Multi-party Computation</h4>
            <p className="text-gray-300">
              Advanced elliptic curve protocols allow multiple parties to perform computations on encrypted data without
              revealing the original data, opening possibilities in AI and private machine learning.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-md">
        <h4 className="text-lg font-medium text-indigo-400 mb-4">Future of Elliptic Curves in Cryptography</h4>
        <p className="text-gray-300 mb-4">
          As technology and threats evolve, research in elliptic curves continues to develop new techniques and
          improvements:
        </p>
      </div>
    </div>
  )
}

export default EducationalSection
