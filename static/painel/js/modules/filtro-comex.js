function caixaMsgbox(m) {
    var Largura = window.innerWidth;
    var Altura = window.innerHeigth;

    var Objetos = document.getElementById("Componentes");
    var Caixa = document.getElementById("CaixaMensagem");

    Objetos.style.display = "block";
    Objetos.style.heigth = Altura + "px";

    Caixa.style.left = (Largura / 2) - (550 * .5) + "px";
    Caixa.style.top = "80px";
    Caixa.style.display = "block";

    document.getElementById("TituloMsg").innerHTML = "AVISO";
    document.getElementById("CorpoMsg").innerHTML = m;
    document.getElementById("RodapeMsg").innerHTML = '<button class = "orange" onclick= " Fechar()"> <b> <font color= "black" size = "5">Fechar</font></b></button>';
}

function Fechar() {
    document.getElementById("CaixaMensagem").style.display = "none";
    document.getElementById("Componentes").style.display = "none";
}

// document.getElementById("ListaAno").addEventListener("change", processoano);
// document.getElementById("ListaMes").addEventListener("change", processoano);
// document.getElementById("botao").addEventListener("click", processoano);

function processoano() {
    var node = document.getElementById("CorpoTabela");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    var ano = document.getElementById("ListaAno").value;
    var mes = document.getElementById("ListaMes").value;

    if (ano == "Escolha um ano") {
        ano = "";
    }

    if (mes == "Escolha um mês") {
        mes = "";
    }

    var dadosrelatorio = {
        ano: ano,
        mes: mes,
    };

    google.script.run.withSuccessHandler(GerarTabela).Rel(dadosrelatorio);

}

function GerarTabela(Carregar) {

    if (Carregar == "Não existem dados para este filtro") {
        var m = "NÃO EXISTEM DADOS PARA ESTE FILTRO!";
        caixaMsgbox(m);
        return;
    }

    var CorpoTabela = document.getElementById("CorpoTabela");

    Carregar.forEach(function (r) {
        var Linha = document.createElement("tr");

        var Coluna1 = document.createElement("td");
        Coluna1.textContent = r[0];
        var Coluna2 = document.createElement("td");
        Coluna2.textContent = r[1];
        var Coluna3 = document.createElement("td");
        Coluna3.textContent = r[2];
        var Coluna4 = document.createElement("td");
        Coluna4.textContent = r[3];
        var Coluna5 = document.createElement("td");
        Coluna5.textContent = r[4];
        var Coluna6 = document.createElement("td");
        Coluna6.textContent = r[5];
        var Coluna7 = document.createElement("td");
        Coluna7.textContent = r[6];
        var Coluna8 = document.createElement("td");
        Coluna8.textContent = r[7];
        var Coluna9 = document.createElement("td");
        Coluna9.textContent = r[8];
        var Coluna10 = document.createElement("td");
        Coluna10.textContent = r[9];
        var Coluna11 = document.createElement("td");
        Coluna11.textContent = r[10];
        var Coluna12 = document.createElement("td");
        Coluna12.textContent = r[11];
        var Coluna13 = document.createElement("td");
        Coluna13.textContent = r[12];
        var Coluna14 = document.createElement("td");
        Coluna14.textContent = r[13];

        Linha.appendChild(Coluna1);
        Linha.appendChild(Coluna2);
        Linha.appendChild(Coluna3);
        Linha.appendChild(Coluna4);
        Linha.appendChild(Coluna5);
        Linha.appendChild(Coluna6);
        Linha.appendChild(Coluna7);
        Linha.appendChild(Coluna8);
        Linha.appendChild(Coluna9);
        Linha.appendChild(Coluna10);
        Linha.appendChild(Coluna11);
        Linha.appendChild(Coluna12);
        Linha.appendChild(Coluna13);
        Linha.appendChild(Coluna14);

        CorpoTabela.appendChild(Linha);
    });
}

$(document).ready(function () {
    $("#btnexportar").click(function (e) {
        e.preventDefault();

        var DivTabela = document.getElementById('divTabela');
        var Dados = new Blob(['\ufeff' + DivTabela.outerHTML], { type: 'application/vnd.ms-excel' });
        var url = window.URL.createObjectURL(Dados);

        var a = document.createElement('a');

        a.href = url;

        a.download = 'Dados Filtro'

        a.click();
    });
});