"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Search, MapPin, Phone, MessageCircle, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const orderStatuses = [
  { step: 1, label: "Confirmed", icon: CheckCircle },
  { step: 2, label: "Preparing", icon: Package },
  { step: 3, label: "On the way", icon: Truck },
  { step: 4, label: "Delivered", icon: MapPin },
]

const statusDetails: Record<number, { title: string; desc: string; icon: any }> = {
  0: { title: "Your order is confirmed", desc: "The shop has accepted your order and will start preparing it soon.", icon: CheckCircle },
  1: { title: "Your order is being prepared", desc: "Fresh sweets are being selected and packed with care.", icon: Package },
  2: { title: "Your order is on the way", desc: "Our delivery partner is bringing your sweets to your doorstep.", icon: Truck },
  3: { title: "Your order has been delivered", desc: "Sweets have been delivered. Enjoy your delicious treats!", icon: MapPin },
}

const getStatusIndex = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
    case "confirmed":
      return 0
    case "preparing":
      return 1
    case "shipped":
    case "on the way":
      return 2
    case "delivered":
      return 3
    default:
      return 0
  }
}

export function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderData, setOrderData] = useState<any>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setLoading(true)
    setError(null)
    setOrderData(null)
    setIsTracking(false)

    try {
      const response = await fetch(`${API_URL}/orders/track/${orderNumber.trim()}`)
      if (response.status === 404) {
        throw new Error("Order not found. Please verify the order ID.")
      }
      if (!response.ok) {
        throw new Error("Could not retrieve order details. Please try again.")
      }
      const data = await response.json()
      setOrderData(data)
      setIsTracking(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const activeIndex = orderData ? getStatusIndex(orderData.status) : 0
  const currentStatusCard = statusDetails[activeIndex] || statusDetails[0]

  return (
    <section id="track-order" className="relative bg-gradient-to-b from-[#FFF8E7] to-[#FFF5E1] py-12 md:py-16 dark:from-background dark:to-background">
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
          <Card className="mb-4 overflow-hidden rounded-2xl border-0 shadow-xl dark:bg-card">
            <CardContent className="p-0">
              <form onSubmit={handleTrack} className="flex items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4AF37]" />
                  <Input
                    type="text"
                    placeholder="Enter order ID (e.g., 64bf3de514a6bb4979e2c602)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="h-14 rounded-none border-0 bg-white dark:bg-card pl-12 text-base focus-visible:ring-0"
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 rounded-none bg-gradient-to-r from-[#B22222] to-[#8B0000] px-8 text-base font-semibold text-white hover-shine-effect disabled:opacity-75"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Track"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          </motion.div>

          {/* Seeded codes helper */}
          <div className="mb-6 text-center text-xs text-[#8B6914]/80">
            <p>Try searching one of these seeded order IDs:</p>
            <div className="mt-1.5 flex flex-wrap justify-center gap-2">
              <button className="cursor-pointer rounded bg-[#FFF8E7] dark:bg-amber-950/20 px-2.5 py-1 font-mono text-foreground hover:bg-[#FFE4B5] transition-colors" onClick={() => setOrderNumber("64bf3de514a6bb4979e2c601")}>64bf3de514a6bb4979e2c601 (Pending)</button>
              <button className="cursor-pointer rounded bg-[#FFF8E7] dark:bg-amber-950/20 px-2.5 py-1 font-mono text-foreground hover:bg-[#FFE4B5] transition-colors" onClick={() => setOrderNumber("64bf3de514a6bb4979e2c602")}>64bf3de514a6bb4979e2c602 (Preparing)</button>
              <button className="cursor-pointer rounded bg-[#FFF8E7] dark:bg-amber-950/20 px-2.5 py-1 font-mono text-foreground hover:bg-[#FFE4B5] transition-colors" onClick={() => setOrderNumber("64bf3de514a6bb4979e2c603")}>64bf3de514a6bb4979e2c603 (Shipped)</button>
              <button className="cursor-pointer rounded bg-[#FFF8E7] dark:bg-amber-950/20 px-2.5 py-1 font-mono text-foreground hover:bg-[#FFE4B5] transition-colors" onClick={() => setOrderNumber("64bf3de514a6bb4979e2c604")}>64bf3de514a6bb4979e2c604 (Delivered)</button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-300 animate-in fade-in"
            >
              <div className="flex gap-3 items-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="font-medium text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Order Status Display */}
          {isTracking && orderData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
            <Card className="overflow-hidden rounded-3xl border-0 shadow-xl dark:bg-card">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] p-5 text-white">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm text-white/80">Order Code</p>
                    <p className="font-mono text-base font-bold break-all">#{orderData._id || orderData.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">Estimated Delivery</p>
                    <p className="text-lg font-semibold">
                      {orderData.status === 'delivered' ? 'Delivered' : 'Today, 4:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                {/* Progress Steps */}
                <div className="mb-8 mt-2 px-2">
                  <div className="relative flex justify-between">
                    {/* Progress line */}
                    <div className="absolute left-0 right-0 top-5 h-1 bg-[#D4AF37]/20">
                      <div
                        className="h-full bg-gradient-to-r from-[#B22222] to-[#FF9933] transition-all duration-500"
                        style={{ width: `${(activeIndex / (orderStatuses.length - 1)) * 100}%` }}
                      />
                    </div>
                    
                    {orderStatuses.map((status, index) => (
                      <motion.div 
                        key={status.step} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="relative flex flex-col items-center"
                      >
                        <div
                          className={`z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all ${
                            index < activeIndex
                              ? "bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white"
                              : index === activeIndex
                              ? "bg-gradient-to-br from-[#FF9933] to-[#D4AF37] text-white animate-pulse"
                              : "border-2 border-[#D4AF37]/30 bg-white dark:bg-card text-muted-foreground"
                          }`}
                        >
                          <status.icon className="h-5 w-5" />
                        </div>
                        <p className={`mt-2 text-xs font-semibold ${
                          index <= activeIndex ? "text-[#B22222] dark:text-[#E06666]" : "text-muted-foreground"
                        }`}>
                          {status.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Current Status Card */}
                <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#FFF8E7] to-[#FFE4B5]/50 dark:from-amber-950/20 dark:to-orange-950/10 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF9933] to-[#D4AF37] text-white shadow-inner flex-shrink-0">
                      {(() => {
                        const IconComponent = currentStatusCard.icon;
                        return <IconComponent className="h-6 w-6" />;
                      })()}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{currentStatusCard.title}</p>
                      <p className="text-sm text-muted-foreground">{currentStatusCard.desc}</p>
                    </div>
                  </div>
                </div>
                
                {/* Customer Details */}
                <div className="mb-5 rounded-xl bg-muted/40 p-4 text-sm border border-muted dark:bg-muted/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Customer:</span> {orderData.customerName}</p>
                    <p><span className="font-semibold text-foreground">Email:</span> {orderData.customerEmail}</p>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="mb-5 space-y-3">
                  <h4 className="font-semibold text-foreground">Order Summary</h4>
                  {orderData.items && orderData.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-white dark:bg-card p-3 shadow-sm border border-muted">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF8E7] dark:bg-amber-950/10 text-[#D4AF37] flex-shrink-0">
                          <Package className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price} x {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between border-t border-[#D4AF37]/20 pt-3 mt-3">
                    <p className="font-semibold text-foreground">Total Paid</p>
                    <p className="text-lg font-bold text-[#B22222] dark:text-[#E06666]">₹{orderData.total}</p>
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
