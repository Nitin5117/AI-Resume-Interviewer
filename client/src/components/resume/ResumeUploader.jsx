import { useRef, useState } from 'react'
import { UploadCloud, FileText, X } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../ui/Button'
import { uploadResume } from '../../services/resumeService'

const ResumeUploader = ({ setAnalysis, onUploadSuccess }) => {
  const inputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const chooseFile = () => {
    inputRef.current.click()
  }

  const handleFileChange = e => {
    const selected = e.target.files[0]

    if (!selected) return

    if (selected.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed')
      return
    }

    if (selected.size > 5 * 1024 * 1024) {
      toast.error('Maximum file size is 5 MB')
      return
    }

    setFile(selected)
  }

  const removeFile = () => {
    setFile(null)
    inputRef.current.value = ''
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setLoading(true)

      const response = await uploadResume(file)

      toast.success('Resume analyzed successfully!')

      setAnalysis(response.data)

      if (onUploadSuccess) {
        onUploadSuccess()
      }

      setFile(null)
      inputRef.current.value = ''
    } catch (error) {
      toast.error(error.response?.data?.message || 'Resume upload failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/85 p-12 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.85)]">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
          <UploadCloud size={54} className="text-indigo-400" />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-white">Upload your resume</h2>
          <p className="mt-2 text-slate-400 max-w-2xl">
            Upload a PDF to get instant feedback on formatting, ATS score, and resume strength.
          </p>
        </div>
      </div>

      {!file ? (
        <div className="mt-10 flex flex-col items-center gap-4">
          <Button className="w-full max-w-xs" onClick={chooseFile}>
            Choose PDF
          </Button>

          <p className="text-sm text-slate-500">PDF only • up to 5 MB</p>
        </div>
      ) : (
        <div className="mt-10 rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 shadow-inner">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-3xl bg-slate-800 p-3 text-indigo-300">
                <FileText size={28} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">Selected file</p>
                <p className="text-base font-semibold text-white">{file.name}</p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="rounded-full border border-slate-700 p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <Button className="w-full sm:w-auto" onClick={handleUpload} disabled={loading}>
              {loading ? 'Analyzing Resume...' : 'Analyze Resume'}
            </Button>
          </div>
        </div>
      )}

      <input hidden ref={inputRef} type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  )
}

export default ResumeUploader
