
-- --------------------------------------------------------

--
-- Comando per creare il database
--
CREATE DATABASE justmenu

-- --------------------------------------------------------

--
-- Struttura della tabella utenti
--

CREATE TABLE utenti (
	ute_id int NOT NULL AUTO_INCREMENT,
	ute_email varchar(60) NOT NULL,
	ute_passw varchar(20) NOT NULL,
    PRIMARY KEY (ute_id)
);

-- --------------------------------------------------------

--
-- Struttura della tabella aziende
--
CREATE TABLE aziende (
	azi_id 	int NOT NULL AUTO_INCREMENT,
	azi_nome varchar(30) NOT NULL,
	azi_indirizzo varchar(50) NOT NULL,
	azi_tipo varchar(50) NOT NULL,
	azi_tel varchar(15) NOT NULL,
	azi_idute int NOT NULL,
	PRIMARY KEY (azi_id),
    FOREIGN KEY (azi_idute) REFERENCES utenti(ute_id)
);

-- --------------------------------------------------------

--
-- Struttura della tabella articoli
--
CREATE TABLE articoli (
	art_id int NOT NULL AUTO_INCREMENT,
	art_nome varchar(30) NOT NULL,
	art_prezzo varchar(10) NOT NULL,
	art_descr varchar(100) NOT NULL,
	art_idazi int NOT NULL,
	PRIMARY KEY (art_id),
	FOREIGN KEY (art_idazi) REFERENCES aziende(azi_id)
);

-- --------------------------------------------------------

--
-- Struttura della tabella preferiti
--
CREATE TABLE preferiti (
	pref_idute int NOT NULL,
	pref_idazi int NOT NULL,
    PRIMARY KEY (pref_idute,pref_idazi),
    FOREIGN KEY (pref_idute) REFERENCES utenti(ute_id),
    FOREIGN KEY (pref_idazi) REFERENCES aziende(azi_id)
);

-- --------------------------------------------------------
