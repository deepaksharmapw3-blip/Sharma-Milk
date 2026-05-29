"use client"

import { Award, Leaf, Heart, Sparkles, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { FloatingElement } from "@/components/floating-element"

const features = [
  { icon: Award,    label: "Pure Desi Ghee",    color: "text-[#C0392B]", bg: "bg-[#C0392B]/10" },
  { icon: Leaf,     label: "Farm-Fresh",         color: "text-[#2E7D32]", bg: "bg-[#2E7D32]/10" },
  { icon: Heart,    label: "Family Recipes",     color: "text-[#C0392B]", bg: "bg-[#C0392B]/10" },
  { icon: Sparkles, label: "Made Fresh Daily",   color: "text-[#C9A84C]", bg: "bg-[#C9A84C]/10" },
]

const highlights = [
  "100% Pure Desi Ghee — No Substitutes Ever",
  "Fresh Milk sourced from Local Farms Daily",
  "Premium A-Grade Dry Fruits & Saffron",
  "Traditional Recipes Unchanged Since 1980",
  "No Artificial Colors or Preservatives",
]

const stats = [
  { value: "40+", label: "Years Legacy" },
  { value: "100+", label: "Recipes" },
  { value: "50K+", label: "Families" },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#FDF6E3] py-16 md:py-24">
      {/* Mandala pattern */}
      <div className="absolute inset-0 festive-pattern opacity-70" />

      {/* Warm ambient light */}
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#E8871A]/8 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#C0392B]/6 blur-3xl" />

      {/* Top ornate line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="lotus-divider mx-auto mb-3 max-w-xs">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
            Our Heritage
          </span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ===== IMAGE SIDE ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image with ornate treatment */}
            <div className="ornate-border-full relative overflow-hidden rounded-3xl border border-[#C9A84C]/30 shadow-2xl shadow-[#C0392B]/10">
              <img
                src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&h=600&fit=crop&q=90"
                alt="Traditional Indian sweet making — Sharma Milk since 1980"
                className="aspect-[4/3] w-full object-cover"
              />
              {/* Deep cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/10 to-transparent" />

              {/* Stats bar overlay */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-md">
                <div className="flex items-center justify-around">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-serif text-3xl font-bold text-[#F5D76E]">{stat.value}</p>
                      <p className="text-xs text-white/70">{stat.label}</p>
                      {i < stats.length - 1 && (
                        <div className="absolute top-1/2 h-8 w-px -translate-y-1/2 bg-white/20" style={{ right: `${(i + 1) * 33.33}%` }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Award Badge */}
            <FloatingElement delay={0.3} duration={4.5} yOffset={14} className="absolute -right-4 -top-5 z-10 md:-right-10 md:-top-8">
              <div className="ornate-border rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#8B6914] p-4 shadow-2xl diya-glow">
                <div className="text-center">
                  <p className="text-3xl">🏆</p>
                  <p className="mt-1 text-xs font-bold text-white">Best Sweet</p>
                  <p className="text-[11px] text-white/80">Shop 2024</p>
                </div>
              </div>
            </FloatingElement>

            {/* Floating small diya */}
            <FloatingElement delay={1.2} duration={5} yOffset={8} className="absolute -left-4 bottom-8 z-10 md:-left-8">
              <div className="rounded-full bg-gradient-to-br from-[#E8871A] to-[#C9A84C] p-3 shadow-xl diya-glow">
                <p className="text-2xl">🪔</p>
              </div>
            </FloatingElement>
          </motion.div>

          {/* ===== CONTENT SIDE ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-7"
          >
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Our Story</span>
              </div>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-[#2C1810] md:text-5xl">
                A Legacy of{" "}
                <span className="text-[#C0392B]">Sweetness</span>
                <br />Since 1980
              </h2>
            </div>

            <p className="leading-relaxed text-[#7A5C44]">
              Founded by <span className="font-semibold text-[#2C1810]">Shri Ram Sharma Ji</span>, Sharma Milk began as a
              humble sweet shop with a simple mission: to bring the authentic taste of traditional
              Indian mithai to every home. Over four decades later, we carry the same flame —
              the same recipes, the same love, the same commitment to purity.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-2 rounded-full border border-[#C9A84C]/25 ${feature.bg} px-4 py-2 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer hover-shine-effect`}
                >
                  <feature.icon className={`h-4 w-4 ${feature.color}`} />
                  <span className="text-sm font-semibold text-[#2C1810]">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Our Promise card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="ornate-border-full relative overflow-hidden rounded-3xl border border-[#C9A84C]/30 bg-gradient-to-br from-white to-[#FFF3D4] p-6 shadow-xl"
            >
              {/* Decorative glow */}
              <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#C9A84C]/12 blur-2xl" />
              <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-[#C0392B]/8 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-2">
                  <span className="text-xl">🤝</span>
                  <h4 className="font-serif text-xl font-bold text-[#C0392B]">Our Promise to You</h4>
                </div>
                <div className="space-y-3.5">
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C0392B] to-[#7B241C] shadow-sm">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-[#5A3A28]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
