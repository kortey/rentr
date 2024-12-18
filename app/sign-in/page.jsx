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
      router.push('/agent/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex w-full flex-col items-center justify-center px-20  py-20 text-center bg-white rounded-lg shadow-lg w-[50%] min-h-full">
        <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
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
            className="rounded-md border px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border px-4 py-2"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
