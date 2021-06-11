var routes = [

  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },

  // Home page
  {
    path: '/home/',
    url: './pages/home.html',
  },

  // Home page
  {
    path: '/preferiti/',
    url: './pages/preferiti.html',
  },

  // Visualizza menu
  {
    path: '/vismenu/',
    url: './pages/vismenu.html',
  },

  // Inserisci menu
  {
    path: '/insmenu/',
    url: './pages/insmenu.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  }
];
