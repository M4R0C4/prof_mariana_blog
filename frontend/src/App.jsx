import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import ArticlePage from '@/pages/ArticlePage'
import Dashboard from '@/pages/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
function App() {
 return (
 <BrowserRouter>
 <Routes>
  {/* Rotas públicas */}
 <Route path='/login' element={<Login />} />
 <Route path='/cadastro' element={<Register />} />
 <Route path='/' element={<Home />} />
 <Route path='/artigos/:slug' element={<ArticlePage />} />
 {/* Rotas protegidas — só para o professor logado */}
 <Route element={<ProtectedRoute />}>
 <Route path='/painel' element={<Dashboard />} />
 </Route>
 {/* Qualquer URL desconhecida vai para Home */}
 <Route path='*' element={<Navigate to='/' replace />} />
 </Routes>
 </BrowserRouter>
 )
}
export default App