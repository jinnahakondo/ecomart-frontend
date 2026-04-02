import BookOrder from '@/components/pages/bookorder/BookOrder'
import React, { Suspense } from 'react'

export default function OrderBookingPage() {
  return (
    <div>
      <Suspense fallback="loading...">
        <BookOrder />
      </Suspense>
    </div>
  )
}
