import { CalendarDays, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHero } from '../components/shared/PageHero'
import type { SimulationRecord } from '../data/simulation'
import { useSimulationStorage } from '../hooks/useSimulationStorage'

function simulationDate(simulation: SimulationRecord) {
  return simulation.createdAt ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(simulation.createdAt)) : 'Data não disponível'
}

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState(() => getSimulations().sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? '')))

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((current) => current.filter((simulation) => simulation.id !== id))
  }

  return <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <PageHero title="Histórico de simulações" subtitle="Consulte suas metas, insights e conversas anteriores." />
      <button onClick={() => void navigate('/')} className="flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"><Plus size={18} /> Nova simulação</button>
    </div>
    {simulations.length === 0 ? <section className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center"><CalendarDays className="mx-auto mb-3 text-primary" size={32} /><h2 className="font-semibold">Nenhuma simulação salva</h2><p className="mt-1 text-sm text-muted-foreground">Quando você criar uma simulação, ela aparecerá aqui.</p></section> :
      <div className="grid gap-4 sm:grid-cols-2">{simulations.map((simulation) => <article key={simulation.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-wider text-primary uppercase">Meta financeira</p><h2 className="mt-1 text-lg font-semibold">{simulation.goalName}</h2></div><button onClick={() => handleDelete(simulation.id)} aria-label={`Excluir simulação ${simulation.goalName}`} className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"><Trash2 size={18} /></button></div>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-muted-foreground">Valor da meta</dt><dd className="mt-1 font-semibold">R$ {simulation.goalAmount}</dd></div><div><dt className="text-muted-foreground">Prazo</dt><dd className="mt-1 font-semibold">{simulation.goalDeadline} meses</dd></div></dl>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-muted-foreground">{simulationDate(simulation)}</span><button onClick={() => void navigate(`/resultado/${simulation.id}`)} className="flex items-center gap-1 text-sm font-semibold text-primary">Ver detalhes <ChevronRight size={17} /></button></div>
      </article>)}</div>}
  </main>
}
