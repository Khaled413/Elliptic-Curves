"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"

interface EllipticCurveVisualizerProps {
  a: number
  b: number
  width: number
  height: number
  className?: string
  showPointAddition?: boolean
  pointP?: { x: number; y: number }
  pointQ?: { x: number; y: number }
  result?: { x: number; y: number } | null
}

const EllipticCurveVisualizer: React.FC<EllipticCurveVisualizerProps> = ({
  a,
  b,
  width,
  height,
  className = "",
  showPointAddition = false,
  pointP = { x: 2, y: 3 },
  pointQ = { x: -1, y: 4 },
  result = null,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // استخدام Intersection Observer لتحميل Canvas فقط عندما يكون مرئيًا
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current)
      }
    }
  }, [])

  const drawCurve = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // تعيين أبعاد Canvas
    canvas.width = width
    canvas.height = height

    // مسح Canvas
    ctx.clearRect(0, 0, width, height)

    // تعيين الخلفية
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, width, height)

    // رسم نظام الإحداثيات
    const offsetX = width / 2
    const offsetY = height / 2
    const scale = 40

    // رسم الشبكة
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 0.5

    // رسم محاور x و y
    ctx.beginPath()
    ctx.moveTo(0, offsetY)
    ctx.lineTo(width, offsetY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(offsetX, 0)
    ctx.lineTo(offsetX, height)
    ctx.stroke()

    // رسم خطوط الشبكة
    for (let x = -10; x <= 10; x++) {
      if (x === 0) continue
      const xPos = offsetX + x * scale
      ctx.beginPath()
      ctx.moveTo(xPos, 0)
      ctx.lineTo(xPos, height)
      ctx.stroke()

      // رسم تسميات محور x
      ctx.fillStyle = "#aaa"
      ctx.font = "12px Inter"
      ctx.fillText(x.toString(), xPos - 5, offsetY + 15)
    }

    for (let y = -10; y <= 10; y++) {
      if (y === 0) continue
      const yPos = offsetY - y * scale
      ctx.beginPath()
      ctx.moveTo(0, yPos)
      ctx.lineTo(width, yPos)
      ctx.stroke()

      // رسم تسميات محور y
      ctx.fillStyle = "#aaa"
      ctx.font = "12px Inter"
      ctx.fillText(y.toString(), offsetX + 5, yPos + 5)
    }

    // رسم تسمية الأصل
    ctx.fillStyle = "#aaa"
    ctx.font = "12px Inter"
    ctx.fillText("0", offsetX - 10, offsetY + 15)

    // رسم المنحنى الإهليلجي
    ctx.strokeStyle = "#6366f1"
    ctx.lineWidth = 2
    ctx.beginPath()

    // دالة لحساب y لقيمة x معينة على المنحنى الإهليلجي
    const calculateY = (x: number) => {
      // y^2 = x^3 + ax + b
      const ySquared = Math.pow(x, 3) + a * x + b
      if (ySquared < 0) return null
      return Math.sqrt(ySquared)
    }

    // رسم المنحنى بدقة أقل لتحسين الأداء
    const step = 2 // زيادة الخطوة لتقليل عدد النقاط المرسومة
    for (let pixelX = 0; pixelX < width; pixelX += step) {
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
    for (let pixelX = 0; pixelX < width; pixelX += step) {
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

    if (showPointAddition) {
      // رسم النقاط P و Q
      const drawPoint = (point: { x: number; y: number }, color: string, label: string) => {
        const pixelX = offsetX + point.x * scale
        const pixelY = offsetY - point.y * scale

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(pixelX, pixelY, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "#fff"
        ctx.font = "bold 14px Inter"
        ctx.fillText(label, pixelX + 8, pixelY - 8)
      }

      // رسم النقطة P
      drawPoint(pointP, "#9333ea", "P")

      // رسم النقطة Q
      drawPoint(pointQ, "#4f46e5", "Q")

      // رسم خط بين P و Q
      ctx.strokeStyle = "rgba(236, 72, 153, 0.7)"
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 3])
      ctx.beginPath()
      ctx.moveTo(offsetX + pointP.x * scale, offsetY - pointP.y * scale)
      ctx.lineTo(offsetX + pointQ.x * scale, offsetY - pointQ.y * scale)
      ctx.stroke()
      ctx.setLineDash([])

      // رسم نقطة النتيجة إذا كانت متاحة
      if (result) {
        drawPoint(result, "#ec4899", "P+Q")
      }
    }

    // إضافة المعادلة
    ctx.fillStyle = "#E5E7EB"
    ctx.font = "bold 16px Inter"
    ctx.fillText(`y² = x³ + ${a}x + ${b}`, 20, 30)
  }, [a, b, width, height, showPointAddition, pointP, pointQ, result, isVisible])

  useEffect(() => {
    if (isVisible) {
      drawCurve()
    }
  }, [drawCurve, isVisible])

  return <canvas ref={canvasRef} className={className} />
}

export default EllipticCurveVisualizer
