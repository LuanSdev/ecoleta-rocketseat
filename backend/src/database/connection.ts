import knex from 'knex';
import path from 'path';

const connection = knex({
    client : 'sqlite3',

    connection : {
        // path.resolve retorna o caminho do diretório formatado para cada SO
        filename : path.resolve(__dirname, 'database.sqlite')
    },

    migrations : {
        directory : path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    useNullAsDefault : true
});

export default connection;