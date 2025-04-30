"use client"

import { useEffect, useRef } from "react"

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Colors in purple/blue spectrum
        const hue = Math.random() * 60 + 220 // 220-280 range (blue to purple)
        const saturation = Math.random() * 30 + 70 // 70-100%
        const lightness = Math.random() * 20 + 50 // 50-70%
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(40, window.innerWidth / 30) // تقليل العدد من 80 إلى 40

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connect particles with lines
    const connectParticles = () => {
      if (!ctx) return
      const maxDistance = 150

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(120, 120, 255, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Add occasional binary symbols
    const drawBinarySymbols = () => {
      if (!ctx) return
      if (Math.random() > 0.97) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const symbol = Math.random() > 0.5 ? "1" : "0"
        const size = Math.random() * 14 + 8

        ctx.font = `${size}px 'Roboto Mono', monospace`
        ctx.fillStyle = `rgba(120, 120, 255, ${Math.random() * 0.3 + 0.1})`
        ctx.fillText(symbol, x, y)

        // Fade out
        setTimeout(
          () => {
            if (!ctx) return
            ctx.fillStyle = "rgba(17, 24, 39, 0.2)" // Matching bg-gray-950
            ctx.fillRect(x, y - size, size, size + 2)
          },
          Math.random() * 2000 + 1000,
        )
      }
    }

    // Animation loop
    let isScrolling = false
    let scrollTimer: NodeJS.Timeout
    window.addEventListener("scroll", () => {
      isScrolling = true
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        isScrolling = false
      }, 100)
    })

    const animate = () => {
      if (!ctx) return
      ctx.fillStyle = "rgba(17, 24, 39, 0.05)" // زيادة الشفافية لتقليل إعادة الرسم
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // تحديث كل جسيم ثاني فقط في كل إطار لتحسين الأداء
      particlesArray.forEach((particle, index) => {
        if (index % 2 === 0 || !isScrolling) {
          particle.update()
          particle.draw()
        }
      })

      // تقليل عدد الخطوط المرسومة
      if (!isScrolling) {
        connectParticles()
        drawBinarySymbols()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default AnimatedBackground
