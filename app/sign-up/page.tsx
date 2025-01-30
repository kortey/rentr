'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Link,
  Alert
} from '@mui/material'

export default function SignUp() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    experience: '',
    languages: [] as string[],
  })

  const handleLanguageChange = (language: string) => {
    const currentLanguages = formData.languages
    if (currentLanguages.includes(language)) {
      setFormData({
        ...formData,
        languages: currentLanguages.filter(lang => lang !== language)
      })
    } else {
      setFormData({
        ...formData,
        languages: [...currentLanguages, language]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 1. Create user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      })

      if (authError) throw authError

      if (!authData.user?.id) {
        throw new Error('No user ID returned from signup')
      }

      // 2. Create agent profile
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: authData.user.id,
          name: formData.name,
          email:formData.email,
          phone: formData.phone,
          experience: formData.experience,
          languages: formData.languages,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create agent profile')
      }

      // 3. Redirect to confirmation page
      router.push('/signup-confirmation')

    } catch (error: any) {
      setError(error.message || 'An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  const languages = ['English', 'Swahili', 'French', 'Arabic']

  return (
    <Container component="main" maxWidth="sm" className="bg-white p-4 rounded-lg mt-20">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign up as an agent to list properties
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="experience-label">Years of Experience</InputLabel>
            <Select
              labelId="experience-label"
              id="experience"
              value={formData.experience}
              label="Years of Experience"
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              required
            >
              <MenuItem value="0-2">0-2 years</MenuItem>
              <MenuItem value="3-5">3-5 years</MenuItem>
              <MenuItem value="5-10">5-10 years</MenuItem>
              <MenuItem value="10+">10+ years</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Languages Spoken
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {languages.map((language) => (
                <Chip
                  key={language}
                  label={language}
                  onClick={() => handleLanguageChange(language)}
                  color={formData.languages.includes(language) ? "primary" : "default"}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/sign-in" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}