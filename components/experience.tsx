"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"
import { ExperienceType } from "@/.next/constants/types"

export default function Experience({ experiencesData }: { experiencesData: ExperienceType[] }) {
    const sortedExperiences = experiencesData.sort((a, b) => {
      // Handle end date comparison - fix the logic here
      const aEnd = a.end === "Present" ? new Date() : new Date(a.end)
      const bEnd = b.end === "Present" ? new Date() : new Date(b.end)
      
      // Sort by end date first (most recent first)
      if (aEnd.getTime() !== bEnd.getTime()) {
        return bEnd.getTime() - aEnd.getTime()
      }
      
      // If end dates are equal, sort by start date (most recent first)
      return new Date(b.start).getTime() - new Date(a.start).getTime()
    })

  // Transform the data to match the expected format for rendering
  const experiences = sortedExperiences.map((experience) => ({
    title: experience.position,
    company: experience.company,
    period: `${experience.start.split(',')[1]?.trim() || experience.start} - ${experience.end.split(',')[1]?.trim() || experience.end}`,
    location: experience.location,
    description: experience.description
      .split('\n') // Split by newline characters
      .map(item => item.trim()) // Remove extra whitespace
      .filter(item => item.length > 0), // Remove empty strings
    technologies: experience.technologies
  }))

  return (
    <section
      id="experience"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-indigo-100/20 to-gray-100"
    >
      <div className="mt-16 lg:mt-20">
        <div className="mx-auto container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Professional Experience</h2>
            <p className="text-xl text-slate-600">
              A track record of delivering impactful solutions across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <Card
                key={experiencesData[index]._id}
                className="bg-slate-50/80 border-slate-200 hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-slate-800">{exp.title}</CardTitle>
                      <CardDescription className="flex items-center text-slate-600 mt-1">
                        <Building className="w-4 h-4 mr-2" />
                        {exp.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{exp.location}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-slate-700 flex items-start">
                        <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-100/15 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
