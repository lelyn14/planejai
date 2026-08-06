import { Send, Sparkles } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'

import { buildChatPrompt } from '../../../../data/chatPrompt'
import type { ChatMessage, SimulationRecord } from '../../../../data/simulation'
import { useSimulationStorage } from '../../../../hooks/useSimulationStorage'
import { getEducatorAnswer } from '../../../../services/aiService'

export function EducatorChat({ simulation }: { simulation: SimulationRecord }) {
  const { updateSimulation } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>(simulation.conversation ?? [])
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [messages, isLoading])

  const saveConversation = (next: ChatMessage[]) => {
    setMessages(next)
    updateSimulation(simulation.id, { ...simulation, conversation: next })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const content = question.trim()
    if (!content || isLoading) return
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content, createdAt: new Date().toISOString() }
    const next = [...messages, userMessage]
    setQuestion('')
    setError(null)
    saveConversation(next)
    setIsLoading(true)
    try {
      const answer = await getEducatorAnswer(buildChatPrompt(simulation, next, content))
      if (!answer) throw new Error('empty response')
      saveConversation([...next, { id: crypto.randomUUID(), role: 'assistant', content: answer, createdAt: new Date().toISOString() }])
    } catch {
      setError('Não foi possível responder agora. Verifique sua conexão e tente novamente.')
    } finally { setIsLoading(false) }
  }

  return (
    <section className="mt-7 border-t border-border pt-6" aria-label="Converse com o educador financeiro">
      <div className="mb-4 flex items-center gap-2"><Sparkles size={18} className="text-primary" /><div><h2 className="text-sm font-semibold">Converse com o educador financeiro</h2><p className="text-muted-foreground text-xs">Tire dúvidas sobre esta simulação.</p></div></div>
      {messages.length > 0 && <div className="max-h-80 space-y-3 overflow-y-auto pr-1" aria-live="polite">
        {messages.map((message) => <div key={message.id} className={message.role === 'user' ? 'ml-8 rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground' : 'mr-8 rounded-2xl rounded-bl-sm bg-secondary-button px-3 py-2 text-sm leading-relaxed'}>{message.content}</div>)}
        {isLoading && <div className="mr-8 w-fit rounded-2xl rounded-bl-sm bg-secondary-button px-3 py-2 text-sm text-muted-foreground">O educador está pensando...</div>}
        <div ref={endRef} />
      </div>}
      {error && <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <label className="sr-only" htmlFor="educator-question">Sua pergunta</label>
        <input id="educator-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ex.: Como posso reduzir meus gastos?" disabled={isLoading} className="min-w-0 flex-1 rounded-xl border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-60" />
        <button type="submit" disabled={!question.trim() || isLoading} aria-label="Enviar pergunta" className="rounded-xl bg-primary px-3 text-primary-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"><Send size={18} /></button>
      </form>
    </section>
  )
}
