# TO DO LIST

## Features

- Criar modal para editar evento com:

  - Opção para alterar título
  - Opção para alterar membro
  - Opção para alterar data de término
  - Opção para excluir evento

- Cartão com previsão do tempo

- Cartão com versículos bíblicos

- Cartão com To Do list (itens para fazer sem data definida). Quando definir data possibilidade de arrastar evento para o calendário

- Cartão com lista de mercado

- Cartão com player Spotify

- Cartão com alimentação dos Pets

## Refatorar

- Criar 1 DymanicDialog para abrir os dois modais de Criar e Editar evento.

- Diminuir arquivos de Services agrupando conforme funções. Ex.:
  - Services para geranciar State para abrir e fechar modais conforme tipo (criar/editar)
  - Services para detectar se clicou na data ou no evento

- mover matriz FamilyMembers do create dialog e edit dialog para usar do mesmo lugar

## Corrigir

- Corrigir background (modal) do componente Dialog para travar seleção ao fundo.
    - Quando dialog de criar evento está aberto é possível selecionar as datas ao fundo.
    - Quando dialog de editar evento está aberto é possível abrir modal de adicionar evento 
