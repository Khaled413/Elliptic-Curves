"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"

interface MathEquationProps {
  equation: string
  inline?: boolean
}

const MathEquation: React.FC<MathEquationProps> = ({ equation, inline = false }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(equation, containerRef.current, {
        throwOnError: false,
        displayMode: !inline,
      })
    }
  }, [equation, inline])

  return <div ref={containerRef} className={inline ? "inline-block" : "block"} />
}

export default MathEquation
