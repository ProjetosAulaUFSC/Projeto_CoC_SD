# Banco de Dados Distribuído com Sequenciador Fixo e Token Ring

![Tecnologias Usadas](https://skillicons.dev/icons?i=nodejs,mongodb,express,websocket, mongoose, ws, cors&perline=4)

## 🦑 Proposta do Projeto

Este projeto tem como objetivo implementar um sistema de banco de dados distribuído utilizando MongoDB, Node.js, e WebSockets. A proposta é garantir a consistência das operações de escrita em um ambiente distribuído, utilizando um sequenciador fixo para ordenar as operações de escrita e um Token Ring para controlar o acesso às réplicas de banco de dados.

Para demonstrar a aplicação real deste banco de dados distribuído, escolhemos um contexto único e envolvente: armazenar personagens de RPG do sistema de Call of Cthulhu - 7ª edição. Este jogo, conhecido por sua rica narrativa e profundidade de personagens, oferece um cenário perfeito para ilustrar a complexidade e a necessidade de consistência em um banco de dados distribuído. Através desta aplicação, jogadores e mestres de jogo podem armazenar, acessar e gerenciar informações detalhadas sobre seus personagens, garantindo que todas as operações sejam consistentes e sincronizadas entre diferentes réplicas do banco de dados.

## 📚 Arquitetura do Projeto

### Componentes Principais

- **WebSocket**: Utilizado para comunicação em tempo real entre os clientes e o servidor, garantindo que as requisições sejam recebidas e processadas de forma ordenada.
- **Sequenciador Fixo**: Responsável por ordenar as requisições recebidas dos clientes com base em um timestamp, garantindo que as operações sejam executadas na ordem correta.
- **Token Ring**: Utilizado para controlar o acesso às réplicas de banco de dados distribuídas, garantindo que apenas uma réplica execute operações de escrita por vez.
- **MongoDB**: Banco de dados utilizado para armazenar as informações dos personagens de RPG.
- **Node.js e Express**: Servidor backend responsável por gerenciar as requisições, conectar-se ao banco de dados e realizar as operações necessárias.

### Diagrama de Sequência

```plaintext
Client                Sequenciador Fixo              Token Ring
   |                           |                           |
   |--- Envia Requisição ----->|                           |
   |                           |--- Ordena Requisição ---> |
   |                           |                           |
   |                           |<--- Processa Requisição --|
   |                           |                           |
   |<--- Recebe Resposta ------|                           |
