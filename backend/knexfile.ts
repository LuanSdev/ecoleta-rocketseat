import path from 'path';

module.exports = {
    client : 'sqlite3',

    connection : {
        // path.resolve retorna o caminho do diretório formatado para cada SO
        filename : path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },

    migrations : {
        directory : path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    seeds : {
        directory : path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault : true
}