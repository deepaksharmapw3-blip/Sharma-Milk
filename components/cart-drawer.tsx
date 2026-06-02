"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/context/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle, Copy, X, Smartphone, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { API_URL, RAZORPAY_KEY_ID } from "@/lib/config"

type Step = "cart" | "checkout" | "payment" | "success"

// Dynamically load Razorpay checkout script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart()
  const [step, setStep] = useState<Step>("cart")
  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  // Step 1: Save order to DB, then move to payment step
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
      setStep("payment")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Create Razorpay order and open UPI popup
  const handleRazorpayPayment = async () => {
    if (!orderId) return
    setPaymentLoading(true)
    setError(null)
    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error("Failed to load payment gateway. Check your internet connection.")

      // Create Razorpay order on backend
      const res = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, orderId }),
      })
      const orderData = await res.json()
      if (!res.ok) throw new Error(orderData.error || "Failed to initiate payment")

      // Open Razorpay UPI popup
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Sharma Milk & Sweets",
        description: `Order #${orderId.slice(-6).toUpperCase()}`,
        image: "/logo.png",
        order_id: orderData.razorpayOrderId,
        method: { upi: true, card: false, netbanking: false, wallet: false, emi: false },
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email || "",
          method: "upi",
        },
        theme: { color: "#C0392B" },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false)
            setError("Payment was cancelled. Please try again.")
          },
        },
        handler: async (response: any) => {
          // Verify payment on backend
          try {
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shopOrderId: orderId,
              }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error("Payment verification failed. Contact support.")
            }
            setPaymentId(response.razorpay_payment_id)
            clearCart()
            setStep("success")
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed")
          } finally {
            setPaymentLoading(false)
          }
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", (response: any) => {
        setPaymentLoading(false)
        setError(`Payment failed: ${response.error.description}`)
      })
      rzp.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
      setPaymentLoading(false)
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
            {step === "payment" && "Pay with UPI"}
            {step === "success" && "Order Confirmed! 🎉"}
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
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : "Continue to Pay →"}
              </Button>
            </div>
          </>
        )}

        {/* ── PAYMENT STEP ── */}
        {step === "payment" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* UPI illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col items-center gap-4 rounded-3xl border border-[#E2D5B8] bg-white p-6 text-center shadow-sm"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#6C3BF5] to-[#4A2CC0] shadow-lg">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2C1810]">Pay with UPI</h3>
                  <p className="mt-1 text-sm text-[#7A5C44]">Use any UPI app — GPay, PhonePe, Paytm, BHIM</p>
                </div>

                {/* UPI app logos */}
                <div className="flex items-center gap-4">
                  {[
                    { name: "GPay", bg: "from-[#4285F4] to-[#0F9D58]", text: "G" },
                    { name: "PhonePe", bg: "from-[#5F259F] to-[#8B2FC9]", text: "P" },
                    { name: "Paytm", bg: "from-[#00BAF2] to-[#0078B6]", text: "₹" },
                    { name: "BHIM", bg: "from-[#F26522] to-[#C0392B]", text: "B" },
                  ].map((app) => (
                    <div key={app.name} className="flex flex-col items-center gap-1">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${app.bg} text-sm font-bold text-white shadow-sm`}>
                        {app.text}
                      </div>
                      <span className="text-xs text-[#7A5C44]">{app.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Amount card */}
              <div className="mb-5 rounded-2xl border border-[#E2D5B8] bg-[#FFF8E7] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">Amount to Pay</p>
                    <p className="font-serif text-3xl font-bold text-[#C0392B]">₹{total}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7A5C44]">Order ID</p>
                    <p className="font-mono text-xs font-bold text-[#2C1810]">#{orderId?.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="mb-5 rounded-2xl border border-[#E2D5B8] bg-white p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#C9A84C]">How it works</p>
                {[
                  { step: "1", text: "Click \"Pay Now\" below" },
                  { step: "2", text: "Enter your UPI ID or scan QR code" },
                  { step: "3", text: "Approve payment in your UPI app" },
                  { step: "4", text: "Order confirmed instantly!" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3 py-1.5">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#C0392B] text-xs font-bold text-white">
                      {s.step}
                    </div>
                    <p className="text-sm text-[#7A5C44]">{s.text}</p>
                  </div>
                ))}
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>
              )}
            </div>

            <div className="border-t border-[#E2D5B8] bg-white px-5 py-4 flex gap-3">
              <Button variant="outline" onClick={() => setStep("checkout")}
                className="flex-1 rounded-full border-[#E2D5B8] text-[#7A5C44] hover:border-[#C9A84C]">
                ← Back
              </Button>
              <Button onClick={handleRazorpayPayment} disabled={paymentLoading}
                className="flex-1 rounded-full bg-gradient-to-r from-[#6C3BF5] to-[#4A2CC0] py-6 font-bold text-white shadow-lg transition-all hover:scale-[1.02] disabled:opacity-60">
                {paymentLoading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Opening UPI...</>
                  : <>🔒 Pay ₹{total} Now</>}
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
              <h3 className="mb-1 font-serif text-2xl font-bold text-[#2C1810]">Payment Successful!</h3>
              <p className="text-[#7A5C44]">Your sweets are being prepared with love 🍬</p>
            </div>

            {paymentId && (
              <div className="w-full rounded-2xl border border-green-200 bg-green-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-green-700">Payment ID</p>
                <p className="mt-1 font-mono text-xs text-green-800 break-all">{paymentId}</p>
              </div>
            )}

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
