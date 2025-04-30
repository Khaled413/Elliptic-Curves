"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const EllipticCurveDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [a, setA] = useState(-3)
  const [b, setB] = useState(3)
  const [curveType, setCurveType] = useState("weierstrass")
  const [pointP, setPointP] = useState({ x: 1, y: 1.7 })
  const [pointQ, setPointQ] = useState({ x: 2, y: 2.7 })
  const [scalarK, setScalarK] = useState(2)
  const [operation, setOperation] = useState("add")

  // Draw the elliptic curve
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up coordinate system
    const width = canvas.width
    const height = canvas.height
    const scale = 40
    const offsetX = width / 2
    const offsetY = height / 2

    // Draw grid
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 0.5

    // Draw x and y axes
    ctx.beginPath()
    ctx.moveTo(0, offsetY)
    ctx.lineTo(width, offsetY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(offsetX, 0)
    ctx.lineTo(offsetX, height)
    ctx.stroke()

    // Draw grid lines
    for (let x = -10; x <= 10; x++) {
      if (x === 0) continue
      const xPos = offsetX + x * scale
      ctx.beginPath()
      ctx.moveTo(xPos, 0)
      ctx.lineTo(xPos, height)
      ctx.stroke()

      // Draw x-axis labels
      ctx.fillStyle = "#aaa"
      ctx.font = "12px Arial"
      ctx.fillText(x.toString(), xPos - 5, offsetY + 15)
    }

    for (let y = -10; y <= 10; y++) {
      if (y === 0) continue
      const yPos = offsetY - y * scale
      ctx.beginPath()
      ctx.moveTo(0, yPos)
      ctx.lineTo(width, yPos)
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = "#aaa"
      ctx.font = "12px Arial"
      ctx.fillText(y.toString(), offsetX + 5, yPos + 5)
    }

    // Draw origin label
    ctx.fillStyle = "#aaa"
    ctx.font = "12px Arial"
    ctx.fillText("0", offsetX - 10, offsetY + 15)

    // Draw the elliptic curve
    ctx.strokeStyle = "#6366f1"
    ctx.lineWidth = 2
    ctx.beginPath()

    // Function to calculate y for a given x on the elliptic curve
    const calculateY = (x: number) => {
      if (curveType === "weierstrass") {
        // y^2 = x^3 + ax + b
        const ySquared = Math.pow(x, 3) + a * x + b
        if (ySquared < 0) return null
        return Math.sqrt(ySquared)
      }
      return null
    }

    // Plot the curve
    for (let pixelX = 0; pixelX < width; pixelX++) {
      const x = (pixelX - offsetX) / scale
      const y = calculateY(x)

      if (y !== null) {
        const pixelY1 = offsetY - y * scale
        const pixelY2 = offsetY + y * scale

        if (pixelX === 0) {
          ctx.moveTo(pixelX, pixelY1)
        } else {
          ctx.lineTo(pixelX, pixelY1)
        }
      }
    }
    ctx.stroke()

    ctx.beginPath()
    for (let pixelX = 0; pixelX < width; pixelX++) {
      const x = (pixelX - offsetX) / scale
      const y = calculateY(x)

      if (y !== null) {
        const pixelY2 = offsetY + y * scale

        if (pixelX === 0) {
          ctx.moveTo(pixelX, pixelY2)
        } else {
          ctx.lineTo(pixelX, pixelY2)
        }
      }
    }
    ctx.stroke()

    // Draw points P and Q
    const drawPoint = (point: { x: number; y: number }, color: string, label: string) => {
      const pixelX = offsetX + point.x * scale
      const pixelY = offsetY - point.y * scale

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(pixelX, pixelY, 5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#fff"
      ctx.font = "bold 14px Arial"
      ctx.fillText(label, pixelX + 8, pixelY - 8)
    }

    // Draw point P
    drawPoint(pointP, "#9333ea", "P")

    // Draw point Q
    drawPoint(pointQ, "#4f46e5", "Q")

    // Draw result point based on operation
    if (operation === "add") {
      // Simplified point addition (not mathematically accurate)
      const resultPoint = {
        x: (pointP.x + pointQ.x) / 2,
        y: calculateY((pointP.x + pointQ.x) / 2) || 0,
      }
      drawPoint(resultPoint, "#ec4899", "P+Q")
    } else if (operation === "multiply") {
      // Simplified scalar multiplication (not mathematically accurate)
      const resultPoint = {
        x: (pointP.x * scalarK) / 2,
        y: calculateY((pointP.x * scalarK) / 2) || 0,
      }
      drawPoint(resultPoint, "#ec4899", `${scalarK}P`)
    }
  }, [a, b, curveType, pointP, pointQ, scalarK, operation])

  return (
    <div className="flex flex-col space-y-6">
      <div className="relative bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
        <canvas ref={canvasRef} width={600} height={400} className="w-full h-[400px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="curve-type">Curve Type</Label>
            <Select value={curveType} onValueChange={setCurveType}>
              <SelectTrigger id="curve-type">
                <SelectValue placeholder="Select curve type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weierstrass">Weierstrass Form (y² = x³ + ax + b)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parameter-a">Parameter a: {a}</Label>
            <Slider
              id="parameter-a"
              min={-10}
              max={10}
              step={0.1}
              value={[a]}
              onValueChange={(values) => setA(values[0])}
            />
          </div>

          <div>
            <Label htmlFor="parameter-b">Parameter b: {b}</Label>
            <Slider
              id="parameter-b"
              min={-10}
              max={10}
              step={0.1}
              value={[b]}
              onValueChange={(values) => setB(values[0])}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="operation">Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger id="operation">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Point Addition (P + Q)</SelectItem>
                <SelectItem value="multiply">Scalar Multiplication (k × P)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="point-p-x">Point P (x)</Label>
              <Input
                id="point-p-x"
                type="number"
                step="0.1"
                value={pointP.x}
                onChange={(e) => setPointP({ ...pointP, x: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="point-p-y">Point P (y)</Label>
              <Input
                id="point-p-y"
                type="number"
                step="0.1"
                value={pointP.y}
                onChange={(e) => setPointP({ ...pointP, y: Number.parseFloat(e.target.value) })}
              />
            </div>
          </div>

          {operation === "add" ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="point-q-x">Point Q (x)</Label>
                <Input
                  id="point-q-x"
                  type="number"
                  step="0.1"
                  value={pointQ.x}
                  onChange={(e) => setPointQ({ ...pointQ, x: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="point-q-y">Point Q (y)</Label>
                <Input
                  id="point-q-y"
                  type="number"
                  step="0.1"
                  value={pointQ.y}
                  onChange={(e) => setPointQ({ ...pointQ, y: Number.parseFloat(e.target.value) })}
                />
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="scalar-k">Scalar k</Label>
              <Input
                id="scalar-k"
                type="number"
                min="1"
                max="10"
                value={scalarK}
                onChange={(e) => setScalarK(Number.parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">Equation</h3>
        <p className="font-mono text-gray-300">{curveType === "weierstrass" && `y² = x³ + ${a}x + ${b}`}</p>
      </div>

      <div className="text-sm text-gray-400 italic">
        <p>
          Note: This is a simplified visualization for educational purposes. The point operations shown are
          approximations and not mathematically precise implementations of elliptic curve operations.
        </p>
      </div>
    </div>
  )
}

export default EllipticCurveDemo
