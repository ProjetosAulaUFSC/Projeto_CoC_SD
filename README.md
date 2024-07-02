# Banco de Dados Distribuído com Sequenciador Fixo e Token Ring

![Tecnologias Usadas](https://skillicons.dev/icons?i=nodejs,mongodb,express,react&perline=4)

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
```

### Requisitor Funcionais

#### Cliente
- Enviar Requisições: O cliente deve ser capaz de enviar requisições de operações (POST, PUT, FIND, DELETE) ao servidor.

- Receber Respostas: O cliente deve ser capaz de receber respostas do servidor sobre o status das operações solicitadas.

- Identificação de Cliente: Cada cliente deve ter um identificador único para rastreamento das requisições.

#### Servidor

- Ordenação de Requisições: O servidor deve ordenar as requisições recebidas com base em timestamps.

- Processamento de Requisições: O servidor deve processar as requisições em ordem e garantir a consistência dos dados.

- Controle de Acesso: O servidor deve controlar o acesso às réplicas de banco de dados utilizando um Token Ring.

- Logs de Operações: O servidor deve manter um log das operações realizadas para auditoria e análise.

## ⚙️ Pré-requisitos
- Node.js
- MongoDB (preferencialmente MongoDB Atlas)
- dotenv
- express
- mongoose
- WebScoket
- cors

## ⚡ Começando
1. Clone o repositório:
```shell
    git clone https://github.com/ProjetosAulaUFSC/Projeto_CoC_SD.git
```
2. Instale as dependências: `npm install`

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com as seguintes informações:
```perl
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```
4. Inicie o servidor : `node app.js`
5. Teste o projeto com multiplos clientes: `node scripts/multipleClients.js`
6. Você pode ver a interface do cliente usando o seguinte comando:
```shell
    npm start
```

## 🚀 Funcionalidades
- Adicionar Personagens: Permite adicionar novos personagens ao banco de dados.

- Atualizar Personagens: Permite atualizar informações de personagens existentes.

- Buscar Personagens: Permite buscar personagens com base em filtros específicos.

- Excluir Personagens: Permite excluir personagens do banco de dados.
Logs de Operações: Mantém um histórico das operações realizadas para auditoria e análise.

## 🛠️ Endpoints

### Adicionar um Personagem
```bash
    POST /characters
```
### Corpo da Requisição:

```json
{
    "name": "Nome do Personagem",
    "STR": 50,
    "CON": 70,
    "SIZ": 40,
    "DEX": 50,
    "APP": 70,
    "INT": 70,
    "POW": 60,
    "EDU": 70,
    "LUC": 40,
    "occupation": "Ocupação",
    "HP": 10,
    "MAG": 12,
    "LUC_Temp": 40,
    "SAN_Temp": 50
}
```
### Atualizar um Personagem
```bash
    PUT /characters/:id
```
Corpo da Requisição: Semelhante ao de adicionar um personagem.

### Buscar Personagens
```bash
GET /characters
```
Parâmetros de Query: Filtros para busca (opcionais).

### Excluir um Personagem
```bash
DELETE /characters/:id
```

### Log de Operações
```bash
GET /logs
```
Retorna os logs das operações realizadas - Cliente -> Servidor -> Sequenciador Fixo -> Banco de Dados .

### Matar Servidor
```bash
GET /killDB

```
Desativa temporariamente um dos bancos de dados para simular falhas.

## 🧑‍💻 Contribuindo
1. Faça um fork do repositório
2. Crie uma nova branch: git checkout -b minha-nova-funcionalidade
3. Faça suas alterações e commite-as: git commit -m 'Adiciona nova funcionalidade'
4. Faça push para a branch: git push origin minha-nova-funcionalidade
5. Envie um pull request