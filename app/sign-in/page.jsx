'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-100">
      <div className="flex w-full max-w-md flex-col items-center justify-center px-8 py-10 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Sign In</h1>
        <form onSubmit={handleSignIn} className="flex flex-col space-y-4 w-full">
          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
