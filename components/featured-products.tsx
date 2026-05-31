"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, Star, Plus, Minus, Clock, Flame, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/context/cart-context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

type Product = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  weight: string
  deliveryTime: string
  rating: number
  reviews: number
  badge: string
  festiveTag: string
  inStock: boolean
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [categories, setCategories] = useState<string[]>(["All"])
  const { addItem, updateQty, items } = useCart()

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async (category?: string) => {
    setLoading(true)
    setError(null)
    try {
      const url = category && category !== "All"
        ? `${API_URL}/products?category=${encodeURIComponent(category)}`
        : `${API_URL}/products`
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to load products")
      const data: Product[] = await res.json()
      setProducts(data)
    } catch (err) {
      setError("Could not load products. Is the server running?")
      console.warn(err)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/products/categories`)
      if (!res.ok) return
      const data: string[] = await res.json()
      setCategories(["All", ...data])
    } catch {
      // silently fail — categories are optional UI
    }
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    loadProducts(cat)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  const getQty = (id: string) => items.find((i) => i.id === id)?.quantity || 0

  return (
    <section id="featured" className="relative overflow-hidden bg-[#FDF6E3] py-16 md:py-20">
      <div className="absolute inset-0 festive-pattern opacity-60" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C9A84C]/8 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#C0392B]/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 text-center">
          <div className="lotus-divider mx-auto mb-4 max-w-xs">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
          <span className="mb-3 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            Curated Selection
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-[#2C1810] md:text-5xl">
            Featured <span className="text-[#C0392B]">Mithai</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#7A5C44]">
            Our most loved handcrafted sweets — made fresh daily with pure desi ghee
          </p>
          <div className="lotus-divider mx-auto mt-4 max-w-xs">
            <span className="text-[#C9A84C] text-lg">✦</span>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#C0392B] to-[#7B241C] text-[#F5D76E] shadow-md"
                    : "border border-[#E2D5B8] bg-white text-[#7A5C44] hover:border-[#C9A84C] hover:text-[#2C1810]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#C0392B]" />
            <p className="text-[#7A5C44]">Loading fresh sweets...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={() => loadProducts()} className="mt-3 rounded-full bg-[#C0392B] px-6 py-2 text-sm text-white font-semibold">
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-2xl mb-2">🍬</p>
            <p className="text-[#7A5C44] font-medium">No products found in this category.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div key={product._id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1 }} className="h-full">
                <Card className="ornate-border group relative overflow-hidden rounded-3xl border border-[#E2D5B8] bg-white shadow-md product-card-glow transition-all duration-500 hover-shine-effect h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={product.image} alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop&q=80" }} />
                    <div className="food-overlay absolute inset-0" />
                    {product.festiveTag && (
                      <div className="absolute bottom-3 left-3 rounded-full bg-gradient-to-r from-[#C0392B]/90 to-[#8B1A1A]/90 px-3 py-1 text-[10px] font-bold text-[#F5D76E] backdrop-blur">
                        {product.festiveTag}
                      </div>
                    )}
                    <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
                      {product.badge ? (
                        <Badge className="bg-gradient-to-r from-[#C0392B] to-[#7B241C] border-0 px-3 py-1 text-xs font-bold text-white shadow-lg">
                          {product.badge}
                        </Badge>
                      ) : <span />}
                      <button onClick={() => toggleFavorite(product._id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-white">
                        <Heart className={`h-5 w-5 transition-colors ${favorites.includes(product._id) ? "fill-[#C0392B] text-[#C0392B]" : "text-[#7A5C44]/60"}`} />
                      </button>
                    </div>
                    <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur">
                      <Clock className="h-3.5 w-3.5 text-[#E8871A]" />
                      <span className="text-[#2C1810]">{product.deliveryTime}</span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">{product.category}</p>
                      <p className="text-xs text-[#7A5C44]">{product.weight}</p>
                    </div>
                    <h3 className="mb-1 font-serif text-xl font-bold text-[#2C1810]">{product.name}</h3>
                    <p className="mb-3 text-xs leading-relaxed text-[#7A5C44]">{product.description}</p>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-[#FFF3D4] px-2.5 py-1">
                        <Star className="h-3.5 w-3.5 fill-[#E8871A] text-[#E8871A]" />
                        <span className="text-sm font-bold text-[#2C1810]">{product.rating}</span>
                      </div>
                      <span className="text-xs text-[#7A5C44]">({product.reviews} reviews)</span>
                      {product.rating >= 4.9 && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-[#C0392B]">
                          <Flame className="h-3 w-3" /> Trending
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-[#C0392B]">₹{product.price}</span>
                      {getQty(product._id) > 0 ? (
                        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C0392B] to-[#7B241C] p-1 shadow-md">
                          <button onClick={() => updateQty(product._id, getQty(product._id) - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-bold text-white">{getQty(product._id)}</span>
                          <button onClick={() => addItem({ id: product._id, name: product.name, price: product.price, image: product.image })}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <Button onClick={() => addItem({ id: product._id, name: product.name, price: product.price, image: product.image })}
                          size="sm"
                          className="gap-1.5 rounded-full bg-gradient-to-r from-[#C0392B] to-[#7B241C] px-5 py-2 font-bold text-[#F5D76E] shadow-md transition-all hover:scale-105 hover:shadow-lg">
                          <ShoppingBag className="h-4 w-4" />
                          Add
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 text-center">
          <Button variant="outline" size="lg"
            className="rounded-full border-2 border-[#C9A84C]/50 bg-white px-10 py-6 font-bold text-[#2C1810] shadow-sm hover:border-[#C9A84C] hover:bg-[#FFF3D4] hover:shadow-md transition-all hover:scale-105 hover-shine-effect">
            View All Mithai →
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
