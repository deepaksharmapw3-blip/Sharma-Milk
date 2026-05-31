"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle, Copy, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

type Step = "cart" | "checkout" | "success"

export function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart()
  const [step, setStep] = useState<Step>("cart")
  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            sweetId: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          total,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to place order")
      setOrderId(data._id)
      clearCart()
      setStep("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyId = () => {
    if (!orderId) return
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => { setStep("cart"); setError(null) }, 300)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(v) => { if (!v) handleClose(); else setIsOpen(true) }}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col gap-0 p-0 bg-[#FFFDF7] border-l border-[#E2D5B8]">
        
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between border-b border-[#E2D5B8] px-5 py-4">
          <SheetTitle className="font-serif text-xl font-bold text-[#2C1810]">
            {step === "cart" && `Your Cart ${count > 0 ? `(${count})` : ""}`}
            {step === "checkout" && "Checkout"}
            {step === "success" && "Order Placed! 🎉"}
          </SheetTitle>
          <button onClick={handleClose} className="rounded-full p-1.5 text-[#7A5C44] transition hover:bg-[#F5EBD4]">
            <X className="h-5 w-5" />
          </button>
        </SheetHeader>

        {/* ── CART STEP ── */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EBD4]">
                    <ShoppingBag className="h-10 w-10 text-[#C9A84C]" />
                  </div>
                  <p className="text-lg font-semibold text-[#2C1810]">Your cart is empty</p>
                  <p className="text-sm text-[#7A5C44]">Add some delicious sweets to get started!</p>
                  <Button onClick={handleClose} className="rounded-full bg-gradient-to-r from-[#C0392B] to-[#8B0000] px-6 text-white">
                    Browse Sweets
                  </Button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="mb-3 flex items-center gap-4 rounded-2xl border border-[#E2D5B8] bg-white p-3 shadow-sm"
                    >
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-[#F5EBD4]">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">🍬</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-semibold text-[#2C1810]">{item.name}</p>
                        <p className="text-sm font-bold text-[#C0392B]">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full border border-[#E2D5B8] bg-[#F5EBD4]">
                          <button onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[#C0392B] transition hover:bg-[#C0392B] hover:text-white">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[20px] text-center text-sm font-bold text-[#2C1810]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[#C0392B] transition hover:bg-[#C0392B] hover:text-white">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7A5C44] transition hover:bg-red-100 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#E2D5B8] bg-white px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-base font-medium text-[#7A5C44]">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-[#C0392B]">₹{total}</span>
                </div>
                <Button onClick={() => setStep("checkout")}
                  className="w-full rounded-full bg-gradient-to-r from-[#C0392B] to-[#8B0000] py-6 text-base font-bold text-[#F5D76E] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
                  Proceed to Checkout →
                </Button>
              </div>
            )}
          </>
        )}

        {/* ── CHECKOUT STEP ── */}
        {step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* Order summary */}
              <div className="mb-5 rounded-2xl border border-[#E2D5B8] bg-white p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#C9A84C]">Order Summary</p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1 text-sm">
                    <span className="text-[#7A5C44]">{item.name} × {item.quantity}</span>
                    <span className="font-semibold text-[#2C1810]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="mt-3 flex justify-between border-t border-[#E2D5B8] pt-3">
                  <span className="font-bold text-[#2C1810]">Total</span>
                  <span className="font-serif text-lg font-bold text-[#C0392B]">₹{total}</span>
                </div>
              </div>

              {/* Customer form */}
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid gap-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">Your Details</p>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-[#2C1810]">Full Name *</span>
                  <Input name="name" value={form.name} onChange={handleChange} required
                    placeholder="Rahul Sharma"
                    className="border-[#E2D5B8] bg-white focus:border-[#C0392B] focus:ring-[#C0392B]/20" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-[#2C1810]">Phone Number *</span>
                  <Input name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+91 98765 43210" type="tel"
                    className="border-[#E2D5B8] bg-white focus:border-[#C0392B] focus:ring-[#C0392B]/20" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-[#2C1810]">Email (optional)</span>
                  <Input name="email" value={form.email} onChange={handleChange}
                    placeholder="rahul@example.com" type="email"
                    className="border-[#E2D5B8] bg-white focus:border-[#C0392B] focus:ring-[#C0392B]/20" />
                </label>
                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>
                )}
              </form>
            </div>

            <div className="border-t border-[#E2D5B8] bg-white px-5 py-4 flex gap-3">
              <Button variant="outline" onClick={() => setStep("cart")}
                className="flex-1 rounded-full border-[#E2D5B8] text-[#7A5C44] hover:border-[#C9A84C]">
                ← Back
              </Button>
              <Button type="submit" form="checkout-form" disabled={loading}
                className="flex-1 rounded-full bg-gradient-to-r from-[#C0392B] to-[#8B0000] py-6 font-bold text-[#F5D76E] shadow-lg transition-all hover:scale-[1.02] disabled:opacity-60">
                {loading ? "Placing Order..." : "Place Order 🎉"}
              </Button>
            </div>
          </>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl">
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>

            <div>
              <h3 className="mb-1 font-serif text-2xl font-bold text-[#2C1810]">Order Confirmed!</h3>
              <p className="text-[#7A5C44]">Your sweets are being prepared with love 🍬</p>
            </div>

            {orderId && (
              <div className="w-full rounded-2xl border border-[#E2D5B8] bg-white p-4 shadow-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#C9A84C]">Your Order ID</p>
                <div className="flex items-center gap-2 rounded-xl bg-[#F5EBD4] px-3 py-2">
                  <p className="flex-1 truncate font-mono text-sm font-bold text-[#2C1810]">{orderId}</p>
                  <button onClick={handleCopyId}
                    className="flex-shrink-0 rounded-lg p-1.5 text-[#C0392B] transition hover:bg-[#C0392B] hover:text-white">
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-[#7A5C44]">Save this ID to track your order</p>
              </div>
            )}

            <div className="flex w-full flex-col gap-3">
              <Button onClick={() => { handleClose(); document.getElementById("track-order")?.scrollIntoView({ behavior: "smooth" }) }}
                className="w-full rounded-full bg-gradient-to-r from-[#C0392B] to-[#8B0000] py-5 font-bold text-[#F5D76E]">
                Track My Order
              </Button>
              <Button variant="outline" onClick={handleClose}
                className="w-full rounded-full border-[#E2D5B8] text-[#7A5C44] hover:border-[#C9A84C]">
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
