$(document).ready(function () {
    maxPartner();
    ShowAllDataPartnersList();
});



const Cadastros = "AKfycbxV1810EEy4wxnikzwUnLlEJCUebwFo6b4_VfFCTYovVW2eTwjdyrH75mIo7h5AslgxBA";
// script file sig-cad-parceiros
// https://script.google.com/macros/s/AKfycbxV1810EEy4wxnikzwUnLlEJCUebwFo6b4_VfFCTYovVW2eTwjdyrH75mIo7h5AslgxBA/exec


function maxPartner() {
    $.getJSON("https://script.google.com/macros/s/" + Cadastros + "/exec?page=maxPartner",
        function (data) {
            $("input[name='cod_partner']").val(data);
        });
}

function SearchEditPartner(pNo = "") {
    var no = $('#id_partner').val();
    if (pNo != "") no = pNo;

    $.getJSON("https://script.google.com/macros/s/" + Cadastros + "/exec?page=searchPartner&no=" + no,
        function (data) {
            if (data == "NOT FOUND") {
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
                        document.getElementsByName("id_partner")[0].value = value[0];
                        document.getElementsByName("partner")[0].value = value[1];
                        document.getElementsByName("address")[0].value = value[9];
                        document.getElementsByName("city")[0].value = value[3];
                        document.getElementsByName("phone")[0].value = value[2];
                        document.getElementsByName("email")[0].value = value[4];
                    }

                    i = i + 1;
                });

                GetTotal();
            }
        });

    $('#modalPartnerList').modal('hide');
}


function SearchPartner(pNo = "") {
    var no = $('#id_partner').val();
    if (pNo != "") no = pNo;

    $.getJSON("https://script.google.com/macros/s/" + Cadastros + "/exec?page=searchPartner&no=" + no,
        function (data) {
            if (data == "NOT FOUND") {
                alert('Número Não Encontrado!!!');
            }
            else {
                var record = data.record;

                var i = 0;
                $.each(record, function (key, value) {
                    if (i == 0) {
                        document.getElementsByName("id_partner")[0].value = value[0];
                        document.getElementsByName("partner")[0].value = value[1];
                        document.getElementsByName("address")[0].value = value[9];
                        document.getElementsByName("city")[0].value = value[3];
                        document.getElementsByName("phone")[0].value = value[2];
                        document.getElementsByName("email")[0].value = value[4];
                    }

                    i = i + 1;
                });

                GetTotal();
            }
        });

    $('#modalListaParceiros').modal('hide');
}

function ShowAllDataParceiros() {

    $(document).ready(function () {

        $.getJSON("https://script.google.com/macros/s/" + Cadastros + "/exec?page=datalistPartnerList",
            function (data) {

                var Table = "", Rows = "", Columns = "";

                $.each(data, function (key, value) {

                    var InvNo = "";
                    Columns = "";

                    $.each(value, function (key1, value1) {

                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (InvNo == "") InvNo = value1;

                    });
                    Rows = Rows + '<tr class="text-center" onclick="SearchPartner(' + InvNo + ')">' + Columns + '</tr>';
                });

                $("#TBodyParceiros").html(Rows);
                $("#modalListaParceiros").modal('show');

            });
    });

}

function ShowAllDataPartnersList() {

    $(document).ready(function () {

        $.getJSON("https://script.google.com/macros/s/" + Cadastros + "/exec?page=datalistPartnerList",
            function (data) {

                var Table = "", Rows = "", Columns = "";

                $.each(data, function (key, value) {

                    var ID = "";
                    Columns = "";

                    $.each(value, function (key1, value1) {

                        Columns = Columns + '<td>' + value1 + '</td>';
                        if (ID == "") ID = value1;

                    });
                    Rows = Rows + '<tr class="text-center">' + Columns + '</tr>';
                });

                $("#TBodyList").html(Rows);

            });
    });

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

