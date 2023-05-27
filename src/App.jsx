import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import MainPage from './pages/MainPage';
import DetectivePage from './pages/DetectiveWinPercentage';
import JesterPage from './pages/JesterKillsByPlayer';
import PlayerPage from './pages/PlayerWinPercentage';
import RolePage from './pages/RoleWinPercentage';
import TraitorPage from './pages/TraitorComboWinPercentage';
import WinsPage from './pages/WinsByTeam'

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            a, a:visited {
                color: white;
                text-decoration: none;
            }
            a:hover {
                color: white;
            }
            `,
        }
    }
})

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route exact path="/" element={<MainPage />}></Route>
                <Route exact path="/detective-win-percentage" element={<DetectivePage />}></Route>
                <Route exact path="/jester-kills-by-player" element={<JesterPage />}></Route>
                <Route exact path="/player-win-percentage" element={<PlayerPage />}></Route>
                <Route exact path="/role-win-percentage" element={<RolePage />}></Route>
                <Route exact path="/traitor-combo-win-percentge" element={<TraitorPage />}></Route>
                <Route exact path="/wins-by-team" element={<WinsPage />}></Route>
            </Routes>
        </ThemeProvider>
    </QueryClientProvider>
  )
}