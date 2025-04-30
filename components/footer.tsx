import { Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/logo"

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Logo className="h-12 w-12 mr-2" />
            <span className="text-lg font-semibold text-gray-100">Khaled Ali</span>
          </div>

          <div className="text-sm text-gray-500 mb-4 sm:mb-0">© 2025 Khaled Ali. All rights reserved.</div>

          <div className="flex space-x-6">
            <Link href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
