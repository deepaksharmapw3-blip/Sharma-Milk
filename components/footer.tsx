"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const footerLinks = {
  shop: [
    { name: "All Mithai", href: "#" },
    { name: "Barfi & Katli", href: "#" },
    { name: "Ladoo", href: "#" },
    { name: "Gift Boxes", href: "#" },
    { name: "Festival Special", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Story", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "#contact" },
    { name: "Track Order", href: "#track-order" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
    { name: "FAQ", href: "#" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

const paymentMethods = ["Visa", "Mastercard", "UPI", "Paytm", "GPay"]

export function Footer() {
  return (
    <footer className="relative border-t border-[#D4AF37]/20 bg-[#FFF8E7]">
      {/* Top decorative border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#B22222] via-[#D4AF37] to-[#FF9933]" />
      
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B22222] to-[#8B0000] shadow-lg">
                <span className="font-serif text-lg font-bold text-[#FFF8E7]">SM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-[#B22222]">
                  Sharma Milk
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                  Est. 1980
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Handcrafted Indian sweets made with pure desi ghee and traditional recipes. 
              Spreading sweetness across generations since 1980.
            </p>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold text-foreground">Get Festival Offers</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Subscribe for exclusive deals and new arrivals
              </p>
              <form className="mt-3 flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-11 max-w-[200px] rounded-xl border-[#D4AF37]/30 bg-white focus:border-[#D4AF37]"
                />
                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-gradient-to-r from-[#B22222] to-[#8B0000] px-6 font-semibold text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white text-muted-foreground transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-[#B22222]">Shop</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#B22222]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-[#B22222]">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#B22222]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-semibold text-[#B22222]">Support</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#B22222]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#D4AF37]/20 pt-8 md:flex-row"
        >
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm text-muted-foreground">
              © 2026 Sharma Milk. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-[#B22222]">Privacy</Link>
              <Link href="#" className="hover:text-[#B22222]">Terms</Link>
              <Link href="#" className="hover:text-[#B22222]">Cookies</Link>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">We accept:</span>
            <div className="flex gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="flex h-8 items-center justify-center rounded-md border border-[#D4AF37]/20 bg-white px-3 text-xs font-medium text-muted-foreground"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
