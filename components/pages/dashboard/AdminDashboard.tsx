import React from 'react'

export default function AdminDashboard({ content }: { content: React.ReactNode }) {
  return (
    <div>
      <h2>
        AdminDashboard
      </h2>
      {content}
    </div>
  )
}
