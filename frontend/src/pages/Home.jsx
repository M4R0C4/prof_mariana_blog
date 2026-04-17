import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { articleService } from '@/api/articles'
const Home = () => {
 const [articles, setArticles] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 useEffect(() => {
 articleService.getAll()
 .then(({ data }) => setArticles(data))
 .catch(() => setError('Erro ao carregar artigos.'))
 .finally(() => setLoading(false))
 }, [])
 if (loading) return <p className='text-center mt-20'>Carregando...</p>
 if (error) return <p className='text-center mt-20 text-red-500'>{error}</p>
 return (
 <div className='min-h-screen bg-slate-50'>
 <header className='bg-indigo-700 text-white p-8 text-center'>
 <h1 className='text-4xl font-bold'>Infinito Curioso</h1>
 <p className='text-indigo-200 mt-2'>Blog da Prof. Mariana</p>
 </header>
 <main className='max-w-3xl mx-auto p-6 space-y-6 mt-8'>
 {articles.length === 0 && (
 <p className='text-center text-slate-500'>Nenhum artigo publicado
ainda.</p>
 )}
 {articles.map(article => (
 <Link key={article.id} to={`/artigos/${article.slug}`}
 className='block bg-white rounded-2xl shadow p-6 hover:shadow-md
transition'>
 <h2 className='text-xl font-bold text-slate-800'>{article.title}</h2>
 <p className='text-slate-400 text-sm mt-1'>
 {article.reading_time} min de leitura
 </p>
 </Link>
 ))}
 </main>
 </div>
 )
}

export default Home
