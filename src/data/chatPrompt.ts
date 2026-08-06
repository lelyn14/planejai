import type { ChatMessage, SimulationRecord } from './simulation'
import { calcMonthlySavings } from '../utils/simulation'

export function buildChatPrompt(simulation: SimulationRecord, messages: ChatMessage[], question: string) {
  const history = messages.slice(-8).map((message) => `${message.role === 'user' ? 'Usuário' : 'Educador'}: ${message.content}`).join('\n')
  return `Você é um educador financeiro brasileiro. Responda com clareza, acolhimento e ações práticas. Não invente dados e deixe claro que a orientação é educacional.\n\nSimulação: renda ${simulation.income}; gastos ${simulation.expenses}; dívidas ${simulation.debts}; meta ${simulation.goalName} de ${simulation.goalAmount} em ${simulation.goalDeadline} meses; disponível mensal calculado R$ ${calcMonthlySavings(simulation).toFixed(2)}.\n\nHistórico:\n${history || 'Sem perguntas anteriores.'}\n\nPergunta: ${question}\n\nResponda em português brasileiro, em até 3 parágrafos curtos. Não use JSON.`
}
