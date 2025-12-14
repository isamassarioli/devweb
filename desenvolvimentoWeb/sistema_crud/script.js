// JavaScript - Sistema CRUD de Tarefas (Versão Antiga)

let tarefaParaDeletar = null;

function abrirModalExclusao(id, nomeTarefa) {
    tarefaParaDeletar = id;
    const mensagem = `Deseja realmente deletar a tarefa "<strong>${nomeTarefa}</strong>"?`;
    document.getElementById('mensagemExclusao').innerHTML = mensagem;
    
    const modal = new bootstrap.Modal(document.getElementById('modalExclusao'));
    modal.show();
}

function confirmarExclusao() {
    if (tarefaParaDeletar !== null) {
        console.log(`Tarefa ${tarefaParaDeletar} deletada.`);
        
        const toastElement = document.getElementById('toastSucesso');
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
        
        const modalElement = document.getElementById('modalExclusao');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        
        setTimeout(() => {
            alert('Tarefa deletada com sucesso! (Simulado)');
        }, 500);
        
        tarefaParaDeletar = null;
    }
}

const form = document.getElementById('formNovaTarefa');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            const toastElement = document.getElementById('toastSucesso');
            if (toastElement) {
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
            }
            
            setTimeout(() => {
                window.location.href = 'lista.html';
            }, 1500);
        }
    });
}

const formEditar = document.getElementById('formEditarTarefa');
if (formEditar) {
    formEditar.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!formEditar.checkValidity()) {
            formEditar.classList.add('was-validated');
        } else {
            const toastElement = document.getElementById('toastSucesso');
            if (toastElement) {
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
            }
            
            setTimeout(() => {
                window.location.href = 'lista.html';
            }, 1500);
        }
    });
}

console.log('Sistema CRUD de Tarefas carregado com sucesso!');
