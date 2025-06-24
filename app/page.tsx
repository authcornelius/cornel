import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import { connectToDatabase } from "@/lib/db"

export default async function Home() {
  const { client, db } = await connectToDatabase()
  
  const experiencesCollection = db.collection("experiences")
  const experiences = await experiencesCollection.find().toArray()  

  const projectsCollection = db.collection("projects")
  const projects = await projectsCollection.find().toArray()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-indigo-100/50">
      <Navigation />
      <Hero />
      <About />
      <Experience experiencesData={experiences} />
      <Skills />
      <Projects projectsData={projects} />
      <Contact />
    </main>
  )
}
