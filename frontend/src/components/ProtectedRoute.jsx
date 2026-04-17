import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
const ProtectedRoute = () => {
 const { authenticated, loading } = useAuth()
 // Enquanto verifica se o usuário está logado, mostra um loading
 if (loading) {
 return (
 <div className='min-h-screen flex items-center justify-center'>
 <p className='text-slate-500'>Verificando acesso...</p>
    </div>
 )
 }
 // Se não está autenticado, redireciona para /login
 if (!authenticated) {
 return <Navigate to='/login' replace />
 }
 // Se está autenticado, renderiza a página solicitada
 return <Outlet />
}
export default ProtectedRoute