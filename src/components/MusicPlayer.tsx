import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, IconButton, Slider, List, ListItem, ListItemText } from '@mui/material'
import { PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp, Shuffle, Repeat, QueueMusic } from '@mui/icons-material'

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180)
  const [volume, setVolume] = useState(70)
  const [currentTrack, setCurrentTrack] = useState(0)
  
  const tracks = [
    { title: 'Ambient Focus', artist: 'Productivity Sounds', duration: 180 },
    { title: 'Nature Sounds', artist: 'Relaxation', duration: 240 },
    { title: 'White Noise', artist: 'Focus Music', duration: 300 },
    { title: 'Rain Sounds', artist: 'Nature', duration: 200 },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setCurrentTime(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setCurrentTime(0)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Music Player</Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 200, 
              height: 200, 
              bgcolor: 'primary.main', 
              borderRadius: 2, 
              mx: 'auto', 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QueueMusic sx={{ fontSize: 80, color: 'white' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {tracks[currentTrack].title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {tracks[currentTrack].artist}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Slider
              value={currentTime}
              max={duration}
              onChange={(_, value) => setCurrentTime(value as number)}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">{formatTime(currentTime)}</Typography>
              <Typography variant="caption">{formatTime(duration)}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
            <IconButton><Shuffle /></IconButton>
            <IconButton onClick={prevTrack}><SkipPrevious /></IconButton>
            <IconButton 
              onClick={togglePlay}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                '&:hover': { bgcolor: 'primary.dark' },
                width: 56,
                height: 56
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={nextTrack}><SkipNext /></IconButton>
            <IconButton><Repeat /></IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VolumeUp />
            <Slider
              value={volume}
              onChange={(_, value) => setVolume(value as number)}
              sx={{ flex: 1 }}
            />
            <Typography variant="body2">{volume}%</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Playlist</Typography>
          <List>
            {tracks.map((track, index) => (
              <ListItem 
                key={index}
                button
                selected={index === currentTrack}
                onClick={() => setCurrentTrack(index)}
              >
                <ListItemText
                  primary={track.title}
                  secondary={`${track.artist} • ${formatTime(track.duration)}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default MusicPlayer