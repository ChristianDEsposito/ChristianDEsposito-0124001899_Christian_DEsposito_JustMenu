// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'justmenu', // App bundle ID
  name: 'JUST MENU`', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes: routes,
  view:{
	  stackPages:true
  }

});


// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});





