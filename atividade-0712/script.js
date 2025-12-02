// JavaScript - Formulário de Contato

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    e.target.value = value;
});

// Máscara para Telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.substring(0, 3) + ') ' + value.substring(3);
    }
    if (value.length > 9) {
        value = value.substring(0, 9) + '-' + value.substring(9, 13);
    }
    e.target.value = value;
});

// Máscara para Celular
document.getElementById('celular').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.substring(0, 3) + ') ' + value.substring(3);
    }
    if (value.length > 10) {
        value = value.substring(0, 10) + '-' + value.substring(10, 14);
    }
    e.target.value = value;
});

// Buscar CEP
document.getElementById('buscarCep').addEventListener('click', buscarCEP);
document.getElementById('cep').addEventListener('blur', buscarCEP);

function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        return;
    }

    // Mostra loading
    document.getElementById('buscarCep').innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
            } else {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                document.getElementById('numero').focus();
            }
        })
        .catch(error => {
            alert('Erro ao buscar CEP!');
            console.error('Erro:', error);
        })
        .finally(() => {
            document.getElementById('buscarCep').innerHTML = 'Buscar';
        });
}

// Funções de validação customizadas
function validarTelefone() {
    const telefoneInput = document.getElementById('telefone');
    const telefone = telefoneInput.value.replace(/\D/g, '');
    
    // Se o campo estiver vazio e não for obrigatório, é válido
    if (telefone.length === 0) {
        telefoneInput.setCustomValidity('');
        return true;
    }
    
    // Se preenchido, deve ter 10 dígitos (DDD + 8 dígitos)
    if (telefone.length !== 10) {
        telefoneInput.setCustomValidity('O telefone deve ter 10 dígitos (DDD + número).');
        return false;
    }
    
    telefoneInput.setCustomValidity('');
    return true;
}

function validarCelular() {
    const celularInput = document.getElementById('celular');
    const celular = celularInput.value.replace(/\D/g, '');
    
    // Celular é obrigatório e deve ter 11 dígitos (DDD + 9 dígitos)
    if (celular.length !== 11) {
        celularInput.setCustomValidity('O celular deve ter 11 dígitos (DDD + 9 dígitos).');
        return false;
    }
    
    celularInput.setCustomValidity('');
    return true;
}

function validarCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        cepInput.setCustomValidity('O CEP deve ter 8 dígitos.');
        return false;
    }
    
    cepInput.setCustomValidity('');
    return true;
}

function validarEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        emailInput.setCustomValidity('Por favor, insira um e-mail válido.');
        return false;
    }
    
    emailInput.setCustomValidity('');
    return true;
}

// Adiciona validação em tempo real
document.getElementById('telefone').addEventListener('blur', validarTelefone);
document.getElementById('celular').addEventListener('blur', validarCelular);
document.getElementById('cep').addEventListener('input', validarCEP);
document.getElementById('email').addEventListener('blur', validarEmail);

// Validação do Formulário
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    // Executa todas as validações customizadas
    const telefoneValido = validarTelefone();
    const celularValido = validarCelular();
    const cepValido = validarCEP();
    const emailValido = validarEmail();

    // Verifica se o formulário é válido (validação HTML5 + customizada)
    if (form.checkValidity() && telefoneValido && celularValido && cepValido && emailValido) {
        // Mostra toast de sucesso
        const toast = new bootstrap.Toast(document.getElementById('successToast'));
        toast.show();
        
        // Reseta o formulário após 2 segundos
        setTimeout(() => {
            form.reset();
            form.classList.remove('was-validated');
        }, 2000);
    } else {
        // Força a validação visual
        form.classList.add('was-validated');
    }
});
