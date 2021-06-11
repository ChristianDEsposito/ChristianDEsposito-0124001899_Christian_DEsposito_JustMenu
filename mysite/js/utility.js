//--------------------------------------------------------------
// UTILITY
//--------------------------------------------------------------

//------------------------------------------------------
// define.js
//------------------------------------------------------
var S_OKAY          = 'okay'; //tutto è andato a buon fine
var S_ERROR         = 'error'; //errore
var S_NOTFOUND      = 'notfound'; //non è stato trovata la corrispodenza
var S_DUPLICATEEMAIL= 'emailduplicata'; //email già esistente

var APP_TITLE = 'JUSTMENU'; //titolo dell'app

//------------------------------------------------------
// variabili globali
//------------------------------------------------------
var Utente = {};
var numerodiarticoli = 0; //articoli nel menu`
var vettpref = []; //vettore contiene id dei preferiti

//--------------------------------------------------------------
// split con caratteri speciali
//--------------------------------------------------------------
function MySplit(Str, cSep)
{
  var array = [];

  if(typeof Str === 'undefined')
	return(array);


  var ind=0;
  array[ind] = "";
  for(var i=0;i<Str.length;i++){
      if(Str[i] == cSep){
	      ind++;
          array[ind] = "";
	  }else{
          array[ind] += Str[i];
	  };
  };
  return(array);
};

//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
function ajaxparam(p,nparam){
	var param = String.fromCharCode(6);
	for(var i=0; i<=nparam; i++){
		param += (p[i]+String.fromCharCode(6));
	}
	return param;
}


function ajax(data, onsuccess,onerror)
{
	var ret;
	var spinnervalid;
	app.progressbar.hide();
	ret=$.ajax({
		  type: "POST",
		  url:  'https://christiandesposito.pythonanywhere.com/ajax',
		  data: {"data": ajaxfmt(data)},
		  dataType:'text',
		  success:function(data){
				onsuccess(data);
				return;
		  },
		  error:function(e){
				 // alert(e.status);
			  	ajaxerror(e);

			    if (typeof onerror !== 'undefined')onerror();
				return;
		  }, // end function //
	}); // end ajax //

	//------------------------------------------------------------
	//------------------------------------------------------------
	//------------------------------------------------------------

	return ret;
}

//--------------------------------------------------------------
//--------------------------------------------------------------
// end ajaxfmt
//--------------------------------------------------------------
function ajaxfmt(data)
{
    return('token'+String.fromCharCode(6)+data);
}
//--------------------------------------------------------------------------------------
// handle ajax error
//--------------------------------------------------------------------------------------
function ajaxerror()
{
	var toastTop = app.toast.create({
	  text: 'Oops! Qualcosa è andato storto.',
	  closeTimeout: 2000,
	  position: 'top',
	});

	toastTop.open();
}
