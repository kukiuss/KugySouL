'use client'

import Link from 'next/link'
import { Bot, Github, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                KugySouL
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Ultra premium AI platform that revolutionizes how you work with artificial intelligence. 
              Experience the future of AI assistance with KugySouL's cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-primary transition-colors">
                  Start Chat
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-primary transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link 
                  href="https://github.com/Minatoz997/OpenHands-Backend" 
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link 
                  href="https://minatoz997-backend66.hf.space/docs" 
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="https://openrouter.ai/" 
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  OpenRouter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 KugySouL. Built with{' '}
            <Heart className="inline h-4 w-4 text-red-500" />{' '}
            using Next.js and cutting-edge AI technology.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link 
              href="https://github.com/Minatoz997/OpenHands-Backend" 
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}