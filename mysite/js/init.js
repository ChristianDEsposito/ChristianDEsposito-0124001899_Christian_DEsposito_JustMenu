//navigate clear history
$(document).on('click', '.changepage', function(e){
    mainView.router.once('routeChanged', function(){
        mainView.router.clearPreviousHistory();
    });
});

//Aggiungi alimento
$(document).on('click','.jsadd',function(e){
    AddAlimento();
});

//Rimuovi alimento
$(document).on('click','.jsdelete',function(e){

    var myobj = $(this).parent();
    myobj.remove();
});

//Registrati
$(document).on('click','.jsregistrati',function(e){
    SignUp();
});

//Registrati Business
$(document).on('click','.jsregistratibusi',function(e){
    SignUpBusiness();
});

//Login
$(document).on('click','.jslogin',function(e){
    Login();
});

//Inserisci il menu`
$(document).on('click','.jsinsmenu',function(e){
    InsMenu();
});

//Visualizza il menu'
$(document).on('click','.jsvismenu',function(e){
    var idazienda=$(this).attr('data-idazienda');
    mainView.router.navigate("/vismenu/");
    VisMenu(idazienda);
});

//Inserisci preferiti o rimuovi
$(document).on('click','.jsadddelpreferiti',function(e){
    var idazienda=$(this).attr('data-prefidazienda');
    var idprefazi = "";

    idprefazi+= "idpref" + idazienda;

    if ( document.getElementById(idprefazi).innerHTML == "heart"){
        document.getElementById(idprefazi).innerHTML = "heart_fill";
        InsPreferiti( idazienda );
    }else{
        if ( $('.page[data-name="preferiti"]').hasClass('page-current') ){
                var myobj = $(this).parent().parent();
                myobj.remove();
        }
        else
            document.getElementById(idprefazi).innerHTML = "heart";
        DelPreferiti( idazienda );
    }
});

//Function quando clicchi sui tasti del menu`

//pagina home
$(document).on('click','.jshome',function(e){
    if ( $('.page[data-name="home"]').hasClass('page-current') )
        return;
    mainView.router.navigate("/home/");
    TakeAziendeFromDB();
});

//pagina preferiti
$(document).on('click','.jspreferiti',function(e){
    if ( $('.page[data-name="preferiti"]').hasClass('page-current') )
        return;
    mainView.router.navigate("/preferiti/");
    TakePreferitiFromDB();

});

//pagina menu`
$(document).on('click','.jsmenu',function(e){
    if ( $('.page[data-name="insmenu"]').hasClass('page-current') )
        return;
    mainView.router.navigate("/insmenu/");
    TakeAlimentiFromDB();
});

//Tasto logout
$(document).on('click','.jslogout',function(e){
    location.reload();
    return false;
});