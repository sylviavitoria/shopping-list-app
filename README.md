# 📱 Shopping List App

Um aplicativo mobile de lista de compras desenvolvido com React Native e Expo, com sincronização em tempo real via Firebase Firestore.

---

## 🚀 Funcionalidades

- ✅ **Gerenciamento de Itens:** Adicionar, marcar como concluído e remover itens  
- 🏷️ **Categorização:** Organização por categorias (Hortifruti, Bebidas, Limpeza, Laticínios, Alimentos, Higiene, Outros)  
- 🔍 **Filtros:** Visualizar todos os itens, apenas pendentes ou concluídos  
- 📤 **Compartilhamento:** Compartilhar lista formatada via apps nativos do dispositivo  
- 🔄 **Sincronização:** Dados persistidos e sincronizados via Firebase Firestore  
- 📱 **Interface Responsiva:** Design adaptativo com componentes reutilizáveis  

---

## 🛠️ Stack Utilizada

### Frontend

- **React Native** – Framework para desenvolvimento mobile  
- **Expo** – Plataforma de desenvolvimento e deployment  
- **TypeScript** – Tipagem estática  
- **Expo Router** – Navegação baseada em sistema de arquivos  

### Backend & Database

- **Firebase** – Backend as a Service  
- **Firebase Firestore** – Banco de dados NoSQL em tempo real  

### UI/UX

- **Expo Vector Icons** – Ícones  
- **React Native Gesture Handler** – Gestos e interações  
- **React Native Reanimated** – Animações performáticas  

### Testes

- **Jest** – Framework de testes  
- **React Native Testing Library** – Testes de componentes  
- **Coverage Reports** – Relatórios de cobertura de testes  

---

## 🎨 Imagens do layout

Abaixo esta a imagem que ilustra o layout e o funcionamento da aplicação.

<img src="https://github.com/user-attachments/assets/78477f76-0e9a-40c0-bcc6-8ab2c7811712" alt="Lista de compras" width="300"/>

---

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **MVVM** de forma bem definida:

```
src/
├── models/                    # MODEL LAYER
│   └── ShoppingItem.ts       # Definições de tipos e interfaces
├── service/                   # SERVICE LAYER (parte do Model)
│   ├── shoppingItemService.ts # Serviços de dados
│   ├── CompartilharService.ts # Serviços de compartilhamento
│   └── config/
│       └── firebase.ts       # Configuração do Firebase
├── hooks/                     # VIEWMODEL LAYER
│   └── useShoppingList.ts    # Lógica de negócio e estado
├── components/                # VIEW LAYER
│   ├── EstadoLista.tsx       # Estado da lista (loading, erro, vazio)
│   ├── FiltroLista.tsx       # Filtros de visualização
│   ├── FormularioItem.tsx    # Formulário de adição
│   ├── Header.tsx            # Cabeçalho
│   ├── ItemLista.tsx         # Item individual da lista
│   └── ListaAgrupadaPorCategoria.tsx # Lista agrupada
└── pages/                     # VIEW LAYER
    └── Home.tsx              # Tela principal
```

### 📂 Responsabilidades por Camada

#### **Model Layer**
- `ShoppingItem.ts`: Define interfaces e tipos para os dados  
- `shoppingItemService.ts`: Operações CRUD no Firebase  
- `CompartilharService.ts`: Lógica de compartilhamento  

#### **ViewModel Layer**
- `useShoppingList.ts`: Custom hook que gerencia:  
  - Estado da aplicação  
  - Operações assíncronas  
  - Lógica de negócio  
  - Comunicação com os serviços  

#### **View Layer**
- Componentes React Native responsáveis apenas pela apresentação  
- Não contêm lógica de negócio  
- Comunicando-se com o ViewModel   

---

## 🔍 Decisões Técnicas Tomadas

### 1. **Escolha do Expo Framework**
- **Decisão:** Usar Expo 
  - **Facilidade de configuração:** Zero setup para começar desenvolvimento
  - **Pré-configuração:** Facilita o desenvolvimento
  - **Build na nuvem:** Elimina necessidade de configurar Android Studio/Xcode
  - **Uso do Expo Go:** Facilidade ao utilizar o aplicativo do Expo para rodar a aplicação

### 2. **EAS Build para Geração de APK**
- **Decisão:** Usar EAS Build 
  - **Simplicidade:** Não precisa configurar ambiente Android
  - **Integração:** Integrado com Expo 
  - **Distribuição:** Link direto para download do APK

### 3. **Arquitetura MVVM com Custom Hooks**
- **Decisão:** Implementar MVVM usando React Hooks 
  - Separação clara de responsabilidades
  - Facilita testes unitários
  - Reutilização de lógica de negócio

### 4. **Firebase como Backend**
- **Decisão:** Usar Firebase Firestore   
  - Sincronização em tempo real  
  - Escalabilidade automática  
  - Redução de complexidade no backend

### 5. **Expo Router**
- **Decisão:** Usar Expo Router para navegação  
  - Roteamento baseado em arquivos   
  - Facilidade, pois tem integração nativa com Expo

### 6. **Categorização de Itens**  
- **Decisão:** Implementar sistema de categorias predefinidas   
  - Melhor organização visual  
  - Facilita a experiência de compra  
  - Permite agrupamento lógico  

### 7. **Filtros de Visualização**  
- **Decisão:** Implementar filtros (Todos, Pendentes, Concluídos)   
  - Melhora a usabilidade  
  - Permite foco em itens específicos  
  - Possibilita compartilhamento filtrado (ex: apenas pendentes)

### 8. **Compartilhamento Nativo**  
- **Decisão:** Usar React Native Share API  
  - Integração com apps nativos do dispositivo (WhatsApp, Email, etc.) 
  - Facilita colaboração  
  - Simplicidade de configuração

### 9. **Gestão de Estado Local**  
- **Decisão:** Usar React Hooks para estado local   
  - Simplicidade para o escopo atual  
  - Reduz dependencies externas  
  - Adequado para aplicação de tamanho médio  

### 10. **Styling com StyleSheet**  
- **Decisão:** Usar React Native StyleSheet  
  - Performance otimizada  
  - Simplicidade para o escopo atual

### 11. **Expo Vector Icons**
- **Decisão:** Usar Expo Vector Icons em vez de imagens
  - **Consistência:** Biblioteca completa com estilo uniforme
  - **Integração:** Funciona perfeitamente com Expo
  - **Simplicidade:** Por ser um recurso do Expo, é fácil de utilizar

### 12. **React Native Gesture Handler**
- **Decisão:** Usar para interações touch  
- **Justificativas:**
  - **Performance:** Gestos processados na thread nativa  
  - **Experiência nativa:** Comportamento igual aos apps nativos  
  - **Responsividade:** Interações mais fluidas
 
---

## 🧪 Testes

O projeto utiliza **Jest** e **Testing Library** para testes unitários.  
Execute os testes com os comandos abaixo:

```bash
npm run test           # Executa todos os testes
npm run test:coverage  # Gera relatório de cobertura
```

---

# 🌬️ Como Executar

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Conta no [expo.dev](https://expo.dev)(para gerar APK)

---

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/sylviavitoria/shopping-list-app.git
cd shopping-list-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto em modo de **desenvolvimento** com o aplicativo Expo Go
```bash
npx expo start
```
> Isso abrirá o Metro Bundler com um QR code.

### 4. Visualize o app no seu dispositivo
- Instale o Expo Go no seu celular (Android/iOS)  
- Escaneie o QR code gerado no terminal  
- O app será carregado automaticamente  

---

## 📦 Como Gerar o APK para Instalação

### ✅ Pré-requisitos
- Conta gratuita no [Expo](https://expo.dev)
- EAS CLI instalado globalmente

### 🔨 Passo a passo

#### 1. Instale o EAS CLI (caso ainda não tenha)
```bash
npm install -g eas-cli
```

#### 2. Faça login na sua conta Expo
```bash
eas login
```

#### 3. Gere o APK diretamente do terminal
```bash
eas build -p android --profile preview
```

#### 3. Aguarde o build ser concluído
- O processo pode levar de alguns minutos  
- O APK ficará disponível na sua conta expo.dev

#### 4. Acesse o APK gerado
- Vá para [expo.dev](https://expo.dev)  
- Faça login na sua conta  
- Acesse "Projects" → "shopping-list-app"  
- Clique no build mais recente  
- Baixe o APK pelo link ou QR code  
   
