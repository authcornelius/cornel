"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Target } from "lucide-react"

export default function About() {
  const stats = [
    {
      icon: Clock,
      value: "8+",
      label: "Years Experience",
    },
    {
      icon: Target,
      value: "20+",
      label: "Projects Completed",
    },
    {
      icon: Users,
      value: "10+",
      label: "Team Collaborations",
    },
    {
      icon: Award,
      value: "5+",
      label: "Certifications",
    },
  ]

  return (
    <section
      id="about"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-200/50 via-gray-100 to-purple-100/30 lg:flex lg:items-center lg:h-screen"
    >
      <div className="mx-auto container mt-16 lg:mt-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">About Me</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A dedicated professional, committed to delivering exceptional software solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="prose prose-lg text-slate-700">
              <p className="text-lg leading-relaxed mb-6">
                I am a seasoned Full Stack Developer with over 8 years of experience in designing and developing robust
                web and mobile applications. My expertise spans across modern JavaScript frameworks, backend technologies, and
                cloud infrastructure.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Throughout my career, I have successfully led development teams, architected scalable solutions, and
                delivered projects that have significantly improved business operations and user experiences. I am
                passionate about writing clean, maintainable code and staying current with industry best practices.
              </p>
              <p className="text-lg leading-relaxed">
                My approach combines technical expertise with strong communication skills, enabling me to bridge the gap
                between complex technical concepts and business objectives effectively.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center bg-slate-50/80 border-slate-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                    <stat.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
