
class CriarTabelas {
    init(conn) {
        this.conn = conn
        this.criarTabelas();

    }

    criarTabelas() {
        this.criarTabelaUsuario()
        this.criarTabelaTime()
        this.criarTabelaCampeonato()
        this.criarTabelaTimeUsuario()
        this.criarTabelaTimeCampeonato()
    }

    criarTabelaUsuario(){
        const sql = `            
            CREATE TABLE IF NOT EXISTS Usuario (
                id_usuario INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(60),
                nome_usuario VARCHAR(25),
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
                nome VARCHAR(30)
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
                sinopse VARCHAR(120),
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
}


module.exports = new CriarTabelas()