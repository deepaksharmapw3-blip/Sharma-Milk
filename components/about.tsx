import { Award, Leaf, Heart, Sparkles, CheckCircle } from "lucide-react"

const features = [
  { icon: Award, label: "Pure Desi Ghee" },
  { icon: Leaf, label: "Fresh Ingredients" },
  { icon: Heart, label: "Family Recipes" },
  { icon: Sparkles, label: "Made Fresh Daily" },
]

const highlights = [
  "100% Pure Desi Ghee - No Substitutes",
  "Fresh Milk from Local Farms Daily",
  "Premium A-Grade Dry Fruits",
  "Traditional Recipes Since 1980",
  "No Artificial Colors or Preservatives",
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#FFF8E7] py-12 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#B22222]/10">
              <img
                src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&h=600&fit=crop&q=80"
                alt="Traditional Indian sweet making"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2914]/60 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="flex items-center justify-around rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <div className="text-center">
                    <p className="font-serif text-3xl font-bold text-white">40+</p>
                    <p className="text-sm text-white/80">Years Legacy</p>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-center">
                    <p className="font-serif text-3xl font-bold text-white">100+</p>
                    <p className="text-sm text-white/80">Recipes</p>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-center">
                    <p className="font-serif text-3xl font-bold text-white">50K+</p>
                    <p className="text-sm text-white/80">Families</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -right-4 -top-4 z-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-4 shadow-xl md:-right-8 md:-top-8">
              <div className="text-center text-white">
                <p className="text-3xl font-bold">🏆</p>
                <p className="mt-1 text-xs font-semibold">Best Sweet</p>
                <p className="text-xs">Shop 2024</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              <span className="h-px w-6 bg-[#D4AF37]" />
              Our Story
            </span>
            
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              <span className="text-balance">
                A Legacy of <span className="text-[#B22222]">Sweetness</span> Since 1980
              </span>
            </h2>
            
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Founded by Shri Ram Sharma Ji, Sharma Milk began as a humble sweet shop with a 
              simple mission: to bring the authentic taste of traditional Indian mithai to every home. 
              Over four decades later, we continue the legacy with the same dedication to quality.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-2 shadow-sm"
                >
                  <feature.icon className="h-4 w-4 text-[#B22222]" />
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
            
            {/* Highlights List */}
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-white to-[#FFF8E7] p-5">
              <h4 className="mb-4 font-semibold text-foreground">Our Promise</h4>
              <div className="space-y-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#B22222] to-[#8B0000]">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
