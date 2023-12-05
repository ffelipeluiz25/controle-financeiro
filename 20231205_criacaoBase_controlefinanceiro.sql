CREATE TABLE `Status` (
  `Id` int(11) Primary key auto_increment NOT NULL,
  `Nome` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Status` (`Nome`) VALUES('ATIVO'),('INATIVO');

CREATE TABLE Usuario (
  `Id` int(11) Primary key auto_increment NOT NULL,
  `NomeCompleto` varchar(30) DEFAULT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `Login` varchar(50) DEFAULT NULL,
  `Senha` varchar(50) DEFAULT NULL,
  `IdStatus` int(11) DEFAULT 1 NOT NULL,
  `IdUsuarioAlteracao` int(11) DEFAULT NULL,
  `DataCriacao` datetime DEFAULT now() NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE Usuario MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
ALTER TABLE Usuario
ADD CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`IdStatus`) REFERENCES `Status` (`Id`),
ADD CONSTRAINT `Usuario_ibfk_2` FOREIGN KEY (`IdUsuarioAlteracao`) REFERENCES `Usuario` (`Id`);

INSERT INTO `Usuario` (`Id`, `NomeCompleto`, `CPF`, `Login`, `Senha`, `IdStatus`, `IdUsuarioAlteracao`,  `DataCriacao`) VALUES
(1, 'Luiz Felipe', '06852444902', 'ffelipeluiz25@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL, now());

CREATE TABLE Funcionalidade (
  `Id` int(11) NOT NULL,
  `Descricao` varchar(50) DEFAULT NULL,
  `IdStatus` int(11) DEFAULT 1 NOT NULL,
  `IdUsuarioAlteracao` int(11) DEFAULT 1 NOT NULL,
  `DataCriacao` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE Funcionalidade
ADD CONSTRAINT `Funcionalidade_ibfk_1` FOREIGN KEY (`IdStatus`) REFERENCES `Status` (`Id`),
ADD CONSTRAINT `Funcionalidade_ibfk_2` FOREIGN KEY (`IdUsuarioAlteracao`) REFERENCES `Usuario` (`Id`);