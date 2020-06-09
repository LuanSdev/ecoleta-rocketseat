import Knex from 'knex';

export async function seed(knex : Knex){
    await knex('items').insert([
        {title : 'Lâmpadas', image : 'lampadas.svg'},
        {title : 'Papéis e Papelão', image : 'papeis_papelao.svg'},
        {title : 'Pilhas e Baterias', image : 'baterias.svg'},
        {title : 'Resíduos Eletrônicos', image : 'eletronicos.svg'},
        {title : 'Resíduos Orgânicos', image : 'organicos.svg'},
        {title : 'Óleo de Cozinha', image : 'oleo.svg'},
    ])
}