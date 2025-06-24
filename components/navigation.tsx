"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, PlusCircle, X } from "lucide-react"
import Link from "next/link"
import PostModal from "@/components/postModal"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loginUser, setLoginUser] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user && user.token) {
      setLoginUser(user.token)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-50/95 backdrop-blur-sm shadow-sm border-b border-slate-200" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:container">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <Link href="#home" className="">
                Cornelius Oaikhienan
              </Link>
            </div>

            {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
                Download CV
              </Button>

              {loginUser && (
                <div className="flex items-center space-x-4">
                  <PlusCircle 
                    className="w-6 h-6 text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer" 
                    onClick={() => setIsModalOpen(true)}
                  />

                  <button 
                    className="bg-transparent text-slate-600 hover:text-indigo-600 transition-colors duration-200 font-medium cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Menu
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-6 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Plus Icon for logged in users */}
            {loginUser && (
              <div className="px-6 py-3 border-t border-slate-200 mt-4">
                <div 
                  className="flex items-center space-x-3 text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true)
                    setIsOpen(false)
                  }}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span className="font-medium">Add Content</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Download CV Button */}
          <div className="p-6 border-t border-slate-200">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
              Download CV
            </Button>
            
            {/* Mobile Logout for logged in users */}
            {loginUser && (
              <Button 
                variant="outline" 
                className="w-full mt-3 text-slate-600 hover:text-indigo-600"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Post Modal */}
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

