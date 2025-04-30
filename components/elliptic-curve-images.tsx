"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface EllipticCurveImageProps {
  type: "intro" | "point-addition" | "cryptography" | "future"
  width: number
  height: number
  className?: string
}

const EllipticCurveImage: React.FC<EllipticCurveImageProps> = ({ type, width, height, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set background
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, width, height)

    // Draw based on type
    switch (type) {
      case "intro":
        drawIntroImage(ctx, width, height)
        break
      case "point-addition":
        drawPointAdditionImage(ctx, width, height)
        break
      case "cryptography":
        drawCryptographyImage(ctx, width, height)
        break
      case "future":
        drawFutureImage(ctx, width, height)
        break
    }
  }, [type, width, height])

  // Draw introduction to elliptic curves image
  const drawIntroImage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw coordinate system
    const offsetX = width / 2
    const offsetY = height / 2
    const scale = 40

    // Draw axes
    ctx.strokeStyle = "#4B5563"
    ctx.lineWidth = 1

    // x-axis
    ctx.beginPath()
    ctx.moveTo(0, offsetY)
    ctx.lineTo(width, offsetY)
    ctx.stroke()

    // y-axis
    ctx.beginPath()
    ctx.moveTo(offsetX, 0)
    ctx.lineTo(offsetX, height)
    ctx.stroke()

    // Draw elliptic curve
    ctx.strokeStyle = "#8B5CF6"
    ctx.lineWidth = 3
    ctx.beginPath()

    // Draw the curve y^2 = x^3 - 3x + 3
    const a = -3
    const b = 3

    for (let pixelX = 0; pixelX < width; pixelX += 0.5) {
      const x = (pixelX - offsetX) / scale
      const ySquared = Math.pow(x, 3) + a * x + b

      if (ySquared >= 0) {
        const y = Math.sqrt(ySquared)
        const pixelY1 = offsetY - y * scale
        const pixelY2 = offsetY + y * scale

        ctx.beginPath()
        ctx.arc(pixelX, pixelY1, 1, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(pixelX, pixelY2, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Add some decorative elements
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 3 + 1

      ctx.fillStyle = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.1})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add title
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 24px Inter"
    ctx.fillText("y² = x³ + ax + b", 20, 30)
  }

  // Draw point addition image
  const drawPointAdditionImage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw coordinate system
    const offsetX = width / 2
    const offsetY = height / 2
    const scale = 40

    // Draw axes
    ctx.strokeStyle = "#4B5563"
    ctx.lineWidth = 1

    // x-axis
    ctx.beginPath()
    ctx.moveTo(0, offsetY)
    ctx.lineTo(width, offsetY)
    ctx.stroke()

    // y-axis
    ctx.beginPath()
    ctx.moveTo(offsetX, 0)
    ctx.lineTo(offsetX, height)
    ctx.stroke()

    // Draw elliptic curve
    ctx.strokeStyle = "#8B5CF6"
    ctx.lineWidth = 2
    ctx.beginPath()

    // Draw the curve y^2 = x^3 - 3x + 3
    const a = -3
    const b = 3

    for (let pixelX = 0; pixelX < width; pixelX += 0.5) {
      const x = (pixelX - offsetX) / scale
      const ySquared = Math.pow(x, 3) + a * x + b

      if (ySquared >= 0) {
        const y = Math.sqrt(ySquared)
        const pixelY1 = offsetY - y * scale
        const pixelY2 = offsetY + y * scale

        ctx.beginPath()
        ctx.arc(pixelX, pixelY1, 1, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(pixelX, pixelY2, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw point P
    const pointPx = -2
    const pointPy = Math.sqrt(Math.pow(pointPx, 3) + a * pointPx + b)
    const pixelPx = offsetX + pointPx * scale
    const pixelPy = offsetY - pointPy * scale

    ctx.fillStyle = "#9333EA"
    ctx.beginPath()
    ctx.arc(pixelPx, pixelPy, 6, 0, Math.PI * 2)
    ctx.fill()

    // Label point P
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 16px Inter"
    ctx.fillText("P", pixelPx + 10, pixelPy - 10)

    // Draw point Q
    const pointQx = 1
    const pointQy = Math.sqrt(Math.pow(pointQx, 3) + a * pointQx + b)
    const pixelQx = offsetX + pointQx * scale
    const pixelQy = offsetY - pointQy * scale

    ctx.fillStyle = "#4F46E5"
    ctx.beginPath()
    ctx.arc(pixelQx, pixelQy, 6, 0, Math.PI * 2)
    ctx.fill()

    // Label point Q
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 16px Inter"
    ctx.fillText("Q", pixelQx + 10, pixelQy - 10)

    // Draw line between P and Q
    ctx.strokeStyle = "#EC4899"
    ctx.lineWidth = 1.5
    ctx.setLineDash([5, 3])
    ctx.beginPath()
    ctx.moveTo(pixelPx, pixelPy)
    ctx.lineTo(pixelQx, pixelQy)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw result point R (P+Q)
    const pointRx = 3
    const pointRy = -Math.sqrt(Math.pow(pointRx, 3) + a * pointRx + b)
    const pixelRx = offsetX + pointRx * scale
    const pixelRy = offsetY - pointRy * scale

    ctx.fillStyle = "#EC4899"
    ctx.beginPath()
    ctx.arc(pixelRx, pixelRy, 6, 0, Math.PI * 2)
    ctx.fill()

    // Label point R
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 16px Inter"
    ctx.fillText("P+Q", pixelRx + 10, pixelRy - 10)

    // Add title
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 20px Inter"
    ctx.fillText("Point Addition on Elliptic Curves", 20, 30)
  }

  // Draw cryptography image
  const drawCryptographyImage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Fill background
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, width, height)

    // Draw a lock in the center
    const centerX = width / 2
    const centerY = height / 2
    const lockSize = Math.min(width, height) * 0.4

    // Draw lock body
    ctx.fillStyle = "#4F46E5"
    ctx.beginPath()
    ctx.roundRect(centerX - lockSize / 2, centerY - lockSize / 4, lockSize, lockSize, 10)
    ctx.fill()

    // Draw lock hole
    ctx.fillStyle = "#111827"
    ctx.beginPath()
    ctx.arc(centerX, centerY + lockSize / 4, lockSize / 6, 0, Math.PI * 2)
    ctx.fill()

    // Draw lock shackle
    ctx.strokeStyle = "#8B5CF6"
    ctx.lineWidth = lockSize / 10
    ctx.beginPath()
    ctx.arc(centerX, centerY - lockSize / 4, lockSize / 3, Math.PI, 0, true)
    ctx.stroke()

    // Draw binary data flowing around the lock
    ctx.font = `${lockSize / 10}px monospace`

    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = (Math.random() * 0.5 + 0.8) * lockSize
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.fillStyle = `rgba(139, 92, 246, ${Math.random() * 0.7 + 0.3})`
      ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y)
    }

    // Draw elliptic curve equation
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 20px Inter"
    ctx.fillText("Securing Digital Communications", 20, 30)

    // Draw connecting lines
    for (let i = 0; i < 15; i++) {
      const startAngle = Math.random() * Math.PI * 2
      const endAngle = startAngle + ((Math.random() * Math.PI) / 2 - Math.PI / 4)

      const startDistance = lockSize * 0.6
      const endDistance = lockSize * (Math.random() * 0.5 + 0.8)

      const startX = centerX + Math.cos(startAngle) * startDistance
      const startY = centerY + Math.sin(startAngle) * startDistance

      const endX = centerX + Math.cos(endAngle) * endDistance
      const endY = centerY + Math.sin(endAngle) * endDistance

      ctx.strokeStyle = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.2})`
      ctx.lineWidth = Math.random() * 2 + 0.5
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
  }

  // Draw future image
  const drawFutureImage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Fill background
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, width, height)

    // Create a futuristic grid
    ctx.strokeStyle = "rgba(79, 70, 229, 0.3)"
    ctx.lineWidth = 1

    // Horizontal lines
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Vertical lines
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Draw DNA helix (representing bioinformatics)
    const helixCenterX = width / 3
    const helixTop = height * 0.2
    const helixBottom = height * 0.8
    const helixWidth = width * 0.15
    const steps = 20

    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const y = helixTop + (helixBottom - helixTop) * t

      // Draw the strands
      const xOffset = (Math.sin(t * Math.PI * 4) * helixWidth) / 2

      // Left strand
      ctx.strokeStyle = "#9333EA"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(helixCenterX - helixWidth / 2, y - 10)
      ctx.lineTo(helixCenterX + xOffset, y)
      ctx.stroke()

      // Right strand
      ctx.strokeStyle = "#4F46E5"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(helixCenterX + helixWidth / 2, y - 10)
      ctx.lineTo(helixCenterX - xOffset, y)
      ctx.stroke()

      // Draw connecting rungs
      if (i % 2 === 0) {
        ctx.strokeStyle = "rgba(236, 72, 153, 0.7)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(helixCenterX + xOffset, y)
        ctx.lineTo(helixCenterX - xOffset, y)
        ctx.stroke()
      }
    }

    // Draw quantum computer representation
    const qcCenterX = (width * 2) / 3
    const qcCenterY = height / 2
    const qcSize = height * 0.3

    // Draw qubits
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const x = qcCenterX - qcSize / 2 + (i * qcSize) / 4
        const y = qcCenterY - qcSize / 2 + (j * qcSize) / 4

        ctx.fillStyle = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        // Draw connecting lines
        if (Math.random() > 0.5) {
          const targetI = Math.floor(Math.random() * 5)
          const targetJ = Math.floor(Math.random() * 5)

          if (targetI !== i || targetJ !== j) {
            const targetX = qcCenterX - qcSize / 2 + (targetI * qcSize) / 4
            const targetY = qcCenterY - qcSize / 2 + (targetJ * qcSize) / 4

            ctx.strokeStyle = `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(targetX, targetY)
            ctx.stroke()
          }
        }
      }
    }

    // Draw connecting lines between DNA and quantum computer
    for (let i = 0; i < 5; i++) {
      const startX = helixCenterX + helixWidth / 2
      const startY = helixTop + (helixBottom - helixTop) * (i / 5)

      const endX = qcCenterX - qcSize / 2
      const endY = qcCenterY - qcSize / 2 + (i * qcSize) / 4

      ctx.strokeStyle = "rgba(236, 72, 153, 0.4)"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Add title
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 20px Inter"
    ctx.fillText("Future Directions: Bioinformatics & Quantum Computing", 20, 30)
  }

  return <canvas ref={canvasRef} className={className} />
}

export default EllipticCurveImage
