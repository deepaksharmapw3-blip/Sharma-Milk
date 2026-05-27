"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Barfi & Katli",
    items: "24 items",
    image: "https://images.unsplash.com/photo-1666190094762-2fae0da07874?w=600&h=400&fit=crop&q=80",
    color: "from-[#B22222]/80 to-[#8B0000]/90",
  },
  {
    id: 2,
    name: "Ladoo",
    items: "18 items",
    image: "https://images.unsplash.com/photo-1643297551340-10f2a67e1c6c?w=600&h=400&fit=crop&q=80",
    color: "from-[#FF9933]/80 to-[#D4AF37]/90",
  },
  {
    id: 3,
    name: "Bengali Sweets",
    items: "16 items",
    image: "https://images.unsplash.com/photo-1601303516361-f5f42298c870?w=600&h=400&fit=crop&q=80",
    color: "from-[#8B4513]/80 to-[#654321]/90",
  },
  {
    id: 4,
    name: "Milk Sweets",
    items: "20 items",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=400&fit=crop&q=80",
    color: "from-[#D4AF37]/80 to-[#B8860B]/90",
  },
  {
    id: 5,
    name: "Gift Boxes",
    items: "12 items",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=400&fit=crop&q=80",
    color: "from-[#8B0000]/80 to-[#B22222]/90",
  },
  {
    id: 6,
    name: "Festival Special",
    items: "15 items",
    image: "https://images.unsplash.com/photo-1666191472513-6d89f18ba167?w=600&h=400&fit=crop&q=80",
    color: "from-[#CD853F]/80 to-[#8B4513]/90",
  },
]

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="categories" className="relative overflow-hidden bg-gradient-to-b from-[#3D2914] to-[#2A1E10] py-12 md:py-16">
      {/* Decorative elements */}
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#B22222]/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              <span className="h-px w-6 bg-[#D4AF37]" />
              Browse
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
              Shop by <span className="text-[#D4AF37]">Category</span>
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full border-[#D4AF37]/30 bg-transparent text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full border-[#D4AF37]/30 bg-transparent text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:gap-5"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className="group relative min-w-[260px] flex-shrink-0 overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02] md:min-w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color}`} />
              
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors group-hover:border-[#D4AF37]" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-serif text-xl font-bold text-white md:text-2xl">
                  {category.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                    {category.items}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform group-hover:translate-x-1">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Mobile scroll indicator */}
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {categories.map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/30"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
