// ===== CONFIRMAÇÃO DE EXCLUSÃO =====
function confirmarDelete(id) {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
        const form = document.getElementById('delete-form-' + id);
        if (form) {
            form.submit();
        } else {
            // Fallback: criar formulário dinamicamente
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/deletar/' + id;
            document.body.appendChild(form);
            form.submit();
        }
    }
}

// ===== ALTERNAR TEMA (CLARO/ESCURO) com ícones Font Awesome =====
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    const newTheme = isDark ? 'claro' : 'escuro';

    // Alternar classe no body
    body.classList.toggle('dark-mode');

    // Atualizar ícone do botão
    const themeIcon = document.getElementById('theme-icon');
    const themeBtn = document.getElementById('theme-btn');

    if (themeIcon) {
        if (newTheme === 'escuro') {
            // Modo escuro: mostrar sol (para voltar ao claro)
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#f1c40f';
            if (themeBtn) themeBtn.title = 'Modo Claro';
        } else {
            // Modo claro: mostrar lua (para voltar ao escuro)
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '#f0f0f0';
            if (themeBtn) themeBtn.title = 'Modo Escuro';
        }
    }

    // Salvar preferência em cookie via AJAX
    fetch('/tema', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'tema=' + newTheme
    })
    .then(response => {
        if (!response.ok) {
            console.error('Erro ao salvar tema');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// ===== CARREGAR TEMA SALVO =====
function loadTheme() {
    // Verificar se há cookie de tema
    const cookies = document.cookie.split(';');
    let tema = 'claro';

    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'tema') {
            tema = value;
            break;
        }
    }

    const themeIcon = document.getElementById('theme-icon');
    const themeBtn = document.getElementById('theme-btn');

    if (tema === 'escuro') {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#f1c40f';
            if (themeBtn) themeBtn.title = 'Modo Claro';
        }
    } else {
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '#f0f0f0';
            if (themeBtn) themeBtn.title = 'Modo Escuro';
        }
    }
}

// ===== AUTO-FECHAR ALERTAS =====
function autoCloseAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const closeButton = alert.querySelector('.btn-close');
            if (closeButton) {
                closeButton.click();
            }
        }, 5000);
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL =====
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });

            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    });
}

// ===== FILTRO DE LIVROS =====
function filtrarLivros() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    let encontrados = 0;

    cards.forEach(card => {
        const cardContainer = card.closest('.col-md-4') || card.parentElement;
        const title = card.querySelector('.card-title');
        const author = card.querySelector('.card-subtitle');

        if (title && author) {
            const text = title.textContent.toLowerCase() + ' ' + author.textContent.toLowerCase();
            if (searchTerm === '' || text.includes(searchTerm)) {
                cardContainer.style.display = '';
                encontrados++;
            } else {
                cardContainer.style.display = 'none';
            }
        }
    });

    // Mostrar mensagem se nenhum livro for encontrado
    const noResults = document.getElementById('no-results');
    if (noResults) {
        if (encontrados === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

// ===== CONTADOR DE VISUALIZAÇÕES =====
function incrementarVisualizacao() {
    fetch('/contador', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar contador');
        }
        return response.json();
    })
    .then(data => {
        const contador = document.getElementById('contador-visitas');
        if (contador) {
            contador.textContent = data.visitas || '0';
        }
    })
    .catch(error => {
        console.error('Erro ao incrementar visualização:', error);
        // Fallback: usar localStorage
        let visitas = localStorage.getItem('visitas') || 0;
        visitas = parseInt(visitas) + 1;
        localStorage.setItem('visitas', visitas);
        const contador = document.getElementById('contador-visitas');
        if (contador) {
            contador.textContent = visitas;
        }
    });
}

// ===== FUNÇÃO PARA CONFIRMAR AÇÕES =====
function confirmarAcao(mensagem) {
    return confirm(mensagem || 'Tem certeza que deseja realizar esta ação?');
}

// ===== TOGGLE VISIBILIDADE DE SENHA (opcional) =====
function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (input && button) {
        button.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                button.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                button.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
}

// ===== MÁSCARA PARA CAMPOS (opcional) =====
function aplicarMascaraTelefone(input) {
    if (!input) return;

    input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 2) {
                value = '(' + value;
            } else if (value.length <= 6) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            } else {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
            }
        }
        this.value = value;
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    loadTheme();

    // Auto-fechar alertas
    autoCloseAlerts();

    // Configurar validação de formulários
    setupFormValidation();

    // Incrementar contador de visualizações
    incrementarVisualizacao();

    // Configurar filtro de livros (se existir)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarLivros);
    }

    // Adicionar listener para tecla ESC fechar alertas
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => {
                const closeButton = alert.querySelector('.btn-close');
                if (closeButton) {
                    closeButton.click();
                }
            });
        }
    });
});

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.confirmarDelete = confirmarDelete;
window.toggleTheme = toggleTheme;
window.filtrarLivros = filtrarLivros;
window.confirmarAcao = confirmarAcao;
window.togglePasswordVisibility = togglePasswordVisibility;