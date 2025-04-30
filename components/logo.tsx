import type React from "react"
import Image from "next/image"

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  return <Image src="/images/logo.png" alt="Khaled Ali Logo" width={60} height={60} className={className} />
}

export default Logo
