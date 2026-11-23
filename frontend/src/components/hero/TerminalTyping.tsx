import { useState, useEffect, useRef } from 'react'

interface TerminalLine {
  type: 'command' | 'output'
  text: string
  delay?: number
}

const SEQUENCE: TerminalLine[] = [
  { type: 'command', text: 'whoami', delay: 400 },
  { type: 'output', text: 'jonathan-nascimento — dev full stack | java, python & react', delay: 400 },
  { type: 'command', text: 'cat sobre.txt', delay: 1200 },
  { type: 'output', text: '> Estagiário de TI @ Prefeitura de SP (SEGES/COPATS)', delay: 200 },
  { type: 'output', text: '> Estudante de Sistemas de Informação — Impacta', delay: 200 },
  { type: 'output', text: '> APIs REST, arquitetura hexagonal, RAG e CI/CD', delay: 200 },
  { type: 'command', text: 'ls projetos/', delay: 1400 },
  { type: 'output', text: 'Chamados_Joveretec/  projeto-fullstack-orquestracao/', delay: 300 },
  { type: 'output', text: 'gestao_estoque/  BolaoWorldCup/  brasileirao-rag/', delay: 200 },
  { type: 'command', text: 'echo "Bem-vindo ao meu portfólio! 🚀"', delay: 1600 },
  { type: 'output', text: 'Bem-vindo ao meu portfólio! 🚀', delay: 400 },
]

export function TerminalTyping() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLineIndex >= SEQUENCE.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLines(SEQUENCE)
      setCurrentLineIndex(SEQUENCE.length)
      return
    }

    const line = SEQUENCE[currentLineIndex]
    let typeTimer: ReturnType<typeof setInterval> | undefined

    const finishLine = () => {
      setLines(prev => [...prev, line])
      setCurrentLineIndex(i => i + 1)
    }

    const waitTimer = setTimeout(() => {
      if (line.type === 'output') {
        finishLine()
        return
      }

      // Commands are typed character by character
      let charIndex = 0
      setIsTyping(true)
      setCurrentText('')

      typeTimer = setInterval(() => {
        charIndex++
        setCurrentText(line.text.slice(0, charIndex))
        if (charIndex >= line.text.length) {
          clearInterval(typeTimer)
          setIsTyping(false)
          setCurrentText('')
          finishLine()
        }
      }, 45)
    }, line.delay ?? 600)

    return () => {
      clearTimeout(waitTimer)
      clearInterval(typeTimer)
    }
  }, [currentLineIndex])

  // Keep the latest line visible inside the fixed height
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines, currentText])

  return (
    <div className="terminal w-full max-w-lg">
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 mb-4 -mt-1" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-text-secondary text-xs">bash — jonathan@portfolio</span>
      </div>

      {/* The height is fixed so typing never moves the rest of the page */}
      <div ref={containerRef} className="space-y-1 h-64 overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === 'command' ? (
              <>
                <span className="terminal-prompt shrink-0">$</span>
                <span className="terminal-output break-words min-w-0">{line.text}</span>
              </>
            ) : (
              <span className="text-text-secondary pl-4 break-words min-w-0">{line.text}</span>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {isTyping && (
          <div className="terminal-line">
            <span className="terminal-prompt shrink-0">$</span>
            <span className="terminal-output break-words min-w-0">
              {currentText}
              <span className="animate-blink">▋</span>
            </span>
          </div>
        )}

        {/* Idle cursor after all lines */}
        {!isTyping && currentLineIndex >= SEQUENCE.length && (
          <div className="terminal-line">
            <span className="terminal-prompt shrink-0">$</span>
            <span className="animate-blink text-text-secondary">▋</span>
          </div>
        )}
      </div>
    </div>
  )
}
