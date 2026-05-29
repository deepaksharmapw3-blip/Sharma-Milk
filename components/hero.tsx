"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Truck, Clock, Shield, Sparkles as SparkleIcon } from "lucide-react"
import Link from "next/link"
import { Sparkles } from "@/components/sparkles"
import { FloatingElement } from "@/components/floating-element"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const quickCategories = [
  { name: "Kaju Katli", emoji: "✨" },
  { name: "Ladoo", emoji: "🟡" },
  { name: "Gulab Jamun", emoji: "🍯" },
  { name: "Gift Boxes", emoji: "🎁" },
  { name: "Festival Special", emoji: "🪔" },
]

const festiveTicker = [
  "🪔 Diwali Collection Live",
  "💍 Wedding Hampers",
  "🎀 Raksha Bandhan Gifts",
  "🌸 Pure Desi Ghee",
  "🏆 Award-Winning Since 1980",
  "🚚 Free Delivery ₹999+",
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-[#FDF6E3] via-[#FFF3D4] to-[#FDF6E3]">
      <Sparkles count={50} />

      {/* === FESTIVE PATTERN BACKGROUND === */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 festive-pattern opacity-100"
      />

      {/* === CINEMATIC AMBIENT GLOWS === */}
      <div className="absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#E8871A]/25 via-[#C9A84C]/15 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#C0392B]/15 via-[#E8871A]/10 to-transparent blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#C9A84C]/8 to-transparent blur-2xl" />

      {/* === FESTIVE TICKER BANNER === */}
      <div className="relative overflow-hidden border-b border-[#C9A84C]/30 bg-gradient-to-r from-[#C0392B] via-[#8B1A1A] to-[#C0392B] py-2">
        <div className="ticker flex gap-16 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-[#F5D76E]">
          {[...festiveTicker, ...festiveTicker].map((item, i) => (
            <span key={i} className="flex items-center gap-2">{item}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ===== LEFT — TEXT CONTENT ===== */}
          <motion.div style={{ y: textY }} className="flex flex-col items-start gap-5">

            {/* Festive Badge Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="festive-badge inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/40 bg-white/80 px-3 py-1.5 text-sm shadow-md backdrop-blur">
                <Star className="h-4 w-4 fill-[#E8871A] text-[#E8871A]" />
                <span className="font-bold text-[#2C1810]">4.9</span>
                <span className="text-[#7A5C44]">(2.5k+ reviews)</span>
              </span>
              <span className="festive-badge inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C0392B] to-[#8B1A1A] px-4 py-1.5 text-sm font-bold text-[#F5D76E] shadow-md">
                🪔 Diwali Collection Live
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                  Est. 1980 · Kolkata
                </span>
              </div>
              <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-[#2C1810] md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block">India's Finest</span>
                <span className="gold-shimmer block">Mithai &amp; Sweets</span>
                <span className="block text-3xl font-medium text-[#C0392B] md:text-4xl lg:text-5xl">
                  Delivered Fresh 🪔
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md text-base leading-relaxed text-[#7A5C44] md:text-lg"
            >
              Handcrafted with pure desi ghee and age-old recipes — every bite is a
              <span className="font-semibold text-[#C0392B]"> celebration</span>. Perfect for
              Diwali, weddings &amp; everyday moments.
            </motion.p>

            {/* Quick Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {quickCategories.map((cat, i) => (
                <Link
                  key={cat.name}
                  href="#featured"
                  className="ornate-border inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/30 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-[#2C1810] shadow-sm backdrop-blur transition-all duration-200 hover:border-[#C9A84C] hover:bg-[#FFF8E7] hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                size="lg"
                className="group gap-2 rounded-full bg-gradient-to-r from-[#C0392B] via-[#A93226] to-[#7B241C] px-8 py-6 text-base font-bold text-[#F5D76E] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#C0392B]/30 active:scale-95 hover-shine-effect diya-glow"
              >
                Order Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="#track-order">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-[#C9A84C]/50 bg-white/60 px-8 py-6 text-base font-semibold text-[#2C1810] backdrop-blur transition-all duration-200 hover:border-[#C9A84C] hover:bg-[#FFF8E7] hover:scale-105 active:scale-95 hover-shine-effect"
                >
                  Track Order
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2 flex flex-wrap items-center gap-6 text-sm text-[#7A5C44]"
            >
              {[
                { Icon: Truck,  bg: "bg-[#C0392B]/10", color: "text-[#C0392B]", text: "Free delivery ₹999+" },
                { Icon: Clock,  bg: "bg-[#E8871A]/10", color: "text-[#E8871A]", text: "45 min delivery" },
                { Icon: Shield, bg: "bg-[#C9A84C]/10", color: "text-[#C9A84C]", text: "100% Pure Ghee" },
              ].map(({ Icon, bg, color, text }) => (
                <div key={text} className="flex items-center gap-2 transition-all hover:text-[#2C1810]">
                  <div className={`rounded-full ${bg} p-1.5`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== RIGHT — HERO IMAGE ===== */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Outer Decorative Mandala Ring */}
            <div className="absolute -inset-6 rounded-full border border-dashed border-[#C9A84C]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-12 rounded-full border border-[#C9A84C]/12 animate-[spin_60s_linear_infinite_reverse]" />

            {/* Ambient glow behind the image */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8871A]/30 via-[#C9A84C]/20 to-[#C0392B]/25 blur-2xl" />

            <FloatingElement delay={0.2} duration={5}>
              <div className="relative mx-auto aspect-square max-w-lg">
                {/* The round image collage */}
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#C9A84C]/60 shadow-2xl shadow-[#C0392B]/20 diya-glow">
                  <div className="grid h-full w-full grid-cols-2 grid-rows-2">
                    {[
                      { src: "/kaju-katli.png",    label: "Kaju Katli",  grad: "from-[#FFF3D4] to-[#FDEAC0]" },
                      { src: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=400&fit=crop&q=90", label: "Gulab Jamun", grad: "from-[#FDE8D8] to-[#FAD4B5]" },
                      { src: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=400&fit=crop&q=90", label: "Rasgulla",    grad: "from-[#FFF9F0] to-[#FFF3DC]" },
                      { src: "https://images.unsplash.com/photo-1605197161470-5f1c9ac5a3c7?w=400&h=400&fit=crop&q=90", label: "Barfi",       grad: "from-[#FDF0E0] to-[#FAE5C8]" },
                    ].map(({ src, label, grad }) => (
                      <div key={label} className={`relative overflow-hidden bg-gradient-to-br ${grad}`}>
                        <img
                          src={src}
                          alt={label}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-115"
                          onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0" }}
                        />
                        <div className="food-overlay absolute inset-0" />
                        <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold text-[#F5D76E] backdrop-blur">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Center Gold Medallion */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="ornate-border rounded-full border-2 border-[#C9A84C] bg-gradient-to-br from-[#FDF6E3] to-[#FFF3D4] px-5 py-3 shadow-xl diya-glow transition-transform hover:scale-110">
                      <span className="font-serif text-xl font-bold text-[#C0392B]">SM</span>
                    </div>
                  </div>
                </div>
              </div>
            </FloatingElement>

            {/* Delivery Badge */}
            <FloatingElement delay={0.5} duration={4} yOffset={10} className="absolute -right-2 top-6 z-10 md:-right-8">
              <div className="ornate-border rounded-2xl border border-[#C9A84C]/40 bg-white/95 px-4 py-3 shadow-xl backdrop-blur diya-glow-hover">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#E8871A] to-[#C9A84C]">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7A5C44]">Delivery in</p>
                    <p className="font-bold text-[#C0392B]">45 mins</p>
                  </div>
                </div>
              </div>
            </FloatingElement>

            {/* Orders Badge */}
            <FloatingElement delay={0.8} duration={4.5} yOffset={8} className="absolute -bottom-2 left-8 z-10">
              <div className="rounded-2xl bg-gradient-to-r from-[#C0392B] to-[#8B1A1A] px-5 py-2.5 shadow-xl diya-glow">
                <p className="text-sm font-bold text-[#F5D76E]">🎉 2,500+ orders today</p>
              </div>
            </FloatingElement>

            {/* Gold Star Badge */}
            <FloatingElement delay={1.2} duration={5} yOffset={6} className="absolute -left-2 top-16 z-10 md:-left-6">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A0782A] shadow-lg diya-glow">
                <SparkleIcon className="h-4 w-4 text-white" />
                <span className="text-[8px] font-bold leading-tight text-white">PURE</span>
                <span className="text-[8px] font-bold leading-tight text-white">GHEE</span>
              </div>
            </FloatingElement>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
