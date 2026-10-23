document.addEventListener("DOMContentLoaded", () => {
    const radioComprimento = document.querySelectorAll('input[name="comprimento"]');
    const radioPerfil = document.querySelectorAll('input[name="perfil"]');

    const totalPriceEl = document.getElementById("total-price");
    const resCompEl = document.getElementById("res-comp");
    const resPerfilEl = document.getElementById("res-perfil");
    const whatsappBtn = document.getElementById("whatsapp-btn");

    function atualizarSimulador() {
        let precoBase = 120;
        let adicional = 0;
        let textoComprimento = "Até o ombro";
        let textoPerfil = "Volume leve";

        // Coleta o comprimento selecionado
        radioComprimento.forEach(radio => {
            if (radio.checked) {
                if (radio.value === "curto") {
                    precoBase = 120;
                    textoComprimento = "Até o ombro";
                } else if (radio.value === "longo") {
                    precoBase = 155;
                    textoComprimento = "Abaixo do ombro (Longo)";
                } else if (radio.value === "muito-longo") {
                    precoBase = 190;
                    textoComprimento = "Muito longo";
                }
            }
        });

        // Coleta o perfil dos fios selecionado
        radioPerfil.forEach(radio => {
            if (radio.checked) {
                if (radio.value === "leve") {
                    adicional = 0;
                    textoPerfil = "Volume leve";
                } else if (radio.value === "volumoso") {
                    adicional = 30;
                    textoPerfil = "Volumoso";
                }
            }
        });

        const totalFinal = precoBase + adicional;

        // Atualiza a interface
        totalPriceEl.textContent = `R$ ${totalFinal}`;
        resCompEl.textContent = textoComprimento;
        resPerfilEl.textContent = textoPerfil;

        const precoFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(totalFinal);
        const mensagem = encodeURIComponent(
            `*GEYSA LOPES | BEAUTY STUDIO*\n` +
            `Olá! Fiz uma simulação pelo site e gostaria de agendar uma avaliação.\n\n` +
            `*DETALHES DO MEU ATENDIMENTO*\n` +
            `• Serviço: Fitoterapia\n` +
            `• Comprimento: ${textoComprimento}\n` +
            `• Perfil dos fios: ${textoPerfil}\n` +
            `• Tempo estimado: De 2h30 a 3h\n\n` +
            `*VALOR SUGERIDO: ${precoFormatado}*\n` +
            `O valor final será confirmado após a avaliação dos fios.\n\n` +
            `Podemos combinar um horário?`
        );

        const numeroWhatsApp = "558881396926";
        whatsappBtn.href = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    }

    // Adiciona os eventos de escuta nos inputs
    radioComprimento.forEach(radio => radio.addEventListener("change", atualizarSimulador));
    radioPerfil.forEach(radio => radio.addEventListener("change", atualizarSimulador));

    // Executa no carregamento inicial
    atualizarSimulador();
});