"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FloatingElement } from "@/components/floating-element"

const categories = [
  {
    id: 1,
    name: "Barfi & Katli",
    subtitle: "Silver-touched royal diamonds",
    items: "24 items",
    emoji: "✨",
    image: "https://images.unsplash.com/photo-1666190094762-2fae0da07874?w=600&h=450&fit=crop&q=90",
    color: "from-[#7B241C]/70 via-[#C0392B]/60 to-transparent",
    accent: "#C0392B",
  },
  {
    id: 2,
    name: "Ladoo",
    subtitle: "Celebrations in every bite",
    items: "18 items",
    emoji: "🟡",
    image: "https://images.unsplash.com/photo-1643297551340-10f2a67e1c6c?w=600&h=450&fit=crop&q=90",
    color: "from-[#7B4A00]/70 via-[#E8871A]/60 to-transparent",
    accent: "#E8871A",
  },
  {
    id: 3,
    name: "Bengali Sweets",
    subtitle: "Heritage from the land of Tagore",
    items: "16 items",
    emoji: "🐟",
    image: "https://images.unsplash.com/photo-1601303516361-f5f42298c870?w=600&h=450&fit=crop&q=90",
    color: "from-[#3B2000]/70 via-[#8B4513]/60 to-transparent",
    accent: "#C9A84C",
  },
  {
    id: 4,
    name: "Milk Sweets",
    subtitle: "Pure farm-fresh milk creations",
    items: "20 items",
    emoji: "🥛",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=450&fit=crop&q=90",
    color: "from-[#5A3800]/70 via-[#C9A84C]/60 to-transparent",
    accent: "#C9A84C",
  },
  {
    id: 5,
    name: "Gift Boxes",
    subtitle: "Curated for every occasion",
    items: "12 items",
    emoji: "🎁",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=450&fit=crop&q=90",
    color: "from-[#7B241C]/70 via-[#C0392B]/50 to-transparent",
    accent: "#C0392B",
  },
  {
    id: 6,
    name: "Festival Special",
    subtitle: "Diwali · Holi · Eid · Navratri",
    items: "15 items",
    emoji: "🪔",
    image: "https://images.unsplash.com/photo-1666191472513-6d89f18ba167?w=600&h=450&fit=crop&q=90",
    color: "from-[#5A2800]/70 via-[#CD853F]/60 to-transparent",
    accent: "#E8871A",
  },
]

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="categories" className="relative overflow-hidden py-16 md:py-20" style={{ background: "linear-gradient(180deg, #1E0C05 0%, #2C1408 50%, #1A0A04 100%)" }}>
      {/* Mandala pattern */}
      <div className="absolute inset-0 festive-pattern-dark opacity-100" />

      {/* Cinematic ambient glows */}
      <FloatingElement delay={0} duration={8} className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#C9A84C]/8 blur-3xl" />
      <FloatingElement delay={2} duration={9} className="pointer-events-none absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-[#C0392B]/8 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                Browse by Occasion
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Shop by{" "}
              <span className="gold-shimmer">Category</span>
            </h2>
            <p className="mt-2 max-w-sm text-sm text-white/50">
              From everyday indulgence to grand festive celebrations
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden gap-3 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full border-[#C9A84C]/30 bg-white/5 text-white hover:border-[#C9A84C]/70 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full border-[#C9A84C]/30 bg-white/5 text-white hover:border-[#C9A84C]/70 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-5 overflow-x-auto px-4 pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="ornate-border group relative min-w-[280px] flex-shrink-0 overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.03] md:min-w-[320px] hover-shine-effect diya-glow-hover"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Multi-layer gradient for cinematic depth */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Animated gold border on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 group-hover:border-[#C9A84C]/60" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                {/* Emoji + Item count */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {category.items}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white md:text-2xl">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-white/70">{category.subtitle}</p>

                {/* Arrow */}
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold" style={{ color: category.accent }}>
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex justify-center gap-2 md:hidden">
          {categories.map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]/40" />
          ))}
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
    </section>
  )
}
