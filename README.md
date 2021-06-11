# ChristianDEsposito-0124001899_Christian_DEsposito_JustMenu
Nome: Christian D'Esposito

Matricola: 0124001899

Università: Università degli Studi di Napoli Parthenope

Corso: Informatica

Progetto: Just Menu`

Link per vedere la web app: https://christiandesposito.pythonanywhere.com

link per vedere la presentazione del progetto: https://drive.google.com/file/d/1CgK7hMkKODwmNuE0S9csz2WLNhFjCS-K/view?usp=sharing

===========================================================================

In cosa consiste l'app in breve

===========================================================================

Just Menu` è un sito dove i gestori di un’azienda ( pizzeria , ristoranti , pub ecc..) possono inserire il proprio menù contenente gli articoli per la propria clientela. 

La clientela può: 

- visualizzare i vari articoli 
- Visualizzare le informazioni dell’azienda che li propone 
- salvare le aziende in una lista di preferiti.

===========================================================================

Dove si trova il progetto

===========================================================================

Il progetto con tutti i file del sito si trova nella cartella "mysite", all'interno troverete subito l'index e il file python. Nelle cartelle invece si trovano i vari file js,css,le altre pagine html...ecc.

===========================================================================

Come testare l'app

===========================================================================

Cliccando il link del sito , si aprirà una schermata di login.

Si può cliccare su due pulsanti:

- Accedi: quando cliccate su questo pulsante si aprirà una schermata per accedere al sito con un account già presente nel database

- Registrati: quando cliccate su questo pulsante si aprirà una schermata per registrarvi al sito: o come utente normale inserendo solo e-mail e password o come utente business ,cliccando sul pulsante in basso a destra "Sei un utente business?", inserendo altre informazioni come nome dell'azienda, tipo di azienda, indirizzo ecc

questi sono alcuni account già presenti nel DB:

ACCOUNT UTENI NORMALI
- email: provauser@normale.it   password: 1234
- email: quinta@prova.it        password: 1234

ACCOUNT UTENTI BUSINESS
- email: terzaprova@busi.com    password: 1234
- email: quartaprova@busi.com   password: 1234

la differenza tra un utente business e uno normale e che l'utente business può accedere ad una pagina in più, dove può modifare il proprio menù.  

Una volta effettuata la login si aprirà la Home che contiene l'elenco di tutte le aziende registrate sul sito e un menù a tendina in alto a sinistra che serve per spostarsi tra le varie pagine(Il menù è presente in tutte le pagine tranne nella login).

Ogni azienda ha le proprie informazioni e un'icona di un cuore, se il cuore è colorato di nero significa che l'azienda è tra i preferiti, invece, se l'icona è un cuore vuoto solo con un contorno nero, no (cliccando sul cuore si può perciò aggiungere o rimuovere l'azienda dai preferiti).

Ogni azienda può essere cliccata, al click si aprirà una nuova pagina che conterrà il menù dell'azienda cliccata, di nuovo le info dell'azienda e il cuore dei preferiti; sotto a tutto c'è un tasto per tornare alla home o si può usare il menù a tendina per spostarsi su altre pagine.

Un'altra pagina che si può trovare nel menù a tendina è "preferiti", che contiene tutte le aziende aggiunte ai preferiti (cioè quelle con il cuoricino nero pieno)

Un'altra pagina invece è "menù" ( pagina disponibile solo per gli utenti business ), dove si trovano tutti gli articoli che l'account ha nel proprio menù. Da questa pagina l'utente può modificare,aggiungere ( con l'icona del + ) o eliminare ( con l'icona del - ) i propri articoli dal menù ; prima di uscire da questa pagina bisogna ricordarsi di cliccare l'icona con la "spunta" per salvare le modifiche effettuate al menù.

Alla fine del menù a tendina c'è un altro tasto: "logout" che ci riportera alla schermata di login. 

===========================================================================

!ATTENZIONE! Può capitare che in alcune pagine non venga visualizzato nulla, per risolvere questo problema basta cambiare pagina dal menù a tendina per poi ritornare alla pagina precedente sempre con il menù a tendina. E` stato provato a risolvere il problema più volte, ma sembra che sia un problema di pytonanuwhere.

===========================================================================
