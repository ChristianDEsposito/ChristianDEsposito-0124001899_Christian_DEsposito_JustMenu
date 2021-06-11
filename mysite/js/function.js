/*===================================================================
Aggiungi alimento nel menu`
===================================================================*/

function AddAlimento(){

    var N = numerodiarticoli; //variabile globale per quanti articoli ci sono nella pagina menu`

    var html="<div>"+
                "<div class='row'>"+
                    "<div class='item-content item-input' style='width:300px;'>"+
                       "<div class='item-inner'>"+
                           "<div class='item-input-wrap'>"+
                                "<input type='text' id='idnomealimento"+N+"' name='nomealimento' placeholder='Nome alimento' required validate />"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='item-content item-input' style='width:300px;'>"+
                        "<div class='item-inner'>"+
                            "<div class='item-input-wrap'>"+
                                "<div class='row'><input type='number' id='idprezzoalimento"+N+"' name='prezzo' placeholder='Prezzo alimento' style='width:200px;' required validate /><i class='f7-icons' style='color:black; font-size:25px '>money_euro</i></div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<div class='item-content item-input'>"+
                    "<div class='item-inner'>"+
                        "<div class='item-title item-label'>Descrizione alimento</div>"+
                        "<div class='item-input-wrap'>"+
                             "<textarea id='iddescrizionealimento"+N+"' placeholder='Descrizione alimento' required validate></textarea>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<div class='jsdelete' style='margin-left:50%;'><a class='' href='#' ><i class='f7-icons iconefram7'>minus_circle</i></a></div>"+
            "</div>";

    numerodiarticoli++;

    $("#idaddalimento").append(html);
}

/*===================================================================
Registrati come utente base
===================================================================*/

function SignUp(){

    var email = $("#idemail").val();
    var passw = $("#idpassword").val();
    var rippassw = $("#idrippassword").val();

    //controllo che sono validi i campi della form
    $('#idregistratiform')[0].checkValidity();
    if($('#idregistratiform').find('.input-invalid').length){

        app.dialog.alert("COMPLETA TUTTI I CAMPI!");
        return;
    }

    //controllo sull'email se è formata da tutte lettere minuscole
    for (var i = 0; i<email.length; i++) {
        if (email[i] === email[i].toUpperCase() && email[i] !== email[i].toLowerCase()) {
            app.dialog.alert("L'EMAIL DEVE ESSERE SCRITTA IN MINUSCOLO..");
            return;
        }
    }

    //controllo sulle password se sono uguali
    if ( passw != rippassw ){

        app.dialog.alert("LE PASSWORD NON COMBACIANO!");
        return;
    }

    var i = 0;
    var p = [];

    p[i]   = email;
    p[++i] = passw;

    var param=ajaxparam(p,i);

    var data= 'signup' + param;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                var data = val[1];
                Utente = FmtUser( data );

                app.popup.close('#idregistrati');
                mainView.router.navigate("/home/");
                TakeAziendeFromDB();

                break;
            case S_DUPLICATEEMAIL:
                app.dialog.alert("Ooops, sembra che questa email è già registrata..");
                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }
    }); // end ajax //


}

/*===================================================================
Registrati Business
===================================================================*/

function SignUpBusiness(){

    var email = $("#idemailbusi").val();
    var passw = $("#idpasswordbusi").val();
    var rippassw = $("#idrippasswordbusi").val();
    var nomeazienda = $("#idnomeaziendabusi").val();
    var tipo = $("#idtipobusi").val();
    var telefono = $("#idtelefonobusi").val();
    var indirizzo = $("#idindirizzobusi").val();

    //controllo che sono validi i campi della form
    $('#idregistratibusiform')[0].checkValidity();
    if($('#idregistratibusiform').find('.input-invalid').length){

        app.dialog.alert("COMPLETA TUTTI I CAMPI!");
        return;
    }

    //controllo sull'email se è formata da tutte lettere minuscole
    for (var i = 0; i<email.length; i++) {
        if (email[i] === email[i].toUpperCase() && email[i] !== email[i].toLowerCase()) {
            app.dialog.alert("L'EMAIL DEVE ESSERE SCRITTA IN MINUSCOLO..");
            return;
        }
    }

    //controllo sulle password se sono uguali
    if ( passw != rippassw ){

        app.dialog.alert("LE PASSWORD NON COMBACIANO!");
        return;
    }

    var i = 0;
    var p = [];

    p[i]   = email;
    p[++i] = passw;
    p[++i] = nomeazienda;
    p[++i] = tipo;
    p[++i] = telefono;
    p[++i] = indirizzo;

    var param=ajaxparam(p,i);

    var data= 'signupbusi' + param;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                var data = val[1];
                Utente = FmtUser( data );

                app.popup.close('#idregistratibusi');
                app.popup.close('#idregistrati');
                mainView.router.navigate("/home/");
                TakeAziendeFromDB();
                $('#idlimenu').show();

                break;
            case S_DUPLICATEEMAIL:
                app.dialog.alert("Ooops, sembra che questa email è già registrata..");
                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }
    }); // end ajax //


}

/*===================================================================
Login
===================================================================*/

function Login(){

    var email = $("#idemaillogin").val();
    var passw = $("#idpasswordlogin").val();

    //controllo che sono validi i campi della form
    $('#idloginform')[0].checkValidity();
    if($('#idloginform').find('.input-invalid').length){

        app.dialog.alert("COMPLETA TUTTI I CAMPI!");
        return;
    }

    var i = 0;
    var p = [];

    p[i]   = email;
    p[++i] = passw;

    var param=ajaxparam(p,i);

    var data= 'login' + param;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                var data = val[1];

                Utente = FmtUser( data );

                if ( Utente.idazienda )
                    $('#idlimenu').show();

                app.popup.close('#idaccedi');
                mainView.router.navigate("/home/");
                TakeAziendeFromDB();

                break;
            case S_NOTFOUND: // not_found

                app.dialog.alert("Ooops, utente non trovato, hai provato a registrarti?..");

                break;
            default:

                app.dialog.alert("Ooops, qualcosa è andato storto..");

                break;
        }
    }); // end ajax //


}

/*===================================================================
Inserisci articoli per le aziende
===================================================================*/

function InsMenu(){

    var nomeali;
    var prezzoali;
    var descrizioneali;
    var N = numerodiarticoli;
    var V ="";

    //controllo che sono validi i campi della form
    $('#idinsmenu')[0].checkValidity();
    if($('#idinsmenu').find('.input-invalid').length){

        app.dialog.alert("COMPLETA TUTTI I CAMPI!");
        return;
    }

    for (  var i = 0 ; i<N ; i++ ){

        nomeali = $("#idnomealimento"+i+"").val();
        prezzoali = $("#idprezzoalimento"+i+"").val();
        descrizioneali = $("#iddescrizionealimento"+i+"").val();

        if ( nomeali ){
            var art = nomeali+String.fromCharCode(7)+prezzoali+String.fromCharCode(7)+descrizioneali ;
            V += String.fromCharCode(6)+art;
        }
    }

    var data= 'insmenu' + String.fromCharCode(6) + Utente.idazienda + V;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                app.dialog.alert("Alimenti aggiunti al menu`..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //


}

/*===================================================================
Visualizza articoli
===================================================================*/

function VisMenu( idazienda ){

    var data= 'vismenu' + String.fromCharCode(6) + idazienda + String.fromCharCode(6) + Utente.idutente;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                if ( val[2] ){
                    var a = MySplit(val[2], String.fromCharCode(7));
                    if ( val[1] == S_NOTFOUND ){
                        var icopref = "<i id='idpref"+a[0]+"' class='f7-icons iconefram7'>heart</i>";
                    }
                    else
                        var icopref = "<i id='idpref"+a[0]+"' class='f7-icons iconefram7'>heart_fill</i>";
                    VisInfAzienda(a , icopref);
                    var n = val.length;
                    for ( var i=2; i<n; i++){
                        var a = MySplit(val[i], String.fromCharCode(7));
                        var html="<div>"+
                                    "<div class='row'>"+
                                        "<div class='item-content infvismenu' style='width:300px;'>"+
                                            "<div class='item-title'>"+a[5]+"</div>"+
                                        "</div>"+
                                        "<div class='item-content infvismenu' style='width:100px;'>"+
                                            "<div class='row'><div class='item-title'>"+a[6]+"</div><i class='f7-icons' style='color:#fc8888; font-size:40px '>money_euro</i></div>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='item-content' style='width:300px;'>"+
                                        "<div class='row'><div class='item-title'>"+a[7]+"</div></div>"+
                                    "</div>"+
                                "</div>";

                        $("#idvisualizzamenu").append(html);
                    }
                }else
                    app.dialog.alert("Sembra che non c'è ancora un menu` per questa azienda..");


                //app.dialog.alert("Menu visualizzato..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //


}

/*===================================================================
Inserisci aziende in preferiti
===================================================================*/

function InsPreferiti( idazienda ){

    var data= 'inspreferiti' + String.fromCharCode(6) + Utente.idutente + String.fromCharCode(6) + idazienda ;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                //app.dialog.alert("AGGIUNTO AI PREFERITI..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //


}

/*===================================================================
Rimuove aziende in preferiti
===================================================================*/

function DelPreferiti( idazienda ){

    var data= 'delpreferiti' + String.fromCharCode(6) + Utente.idutente + String.fromCharCode(6) + idazienda ;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok

                //app.dialog.alert("RIMOSSO DAI PREFERITI..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //

}


/*===================================================================
Funzioni per il menu laterale
===================================================================*/

//Funzione che raccogle tutte le aziende dal DB
//e li stampa tramite html nella home del sito
function TakeAziendeFromDB(){

    var icopref = "";
    var data= 'takeazi' + String.fromCharCode(6) + Utente.idutente ;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok
                if ( val[2] ){
                    var numeroazi = 2 + parseInt(val[1]);
                    var numeropre = val[numeroazi];
                    for ( var i=2; i<numeroazi ; i++){
                        var a = MySplit(val[i], String.fromCharCode(7));
                        var icotipo = SetTipo(a[3]);
                        icopref = "<i id='idpref"+a[0]+"' class='f7-icons iconefram7'>heart</i>";
                        var n = parseInt(numeropre)+numeroazi+1;
                        for ( var j = numeroazi+1 ; j<n ; j++){
                            if ( a[0] == val[j] ){
                                icopref = "<i id='idpref"+a[0]+"' class='f7-icons iconefram7'>heart_fill</i>";
                                break;
                            }
                        }

                        var html="<a class='jsvismenu changepage' href='#' id='idazienda"+i+"' data-idazienda='"+a[0]+"' data-index='"+i+"' style='color:black;background-color:transparent;text-decoration:none;'>"+
                                    "<div class='elevation-demo elevation-5 list divelevation5'>"+
                                        "<div>"+
                                            "<div class='row'>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'><i class='f7-icons iconefram7'>person_fill</i><div class='item-title'>"+a[1]+"</div></div>"+
                                                "</div>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'>"+icotipo+"<div class='item-title'>"+a[3]+"</div></div>"+
                                                "</div>"+
                                            "</div>"+
                                            "<div class='row'>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'><i class='f7-icons iconefram7'>placemark_fill</i><div class='item-title'>"+a[2]+"</div></div>"+
                                                "</div>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'><i class='f7-icons iconefram7'>phone_fill</i><div class='item-title'>"+a[4]+"</div></div>"+
                                                "</div>"+
                                            "</div>"+
                                            "<div style='margin-left:50%;'><a class='jsadddelpreferiti' data-prefidazienda='"+a[0]+"' href='#' >"+icopref+"</a></div>"+
                                        "</div>"+
                                    "</div>"+
                                "</a>";

                        $("#idaddazienda").append(html);
                    }

                    //app.dialog.alert("Ecco tutte le aziende..");
                }else
                    app.dialog.alert("Sembra che non ci sono aziende..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //


}



//Funzione che raccogle tutte i preferiti dal DB
//e li stampa tramite html nel sito
function TakePreferitiFromDB(){

    var icopref = "";
    var data= 'takepre' + String.fromCharCode(6) + Utente.idutente ;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok
                if ( val[1] ){
                    var n = val.length;
                    for ( var i=1; i<n ; i++){
                        var a = MySplit(val[i], String.fromCharCode(7));
                        var icotipo = SetTipo(a[3]);
                        var html="<a class='jsvismenu changepage' href='#' id='idazienda"+i+"' data-idazienda='"+a[0]+"' data-index='"+i+"' style='color:black;background-color:transparent;text-decoration:none;'>"+
                                    "<div class='elevation-demo elevation-5 list divelevation5'>"+
                                        "<div>"+
                                            "<div class='row'>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'><i class='f7-icons iconefram7'>person_fill</i><div class='item-title'>"+a[1]+"</div></div>"+
                                                "</div>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'>"+icotipo+"<div class='item-title'>"+a[3]+"</div></div>"+
                                                "</div>"+
                                            "</div>"+
                                            "<div class='row'>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'><i class='f7-icons iconefram7'>placemark_fill</i><div class='item-title'>"+a[2]+"</div></div>"+
                                                "</div>"+
                                                "<div class='item-content' style='width:300px;'>"+
                                                    "<div class='row'><i class='f7-icons iconefram7'>phone_fill</i><div class='item-title'>"+a[4]+"</div></div>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div style='margin-left:50%;'><a class='jsadddelpreferiti' data-prefidazienda='"+a[0]+"' href='#' ><i id='idpref"+a[0]+"' class='f7-icons' style='color:black; font-size:25px'>heart_fill</i></a></div>"+
                                    "</div>"+
                                "</a>";

                        $("#idaddpreferiti").append(html);
                    }

                    //app.dialog.alert("Ecco tutte le aziende..");
                }else
                    app.dialog.alert("Sembra che non ci sono preferiti..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //

}


//Funzione che raccogle tutti gli articoli dal DB
//in relazione all'utente bussiness che ha fatto l'acesso
//e li stampa tramite html
function TakeAlimentiFromDB(){

    var data= 'takeali' + String.fromCharCode(6) + Utente.idazienda;

    // Start ajax //
    ajax(data,function(data){
        var val = MySplit(data, String.fromCharCode(6));
        switch(val[0].trim()){
            case S_OKAY: // ok
                if ( val[1] ){
                    var n = val.length;
                    for ( var i=1; i<n; i++){
                        var a = MySplit(val[i], String.fromCharCode(7));
                        var idalimenti = i-1;
                        var html="<div>"+
                                    "<div class='row'>"+
                                        "<div class='item-content item-input' style='width:300px;'>"+
                                           "<div class='item-inner'>"+
                                               "<div class='item-input-wrap'>"+
                                                    "<input type='text' id='idnomealimento"+idalimenti+"' value='"+a[0]+"' name='nomealimento' placeholder='Nome alimento' required validate />"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='item-content item-input' style='width:300px;'>"+
                                            "<div class='item-inner'>"+
                                                "<div class='item-input-wrap'>"+
                                                    "<div class='row'><input type='number' id='idprezzoalimento"+idalimenti+"' value='"+a[1]+"' name='prezzo' placeholder='Prezzo alimento' style='width:200px;' required validate /><i class='f7-icons iconefram7'>money_euro</i></div>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='item-content item-input'>"+
                                        "<div class='item-inner'>"+
                                            "<div class='item-title item-label'>Descrizione alimento</div>"+
                                            "<div class='item-input-wrap'>"+
                                                 "<textarea id='iddescrizionealimento"+idalimenti+"' placeholder='Descrizione alimento' required validate>"+a[2]+"</textarea>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='jsdelete' style='margin-left:50%;'><a class='' href='#' ><i class='f7-icons iconefram7'>minus_circle</i></a></div>"+
                                "</div>";

                        $("#idaddalimento").append(html);
                    }

                    numerodiarticoli = n;

                    //app.dialog.alert("Ecco gli alimenti del tuo menu`..");
                }else
                    app.dialog.alert("ancora non hai alimenti nel tuo menu`..");

                break;
            default:
                app.dialog.alert("Ooops, qualcosa è andato storto..");
                break;
        }


    }); // end ajax //


}

/*===================================================================
Formatta utente
===================================================================*/

function FmtUser( data ){

    var a = {};
    var b;
    var i=0;

    b = MySplit(data, String.fromCharCode(7));

    a.idutente=b[i++];
    a.email=b[i++];
    a.password=b[i++];
    a.idazienda=b[i++];
    a.nomeazienda=b[i++];
    a.indirizzoazienda=b[i++];
    a.tipoazienda=b[i++];
    a.telefonoazienda=b[i];

    return a;
}

/*===================================================================
restituisce un icona a seconda del tipo
===================================================================*/
function SetTipo (tipo){

    var a="";

    switch (tipo){
        case "ristorante":
            a="<span class='material-icons'>dinner_dining</span>";
            break;
        case "pizzeria":
            a="<span class='material-icons'>local_pizza</span>";
            break;
        case "pub":
            a="<span class='material-icons'>lunch_dining</span>";
            break;
        case "sushi":
            a="<span class='material-icons'>set_meal</span>";
            break;
        case "takeaway":
            a="<span class='material-icons'>takeout_dining</span>";
            break;
        case "fastfood":
            a="<span class='material-icons'>fastfood</span>";
            break;
        case "altro":
            a="<span class='material-icons'>restaurant</span>";
            break;
    }

    return a;
}

/*===================================================================
Stampa in html le informazione dell'azienda
===================================================================*/
function VisInfAzienda (a , icopref){

    var icotipo = SetTipo(a[3]);
    var html="<div class='elevation-demo elevation-5 list divelevation5'>"+
                "<div data-idazienda='"+a[0]+"'>"+
                    "<div class='row'>"+
                        "<div class='item-content' style='width:300px;'>"+
                            "<div class='row'><i class='f7-icons iconefram7'>person_fill</i><div class='item-title'>"+a[1]+"</div></div>"+
                        "</div>"+
                        "<div class='item-content' style='width:300px;'>"+
                            "<div class='row'>"+icotipo+"<div class='item-title'>"+a[3]+"</div></div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='row'>"+
                        "<div class='item-content' style='width:300px;'>"+
                            "<div class='row'><i class='f7-icons iconefram7'>placemark_fill</i><div class='item-title'>"+a[2]+"</div></div>"+
                        "</div>"+
                        "<div class='item-content' style='width:300px;'>"+
                            "<div class='row'><i class='f7-icons iconefram7'>phone_fill</i><div class='item-title'>"+a[4]+"</div></div>"+
                        "</div>"+
                    "</div>"+
                    "<div style='margin-left:50%;'><a class='jsadddelpreferiti' data-prefidazienda='"+a[0]+"' href='#' >"+icopref+"</a></div>"+
                "</div>"+
            "</div>";

    $("#idvisualizzainfazienda").append(html);

}





