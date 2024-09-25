
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { MainLayout } from "./layout/MainLayout.jsx"
import {  Home} from "./pages/Home.jsx";
import { Films } from "./pages/Films.jsx";
import { Character } from "./pages/Character.jsx";

function App() {
const queryClient= new QueryClient()

  return (

    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/film" element={<Films/>}/>
        <Route path="/character" element={<Character/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App