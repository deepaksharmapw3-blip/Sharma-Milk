"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Truck, Clock, Shield } from "lucide-react"
import Link from "next/link"

const quickCategories = [
  { name: "Barfi", emoji: "🍬" },
  { name: "Ladoo", emoji: "🟡" },
  { name: "Gulab Jamun", emoji: "🍩" },
  { name: "Gift Boxes", emoji: "🎁" },
  { name: "Festival Special", emoji: "🪔" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/10 dark:from-background dark:via-secondary/10 dark:to-accent/5">
      {/* Decorative blurs */}
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-saffron/20 to-accent/10 blur-3xl dark:from-saffron/10 dark:to-accent/5" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-primary/10 to-saffron/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="flex flex-col items-start gap-5">
            {/* Rating Badge */}
            <div className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-card/80 px-3 py-1.5 text-sm shadow-sm backdrop-blur transition-all hover:shadow-md hover:border-accent/50">
                <Star className="h-4 w-4 fill-saffron text-saffron" />
                <span className="font-semibold text-foreground">4.9</span>
                <span className="text-muted-foreground">(2.5k+ reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/10 to-saffron/10 px-3 py-1.5 text-sm font-medium text-primary dark:from-primary/20 dark:to-saffron/20">
                🪔 Diwali Specials Live
              </span>
            </div>
            
            <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
              <span className="text-balance">
                Premium <span className="bg-gradient-to-r from-primary to-[#8B0000] bg-clip-text text-transparent">Indian Sweets</span>
                <br />Delivered Fresh
              </span>
            </h1>
            
            <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
              Handcrafted mithai made with pure desi ghee, delivered to your doorstep. 
              From festive celebrations to everyday indulgence.
            </p>
            
            {/* Quick Category Pills */}
            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
              {quickCategories.map((cat, i) => (
                <Link
                  key={cat.name}
                  href="#featured"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-card/70 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:border-accent/40 hover:bg-card hover:shadow-md hover:scale-105 active:scale-95"
                  style={{ animationDelay: `${300 + i * 50}ms` }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center animate-in fade-in slide-in-from-left-4 duration-500 delay-500">
              <Button
                size="lg"
                className="group gap-2 rounded-full bg-gradient-to-r from-primary to-[#8B0000] px-8 py-6 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
              >
                Order Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="#track-order">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-accent/40 bg-card/50 px-8 py-6 text-base font-semibold transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:scale-105 active:scale-95"
                >
                  Track Order
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-left-4 duration-500 delay-700">
              <div className="flex items-center gap-2 transition-all hover:text-foreground">
                <div className="rounded-full bg-primary/10 p-1.5 dark:bg-primary/20">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <span>Free delivery ₹999+</span>
              </div>
              <div className="flex items-center gap-2 transition-all hover:text-foreground">
                <div className="rounded-full bg-saffron/10 p-1.5 dark:bg-saffron/20">
                  <Clock className="h-4 w-4 text-saffron" />
                </div>
                <span>45 min delivery</span>
              </div>
              <div className="flex items-center gap-2 transition-all hover:text-foreground">
                <div className="rounded-full bg-accent/10 p-1.5 dark:bg-accent/20">
                  <Shield className="h-4 w-4 text-accent" />
                </div>
                <span>100% Pure Ghee</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-300">
            {/* Main Image Container */}
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-accent/40 animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-saffron/20" />
              
              {/* Gradient background behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-saffron/40 via-accent/30 to-primary/40 dark:from-saffron/20 dark:via-accent/15 dark:to-primary/20" />
              
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-accent/50 shadow-2xl shadow-primary/20 dark:border-accent/30">
                {/* Multiple sweets collage - Bengali & Indian Premium Sweets */}
                <div className="grid h-full w-full grid-cols-2 grid-rows-2">
                  <div className="relative overflow-hidden bg-gradient-to-br from-secondary to-accent/20">
                    <img
                      src="https://images.unsplash.com/photo-1666190094762-2fae0da07874?w=400&h=400&fit=crop&q=80"
                      alt="Sandesh - Bengali cottage cheese sweet"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 to-transparent" />
                    <div className="absolute bottom-2 left-2 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
                      Sandesh
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-bl from-secondary to-accent/20">
                    <img
                      src="https://images.unsplash.com/photo-1605197161470-5f1c9ac5a3c7?w=400&h=400&fit=crop&q=80"
                      alt="Rasgulla - Soft spongy Bengali sweet"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent" />
                    <div className="absolute bottom-2 right-2 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
                      Rasgulla
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-tr from-secondary to-accent/20">
                    <img
                      src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=400&fit=crop&q=80"
                      alt="Gulab Jamun - Sweet dumplings in syrup"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                    <div className="absolute bottom-2 left-2 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
                      Gulab Jamun
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-tl from-secondary to-accent/20">
                    <img
                      src="https://images.unsplash.com/photo-1589249341753-9ff2ff660bd5?w=400&h=400&fit=crop&q=80"
                      alt="Kaju Katli - Diamond shaped cashew fudge"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-saffron/10 to-transparent" />
                    <div className="absolute bottom-2 right-2 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
                      Kaju Katli
                    </div>
                  </div>
                </div>
                {/* Center logo overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border-2 border-accent bg-gradient-to-br from-card to-secondary px-5 py-2.5 shadow-lg transition-transform hover:scale-110">
                    <span className="font-serif text-xl font-bold text-primary">SM</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/15 via-transparent to-saffron/10" />
              </div>
            </div>
            
            {/* Delivery Time Badge */}
            <div className="absolute -right-2 top-8 z-10 rounded-xl border border-accent/30 bg-card/95 px-4 py-2.5 shadow-xl backdrop-blur transition-all hover:scale-105 hover:shadow-2xl md:-right-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-500">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-accent">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Delivery in</p>
                  <p className="font-bold text-primary">45 mins</p>
                </div>
              </div>
            </div>
            
            {/* Orders Badge */}
            <div className="absolute -bottom-2 right-8 z-10 rounded-full border border-accent/30 bg-gradient-to-r from-primary to-[#8B0000] px-4 py-2 shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
              <p className="text-sm font-semibold text-primary-foreground">2,500+ orders today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
