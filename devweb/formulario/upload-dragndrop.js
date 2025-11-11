const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fotoDrop");
const fileName = document.getElementById("fileName");

// Clicar na área abre o seletor de arquivo
dropZone.addEventListener("click", () => fileInput.click());

// Exibe nome ao selecionar por clique
fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
        fileName.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
    }
});

// Previne comportamento padrão do navegador
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");

    if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        fileInput.files = e.dataTransfer.files;
        fileName.textContent = `Arquivo arrastado: ${file.name}`;
    }
});
