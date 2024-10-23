import { BrowserRouter, Routes, Route } from "react-router-dom"
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { MainLayout } from "./layout/MainLayout.jsx"
import { Films } from "./pages/Films.jsx";
import { Character } from "./pages/Character.jsx";
import { HelmetProvider } from "react-helmet-async";

function App() {
const queryClient= new QueryClient()

  return (
<HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
        <Route path="/film" element={<Films/>}/>
        <Route path="/character" element={<Character/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App