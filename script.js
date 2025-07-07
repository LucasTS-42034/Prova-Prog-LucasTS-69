const mapaEstados = {
  "AC": { nome: "Acre", regiao: "Norte" },
  "AL": { nome: "Alagoas", regiao: "Nordeste" },
  "AP": { nome: "Amapá", regiao: "Norte" },
  "AM": { nome: "Amazonas", regiao: "Norte" },
  "BA": { nome: "Bahia", regiao: "Nordeste" },
  "CE": { nome: "Ceará", regiao: "Nordeste" },
  "DF": { nome: "Distrito Federal", regiao: "Centro-Oeste" },
  "ES": { nome: "Espírito Santo", regiao: "Sudeste" },
  "GO": { nome: "Goiás", regiao: "Centro-Oeste" },
  "MA": { nome: "Maranhão", regiao: "Nordeste" },
  "MT": { nome: "Mato Grosso", regiao: "Centro-Oeste" },
  "MS": { nome: "Mato Grosso do Sul", regiao: "Centro-Oeste" },
  "MG": { nome: "Minas Gerais", regiao: "Sudeste" },
  "PA": { nome: "Pará", regiao: "Norte" },
  "PB": { nome: "Paraíba", regiao: "Nordeste" },
  "PR": { nome: "Paraná", regiao: "Sul" },
  "PE": { nome: "Pernambuco", regiao: "Nordeste" },
  "PI": { nome: "Piauí", regiao: "Nordeste" },
  "RJ": { nome: "Rio de Janeiro", regiao: "Sudeste" },
  "RN": { nome: "Rio Grande do Norte", regiao: "Nordeste" },
  "RS": { nome: "Rio Grande do Sul", regiao: "Sul" },
  "RO": { nome: "Rondônia", regiao: "Norte" },
  "RR": { nome: "Roraima", regiao: "Norte" },
  "SC": { nome: "Santa Catarina", regiao: "Sul" },
  "SP": { nome: "São Paulo", regiao: "Sudeste" },
  "SE": { nome: "Sergipe", regiao: "Nordeste" },
  "TO": { nome: "Tocantins", regiao: "Norte" }
};
document.getElementById("cepForm").addEventListener("submit", async (event) => {
  const cepDigitado = document.getElementById("cep").value.replace(/\D/g, "");

  if (cepDigitado.length !== 8) {
    alert("CEP inválido. Deve conter 8 números.");
    return;
  }

  try {
    const resposta = await fetch(
      `https://viacep.com.br/ws/${cepDigitado}/json/`
    );
    const dados = await resposta.json();

    if (dados.erro) {
      alert("CEP não encontrado!");
      limparCampos();
      return;
    }

    document.getElementById("cepInfo").value = dados.cep || "";
    document.getElementById("rua").value = dados.logradouro || "Não disponível";
    document.getElementById("bairro").value = dados.bairro || "Não disponível";
    document.getElementById("cidade").value =
      dados.localidade || "Não disponível";
    document.getElementById("uf").value = dados.uf || "Não disponível";

    const infoEstado = mapaEstados[dados.uf];
    if (infoEstado) {
      document.getElementById("estado").value = infoEstado.nome;
      document.getElementById("regiao").value = infoEstado.regiao;
    } else {
      document.getElementById("estado").value = "Desconhecido";
      document.getElementById("regiao").value = "Desconhecida";
    }
  } catch (erro) {
    console.error("Erro ao buscar o CEP:", erro);
    alert("Erro ao consultar o CEP.");
  }
});

function limparCampos() {
  const campos = ["cepInfo", "rua", "bairro", "cidade", "uf", "estado"];
  campos.forEach((id) => (document.getElementById(id).value = ""));
}

document.getElementById("salvarCep").addEventListener("click", () => {
  nome;
  email;
  numb;
  const cep = document.getElementById("cepInfo").value;

  if (!cep) {
    alert("Consulte um CEP antes de salvar.");
    return;
  }

  let cepsSalvos = JSON.parse(localStorage.getItem("cepsSalvos")) || [];

  if (cepsSalvos.includes(cep)) {
    alert("Este CEP já está salvo.");
    return;
  } else if (cepsSalvos.includes(nome)) {
    alert("Este nome já está salvo.");
    return;
  } else if (cepsSalvos.includes(email)) {
    alert("Este email já está salvo");
    return;
  } else if (cepsSalvos.includes(numb)) {
    alert("Este número já está salvo.");
    return;
  }

  cepsSalvos.push(cep);
  localStorage.setItem("cepsSalvos", JSON.stringify(cepsSalvos));

  mostrarCeps();
});

function mostrarCeps() {
  const lista = document.getElementById("listaCeps");
  lista.innerHTML = "";

  const cepsSalvos = JSON.parse(localStorage.getItem("cepsSalvos")) || [];

  cepsSalvos.forEach((cep, index) => {
    const li = document.createElement("li");
    li.textContent =
      nome +
      "\n" +
      email +
      "\n" +
      num +
      "\n" +
      document.getElementById("cepInfo").value +
      "\n" +
      document.getElementById("rua").value +
      "\n" +
      document.getElementById("bairro").value +
      "\n" +
      document.getElementById("cidade").value +
      "\n";

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.style.marginLeft = "10px";

    btn.addEventListener("click", () => {
      cepsSalvos.splice(index, 1);
      localStorage.setItem("cepsSalvos", JSON.stringify(cepsSalvos));
      mostrarCeps();
    });

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

mostrarCeps();
