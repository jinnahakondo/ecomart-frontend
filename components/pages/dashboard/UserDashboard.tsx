import React from 'react'

export default function UserDashboard({ content }: { content: React.ReactNode }) {
  return (
    <div>
      <h2>User dashboard</h2>
      {content}
    </div>
  )
}
