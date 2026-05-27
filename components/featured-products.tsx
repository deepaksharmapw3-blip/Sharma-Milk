"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, Star, Plus, Minus, Clock } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Kaju Katli Premium",
    price: 599,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1666190094762-2fae0da07874?w=400&h=400&fit=crop&q=80",
    rating: 4.9,
    reviews: 328,
    badge: "Bestseller",
    badgeColor: "from-[#B22222] to-[#8B0000]",
    category: "Barfi",
    weight: "500g",
    deliveryTime: "45 min",
  },
  {
    id: 2,
    name: "Gulab Jamun",
    price: 349,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=400&fit=crop&q=80",
    rating: 4.8,
    reviews: 256,
    badge: "Popular",
    badgeColor: "from-[#FF9933] to-[#D4AF37]",
    category: "Mithai",
    weight: "1kg (12 pcs)",
    deliveryTime: "45 min",
  },
  {
    id: 3,
    name: "Motichoor Ladoo",
    price: 449,
    image: "https://images.unsplash.com/photo-1643297551340-10f2a67e1c6c?w=400&h=400&fit=crop&q=80",
    rating: 4.7,
    reviews: 189,
    category: "Ladoo",
    weight: "500g",
    deliveryTime: "45 min",
  },
  {
    id: 4,
    name: "Pista Barfi",
    price: 749,
    originalPrice: 849,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=400&fit=crop&q=80",
    rating: 5.0,
    reviews: 412,
    badge: "Premium",
    badgeColor: "from-[#D4AF37] to-[#B8860B]",
    category: "Barfi",
    weight: "500g",
    deliveryTime: "45 min",
  },
  {
    id: 5,
    name: "Rasgulla",
    price: 299,
    image: "https://images.unsplash.com/photo-1601303516361-f5f42298c870?w=400&h=400&fit=crop&q=80",
    rating: 4.6,
    reviews: 178,
    badge: "🪔 Diwali",
    badgeColor: "from-[#8B0000] to-[#B22222]",
    category: "Bengali",
    weight: "1kg (12 pcs)",
    deliveryTime: "45 min",
  },
  {
    id: 6,
    name: "Besan Ladoo",
    price: 399,
    image: "https://images.unsplash.com/photo-1666191472513-6d89f18ba167?w=400&h=400&fit=crop&q=80",
    rating: 4.8,
    reviews: 234,
    category: "Ladoo",
    weight: "500g",
    deliveryTime: "45 min",
  },
]

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [cartItems, setCartItems] = useState<Record<number, number>>({})

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  const addToCart = (id: number) => {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const newCount = (prev[id] || 0) - 1
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newCount }
    })
  }

  return (
    <section id="featured" className="relative bg-[#FFF8E7] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              <span className="h-px w-6 bg-[#D4AF37]" />
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Featured <span className="text-[#B22222]">Mithai</span>
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Our most loved sweets, handpicked for you
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            View All
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FFF8E7] to-[#FFE4B5]/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Top Badges */}
                <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
                  {product.badge && (
                    <Badge className={`bg-gradient-to-r ${product.badgeColor} border-0 px-3 py-1 text-xs font-semibold text-white shadow-md`}>
                      {product.badge}
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-white"
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors ${
                        favorites.includes(product.id)
                          ? "fill-[#B22222] text-[#B22222]"
                          : "text-foreground/50"
                      }`}
                    />
                  </button>
                </div>
                
                {/* Delivery Time Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur">
                  <Clock className="h-3.5 w-3.5 text-[#FF9933]" />
                  <span className="text-foreground">{product.deliveryTime}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                {/* Category & Weight */}
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    {product.category}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.weight}</p>
                </div>
                
                {/* Product Name */}
                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="mb-3 flex items-center gap-1.5">
                  <div className="flex items-center gap-1 rounded-full bg-[#FFF8E7] px-2 py-0.5">
                    <Star className="h-3.5 w-3.5 fill-[#FF9933] text-[#FF9933]" />
                    <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                
                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-[#B22222]">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  {cartItems[product.id] ? (
                    <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B22222] to-[#8B0000] p-1">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[20px] text-center text-sm font-semibold text-white">
                        {cartItems[product.id]}
                      </span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product.id)}
                      size="sm"
                      className="gap-1.5 rounded-full bg-gradient-to-r from-[#B22222] to-[#8B0000] px-4 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
