import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articleService } from '@/api/articles'
const ArticlePage = () => {
 const { slug } = useParams() // ← pega o slug da URL
 const [article, setArticle] = useState(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 useEffect(() => {
 articleService.getBySlug(slug)
 .then(({ data }) => setArticle(data))
 .catch(() => setError('Artigo não encontrado.'))
 .finally(() => setLoading(false))
 }, [slug])
 if (loading) return <p className='text-center mt-20'>Carregando...</p>
 if (error) return (
 <div className='text-center mt-20'>
    <p className='text-red-500'>{error}</p>
 <Link to='/' className='text-indigo-600 mt-4 inline-block'>← Voltar</Link>
 </div>
 )
 return (
 <div className='min-h-screen bg-slate-50'>
 <div className='max-w-3xl mx-auto p-6'>
 <Link to='/' className='text-indigo-600 text-sm'>← Voltar para o
blog</Link>
 <article className='bg-white rounded-2xl shadow p-8 mt-6'>
 <h1 className='text-3xl font-bold text-slate-800'>{article.title}</h1>
 <p className='text-slate-400 text-sm mt-2'>
 {article.reading_time} min de leitura
 {article.author && ` · por ${article.author}`}
 </p>
 <hr className='my-6'/>
 <div className='prose text-slate-700 leading-relaxed
whitespace-pre-wrap'>
 {article.content}
 </div>
 </article>
 </div>
 </div>
 )
}
export default ArticlePage
