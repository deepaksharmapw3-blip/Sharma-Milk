import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Categories } from "@/components/categories"
import { About } from "@/components/about"
import { TrackOrder } from "@/components/track-order"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import AddSweet from "@/components/add-sweet"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <About />
        <TrackOrder />
        <AddSweet />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
