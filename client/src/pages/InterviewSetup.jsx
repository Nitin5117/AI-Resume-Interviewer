import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Building2, Briefcase, Gauge, User, Target, Bot, ArrowRight, Loader2 } from 'lucide-react'

import DashboardLayout from '../components/layout/DashboardLayout'
import { createInterview } from '../services/interviewService'

const companies = [
  'General',
  'Google',
  'Amazon',
  'Microsoft',
  'Meta',
  'Apple',
  'Netflix',
  'Adobe',
  'Other',
]
const roles = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'ML Engineer',
  'DevOps Engineer',
  'Android Developer',
  'iOS Developer',
  'Other',
]
const difficulties = ['Easy', 'Medium', 'Hard']

const experiences = ['Fresher', '0-2 Years', '2-5 Years', '5+ Years']

const focuses = ['Mixed', 'Technical', 'HR', 'Projects', 'DSA', 'System Design']

const personalities = ['Professional', 'Friendly', 'Strict']

const SelectField = ({ icon, label, value, options, onChange }) => (
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
      {icon}
      {label}
    </label>

    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
    >
      {options.map(option => (
        <option key={option} value={option} className="bg-slate-900">
          {option}
        </option>
      ))}
    </select>
  </div>
)

const InterviewSetup = () => {
  const { resumeId } = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [customCompany, setCustomCompany] = useState('')
  const [customRole, setCustomRole] = useState('')

  const [settings, setSettings] = useState({
    company: 'General',
    role: 'Software Engineer',
    difficulty: 'Medium',
    experience: 'Fresher',
    focus: 'Mixed',
    personality: 'Professional',
  })

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = async () => {
    try {
      setLoading(true)
      const finalSettings = {
        ...settings,

        company: settings.company === 'Other' ? customCompany.trim() : settings.company,

        role: settings.role === 'Other' ? customRole.trim() : settings.role,
      }
      if (settings.company === 'Other' && !customCompany.trim()) {
        toast.error('Please enter a company name.')
        return
      }

      if (settings.role === 'Other' && !customRole.trim()) {
        toast.error('Please enter a role.')
        return
      }
      console.log('Resume ID:', resumeId)
      console.log('Settings:', finalSettings)
      const response = await createInterview(resumeId, finalSettings)
      toast.success('Interview Created')

      navigate(`/interview/start/${response.data._id}`)
    } catch (error) {
      console.error(error)

      toast.error(error.response?.data?.message || 'Failed to create interview.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <h1 className="text-4xl font-bold text-white">AI Interview Setup</h1>

          <p className="mt-3 text-slate-400">Customize your interview before starting.</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <SelectField
              icon={<Building2 size={18} />}
              label="Company"
              value={settings.company}
              options={companies}
              onChange={e => handleChange('company', e.target.value)}
            />
            {settings.company === 'Other' && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Enter Company Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Oracle"
                  value={customCompany}
                  onChange={e => setCustomCompany(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>
            )}
            <SelectField
              icon={<Briefcase size={18} />}
              label="Role"
              value={settings.role}
              options={roles}
              onChange={e => handleChange('role', e.target.value)}
            />
            {settings.role === 'Other' && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">Enter Role</label>

                <input
                  type="text"
                  placeholder="e.g. Cyber Security Engineer"
                  value={customRole}
                  onChange={e => setCustomRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <SelectField
              icon={<Gauge size={18} />}
              label="Difficulty"
              value={settings.difficulty}
              options={difficulties}
              onChange={e => handleChange('difficulty', e.target.value)}
            />

            <SelectField
              icon={<User size={18} />}
              label="Experience"
              value={settings.experience}
              options={experiences}
              onChange={e => handleChange('experience', e.target.value)}
            />

            <SelectField
              icon={<Target size={18} />}
              label="Interview Focus"
              value={settings.focus}
              options={focuses}
              onChange={e => handleChange('focus', e.target.value)}
            />

            <SelectField
              icon={<Bot size={18} />}
              label="Interviewer Personality"
              value={settings.personality}
              options={personalities}
              onChange={e => handleChange('personality', e.target.value)}
            />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="text-xl font-semibold text-white">Interview Summary</h2>

            <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4">
              <SummaryCard title="Questions" value="10" />

              <SummaryCard title="Duration" value="20 min" />

              <SummaryCard title="Difficulty" value={settings.difficulty} />

              <SummaryCard title="Company" value={settings.company} />
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating Interview...
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

const SummaryCard = ({ title, value }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-center">
    <p className="text-sm text-slate-400">{title}</p>

    <h3 className="mt-2 text-xl font-bold text-white">{value}</h3>
  </div>
)

export default InterviewSetup
