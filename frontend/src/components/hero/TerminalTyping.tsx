import { useState, useEffect, useRef } from 'react'

interface TerminalLine {
  type: 'command' | 'output'
  text: string
  delay?: number
}

const SEQUENCE: TerminalLine[] = [
  { type: 'command', text: 'whoami', delay: 800 },
  { type: 'output', text: 'jonathan-nascimento — dev fullstack | python & react', delay: 400 },
  { type: 'command', text: 'cat sobre.txt', delay: 1200 },
  { type: 'output', text: '> Estagiário Dev @ Prefeitura de SP (SEGES)', delay: 200 },
  { type: 'output', text: '> Estudante de Sistemas de Informação — Impacta', delay: 200 },
  { type: 'output', text: '> Entusiasta de RPA, IA e Arquitetura Hexagonal', delay: 200 },
  { type: 'command', text: 'ls projetos/', delay: 1400 },
  { type: 'output', text: 'gestao_estoque/  stockflow-for-sellers/  BolaoWorldCup/', delay: 300 },
  { type: 'output', text: 'Back_Delivery/   IA_Recomendacao_jogos/  rpa_final/', delay: 200 },
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

    const line = SEQUENCE[currentLineIndex]
    const delay = line.delay ?? 600

    // Wait before starting next line
    const waitTimer = setTimeout(() => {
      if (line.type === 'command') {
        // Type character by character
        setIsTyping(true)
        let charIndex = 0
        setCurrentText('')

        const typeTimer = setInterval(() => {
          charIndex++
          setCurrentText(line.text.slice(0, charIndex))
          if (charIndex >= line.text.length) {
            clearInterval(typeTimer)
            setIsTyping(false)
            setLines(prev => [...prev, line])
            setCurrentText('')
            setCurrentLineIndex(i => i + 1)
          }
        }, 45)

        return () => clearInterval(typeTimer)
      } else {
        // Output lines appear instantly
        setLines(prev => [...prev, line])
        setCurrentLineIndex(i => i + 1)
      }
    }, delay)

    return () => clearTimeout(waitTimer)
  }, [currentLineIndex])

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines, currentText])

  return (
    <div className="terminal w-full max-w-lg">
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 mb-4 -mt-1">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-text-secondary text-xs">bash — jonathan@portfolio</span>
      </div>

      {/* Lines container */}
      <div ref={containerRef} className="space-y-1 max-h-48 overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === 'command' ? (
              <>
                <span className="terminal-prompt shrink-0">$</span>
                <span className="terminal-output break-words break-all">{line.text}</span>
              </>
            ) : (
              <span className="text-text-secondary pl-4 break-words break-all">{line.text}</span>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {isTyping && (
          <div className="terminal-line">
            <span className="terminal-prompt shrink-0">$</span>
            <span className="terminal-output break-words break-all">
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
