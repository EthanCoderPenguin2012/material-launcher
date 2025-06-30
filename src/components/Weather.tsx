import React, { useState, useEffect, useCallback } from 'react'
import { Box, Card, CardContent, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { Cloud, WbSunny, Thermostat, LocationOn } from '@mui/icons-material'
import { WeatherData } from '../types'

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchWeather = useCallback(async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockWeather: WeatherData = {
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: Math.random() > 0.5 ? 'Sunny' : 'Cloudy',
      location: location || 'Current Location'
    }
    setWeather(mockWeather)
    setLoading(false)
  }, [location])

  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Weather</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button variant="contained" onClick={fetchWeather}>
          Get Weather
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : weather && (
        <Card sx={{ maxWidth: 350, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent sx={{ textAlign: 'center', color: 'white' }}>
            {weather.condition === 'Sunny' ? <WbSunny sx={{ fontSize: 80, color: '#FFD700' }} /> : <Cloud sx={{ fontSize: 80, color: '#E0E0E0' }} />}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Thermostat sx={{ mr: 1 }} />
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {weather.temperature}°C
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 1, opacity: 0.9 }}>
              {weather.condition}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
              <LocationOn sx={{ mr: 0.5, fontSize: 16 }} />
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {weather.location}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default Weather