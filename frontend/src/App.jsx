import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import POSPage from './pages/POSPage'
import HistoryPage from './pages/HistoryPage'


function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/pos"
        element={<POSPage />}
      />

      <Route
        path="/history"
        element={<HistoryPage />}
      />

    </Routes>
  )
}

export default App