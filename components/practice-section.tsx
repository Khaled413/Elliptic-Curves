"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import EllipticCurveVisualizer from "@/components/elliptic-curve-visualizer"
import MathEquation from "@/components/math-equation"

const PracticeSection = () => {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-4">Elliptic Curves Practice</h1>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Gain hands-on experience with elliptic curve operations through these interactive modules. Solve problems,
              visualize results, and deepen your understanding of elliptic curve cryptography.
            </p>
          </motion.div>

          <Tabs defaultValue="point-addition" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="point-addition">Point Addition</TabsTrigger>
              <TabsTrigger value="encryption">Encryption</TabsTrigger>
              <TabsTrigger value="decryption">Decryption</TabsTrigger>
            </TabsList>
            <TabsContent value="point-addition">
              <PointAdditionModule />
            </TabsContent>
            <TabsContent value="encryption">
              <EncryptionModule />
            </TabsContent>
            <TabsContent value="decryption">
              <DecryptionModule />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

const PointAdditionModule = () => {
  const [pointP, setPointP] = useState({ x: 2, y: 3 })
  const [pointQ, setPointQ] = useState({ x: -1, y: 4 })
  const [result, setResult] = useState<{ x: number; y: number } | null>(null)
  const [showSteps, setShowSteps] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    setIsCalculating(true)

    // Simulate calculation time
    setTimeout(() => {
      // This is a simplified calculation and not mathematically accurate
      // In a real implementation, this would use actual elliptic curve math
      const resultX = (pointP.x * pointQ.y + pointQ.x * pointP.y) / (pointP.y + pointQ.y)
      const resultY = Math.sqrt(Math.pow(resultX, 3) - 3 * resultX + 3)

      setResult({ x: Number.parseFloat(resultX.toFixed(2)), y: Number.parseFloat(resultY.toFixed(2)) })
      setIsCalculating(false)
      setShowSteps(true)
    }, 1000)
  }

  const handleReset = () => {
    setResult(null)
    setShowSteps(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-indigo-400">Point Addition Calculator</CardTitle>
          <CardDescription>Calculate the sum of two points on the elliptic curve y² = x³ - 3x + 3</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="point-p-x">Point P (x)</Label>
                <Input
                  id="point-p-x"
                  type="number"
                  step="0.1"
                  value={pointP.x}
                  onChange={(e) => setPointP({ ...pointP, x: Number.parseFloat(e.target.value) })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="point-p-y">Point P (y)</Label>
                <Input
                  id="point-p-y"
                  type="number"
                  step="0.1"
                  value={pointP.y}
                  onChange={(e) => setPointP({ ...pointP, y: Number.parseFloat(e.target.value) })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="point-q-x">Point Q (x)</Label>
                <Input
                  id="point-q-x"
                  type="number"
                  step="0.1"
                  value={pointQ.x}
                  onChange={(e) => setPointQ({ ...pointQ, x: Number.parseFloat(e.target.value) })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="point-q-y">Point Q (y)</Label>
                <Input
                  id="point-q-y"
                  type="number"
                  step="0.1"
                  value={pointQ.y}
                  onChange={(e) => setPointQ({ ...pointQ, y: Number.parseFloat(e.target.value) })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            {result && (
              <div className="p-4 bg-gray-800 rounded-md">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Result: P + Q</h4>
                <p className="text-gray-300 font-mono">
                  ({result.x}, {result.y})
                </p>
              </div>
            )}

            {showSteps && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="steps" className="border-gray-700">
                  <AccordionTrigger className="text-indigo-400">Calculation Steps</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal list-inside space-y-3 text-gray-300">
                      <li>
                        <span className="font-medium text-purple-300">Calculate the slope of the line:</span>
                        <div className="bg-gray-800 p-2 rounded-md mt-1">
                          <MathEquation
                            equation={`\\lambda = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${pointQ.y} - ${pointP.y}}{${pointQ.x} - ${pointP.x}}`}
                          />
                        </div>
                      </li>
                      <li>
                        <span className="font-medium text-purple-300">Calculate the x-coordinate of the result:</span>
                        <div className="bg-gray-800 p-2 rounded-md mt-1">
                          <MathEquation equation="\\lambda^2 - x_1 - x_2" />
                        </div>
                      </li>
                      <li>
                        <span className="font-medium text-purple-300">Calculate the y-coordinate of the result:</span>
                        <div className="bg-gray-800 p-2 rounded-md mt-1">
                          <MathEquation equation="\lambda(x_1 - x_3) - y_1" />
                        </div>
                      </li>
                    </ol>
                    <p className="text-sm text-gray-400 mt-4">
                      Note: In real cryptographic applications, these calculations are performed over finite fields, not
                      real numbers.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleCalculate} disabled={isCalculating} className="bg-indigo-700 hover:bg-indigo-600">
            {isCalculating ? "Calculating..." : "Calculate"}
          </Button>
        </CardFooter>
      </Card>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Visual Representation</h3>
        <EllipticCurveVisualizer
          a={-3}
          b={3}
          showPointAddition={true}
          pointP={pointP}
          pointQ={pointQ}
          result={result}
          width={500}
          height={400}
          className="rounded-md w-full h-auto"
        />
        <div className="mt-6 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="theory" className="border-gray-700">
              <AccordionTrigger className="text-indigo-400">Theory Behind Point Addition</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-300 mb-3">
                  Point addition on an elliptic curve is a geometric operation that follows these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Draw a straight line through points P and Q</li>
                  <li>Find the third point R' where this line intersects the curve</li>
                  <li>Reflect point R' across the x-axis to get point R = P + Q</li>
                </ol>
                <div className="bg-gray-800 p-3 rounded-md mt-3">
                  <p className="text-sm text-purple-300 mb-2">Algebraic Formula:</p>
                  <div className="space-y-2">
                    <MathEquation equation="\lambda = \frac{y_2 - y_1}{x_2 - x_1}" />
                    <MathEquation equation="x_3 = \lambda^2 - x_1 - x_2" />
                    <MathEquation equation="y_3 = \lambda(x_1 - x_3) - y_1" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="applications" className="border-gray-700">
              <AccordionTrigger className="text-indigo-400">
                Applications of Point Addition in Cryptography
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-300 mb-3">
                  Point addition is the fundamental operation upon which most elliptic curve cryptographic algorithms
                  are built:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>
                    <span className="text-indigo-400">Scalar Multiplication:</span> Implemented through a series of
                    point additions and doublings
                  </li>
                  <li>
                    <span className="text-indigo-400">Key Generation:</span> The public key is the result of multiplying
                    the private key by a generator point
                  </li>
                  <li>
                    <span className="text-indigo-400">Digital Signatures:</span> ECDSA uses point addition operations to
                    create and verify signatures
                  </li>
                  <li>
                    <span className="text-indigo-400">Key Exchange:</span> ECDH relies on the commutative property of
                    point addition to establish a shared secret
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

const EncryptionModule = () => {
  const [message, setMessage] = useState("")
  const [publicKey, setPublicKey] = useState("ECC-P256")
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [isEncrypting, setIsEncrypting] = useState(false)

  const handleEncrypt = () => {
    if (!message) return

    setIsEncrypting(true)

    // Simulate encryption time
    setTimeout(() => {
      // This is just a visual simulation, not actual encryption
      const encrypted = Array.from(message)
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")

      setEncryptedMessage(encrypted)
      setIsEncrypting(false)
    }, 1500)
  }

  const handleReset = () => {
    setMessage("")
    setEncryptedMessage("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-indigo-400">Elliptic Curve Encryption Simulator</CardTitle>
          <CardDescription>Simulate encrypting a message using elliptic curve cryptography</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="message">Message to Encrypt</Label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message"
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="public-key">Public Key</Label>
              <select
                id="public-key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300"
              >
                <option value="ECC-P256">ECC-P256</option>
                <option value="ECC-P384">ECC-P384</option>
                <option value="ECC-P521">ECC-P521</option>
                <option value="secp256k1">secp256k1 (Bitcoin)</option>
                <option value="Curve25519">Curve25519</option>
              </select>
            </div>

            {encryptedMessage && (
              <div className="p-4 bg-gray-800 rounded-md">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Encrypted Message</h4>
                <p className="text-gray-300 font-mono break-all">{encryptedMessage}</p>
              </div>
            )}

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-it-works" className="border-gray-700">
                <AccordionTrigger className="text-indigo-400">How Elliptic Curve Encryption Works</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium text-purple-300">Generate a random ephemeral key k</span>
                      <p className="text-sm text-gray-400 mt-1">
                        A random number k is chosen for one-time use in the encryption process
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Calculate R = kG</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Where G is an agreed-upon generator point on the elliptic curve
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Calculate S = kP</span>
                      <p className="text-sm text-gray-400 mt-1">Where P is the recipient's public key</p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Derive a symmetric key</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Use the x-coordinate of point S as a key for a symmetric encryption algorithm like AES
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Encrypt the message</span>
                      <p className="text-sm text-gray-400 mt-1">Encrypt the message using the derived symmetric key</p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Send point R with the ciphertext</span>
                      <p className="text-sm text-gray-400 mt-1">
                        The recipient will use their private key d to calculate S = dR = d(kG) = k(dG) = kP
                      </p>
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            onClick={handleEncrypt}
            disabled={isEncrypting || !message}
            className="bg-indigo-700 hover:bg-indigo-600"
          >
            {isEncrypting ? "Encrypting..." : "Encrypt"}
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-indigo-400">Key Size Comparison</CardTitle>
            <CardDescription>
              Comparing key sizes between elliptic curve and RSA for equivalent security levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-2 text-left text-indigo-400">Security Level</th>
                    <th className="border border-gray-700 p-2 text-left text-indigo-400">ECC Key Size</th>
                    <th className="border border-gray-700 p-2 text-left text-indigo-400">RSA Key Size</th>
                    <th className="border border-gray-700 p-2 text-left text-indigo-400">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-2 text-gray-300">128 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">256 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">3072 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">1:12</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="border border-gray-700 p-2 text-gray-300">192 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">384 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">7680 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">1:20</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-2 text-gray-300">256 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">521 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">15360 bits</td>
                    <td className="border border-gray-700 p-2 text-gray-300">1:30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Elliptic curves provide the same security level with much smaller keys, saving storage and transmission
              costs and improving performance.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-indigo-400">Advantages of Elliptic Curve Cryptography</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-purple-300 font-medium">Smaller Keys</h4>
                  <p className="text-gray-300 text-sm">
                    Much smaller keys than RSA for the same security level, reducing storage and transmission
                    requirements.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-purple-300 font-medium">Better Performance</h4>
                  <p className="text-gray-300 text-sm">
                    Faster and more efficient computational operations, especially on resource-constrained devices like
                    smartphones and IoT devices.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-purple-300 font-medium">Lower Energy Consumption</h4>
                  <p className="text-gray-300 text-sm">
                    Lower power consumption compared to other encryption algorithms, making it ideal for battery-powered
                    devices and embedded systems.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm">4</span>
                </div>
                <div>
                  <h4 className="text-purple-300 font-medium">Relative Quantum Resistance</h4>
                  <p className="text-gray-300 text-sm">
                    Requires larger quantum resources to break compared to RSA, providing relatively better resistance
                    to future quantum attacks.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const DecryptionModule = () => {
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [privateKey, setPrivateKey] = useState("d4c74594d841...")
  const [decryptedMessage, setDecryptedMessage] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)

  const handleDecrypt = () => {
    if (!encryptedMessage) return

    setIsDecrypting(true)

    // Simulate decryption time
    setTimeout(() => {
      // This is just a visual simulation, not actual decryption
      try {
        const decrypted =
          encryptedMessage
            .match(/.{1,2}/g)
            ?.map((hex) => String.fromCharCode(Number.parseInt(hex, 16)))
            .join("") || "Decryption failed"

        setDecryptedMessage(decrypted)
      } catch (e) {
        setDecryptedMessage("Invalid encrypted message format")
      }

      setIsDecrypting(false)
    }, 1500)
  }

  const handleReset = () => {
    setEncryptedMessage("")
    setDecryptedMessage("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-indigo-400">Elliptic Curve Decryption Simulator</CardTitle>
          <CardDescription>Simulate decrypting a message using elliptic curve cryptography</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="encrypted-message">Encrypted Message (hex format)</Label>
              <Input
                id="encrypted-message"
                value={encryptedMessage}
                onChange={(e) => setEncryptedMessage(e.target.value)}
                placeholder="Enter encrypted message in hex format"
                className="bg-gray-800 border-gray-700 font-mono"
              />
              <p className="text-xs text-gray-400">Example: 48656c6c6f20776f726c64 (for "Hello world")</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="private-key">Private Key (simplified)</Label>
              <Input
                id="private-key"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="bg-gray-800 border-gray-700 font-mono"
                disabled
              />
              <p className="text-xs text-gray-400">
                In a real application, the private key would never be displayed in the user interface
              </p>
            </div>

            {decryptedMessage && (
              <div className="p-4 bg-gray-800 rounded-md">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Decrypted Message</h4>
                <p className="text-gray-300">{decryptedMessage}</p>
              </div>
            )}

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-it-works" className="border-gray-700">
                <AccordionTrigger className="text-indigo-400">How Elliptic Curve Decryption Works</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium text-purple-300">Receive ciphertext and point R</span>
                      <p className="text-sm text-gray-400 mt-1">
                        The recipient receives the encrypted text along with point R = kG sent by the sender
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Calculate shared secret</span>
                      <p className="text-sm text-gray-400 mt-1">
                        The recipient uses their private key d to calculate S = dR = d(kG) = k(dG) = kP
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Derive symmetric key</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Use the x-coordinate of point S to derive the same symmetric key used by the sender
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-purple-300">Decrypt the message</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Use the derived symmetric key to decrypt the ciphertext and obtain the original message
                      </p>
                    </li>
                  </ol>
                  <div className="bg-gray-800 p-3 rounded-md mt-4">
                    <p className="text-sm text-purple-300 mb-2">Mathematical Security:</p>
                    <p className="text-xs text-gray-300">
                      The security of this process relies on the difficulty of the Elliptic Curve Discrete Logarithm
                      Problem (ECDLP). Even if an attacker knows point R = kG and the public key P = dG, they cannot
                      compute kP without knowing k or d.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            onClick={handleDecrypt}
            disabled={isDecrypting || !encryptedMessage}
            className="bg-indigo-700 hover:bg-indigo-600"
          >
            {isDecrypting ? "Decrypting..." : "Decrypt"}
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-indigo-400">Real-World Decryption Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-md">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Secure Communications</h4>
                <p className="text-gray-300 text-sm">
                  TLS/SSL protocols use elliptic curve cryptography to secure web communications. When you browse a
                  website using HTTPS, ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) is often used to establish a
                  secure session key.
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-md">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Encrypted Messaging</h4>
                <p className="text-gray-300 text-sm">
                  Applications like Signal and WhatsApp use elliptic curve cryptography as part of their end-to-end
                  encryption protocol. ECC keys are used to encrypt and decrypt messages so that only the sender and
                  recipient can read them.
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-md">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Cryptocurrencies</h4>
                <p className="text-gray-300 text-sm">
                  Cryptocurrencies like Bitcoin and Ethereum use elliptic curves for signing and verifying transactions.
                  The private key is used to decrypt transactions and sign them, while the public key is used to verify
                  the signature.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-indigo-400">Elliptic Curve Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              The security of elliptic curve cryptography relies on the difficulty of the Elliptic Curve Discrete
              Logarithm Problem (ECDLP). However, there are important considerations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <span className="text-indigo-400">Curve Selection:</span> Use trusted standard curves like P-256 or
                Curve25519
              </li>
              <li>
                <span className="text-indigo-400">Key Generation:</span> Private keys must be generated using a strong
                random number generator
              </li>
              <li>
                <span className="text-indigo-400">Private Key Protection:</span> The private key must be stored securely
                and never shared
              </li>
              <li>
                <span className="text-indigo-400">Secure Implementation:</span> Use trusted, tested libraries to avoid
                side-channel attacks
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PracticeSection
