import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UrlState } from '../context'

function RequireAuth({ children }) {
  const { user, loading } = UrlState()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8 text-white">
        Loading...
      </div>
    )
  }

  if (!user) {
    const createNew = new URLSearchParams(location.search).get('CreateNew')
    const search = createNew ? `?CreateNew=${encodeURIComponent(createNew)}` : ''

    return <Navigate to={`/auth${search}`} replace />
  }

  return children
}

export default RequireAuth
