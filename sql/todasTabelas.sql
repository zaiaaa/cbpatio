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
    nome VARCHAR(30)
);

CREATE TABLE Campeonato (
    id_campeonato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    data DATETIME,
    sinopse VARCHAR(120),
    modalidade VARCHAR(20)
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
    
    FOREIGN KEY (fk_id_campeonato) REFERENCES Campeonato (id_campeonato),
    FOREIGN KEY (fk_id_time) REFERENCES Time (id_time)
);