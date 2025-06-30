import { useState } from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Avatar, Divider, ThemeProvider } from '@mui/material'
import { Dashboard as DashboardIcon, Assignment, ShoppingCart, WbSunny, CalendarMonth, Psychology, StickyNote2, Settings as SettingsIcon, Timer, TrackChanges, Calculate, Bookmark, DarkMode, LightMode, Menu } from '@mui/icons-material'
import TaskManager from './components/TaskManager'
import ShoppingList from './components/ShoppingList'
import Weather from './components/Weather'
import Calendar from './components/Calendar'
import AIAssistant from './components/AIAssistant'
import Notes from './components/Notes'
import Dashboard from './components/Dashboard'
import Pomodoro from './components/Pomodoro'
import Habits from './components/Habits'
import Calculator from './components/Calculator'
import Bookmarks from './components/Bookmarks'
import Settings from './components/Settings'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createAppTheme } from './theme'

const DRAWER_WIDTH = 280

const menuItems = [
  { id: 0, label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 1, label: 'Tasks', icon: <Assignment /> },
  { id: 2, label: 'Pomodoro', icon: <Timer /> },
  { id: 3, label: 'Habits', icon: <TrackChanges /> },
  { id: 4, label: 'Shopping', icon: <ShoppingCart /> },
  { id: 5, label: 'Weather', icon: <WbSunny /> },
  { id: 6, label: 'Calendar', icon: <CalendarMonth /> },
  { id: 7, label: 'AI Assistant', icon: <Psychology /> },
  { id: 8, label: 'Notes', icon: <StickyNote2 /> },
  { id: 9, label: 'Calculator', icon: <Calculate /> },
  { id: 10, label: 'Bookmarks', icon: <Bookmark /> },
  { id: 11, label: 'Settings', icon: <SettingsIcon /> },
]

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeMode, setThemeMode] = useLocalStorage<'light' | 'dark'>('theme-mode', 'light')
  const [themeColor, setThemeColor] = useLocalStorage<string>('theme-color', 'purple')

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  const theme = createAppTheme(themeMode, themeColor as any)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 0: return <Dashboard />
      case 1: return <TaskManager />
      case 2: return <Pomodoro />
      case 3: return <Habits />
      case 4: return <ShoppingList />
      case 5: return <Weather />
      case 6: return <Calendar />
      case 7: return <AIAssistant />
      case 8: return <Notes />
      case 9: return <Calculator />
      case 10: return <Bookmarks />
      case 11: return <Settings 
        themeMode={themeMode} 
        themeColor={themeColor}
        onThemeModeChange={setThemeMode}
        onThemeColorChange={setThemeColor}
      />
      default: return <Dashboard />
    }
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
          ML
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Material Launcher
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Productivity Suite
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1, borderRadius: 2, cursor: 'pointer' }} onClick={toggleTheme}>
          <IconButton size="small">
            {themeMode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Typography sx={{ ml: 1 }}>
            {themeMode === 'light' ? 'Dark' : 'Light'} Mode
          </Typography>
        </Box>
      </Box>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {menuItems.find(item => item.id === activeTab)?.label}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
          bgcolor: 'background.default',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
    </ThemeProvider>
  )
}

export default App