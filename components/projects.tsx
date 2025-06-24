"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface ProjectType {
  _id: string
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  imageUrl: string
  featured: boolean
  status: string
  createdAt: Date
  updatedAt: Date
}


export default function Projects({projectsData}: {projectsData: ProjectType[]}) {

  console.log("Test: ", projectsData);
  
  const projects = [
    {
      title: "Enterprise E-Commerce Platform",
      description:
        "Scalable e-commerce solution handling millions of transactions with advanced inventory management, payment processing, and analytics dashboard.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
      features: ["Multi-vendor support", "Real-time inventory", "Advanced analytics", "Mobile responsive"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Production",
    },
    {
      title: "Healthcare Management System",
      description:
        "Comprehensive healthcare platform for patient management, appointment scheduling, and medical records with HIPAA compliance.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Vue.js", "Express", "MongoDB", "Docker", "JWT"],
      features: ["Patient portal", "Appointment system", "Medical records", "HIPAA compliant"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Production",
    },
    {
      title: "Financial Analytics Dashboard",
      description:
        "Real-time financial data visualization platform with advanced charting, portfolio tracking, and automated reporting capabilities.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "Python", "FastAPI", "Redis", "Chart.js"],
      features: ["Real-time data", "Custom dashboards", "Automated reports", "Portfolio tracking"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Production",
    },
    {
      title: "Project Management Tool",
      description:
        "Collaborative project management application with team coordination, task tracking, and progress visualization features.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "Socket.io", "MySQL", "AWS"],
      features: ["Team collaboration", "Task management", "Progress tracking", "File sharing"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Development",
    },
  ]

  return (
    <section
      id="projects"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 via-slate-100/80 to-indigo-100/30 lg:items-center"
    >
      <div className="mt-16 lg:mt-20">
        <div className="mx-auto container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600">
              A selection of impactful projects demonstrating technical expertise and business value
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="bg-slate-50/80 border-slate-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={
                        project.status === "Production"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">{project.title}</CardTitle>
                  <CardDescription className="text-slate-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Key Features:</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 text-xs border border-slate-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-indigo-300"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || <div>No projects found.</div>}
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-purple-100/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-100/10 to-transparent rounded-full blur-2xl"></div>
      </div>
    </section>
  )
}
