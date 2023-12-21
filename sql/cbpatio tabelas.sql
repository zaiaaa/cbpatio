CREATE TABLE `campeonato` (
  `id_campeonato` int(11) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `valor_entrada` float NOT NULL,
  `limite_jogadores_time` int(11) DEFAULT NULL,
  `sinopse` varchar(120) DEFAULT NULL,
  `modalidade` varchar(20) DEFAULT NULL
);

CREATE TABLE `time` (
  `id_time` int(11) NOT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `criado_por` varchar(60) NOT NULL
);

CREATE TABLE `time_campeonato` (
  `id_time_campeonato` int(11) NOT NULL,
  `limite_jogadores` int(11) NOT NULL,
  `fk_id_time` int(11) DEFAULT NULL,
  `fk_id_campeonato` int(11) DEFAULT NULL,

  FOREIGN KEY (`fk_id_campeonato`) REFERENCES `campeonato` (`id_campeonato`),
  FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`)

);

CREATE TABLE `time_usuario` (
  `id_time_usuario` int(11) NOT NULL,
  `fk_id_usuario` int(11) DEFAULT NULL,
  `fk_id_time` int(11) DEFAULT NULL,

  FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  FOREIGN KEY (`fk_id_time`) REFERENCES `time` (`id_time`)
);

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(60) DEFAULT NULL,
  `nome_usuario` varchar(25) DEFAULT NULL,
  `contato` varchar(11) NOT NULL,
  `plataforma` varchar(16) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `senha` varchar(150) DEFAULT NULL
);


ALTER TABLE `time_campeonato`
  ADD CONSTRAINT `time_campeonato_ibfk_1` ,
  ADD CONSTRAINT `time_campeonato_ibfk_2` ;

--
-- Limitadores para a tabela `time_usuario`
--
ALTER TABLE `time_usuario`
  ADD CONSTRAINT `time_usuario_ibfk_1` ,
  ADD CONSTRAINT `time_usuario_ibfk_2` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
