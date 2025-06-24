"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Wrench } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      skills: [
        { name: "React", level: "Expert" },
        { name: "Next.js", level: "Advanced" },
        { name: "React Native", level: "Expert" },
        { name: "TypeScript", level: "Expert" },
        { name: "Redux.js", level: "Advanced" },
        { name: "TanStack", level: "Advanced" },
        { name: "Tailwind CSS", level: "Expert" },
      ],
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: [
        { name: "Node.js", level: "Expert" },
        { name: "Express.js", level: "Expert" },
        { name: "Nest.js", level: "Expert" },
        { name: "Python", level: "Advanced" },
        { name: "Django", level: "Advanced" },
        { name: "RESTful APIs", level: "Expert" },
        { name: "GraphQL", level: "Intermediate" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "AWS", level: "Advanced" },
        { name: "Docker", level: "Advanced" },
        { name: "Kubernetes", level: "Intermediate" },
        { name: "CI/CD", level: "Advanced" },
        { name: "Linux", level: "Advanced" },
      ],
    },
    {
      title: "Tools & Databases",
      icon: Wrench,
      skills: [
        { name: "PostgreSQL", level: "Advanced" },
        { name: "MongoDB", level: "Advanced" },
        { name: "Redis", level: "Intermediate" },
        { name: "Git", level: "Expert" },
        { name: "Jest", level: "Advanced" },
        { name: "Webpack", level: "Advanced" },
      ],
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200"
      case "Advanced":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200"
      case "Intermediate":
        return "bg-amber-100 text-amber-700 border border-amber-200"
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200"
    }
  }

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100/40 via-slate-100 to-purple-100/30 lg:items-center"
    >
      <div className="mt-16 lg:mt-20">
        <div className="mx-auto container lg:h-screen">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Technical Skills</h2>
            <p className="text-xl text-slate-600">Comprehensive expertise across the full technology stack</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className="bg-slate-50/80 border-slate-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <category.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">{skill.name}</span>
                        <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
