$(document).ready(function () {
    MaxRegistros();
    ShowAllDataRegistrosGeral();
});



const GoogleRegistros = 'AKfycbx-VBkpR0FPYVp2sOJLkStzXrxqri5dg1lFlnw79fH7LR4vEyMhx25WQfmqDWilxaa7TQ';
// script file sig-reg-vendas
var linkAction = 'https://script.google.com/macros/s/AKfycbx-VBkpR0FPYVp2sOJLkStzXrxqri5dg1lFlnw79fH7LR4vEyMhx25WQfmqDWilxaa7TQ/exec';
var linkFormAction = document.querySelector('#form-action');
linkFormAction.setAttribute('action', linkAction);



function MaxRegistros() {
    $.getJSON('https://script.google.com/macros/s/' + GoogleRegistros + '/exec?page=max',
        function (data) {
            $('input[name="inv_no"]').val(data);
        });
}

function SearchRegistros(pNo = '') {
    var no = $('#inv_no').val();
    if (pNo != '') no = pNo;

    $.getJSON('https://script.google.com/macros/s/' + GoogleRegistros + '/exec?page=search&no=' + no,
        function (data) {
            if (data == 'NOT FOUND') {
                alert('Número Não Encontrado!!!');
            }
            else {
                var record = data.record;

                var StartRow = data.SR;
                var RowCount = data.CNT;

                $('#IsNew').val('N');
                $('#StartRow').val(StartRow);
                $('#RowCount').val(RowCount);

                var i = 0;
                $.each(record, function (key, value) {
                    if (i == 0) {
                        var dt_registro = value[29].substring(0, 10);
                        var dt_envio = value[30].substring(0, 10);
                        var dt_vencto = value[31].substring(0, 10);
                        var dt_quitacao = value[33].substring(0, 10);
                        document.getElementsByName('inv_no')[0].value = value[0];
                        document.getElementsByName('ref_completa')[0].value = value[1];
                        document.getElementsByName('sigla_pleno')[0].value = value[2];
                        document.getElementsByName('ref_siscomex')[0].value = value[3];
                        document.getElementsByName('nome_cliente')[0].value = value[4];

                        document.getElementsByName('ref_cliente')[0].value = value[6];
                        document.getElementsByName('observacao')[0].value = value[19];
                        document.getElementsByName('status_pgto')[0].value = value[8];
                        document.getElementsByName('nf_1')[0].value = value[9];
                        document.getElementsByName('nf_2')[0].value = value[10];

                        document.getElementsByName('nf_3')[0].value = value[11];
                        document.getElementsByName('nf_4')[0].value = value[12];
                        document.getElementsByName('nf_5')[0].value = value[13];
                        document.getElementsByName('pref_1')[0].value = value[15];
                        document.getElementsByName('pref_2')[0].value = value[16];

                        document.getElementsByName('pref_3')[0].value = value[17];
                        document.getElementsByName('pref_4')[0].value = value[18];
                        document.getElementsByName('cnpj')[0].value = value[24];
                        document.getElementsByName('razao_social')[0].value = value[25];
                        document.getElementsByName('cod_parceiro')[0].value = value[26];

                        document.getElementsByName('analista')[0].value = value[7];
                        document.getElementsByName('conta')[0].value = value[27];

                        document.getElementsByName('tipo_conta')[0].value = value[28];
                        document.getElementsByName('data_registro')[0].value = dt_registro;
                        document.getElementsByName('data_envio')[0].value = dt_envio;
                        document.getElementsByName('data_vencto')[0].value = dt_vencto;
                        document.getElementsByName('reg_total')[0].value = value[14];

                        document.getElementsByName('status_registro')[0].value = value[32];
                        document.getElementsByName('data_quitacao')[0].value = dt_quitacao;
                    }
                    else {
                        if (i > 1) BtnAdd();
                        document.getElementsByName('num_nf')[i].value = value[33];
                        document.getElementsByName('cod_item')[i].value = value[34];
                        document.getElementsByName('servico')[i].value = value[35];
                        document.getElementsByName('qtd_item')[i].value = value[36];
                        document.getElementsByName('qty')[i].value = value[37];
                    }
                    i = i + 1;
                });
                GetTotal();
            }
        });
    $('#modalListaRegistros').modal('hide');
}

function ShowAllDataRegistros() {
    $(document).ready(function () {
        $.getJSON('https://script.google.com/macros/s/' + GoogleRegistros + '/exec?page=all',
            function (data) {
                var Table = '', Rows = '', Columns = '';
                $.each(data, function (key, value) {
                    var InvNo = '';
                    Columns = '';
                    $.each(value, function (key1, value1) {
                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == '') InvNo = value1;
                    });
                    Rows = Rows + '<tr class="text-center" onclick="SearchRegistros(' + InvNo + ')">' + Columns + '</tr>';
                });
                $('#TBodyRegistros').html(Rows);
                $('#modalListaRegistros').modal('show');
            });
    });
}

function ShowAllDataRegistrosGeral() {
    $(document).ready(function () {
        $.getJSON('https://script.google.com/macros/s/' + GoogleRegistros + '/exec?page=allGeral',
            function (data) {
                var Table = '', Rows = '', Columns = '';
                $.each(data, function (key, value) {
                    var InvNo = '';
                    Columns = '';
                    $.each(value, function (key1, value1) {
                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == '') InvNo = value1;
                    });
                    Rows = Rows + '<tr class="text-center">' + Columns + '</tr>';
                });
                $('#TBodyGeral').html(Rows);
            });
    });
}

function ShowAllDataRegistrosStatus() {
    $(document).ready(function () {
        $.getJSON('https://script.google.com/macros/s/' + GoogleRegistros + '/exec?page=allStatus',
            function (data) {
                var Table = '', Rows = '', Columns = '';
                $.each(data, function (key, value) {
                    var InvNo = '';
                    Columns = '';
                    $.each(value, function (key1, value1) {
                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == '') InvNo = value1;
                    });
                    Rows = Rows + '<tr class="text-center">' + Columns + '</tr>';
                });
                $('#TBodyMargem').html(Rows);
            });
    });
}