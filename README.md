O projeto é uma aplicação de planejamento financeiro pessoal. O usuário informa sua renda, gastos, dívidas e uma meta, e recebe uma análise sobre quanto precisa economizar por mês para alcançá-la.

Para executar a aplicação:
cd E:\projects\dio\planejai
pnpm install
pnpm dev
Em seguida, acesse o endereço exibido no terminal.

Foram utilizadas as seguintes tecnologias: React, TypeScript, Vite, Tailwind CSS, React Router, Lucide Icons, integração com Gemini API e localStorage.

Como melhoria, foi criada a tela de histórico de simulações. Nela, é possível visualizar um resumo de cada meta, acessar os detalhes com os insights já gerados e excluir registros. Também foi adicionado um espaço para conversar com o educador financeiro, permitindo tirar dúvidas sobre cada simulação. As mensagens ficam armazenadas localmente para consultas futuras.

Para testar o fluxo principal, basta criar uma nova simulação preenchendo todas as etapas, aguardar a análise financeira, fazer uma pergunta no campo de conversa e acessar a página de histórico. Ao abrir os detalhes da simulação, os dados, insights e mensagens anteriores devem continuar disponíveis. Também é possível validar a exclusão de um item pelo histórico.

Durante o desenvolvimento, foi possível praticar a persistência de dados no navegador, a organização de informações por simulação e a integração de respostas baseadas no contexto financeiro informado pelo usuário. Também foi necessário ajustar a tipagem dos dados para manter o formulário, o histórico e as conversas funcionando de forma consistente.
