import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Search } from 'lucide-react'

import ResumeCard from './ResumeCard'
import { getUserResumes } from '../../services/resumeService'

const ResumeLibrary = ({ refreshKey }) => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchResumes = async () => {
    try {
      setLoading(true)

      const response = await getUserResumes()

      setResumes(response.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load resumes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [refreshKey])

  const filteredResumes = resumes.filter(resume =>
    resume.originalName.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="mt-10 text-center text-slate-400">Loading resumes...</div>
  }

  if (resumes.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-xl font-semibold">No resumes uploaded yet</h2>

        <p className="mt-2 text-slate-400">Upload your first resume above.</p>
      </div>
    )
  }

  return (
    <div className="mt-10">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">My Resume Library</h2>

        <p className="mt-2 text-slate-400">Manage all your uploaded resumes.</p>
      </div>

      {/* Search Box */}
      <div className="mb-8">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Resume Cards */}
      {filteredResumes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
          <h2 className="text-xl font-semibold text-white">No matching resumes found</h2>

          <p className="mt-2 text-slate-400">Try another search keyword.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredResumes.map(resume => (
            <ResumeCard key={resume._id} resume={resume} refreshResumes={fetchResumes} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumeLibrary
