import React, { useState } from 'react'
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material'
import { Cloud, WbSunny } from '@mui/icons-material'
import { WeatherData } from '../types'

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState('')

  const fetchWeather = () => {
    // Mock weather data - in production, integrate with weather API
    const mockWeather: WeatherData = {
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: Math.random() > 0.5 ? 'Sunny' : 'Cloudy',
      location: location || 'Current Location'
    }
    setWeather(mockWeather)
  }

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
      
      {weather && (
        <Card sx={{ maxWidth: 300 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            {weather.condition === 'Sunny' ? <WbSunny sx={{ fontSize: 60, color: 'orange' }} /> : <Cloud sx={{ fontSize: 60, color: 'gray' }} />}
            <Typography variant="h4" component="div">
              {weather.temperature}°C
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {weather.condition}
            </Typography>
            <Typography variant="body2">
              {weather.location}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default Weather