
class CriarTabelas {
    init(conn) {
        this.conn = conn
        this.criarTabelas();

    }

    criarTabelas() {
        // this.criarTabelaUsuario()
        // this.criarTabelaTime()
        // this.criarTabelaCampeonato()
        // this.criarTabelaTimeUsuario()
        // this.criarTabelaTimeCampeonato()
        // this.criarTabelaSolicitacaoTime()
    }

    criarTabelaUsuario(){
        const sql = `            
            CREATE TABLE IF NOT EXISTS Usuario (
                id_usuario INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(60),
                nome_usuario VARCHAR(25),
                contato varchar(11) NOT NULL,
                plataforma varchar(16) NOT NULL,
                email VARCHAR(120),
                senha VARCHAR(150)
            );
        `
        this.conn.query(sql, (error) => {
            if (error) {
                console.log(error)
                return;
            }

            console.log("Tabela Usuario criada com sucesso!")
        });
    }

    criarTabelaTime(){
        const sql = `            
            CREATE TABLE IF NOT EXISTS Time (
                id_time INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(30),
                criado_por varchar(60) NOT NULL
            );
        `
        this.conn.query(sql, (error) => {
            if (error) {
                console.log(error)
                return;
            }

            console.log("Tabela Time criada com sucesso!")
        });
    }

    criarTabelaCampeonato(){
        const sql = `

            CREATE TABLE IF NOT EXISTS Campeonato (
                id_campeonato INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(60),
                data DATETIME,
                valor_entrada float NOT NULL,
                limite_jogadores_time int(11) DEFAULT NULL,
                sinopse varchar(120) DEFAULT NULL,
                modalidade VARCHAR(20)
            );
        `
        this.conn.query(sql, (error) => {
            if (error) {
                console.log(error)
                return;
            }

            console.log("Tabela Campeonato criada com sucesso!")
        });
    }

    criarTabelaTimeUsuario(){
        const sql = `
            CREATE TABLE IF NOT EXISTS Time_usuario (
                id_time_usuario INT PRIMARY KEY AUTO_INCREMENT,
                fk_id_usuario INT,
                fk_id_time INT,
                
                FOREIGN KEY (fk_id_usuario) REFERENCES Usuario (id_usuario),
                FOREIGN KEY (fk_id_time) REFERENCES Time (id_time)
            );
        `
        this.conn.query(sql, (error) => {
            if (error) {
                console.log(error)
                return;
            }

            console.log("Tabela TimeUsuario criada com sucesso!")
        });
    }

    criarTabelaTimeCampeonato(){
        const sql = ` 
            CREATE TABLE IF NOT EXISTS Time_campeonato(
                id_time_campeonato INT PRIMARY KEY AUTO_INCREMENT,
                limite_jogadores int(11) NOT NULL,
                fk_id_time INT,
                fk_id_campeonato INT,
                
                FOREIGN KEY (fk_id_campeonato) REFERENCES Campeonato (id_campeonato),
                FOREIGN KEY (fk_id_time) REFERENCES Time (id_time)
            );
        `
        this.conn.query(sql, (error) => {
            if (error) {
                console.log(error)
                return;
            }

            console.log("Tabela TimeCampeonato criada com sucesso!")
        });
    }

    criarTabelaSolicitacaoTime(){
        const sql = `CREATE TABLE IF NOT EXISTS solicitacao_time_usuario(
            id_solicitacao INT PRIMARY KEY AUTO_INCREMENT,
            fk_id_usuario INT,
            fk_id_time INT,
            aceitou VARCHAR(1),
            
            FOREIGN KEY (fk_id_usuario) REFERENCES Usuario (id_usuario),
            FOREIGN KEY (fk_id_time) REFERENCES Time (id_time)
        );`

        this.conn.query(sql, (error) => {
            if (error) {
                console.log(error)
                return;
            }

            console.log("Tabela solicitacaoTimeUsuario criada com sucesso!")
        });
    }
}


module.exports = new CriarTabelas()