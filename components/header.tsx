"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, ShoppingBag, Search, Package, MapPin, ChevronDown, Clock, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"

const navigation = [
  { name: "Home", href: "#" },
  { name: "Mithai", href: "#featured" },
  { name: "Categories", href: "#categories" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { count, setIsOpen: openCart } = useCart()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-primary via-[#8B0000] to-primary px-4 py-2 text-center text-sm text-primary-foreground dark:from-primary/90 dark:via-[#8B0000]/90 dark:to-primary/90">
        <span className="inline-flex items-center gap-2">
          <span className="animate-pulse">✨</span>
          <span className="font-medium">Diwali Special: Free delivery on orders above ₹999</span>
          <span className="animate-pulse">✨</span>
        </span>
      </div>

      <nav className={`border-b transition-all duration-300 ${scrolled ? "border-border/50 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-background/90" : "border-accent/20 bg-background/95 backdrop-blur-sm"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#8B0000] shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif text-lg font-bold text-primary-foreground">SM</span>
              <div className="absolute -inset-[1px] rounded-2xl border border-accent/40" />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="font-serif text-lg font-bold tracking-tight text-primary transition-colors">Sharma Milk</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-accent">Est. 1980</span>
            </div>
          </Link>

          <div className="hidden items-center gap-4 lg:flex">
            <button className="flex items-center gap-2 rounded-full border border-accent/20 bg-card/60 px-4 py-2 transition-all duration-200 hover:border-accent/40 hover:bg-card hover:shadow-md">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Kolkata</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent/10 to-saffron/10 px-4 py-2">
              <Clock className="h-4 w-4 text-saffron" />
              <span className="text-sm font-medium text-primary">Delivery in 45 min</span>
            </div>
          </div>

          <div className="hidden items-center gap-1 xl:flex">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-200 hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-200">
                  <Input type="text" placeholder="Search sweets..." autoFocus
                    className="w-48 border-accent/30 bg-card/80 text-sm transition-all focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="h-8 w-8 transition-transform hover:rotate-90">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}
                  className="text-foreground/70 transition-all duration-200 hover:bg-accent/10 hover:text-primary hover:scale-110">
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground/70 transition-all duration-200 hover:bg-accent/10 hover:text-primary hover:scale-110">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            <Link href="#track-order">
              <Button variant="ghost" size="icon" className="text-foreground/70 transition-all duration-200 hover:bg-accent/10 hover:text-primary hover:scale-110">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart button — opens the CartDrawer */}
            <Button variant="ghost" size="icon" onClick={() => openCart(true)}
              className="relative text-foreground/70 transition-all duration-200 hover:bg-accent/10 hover:text-primary hover:scale-110">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-saffron to-accent text-[10px] font-bold text-white shadow-sm animate-in zoom-in duration-200">
                  {count}
                </span>
              )}
            </Button>

            <Button onClick={() => openCart(true)}
              className="ml-2 gap-2 rounded-full bg-gradient-to-r from-primary to-[#8B0000] px-6 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95">
              Order Now
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground/70 transition-all hover:bg-accent/10">
              <Search className="h-5 w-5" />
            </Button>
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground/70 transition-all hover:bg-accent/10">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => openCart(true)} className="relative text-foreground/70">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-saffron to-accent text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/70 transition-all hover:bg-accent/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs border-l-accent/20 bg-background">
                <div className="flex flex-col gap-6 pt-4">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#8B0000]">
                      <span className="font-serif text-xl font-bold text-primary-foreground">SM</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif text-xl font-bold text-primary">Sharma Milk</span>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-accent">Est. 1980</span>
                    </div>
                  </Link>
                  <nav className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}
                        className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-all duration-200 hover:bg-accent/10 hover:text-primary hover:translate-x-1"
                        onClick={() => setIsOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                    <Link href="#track-order"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-all duration-200 hover:bg-accent/10 hover:text-primary hover:translate-x-1"
                      onClick={() => setIsOpen(false)}>
                      <Package className="h-5 w-5" />
                      Track Order
                    </Link>
                  </nav>
                  <Button
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-[#8B0000] py-6 text-base font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    onClick={() => { setIsOpen(false); openCart(true) }}>
                    Order Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border/50 bg-background/95 p-3 backdrop-blur-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="Search for sweets..."
                className="border-accent/20 bg-card/60 pl-10" autoFocus />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
