const Button = ({ children, type = 'button', onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20',
    secondary: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-200 hover:bg-slate-800/70',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
