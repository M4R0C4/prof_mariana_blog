import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { articleService } from '@/api/articles'
const emptyForm = { title: '', slug: '', content: '', reading_time: '' }
const Dashboard = () => {
 const { user, logout } = useAuth()
 const [articles, setArticles] = useState([])
 const [form, setForm] = useState(emptyForm)
 const [editingId, setEditingId] = useState(null)
 const [loading, setLoading] = useState(true)
 const loadArticles = () => {
 articleService.getAll()
 .then(({ data }) => setArticles(data))
 .finally(() => setLoading(false))
 }
 useEffect(() => { loadArticles() }, [])
 const handleChange = (e) => {
 setForm({ ...form, [e.target.name]: e.target.value })
 }
 const handleSubmit = async (e) => {
 e.preventDefault()
 try {
 if (editingId) {
 await articleService.update(editingId, form)
 } else {
 await articleService.create(form)
 }
 setForm(emptyForm)
 setEditingId(null)
 loadArticles()
 } catch (err) {
 alert('Erro ao salvar artigo.')
 }
 }
 const handleEdit = (article) => {
 setEditingId(article.id)
 setForm({
 title: article.title,
 slug: article.slug,
 content: article.content,
 reading_time: article.reading_time || '',
 })
 window.scrollTo(0, 0)
 }
 const handleDelete = async (id) => {
 if (!window.confirm('Tem certeza que deseja deletar?')) return
 await articleService.delete(id)
 loadArticles()
 }
 return (
 <div className='min-h-screen bg-slate-100 p-6'>
 <div className='max-w-4xl mx-auto'>
 {/* Header */}
 <div className='flex justify-between items-center mb-8'>
 <h1 className='text-2xl font-bold text-slate-800'>
 Painel — {user?.username}
 </h1>
 <button onClick={logout}
 className='text-sm text-red-600 hover:underline'>
 Sair
 </button>
 </div>
 {/* Formulário */}
 <div className='bg-white rounded-2xl shadow p-6 mb-8'>
 <h2 className='font-bold text-lg mb-4'>
 {editingId ? 'Editar Artigo' : 'Novo Artigo'}
 </h2>
 <form onSubmit={handleSubmit} className='space-y-4'>
 <input name='title' placeholder='Título' value={form.title}
 onChange={handleChange} required
 className='w-full border rounded-xl p-3'/>
 <input name='slug' placeholder='slug-do-artigo' value={form.slug}
 onChange={handleChange} required
 className='w-full border rounded-xl p-3'/>
 <textarea name='content' placeholder='Conteúdo...' value={form.content}
 onChange={handleChange} required rows={8}
 className='w-full border rounded-xl p-3'/>
 <input name='reading_time' placeholder='Tempo de leitura (min)'
 value={form.reading_time} onChange={handleChange} type='number'
 className='w-full border rounded-xl p-3'/>
 <div className='flex gap-3'>
 <button type='submit'
 className='bg-indigo-600 text-white px-6 py-2 rounded-xl
font-bold'>
 {editingId ? 'Salvar Alterações' : 'Publicar'}
 </button>
 {editingId && (
 <button type='button' onClick={() => { setForm(emptyForm);
setEditingId(null) }}
 className='text-slate-500 hover:underline'>
Cancelar
 </button>
 )}
 </div>
 </form>
 </div>
 {/* Lista de artigos */}
 <div className='space-y-4'>
 {articles.map(article => (
 <div key={article.id}
 className='bg-white rounded-2xl shadow p-5 flex justify-between
items-center'>
 <div>
 <p className='font-bold text-slate-800'>{article.title}</p>
 <p className='text-slate-400 text-sm'>{article.slug}</p>
 </div>
 <div className='flex gap-4'>
 <button onClick={() => handleEdit(article)}
 className='text-indigo-600 hover:underline text-sm'>
 Editar
 </button>
 <button onClick={() => handleDelete(article.id)}
 className='text-red-500 hover:underline text-sm'>
 Deletar
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )
}
export default Dashboard
