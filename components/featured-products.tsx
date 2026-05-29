"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, Star, Plus, Minus, Clock, Flame } from "lucide-react"
import { motion } from "framer-motion"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

// Keep minimal defaults in case API fails
const defaultProducts: any[] = []

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [favorites, setFavorites] = useState<(string | number)[]>([])
  const [cartItems, setCartItems] = useState<Record<string, number>>({})

  useEffect(() => {
    const loadSweets = async () => {
      try {
        const response = await fetch(`${API_URL}/sweets`)
        if (!response.ok) throw new Error('Failed to load sweets')
        const data = await response.json()

        const fetched = data.map((sweet: any, index: number) => ({
          id: sweet._id || `api-${index}`,
          name: sweet.name || `Sweet ${index + 1}`,
          desc: sweet.description || 'Delicious sweet',
          price: typeof sweet.price === 'number' ? sweet.price : Number(sweet.price) || 0,
          image:
            sweet.image ||
            'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=400&fit=crop&q=90',
          rating: 4.6,
          reviews: 50,
          badge: sweet.category || 'New',
          badgeColor: 'from-[#C0392B] to-[#7B241C]',
          category: sweet.category || 'Mithai',
          weight: '500g',
          deliveryTime: '45 min',
          festiveTag: '',
        }))

        if (fetched.length > 0) {
          setProducts(fetched)
        }
      } catch (error) {
        console.warn('Could not load sweets from API:', error)
      }
    }

    loadSweets()
  }, [])

  const toggleFavorite = (id: string | number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  const addToCart = (id: string | number) => {
    const key = String(id)
    setCartItems((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
  }

  const removeFromCart = (id: string | number) => {
    const key = String(id)
    setCartItems((prev) => {
      const newCount = (prev[key] || 0) - 1
      if (newCount <= 0) {
        const { [key]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [key]: newCount }
    })
  }

  return (
    <section id="featured" className="relative overflow-hidden bg-[#FDF6E3] py-16 md:py-20">
      {/* Mandala pattern overlay */}
      <div className="absolute inset-0 festive-pattern opacity-60" />

      {/* Ambient glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#C9A84C]/8 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#C0392B]/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {/* Ornate divider top */}
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

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="ornate-border group relative overflow-hidden rounded-3xl border border-[#E2D5B8] bg-white shadow-md product-card-glow transition-all duration-500 hover-shine-effect h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop&q=80`
                    }}
                  />
                  {/* Festive food overlay gradient */}
                  <div className="food-overlay absolute inset-0" />

                  {/* Festive tag bottom-left on image */}
                  {product.festiveTag && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-gradient-to-r from-[#C0392B]/90 to-[#8B1A1A]/90 px-3 py-1 text-[10px] font-bold text-[#F5D76E] backdrop-blur">
                      {product.festiveTag}
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
                    {product.badge ? (
                      <Badge className={`bg-gradient-to-r ${product.badgeColor} border-0 px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                        {product.badge}
                      </Badge>
                    ) : (
                      <span />
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all hover:scale-115 hover:bg-white"
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          favorites.includes(product.id)
                            ? "fill-[#C0392B] text-[#C0392B]"
                            : "text-[#7A5C44]/60"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Delivery Time */}
                  <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur">
                    <Clock className="h-3.5 w-3.5 text-[#E8871A]" />
                    <span className="text-[#2C1810]">{product.deliveryTime}</span>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Category & Weight */}
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
                      {product.category}
                    </p>
                    <p className="text-xs text-[#7A5C44]">{product.weight}</p>
                  </div>

                  {/* Product Name */}
                  <h3 className="mb-1 font-serif text-xl font-bold text-[#2C1810]">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-3 text-xs leading-relaxed text-[#7A5C44]">{product.desc}</p>

                  {/* Rating */}
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

                  {/* Price & Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#C0392B]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#7A5C44] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {cartItems[product.id] ? (
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C0392B] to-[#7B241C] p-1 shadow-md">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-bold text-white">
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
                        className="gap-1.5 rounded-full bg-gradient-to-r from-[#C0392B] to-[#7B241C] px-5 py-2 font-bold text-[#F5D76E] shadow-md transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#C0392B]/25"
                      >
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-[#C9A84C]/50 bg-white px-10 py-6 font-bold text-[#2C1810] shadow-sm hover:border-[#C9A84C] hover:bg-[#FFF3D4] hover:shadow-md transition-all hover:scale-105 hover-shine-effect"
          >
            View All Mithai →
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
