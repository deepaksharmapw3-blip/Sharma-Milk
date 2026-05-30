"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Search, MapPin, Phone, MessageCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const STATUS_STEPS = [
  { key: "pending",    label: "Confirmed",   icon: CheckCircle },
  { key: "preparing",  label: "Preparing",   icon: Package },
  { key: "on_the_way", label: "On the way",  icon: Truck },
  { key: "delivered",  label: "Delivered",   icon: MapPin },
]

function getStepIndex(status: string) {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status)
  return idx === -1 ? 0 : idx
}

function formatTime(dateStr: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("")
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = orderNumber.trim()
    if (!id) return
    setLoading(true)
    setError(null)
    setOrder(null)
    try {
      const res = await fetch(`${API_URL}/orders/${id}`)
      if (res.status === 404) {
        setError("Order not found. Please check your order ID and try again.")
        return
      }
      if (!res.ok) throw new Error("Failed to fetch order")
      const data = await res.json()
      setOrder(data)
    } catch (err) {
      setError("Could not connect to the server. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const currentStep = order ? getStepIndex(order.status) : 0

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
              Enter your order ID to see real-time delivery status
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
                      placeholder="Enter your Order ID"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="h-14 rounded-none border-0 bg-white pl-12 text-base focus-visible:ring-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-14 rounded-none bg-gradient-to-r from-[#B22222] to-[#8B0000] px-8 text-base font-semibold text-white hover-shine-effect"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Track"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {/* Order Status Display */}
          {order && (
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
                      <p className="text-sm text-white/80">Order ID</p>
                      <p className="font-serif text-lg font-bold break-all">{order._id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80">Status</p>
                      <p className="text-lg font-semibold capitalize">{order.status?.replace("_", " ")}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Progress Steps */}
                  <div className="mb-6">
                    <div className="relative flex justify-between">
                      <div className="absolute left-0 right-0 top-5 h-1 bg-[#D4AF37]/20">
                        <div
                          className="h-full bg-gradient-to-r from-[#B22222] to-[#FF9933] transition-all duration-500"
                          style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
                        />
                      </div>
                      {STATUS_STEPS.map((status, index) => (
                        <motion.div
                          key={status.key}
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
                          <p className={`mt-2 text-xs font-medium ${index <= currentStep ? "text-[#B22222]" : "text-muted-foreground"}`}>
                            {status.label}
                          </p>
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
                        <p className="font-semibold text-foreground capitalize">
                          {order.status === "pending" && "Your order has been placed"}
                          {order.status === "confirmed" && "Your order is confirmed"}
                          {order.status === "preparing" && "Your order is being prepared"}
                          {order.status === "on_the_way" && "Your order is on the way!"}
                          {order.status === "delivered" && "Your order has been delivered!"}
                        </p>
                        {order.customerName && (
                          <p className="text-sm text-muted-foreground">For: {order.customerName}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Ordered at {formatTime(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="mb-5 space-y-3">
                      <h4 className="font-semibold text-foreground">Order Summary</h4>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                      <div className="flex justify-between rounded-xl bg-[#FFF8E7] px-3 py-2 font-semibold">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>
                  )}

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
