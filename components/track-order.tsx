"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Search, MapPin, Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const orderStatuses = [
  { step: 1, label: "Confirmed", icon: CheckCircle, time: "2:30 PM" },
  { step: 2, label: "Preparing", icon: Package, time: "2:45 PM" },
  { step: 3, label: "On the way", icon: Truck, time: "3:15 PM" },
  { step: 4, label: "Delivered", icon: MapPin, time: "Est. 4:00 PM" },
]

export function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const currentStep = 2 // Simulating current status

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderNumber.trim()) {
      setIsTracking(true)
    }
  }

  return (
    <section id="track-order" className="relative bg-gradient-to-b from-[#FFF8E7] to-[#FFF5E1] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              <span className="h-px w-6 bg-[#D4AF37]" />
              Live Tracking
              <span className="h-px w-6 bg-[#D4AF37]" />
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Track Your <span className="text-[#B22222]">Order</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Enter your order number to see real-time delivery status
            </p>
          </div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          <Card className="mb-6 overflow-hidden rounded-2xl border-0 shadow-xl">
            <CardContent className="p-0">
              <form onSubmit={handleTrack} className="flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4AF37]" />
                  <Input
                    type="text"
                    placeholder="Enter order number (e.g., SM-12345)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="h-14 rounded-none border-0 bg-white pl-12 text-base focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 rounded-none bg-gradient-to-r from-[#B22222] to-[#8B0000] px-8 text-base font-semibold text-white hover-shine-effect"
                >
                  Track
                </Button>
              </form>
            </CardContent>
          </Card>
          </motion.div>

          {/* Order Status Display */}
          {isTracking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
            <Card className="overflow-hidden rounded-3xl border-0 shadow-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Order</p>
                    <p className="font-serif text-xl font-bold">#{orderNumber || "SM-12345"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">Estimated Delivery</p>
                    <p className="text-lg font-semibold">Today, 4:00 PM</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                {/* Progress Steps */}
                <div className="mb-6">
                  <div className="relative flex justify-between">
                    {/* Progress line */}
                    <div className="absolute left-0 right-0 top-5 h-1 bg-[#D4AF37]/20">
                      <div
                        className="h-full bg-gradient-to-r from-[#B22222] to-[#FF9933] transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (orderStatuses.length - 1)) * 100}%` }}
                      />
                    </div>
                    
                    {orderStatuses.map((status, index) => (
                      <motion.div 
                        key={status.step} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="relative flex flex-col items-center"
                      >
                        <div
                          className={`z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all ${
                            index < currentStep
                              ? "bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white"
                              : index === currentStep
                              ? "bg-gradient-to-br from-[#FF9933] to-[#D4AF37] text-white"
                              : "border-2 border-[#D4AF37]/30 bg-white text-muted-foreground"
                          }`}
                        >
                          <status.icon className="h-5 w-5" />
                        </div>
                        <p className={`mt-2 text-xs font-medium ${
                          index <= currentStep ? "text-[#B22222]" : "text-muted-foreground"
                        }`}>
                          {status.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{status.time}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Current Status Card */}
                <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#FFF8E7] to-[#FFE4B5]/50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-[#FF9933] to-[#D4AF37]">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Your order is being prepared</p>
                      <p className="text-sm text-muted-foreground">Fresh sweets are being packed with care</p>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="mb-5 space-y-3">
                  <h4 className="font-semibold text-foreground">Order Summary</h4>
                  <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-[#FFF8E7]">
                        <img
                          src="https://images.unsplash.com/photo-1666190094762-2fae0da07874?w=100&h=100&fit=crop"
                          alt="Kaju Katli"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Kaju Katli Premium</p>
                        <p className="text-sm text-muted-foreground">500g x 1</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">₹599</p>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-[#FFF8E7]">
                        <img
                          src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=100&h=100&fit=crop"
                          alt="Gulab Jamun"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Gulab Jamun</p>
                        <p className="text-sm text-muted-foreground">1kg x 2</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">₹698</p>
                  </div>
                </div>
                
                {/* Contact Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2 rounded-xl border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10">
                    <Phone className="h-4 w-4" />
                    Call Shop
                  </Button>
                  <Button className="flex-1 gap-2 rounded-xl bg-[#25D366] text-white hover:bg-[#128C7E]">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
