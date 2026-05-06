"use client"

import Link from "next/link"
import { TreePine, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <TreePine className="h-6 w-6" />
            <span>OWR Reserve</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="#yearly" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Yearly Data
            </Link>
            <Link href="#mining" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Mining Map
            </Link>
            <Link href="#comparison" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Comparison
            </Link>
            <Link href="#data" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Data Analysis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-foreground font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="#yearly" className="text-muted-foreground font-medium hover:text-primary transition-colors">
                Yearly Data
              </Link>
              <Link href="#mining" className="text-muted-foreground font-medium hover:text-primary transition-colors">
                Mining Map
              </Link>
              <Link href="#comparison" className="text-muted-foreground font-medium hover:text-primary transition-colors">
                Comparison
              </Link>
              <Link href="#data" className="text-muted-foreground font-medium hover:text-primary transition-colors">
                Data Analysis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
