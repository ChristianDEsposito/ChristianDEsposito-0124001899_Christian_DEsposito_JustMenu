from flask import Flask,redirect,request
from flaskext.mysql import MySQL

app = Flask(__name__)
app.config.from_object(__name__)

mysql = MySQL()
mysql.init_app(app)

app.config['MYSQL_DATABASE_USER'] = 'ChristianDEsposi'
app.config['MYSQL_DATABASE_PASSWORD'] = 'justmenu0'
app.config['MYSQL_DATABASE_DB'] = 'ChristianDEsposi$justmenu'
app.config['MYSQL_DATABASE_HOST'] = 'ChristianDEsposito.mysql.pythonanywhere-services.com'
app.config['SECRET_KEY'] = b'6hc/_gsh,./;2ZZx3c6_s,1//'

@app.route('/')
def index():
    return redirect("https://ChristianDEsposito.pythonanywhere.com/index.html", code=302)

@app.route('/ajax', methods=['GET','POST'])
def ajax():
    if request.method == "POST":
        postdata = request.values.get('data')
    postdata = postdata
    postdata = postdata.split(chr(6))
    if postdata[1] == 'signup':
        return signup(postdata)
    if postdata[1] == 'signupbusi':
        return signupbusi(postdata)
    if postdata[1] == 'login':
        return login(postdata)
    if postdata[1] == 'insmenu':
        return insmenu(postdata)
    if postdata[1] == 'vismenu':
        return vismenu(postdata)
    if postdata[1] == 'inspreferiti':
        return inspreferiti(postdata)
    if postdata[1] == 'delpreferiti':
        return delpreferiti(postdata)
    if postdata[1] == 'takeazi':
        return takeazi(postdata)
    if postdata[1] == 'takepre':
        return takepre(postdata)
    if postdata[1] == 'takeali':
        return takeali(postdata)

#==============================================================================
#Registrati
#==============================================================================
def signup(data):
    con = mysql.connect()
    cur = con.cursor()

    ute_email = data[2]
    ute_passw = data[3]

    cur.execute('SELECT ute_email FROM utenti WHERE ute_email = %s', ute_email)
    controllo=cur.fetchone()

    if controllo:
        return ("emailduplicata")

    cur.execute('INSERT INTO utenti (ute_email,ute_passw) VALUES (%s,%s)', (ute_email,ute_passw))

    con.commit()

    cur.execute('SELECT ute_id FROM utenti WHERE ute_email = %s', ute_email)
    ute_id=cur.fetchone()

    data = ( str(ute_id[0])+chr(7)+str(ute_email)+chr(7)+str(ute_passw) )

    con.commit()
    con.close()

    return ("okay"+ chr(6)+ data )

#==============================================================================
#Registrati Business
#==============================================================================
def signupbusi(data):
    con = mysql.connect()
    cur = con.cursor()

    ute_email = data[2]
    ute_passw = data[3]
    azi_nome = data[4]
    azi_tipo = data[5]
    azi_tel = data[6]
    azi_indirizzo = data[7]

    cur.execute('SELECT ute_email FROM utenti WHERE ute_email = %s', ute_email)
    controllo=cur.fetchone()

    if controllo:
        return ("emailduplicata")

    cur.execute('INSERT INTO utenti (ute_email,ute_passw) VALUES (%s,%s)', (ute_email,ute_passw))

    cur.execute('SELECT ute_id FROM utenti WHERE ute_email = %s', ute_email)
    ute_id=cur.fetchone()

    cur.execute('INSERT INTO aziende (azi_nome,azi_indirizzo,azi_tipo,azi_tel,azi_idute) VALUES (%s,%s,%s,%s,%s)', (azi_nome,azi_indirizzo,azi_tipo,azi_tel,ute_id))

    cur.execute('SELECT azi_id FROM aziende WHERE azi_idute = %s', ute_id)
    azi_id=cur.fetchone()

    data = (str(ute_id[0])+chr(7)+str(ute_email)+chr(7)+str(ute_passw)+chr(7)+str(azi_id[0])+chr(7)+str(azi_nome)+chr(7)+str(azi_indirizzo)+chr(7)+str(azi_tipo)+chr(7)+str(azi_tel))

    con.commit()
    con.close()

    return ("okay"+ chr(6)+ data )

#==============================================================================
#Login
#==============================================================================
def login(data):
    con = mysql.connect()
    cur = con.cursor()

    ute_email = data[2]
    ute_passw = data[3]
    num_righe=0
    num_righebusi=0

    num_righe = cur.execute('SELECT * FROM utenti WHERE ute_email = %s and ute_passw = %s', (ute_email,ute_passw) )

    if(num_righe<1):
        return ("notfound")

    row=cur.fetchone()
    ute_id=row[0]

    num_righebusi = cur.execute('SELECT * FROM utenti JOIN aziende on ute_id = azi_idute WHERE ute_id = %s', ute_id )
    if(num_righebusi<1):
        data = ( str(ute_id)+chr(7)+str(ute_email)+chr(7)+str(ute_passw) )
        return ("okay" +chr(6)+ data)

    row=cur.fetchone()
    data = (str(row[0])+chr(7)+str(row[1])+chr(7)+str(row[2])+chr(7)+str(row[3])+chr(7)+str(row[4])+chr(7)+str(row[5])+chr(7)+str(row[6])+chr(7)+str(row[7]))

    con.commit()
    con.close()

    return ("okay"+ chr(6)+ data)

#==============================================================================
#Inserisci articoli dell'azienda
#==============================================================================
def insmenu(data):
    con = mysql.connect()
    cur = con.cursor()

    n = 0
    art_idazi = 0

    n = len(data)
    i = 3
    art_idazi = data[2]

    cur.execute('DELETE FROM articoli WHERE art_idazi = %s ', art_idazi )

    while i<n:
        v = data[i].split(chr(7))
        art_nome = v[0]
        art_prezzo = v[1]
        art_descr = v[2]
        cur.execute('INSERT INTO articoli (art_nome,art_prezzo,art_descr,art_idazi) VALUES (%s,%s,%s,%s)', (art_nome,art_prezzo,art_descr,art_idazi))
        i = i + 1

    con.commit()
    con.close()

    return ("okay")

#==============================================================================
#Visualizza menu'
#==============================================================================
def vismenu(data):
    con = mysql.connect()
    cur = con.cursor()

    azi_id = data[2];
    ute_id = data[3];

    art = ""

    cur.execute('SELECT * FROM aziende JOIN articoli ON azi_id=art_idazi WHERE azi_id=%s', azi_id )
    records = cur.fetchall()

    for row in records:
        art = art + str( chr(6)+str(row[0])+chr(7)+str(row[1])+chr(7)+str(row[2])+chr(7)+str(row[3])+chr(7)+str(row[4])+chr(7)+str(row[7])+chr(7)+str(row[8])+chr(7)+str(row[9]) )

    cur.execute('SELECT pref_idazi FROM preferiti WHERE pref_idazi=%s AND pref_idute=%s', (azi_id , ute_id ) )
    pref_idazi=cur.fetchone()

    if pref_idazi is None:
        preferiti = "notfound"
    else:
        preferiti = "okay"


    con.commit()
    con.close()

    return ("okay"+ chr(6) + preferiti + art )

#==============================================================================
#Inserisci Preferiti
#==============================================================================
def inspreferiti(data):
    con = mysql.connect()
    cur = con.cursor()

    pref_idute = data[2]
    pref_idazi = data[3]

    cur.execute('INSERT INTO preferiti (pref_idute,pref_idazi) VALUES (%s,%s)', (pref_idute,pref_idazi))

    con.commit()
    con.close()

    return ("okay")

#==============================================================================
#Rimuovi Preferiti
#==============================================================================
def delpreferiti(data):
    con = mysql.connect()
    cur = con.cursor()

    pref_idute = data[2]
    pref_idazi = data[3]

    cur.execute('DELETE FROM preferiti WHERE pref_idute = %s AND pref_idazi = %s', (pref_idute,pref_idazi) )

    con.commit()
    con.close()

    return ("okay")


#==============================================================================
#Dati per il menu laterale
#==============================================================================

#HOME
def takeazi(data):
    con = mysql.connect()
    cur = con.cursor()

    id_ute = data[2]
    azi = ""
    pre = ""
    numeroazi = 0
    numeropre = 0

    cur.execute('SELECT * FROM aziende')
    records = cur.fetchall()

    for row in records:
        numeroazi = numeroazi +1
        azi = azi + str( chr(6)+str(row[0])+chr(7)+str(row[1])+chr(7)+str(row[2])+chr(7)+str(row[3])+chr(7)+str(row[4]) )

    cur.execute('SELECT * FROM preferiti WHERE pref_idute = %s' , id_ute)
    records = cur.fetchall()

    for row in records:
        numeropre = numeropre +1
        pre = pre + str(chr(6)+str(row[1]))

    con.commit()
    con.close()

    return ("okay"+ chr(6) + str(numeroazi) + azi + chr(6) + str(numeropre) + pre)

#PREFERITI
def takepre(data):
    con = mysql.connect()
    cur = con.cursor()

    id_ute = data[2]
    azi = ""

    cur.execute('SELECT * FROM aziende JOIN preferiti ON azi_id = pref_idazi WHERE pref_idute = %s' , id_ute)
    records = cur.fetchall()

    for row in records:
        azi = azi + str( chr(6)+str(row[0])+chr(7)+str(row[1])+chr(7)+str(row[2])+chr(7)+str(row[3])+chr(7)+str(row[4]) )

    con.commit()
    con.close()

    return ("okay"+  azi)

#MENU`
def takeali(data):
    con = mysql.connect()
    cur = con.cursor()

    azi_id = data[2]
    art = ""

    cur.execute('SELECT art_nome,art_prezzo,art_descr FROM articoli WHERE art_idazi = %s', azi_id)
    records = cur.fetchall()

    for row in records:
        art = art + str( chr(6)+str(row[0])+chr(7)+str(row[1])+chr(7)+str(row[2]) )

    con.commit()
    con.close()

    return ("okay"+ art )


