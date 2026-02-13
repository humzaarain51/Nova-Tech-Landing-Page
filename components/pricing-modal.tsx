"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultPlan?: string
}

export default function PricingModal({ open, onOpenChange, defaultPlan }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState(defaultPlan || 'Basic')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    if (defaultPlan) setPlan(defaultPlan)
  }, [defaultPlan])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, plan, message }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || data.details || 'Submission failed')

      toast({ title: 'Request sent', description: 'We received your request — we will get back to you soon.' })
      onOpenChange(false)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      toast({ title: 'Error', description: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start your trial</DialogTitle>
          <DialogDescription>Fill out the form and we'll reach out to onboard you.</DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-medium">Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-md bg-muted/40" />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-medium">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-muted/40" />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-medium">Plan</label>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className="w-full px-3 py-2 rounded-md bg-muted/40">
              <option>Basic</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-sm font-medium">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-md bg-muted/40" />
          </div>

          <DialogFooter>
            <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded-md border">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </DialogFooter>
        </form>

        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
