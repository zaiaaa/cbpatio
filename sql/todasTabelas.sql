CREATE DATABASE cb_patio;
USE cb_patio;

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    nome_usuario VARCHAR(25),
    email VARCHAR(120),
    senha VARCHAR(150)
);

CREATE TABLE Time (
    id_time INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    fk_id_capitao INT,

    FOREIGN KEY (fk_id_capitao) REFERENCES Usuario (id_usuario)
);

CREATE TABLE Campeonato (
    id_campeonato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    data DATETIME,
    sinopse VARCHAR(120),
    modalidade VARCHAR(20),
    valor_entrada float,
    premiacao float,
    jogadores INT
);

CREATE TABLE Time_usuario (
    id_time_usuario INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_usuario INT,
    fk_id_time INT,
    
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario (id_usuario),
    FOREIGN KEY (fk_id_time) REFERENCES Time (id_time)
);

CREATE TABLE Time_campeonato(
    id_time_campeonato INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_time INT,
    fk_id_campeonato INT,
    fase VARCHAR(20),
    jogo VARCHAR(10),
    
    FOREIGN KEY (fk_id_campeonato) REFERENCES Campeonato (id_campeonato),
    FOREIGN KEY (fk_id_time) REFERENCES Time (id_time)
);

CREATE TRIGGER `tgr_time_user` AFTER INSERT ON `time`
FOR EACH ROW INSERT INTO time_usuario(fk_id_usuario, fk_id_time) VALUES(NEW.fk_id_capitao, NEW.id_time)