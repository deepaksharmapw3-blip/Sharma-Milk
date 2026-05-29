"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export default function AddSweet() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    description: "",
  })
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sweets, setSweets] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("Saving sweet...")
    setError(null)

    try {
      const response = await fetch(`${API_URL}/sweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to save sweet")
      }

      setStatus(`Sweet added: ${result.name}`)
      setFormData({ name: "", image: "", price: "", category: "", description: "" })
      // refresh list after creating
      await loadSweets()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setStatus(null)
    }
  }

  const loadSweets = async () => {
    try {
      const res = await fetch(`${API_URL}/sweets`)
      if (!res.ok) throw new Error('Failed to load sweets')
      const data = await res.json()
      setSweets(data)
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    loadSweets()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this sweet?')) return
    try {
      setDeletingId(id)
      const res = await fetch(`${API_URL}/sweets/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setSweets((prev) => prev.filter((s) => String(s._id || s.id) !== String(id)))
      setStatus('Sweet deleted')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-muted p-8 shadow-sm">
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-primary">Admin Sweet Entry</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground">Add a new sweet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the sweet name, image URL, price, category and description below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Rabri"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Image URL</span>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="https://example.com/rabri.jpg"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Price</span>
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="600"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Category</span>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Indian Sweet"
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Rabri is a rich and creamy dessert made by reducing milk to a thick, velvety consistency..."
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Save sweet
        </button>

        {status && <p className="text-sm text-foreground">{status}</p>}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-medium">Existing sweets</h3>
        {sweets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sweets found.</p>
        ) : (
          <ul className="space-y-3">
            {sweets.map((s) => (
              <li key={s._id || s.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 bg-background">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">₹{s.price} • {s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(s._id || s.id)}
                    disabled={deletingId === (s._id || s.id)}
                    className="rounded-md bg-destructive px-3 py-1 text-sm text-white disabled:opacity-50"
                  >
                    {deletingId === (s._id || s.id) ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
