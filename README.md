```markdown
# Lista de Desejos de Livros

Uma aplicação web desenvolvida em **Flask** para gerenciar uma lista de desejos de livros, permitindo ao usuário cadastrar, visualizar, editar e deletar livros, além de alternar entre temas claro e escuro.

## Funcionalidades

- **CRUD Completo**: Create, Read, Update e Delete de livros
- **Tema Claro/Escuro**: Preferência salva em cookie
- **Filtro de Livros**: Busca por título ou autor
- **Responsivo**: Compatível com dispositivos móveis
- **Mensagens Flash**: Notificações de sucesso/erro
- **Interface Intuitiva**: Design limpo e moderno com Bootstrap

## Tecnologias Utilizadas

- **Backend**: Python 3.12 + Flask
- **Banco de Dados**: SQLite + Flask-SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework CSS**: Bootstrap 5.3
- **Ícones**: Font Awesome 6.4
- **Templates**: Jinja2

## Pré-requisitos

- Python 3.8 ou superior
- Pip (gerenciador de pacotes do Python)
- Git (opcional, para clonar o repositório)

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/lista-desejos-livros.git
cd lista-desejos-livros
```

### 2. Criar e ativar o ambiente virtual

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Instalar as dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar o banco de dados

O banco de dados será criado automaticamente na primeira execução. Para criar manualmente:

```bash
python
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

### 5. Executar a aplicação

```bash
python app.py
```

A aplicação estará disponível em: `http://127.0.0.1:5000`

## Estrutura do Projeto

```
lista-desejos-livros/
│
├── instance/
│   └── desejos.db              # Banco de dados SQLite
│
├── static/
│   ├── css/
│   │   └── style.css           # Estilos personalizados
│   └── js/
│       └── main.js             # JavaScript personalizado
│
├── templates/
│   ├── base.html               # Template base com navbar e footer
│   ├── index.html              # Página inicial - lista todos os livros
│   ├── cadastro.html           # Formulário para cadastrar livros
│   ├── detalhe.html            # Detalhes de um livro específico
│   └── editar.html             # Formulário para editar livros
│
├── app.py                      # Aplicação principal Flask
├── requirements.txt            # Dependências do projeto
├── .gitignore                  # Arquivos ignorados pelo Git
└── README.md                   # Documentação do projeto
```

## Rotas da Aplicação

| Rota | Método | Descrição |
|------|--------|-----------|
| `/` | GET | Página inicial com lista de livros |
| `/livro/<int:livro_id>` | GET | Detalhes de um livro específico |
| `/cadastro` | GET/POST | Formulário para cadastrar novo livro |
| `/editar/<int:editar_id>` | GET/POST | Formulário para editar livro existente |
| `/deletar/<int:deletar_id>` | POST | Excluir um livro |
| `/tema` | POST | Alternar tema claro/escuro |

## Modelo de Dados

### Livro

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Integer | Chave primária (auto increment) |
| `titulo` | String(100) | Título do livro (obrigatório) |
| `autor` | String(100) | Autor do livro (obrigatório) |
| `status` | String(20) | Status do livro (Quero Ler/Lendo/Lido) |

## Personalização

### Alterar Cores do Tema

No arquivo `static/css/style.css`, você pode modificar as cores principais:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #27ae60;
    --danger-color: #e74c3c;
    --warning-color: #f39c12;
}
```

### Adicionar Novos Status

No arquivo `templates/cadastro.html` e `templates/editar.html`, adicione novas opções no `<select>`:

```html
<option value="Novo Status">Novo Status</option>
```

## Testes

Para testar a aplicação, você pode usar os seguintes comandos:

```bash
# Verificar se todas as rotas estão funcionando
curl http://127.0.0.1:5000/

# Testar cadastro de livro
curl -X POST http://127.0.0.1:5000/cadastro \
  -d "titulo=O Senhor dos Anéis" \
  -d "autor=J.R.R. Tolkien" \
  -d "status=Quero Ler"
```

## 🐛 Possíveis Problemas e Soluções

### Erro: `TemplateNotFound`
**Solução:** Verifique se a pasta se chama `templates` (plural) e não `template`.

### Erro: `sqlite3.OperationalError: no such table`
**Solução:** Execute `python -c "from app import app, db; with app.app_context(): db.create_all()"`

### Erro: `ModuleNotFoundError: No module named 'flask'`
**Solução:** Ative o ambiente virtual e instale as dependências:
```bash
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

## Contato

**Desenvolvedor:** Laura  
**Email:** urbaantuneslaura@gmail.com
**GitHub:** [seu-usuario](https://github.com/LauraUrba)

## Checklist de Entrega

- ✅ 5 rotas principais (Home, Detalhe, Cadastro, Editar, Deletar)
- ✅ Rota com parâmetro na URL (`/livro/<int:livro_id>`)
- ✅ Modelo SQLAlchemy com 4 campos
- ✅ Operações CRUD completas
- ✅ Templates Jinja2 com herança
- ✅ Formulários com validação no servidor
- ✅ Cookies para tema claro/escuro
- ✅ Sessão para contador de visitas
- ✅ Flash messages para feedback
- ✅ CSS personalizado
- ✅ JavaScript para interações
- ✅ README.md completo

Agora seu projeto está completo e pronto para ser entregue! 🎉📚
