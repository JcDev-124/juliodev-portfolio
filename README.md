# My Portfolio

Um portfólio pessoal desenvolvido com Spring Boot, apresentando projetos e habilidades profissionais.

## 🚀 Tecnologias

- **Backend:**
  - Java 17
  - Spring Boot
  - Spring Data JPA
  - PostgreSQL
  - Flyway (para migrações de banco de dados)
  - Maven

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript
  - Tailwind CSS
  - Font Awesome

## 📋 Pré-requisitos

- Java 17 ou superior
- Maven
- PostgreSQL
- Docker (opcional)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/myportfolio.git
cd myportfolio
```

2. Configure o banco de dados:
- Crie um banco de dados PostgreSQL chamado `myportfolio`
- Configure as credenciais no arquivo `application.properties`

3. Execute o projeto:
```bash
mvn spring-boot:run
```

## 🐳 Docker

O projeto pode ser executado usando Docker:

1. Construa a imagem:
```bash
docker build -t myportfolio .
```

2. Execute o container:
```bash
docker run -p 8080:8080 myportfolio
```

## 🌐 Acesso

Após iniciar o projeto, acesse:
- Aplicação: `http://localhost:8080`

## 🔒 Variáveis de Ambiente

Configure as seguintes variáveis de ambiente:
- `SPRING_DATASOURCE_USERNAME`: Usuário do banco de dados
- `SPRING_DATASOURCE_PASSWORD`: Senha do banco de dados

## 📝 Estrutura do Projeto

```
myportfolio/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/juliodev/myportfolio/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   └── resources/
│   │       ├── static/
│   │       └── templates/
│   └── test/
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```

## 🤝 Contribuindo

Este é um projeto pessoal e não está aberto para contribuições externas no momento.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Para mais informações, entre em contato através do formulário disponível no portfólio. 