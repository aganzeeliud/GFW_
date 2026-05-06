import Link from "next/link"
import { TreePine } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-background font-bold text-xl mb-4">
              <TreePine className="h-6 w-6" />
              OWR Reserve
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              Dedicated to the preservation of the Okapi Wildlife Reserve and its unique biological and cultural heritage.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-background mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-background/60 hover:text-background text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#comparison" className="text-background/60 hover:text-background text-sm transition-colors">
                  Comparison Data
                </Link>
              </li>
              <li>
                <Link href="#data" className="text-background/60 hover:text-background text-sm transition-colors">
                  Data Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-background mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.globalforestwatch.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-background text-sm transition-colors"
                >
                  Global Forest Watch
                </a>
              </li>
              <li>
                <a 
                  href="https://whc.unesco.org/en/list/718" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-background text-sm transition-colors"
                >
                  UNESCO World Heritage
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Okapi Wildlife Reserve Analysis Project. Data powered by Global Forest Watch.
          </p>
        </div>
      </div>
    </footer>
  )
}
