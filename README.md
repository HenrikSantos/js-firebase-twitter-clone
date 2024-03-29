# Twitter Clone

Este é um projeto de clone do Twitter desenvolvido utilizando Firestore, Next.js, Zustand, Jest e Tailwind CSS. O objetivo principal deste projeto é replicar algumas das funcionalidades básicas do Twitter, permitindo aos usuários criar postagens, comentar postagens e dar "like".

## Funcionalidades

- **Login do Google:** Os usuários podem autenticar-se através do login do Google usando o Firebase Authentication.
- **Criar Postagem:** Os usuários podem criar novas postagens, compartilhando seus pensamentos.
- **Comentar Postagem:** Os usuários podem interagir com as postagens existentes, deixando comentários.
- **Dar Like:** Os usuários podem expressar sua apreciação por uma postagem dando "like".

## Tecnologias Utilizadas

- **Firestore:** Um banco de dados NoSQL em tempo real oferecido pela Firebase, utilizado para armazenar os dados das postagens e dos comentários.
- **Next.js:** Um framework React que oferece funcionalidades avançadas como renderização do lado do servidor e geração de páginas estáticas, utilizado para construir a aplicação web.
- **Zustand:** Uma biblioteca de gerenciamento de estado simples para React, utilizada para gerenciar o estado global da aplicação.
- **Jest:** Um framework de teste de JavaScript, utilizado para escrever testes unitários automatizados para garantir a qualidade do código.
- **Tailwind CSS:** Um framework CSS utilitário que permite criar designs bonitos e responsivos de forma rápida, utilizado para estilizar a interface do usuário.
- **Firebase Authentication:** Um serviço oferecido pela Firebase para autenticação de usuários, utilizado para autenticar os usuários via login do Google.

## Implantação
** O aplicativo frontend está implantado na Vercel em [https://js-firebase-twitter-clone.vercel.app/](https://js-firebase-twitter-clone.vercel.app/).

## Testes
1. **Instalação das Dependências:**
   ```bash
   npm install
   ```

2. **Rodar os testes:**
   ```bash
   npm test
   ```

   ```bash
   npm run test:coverage
   ```
