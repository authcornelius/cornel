"use client"

import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 lg:h-screen lg:flex lg:items-center container mx-auto">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6">Cornelius Oaikhienan</h1>
            <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Senior Full Stack Developer
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Experienced software engineer with 8+ years of expertise in building scalable web and mobile applications.
              Specialized in React, React-Native, Node.js, and cloud technologies. Passionate about creating efficient, user-centric
              solutions that drive business growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-slate-600">
                <Mail className="w-5 h-5 mr-3 text-indigo-600" />
                <span>corneliusedos@email.com</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Phone className="w-5 h-5 mr-3 text-indigo-600" />
                <span>+234 811 391 7521</span>
              </div>
              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-indigo-300"
              >
                View My Work
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Link href="http://www.linkedin.com/in/cornelius-edokpiahawe-oaikhienan" target="_blank">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="https://github.com/authcornelius" target="_blank">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600">
                  <Github className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Professional Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-slate-100 shadow-2xl">
                <Image
                  src="/cornel.jpg"
                  alt="Cornelius Oaikhienan - Full Stack Developer"
                  width={400}
                  height={400}
                  className="w-full h-full object-fill"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
