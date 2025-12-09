document.addEventListener("DOMContentLoaded", () => {
    const campoNomePais = document.getElementById("pais");
    const campoCapital = document.getElementById("capital");
    const campoContinente = document.getElementById("regiao");
    const campoPopulacao = document.getElementById("populacao");
    const imagemBandeira = document.getElementById("bandeira");
    const botaoPesquisar = document.getElementById("btnBuscar");
    const divResultado = document.getElementById("resultado");

    botaoPesquisar.addEventListener("click", buscarInformacoesPais);
    
    campoNomePais.addEventListener("keypress", (evento) => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            buscarInformacoesPais();
        }
    });

    async function buscarInformacoesPais() {
        const nomePais = campoNomePais.value.trim();

        if (!nomePais) {
            alert("Por favor, insira o nome de um país!");
            return;
        }

        try {
            divResultado.classList.add("hidden");
            botaoPesquisar.textContent = "Buscando...";
            botaoPesquisar.disabled = true;

            const apiURL = `https://restcountries.com/v3.1/name/${nomePais}`;
            const respostaAPI = await fetch(apiURL);

            if (!respostaAPI.ok) {
                throw new Error("País não localizado. Verifique o nome e tente novamente.");
            }

            const dadosPaises = await respostaAPI.json();
            const infoPais = dadosPaises[0];

            campoCapital.value = infoPais.capital ? infoPais.capital[0] : "Informação não disponível";
            campoContinente.value = infoPais.region || "Informação não disponível";
            campoPopulacao.value = infoPais.population.toLocaleString("pt-BR") + " habitantes";
            imagemBandeira.src = infoPais.flags.png;
            imagemBandeira.alt = `Bandeira de ${infoPais.name.common}`;

            divResultado.classList.remove("hidden");

        } catch (erro) {
            alert("Erro: " + erro.message);
            console.error("Erro na busca:", erro);
        } finally {
            botaoPesquisar.textContent = "Pesquisar";
            botaoPesquisar.disabled = false;
        }
    }
});