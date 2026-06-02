"use client"

import { useState } from "react"
import { API_URL } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Send, CheckCircle, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { FloatingElement } from "@/components/floating-element"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 9836595791",
    action: "tel:+919876543210",
    color: "from-[#B22222] to-[#8B0000]",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Quick Response",
    action: "https://wa.me/919876543210",
    color: "from-[#25D366] to-[#128C7E]",
  },
  {
    icon: MapPin,
    title: "Visit Shop",
    value: "Kolkata, India",
    action: "#",
    color: "from-[#FF9933] to-[#D4AF37]",
  },
  {
    icon: Clock,
    title: "Open Hours",
    value: "8AM - 10PM",
    action: "#",
    color: "from-[#D4AF37] to-[#B8860B]",
  },
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send message')
      setIsSubmitted(true)
      setFormData({ name: "", phone: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative bg-gradient-to-b from-[#3D2914] to-[#2A1E10] py-12 md:py-16">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="festive-pattern h-full w-full" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]" />
            Get in Touch
            <span className="h-px w-6 bg-[#D4AF37]" />
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
            Contact <span className="text-[#D4AF37]">Us</span>
          </h2>
          <p className="mt-2 text-[#FFF8E7]/70">
            Have questions or want to place a bulk order? We&apos;re here to help!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Methods */}
          <div className="flex flex-col gap-6">
            {/* Quick Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur transition-all hover:bg-white/10"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${method.color} shadow-lg`}>
                    <method.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#FFF8E7]/60">{method.title}</p>
                    <p className="font-semibold text-white">{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Map / Location Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-1 overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#FFF8E7]/5 to-transparent p-6"
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <FloatingElement yOffset={8}>
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#B22222]/20 to-[#FF9933]/20">
                  <MapPin className="h-10 w-10 text-[#D4AF37]" />
                </div>
                </FloatingElement>
                <h3 className="font-serif text-xl font-bold text-white">Visit Our Shop</h3>
                <p className="mt-2 text-[#FFF8E7]/70">
                  Shop No. 2, Dacres Lane
                  <br />
                  3, Esplanade East, Kolkata
                  <br />
                  West Bengal 700069
                </p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-full border-[#D4AF37]/40 bg-transparent text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  Get Directions
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <Card className="overflow-hidden rounded-3xl border-0 shadow-2xl">
            <CardContent className="p-6 md:p-8">
              <h3 className="mb-6 font-serif text-xl font-bold text-[#B22222]">
                Send us a Message
              </h3>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#B22222]/10 to-[#FF9933]/10">
                    <CheckCircle className="h-10 w-10 text-[#B22222]" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#B22222]">
                    Message Sent!
                  </h4>
                  <p className="mt-2 text-muted-foreground">
                    We&apos;ll get back to you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 rounded-xl border-[#D4AF37]/30 bg-[#FFF8E7]/50 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone / WhatsApp
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9836595791"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 rounded-xl border-[#D4AF37]/30 bg-[#FFF8E7]/50 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your order or inquiry..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-xl border-[#D4AF37]/30 bg-[#FFF8E7]/50 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 gap-2 rounded-xl bg-gradient-to-r from-[#B22222] to-[#8B0000] text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover-shine-effect"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                  
                  {/* WhatsApp Quick Button */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#D4AF37]/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-3 text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <a
                    href="https://wa.me/919876543210?text=Hi, I want to place an order"
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] font-semibold text-white transition-all hover:bg-[#128C7E] hover-shine-effect"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Order via WhatsApp
                  </a>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
