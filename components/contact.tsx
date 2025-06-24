"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, MapPin, Phone, Send, Linkedin, Github, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import emailjs from '@emailjs/browser';


export default function Contact() {
  const { toast } = useToast()
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_9c820xf', // your EmailJS service ID
        'template_ge89zwd', // your confirmation email template ID
        {
          from_first_name: form.current?.from_first_name.value,
          from_last_name: form.current?.from_last_name.value,
          from_email: form.current?.from_email.value,
          subject: form.current?.subject.value,
          message: form.current?.message.value,
          time: new Date().toLocaleString(),
        },
        '6iHlS2AzpQSF0seTQ' // your public key
      );

      // Success toast
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base">Message sent successfully!</span>
          </div>
        ),
        description: (
          <div className="mt-2">
            <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 leading-relaxed">
              Thank you for reaching out. I'll get back to you within 1 - 2 business days.
            </p>
            <div className="flex items-center gap-1 sm:gap-2 text-xs text-slate-500">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">Check your email for confirmation</span>
            </div>
          </div>
        ),
        duration: 7000,
        className: "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm shadow-lg animate-slide-in-right max-w-[90vw] sm:max-w-md",
      });
      // Reset form
      form.current?.reset();

    } catch (error) {
      
      // Error toast
      toast({
        title: "Failed to send message ❌",
        description: "Something went wrong. Please try again or contact me directly via email.",
        variant: "destructive",
        duration: 7000,
        className: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-900",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "corneliusedos@email.com",
      href: "mailto:corneliusedos@email.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+234 811 391 7521",
      href: "tel:+2348113917521",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lagos, Nigeria",
      href: "#",
    },
  ]

  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-200/60 via-gray-100 to-indigo-100/50 lg:items-center"
    >
      <div className="mt-16 lg:mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-xl text-slate-600 mx-auto">
              Let's discuss how we can work together to bring your next project to life
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Let's Connect</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects, and potential collaborations.
                Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from
                you.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                      <info.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-medium">{info.title}</h4>
                      <a href={info.href} className="text-slate-600 hover:text-indigo-600 transition-colors duration-200">
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-slate-800 font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <Link href="http://www.linkedin.com/in/cornelius-edokpiahawe-oaikhienan" target="_blank">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-slate-300 text-slate-600 hover:text-indigo-600 hover:border-indigo-300"
                    >
                        <Linkedin className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Link href="https://github.com/authcornelius" target="_blank">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-slate-300 text-slate-600 hover:text-indigo-600 hover:border-indigo-300"
                    >
                      <Github className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <Card className="bg-slate-50/80 border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800">Send a Message</CardTitle>
                <CardDescription className="text-slate-600">
                  Fill out the form below and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="from_first_name"
                        placeholder="John"
                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="from_last_name"
                        placeholder="Doe"
                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="from_email"
                      type="email"
                      placeholder="john@company.com"
                      className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-700">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Discussion"
                      className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project requirements..."
                      rows={5}
                      className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 pt-8 border-t border-slate-200">
        <p className="text-slate-500">© {new Date().getFullYear()} Cornelius Oaikhienan. All rights reserved.</p>
      </div>
    </section>
  )
}
