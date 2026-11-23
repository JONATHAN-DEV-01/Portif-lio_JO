const RESUMES = [
  { label: 'Currículo Java (PDF)', file: 'Curriculo_Jonathan_Nascimento_Full_Stack_Java.pdf', id: 'java' },
  { label: 'Currículo Python (PDF)', file: 'Curriculo_Jonathan_Nascimento_Full_Stack_Python.pdf', id: 'python' },
]

interface ResumeButtonsProps {
  className: string
  idPrefix: string
}

export function ResumeButtons({ className, idPrefix }: ResumeButtonsProps) {
  return (
    <>
      {RESUMES.map(resume => (
        <a
          key={resume.id}
          href={`/${resume.file}`}
          download={resume.file}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          id={`${idPrefix}-${resume.id}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {resume.label}
        </a>
      ))}
    </>
  )
}
