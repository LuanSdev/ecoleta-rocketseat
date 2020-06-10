import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  // RETORNA APENAS UM VALOR ESPECÍFICO, UM VALOR FILTRADO POR PARÂMETROS
  async show(request : Request, response : Response){
    const {id} = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point){
      return response.status(400).json({message : "point not found"});
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({point, items});
  }

  // RETORNA VALORES FILTRADOS POR QUERYS
  async index(request : Request, response : Response){
    const {city, uf, items} = request.query;

    // Separa o array de item passados na query e os separa e remove os espaços
    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);

  }


  /* Cria um ponto de coleta */
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    // Garante que as duas querys sejam executadas
    // Caso uma dê errado, retorna um callback e cancela todas
    const trx = await knex.transaction();

    const point = {
      image: "image fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx('point_items').insert(pointItems);

    // MUITO IMPORTANTE
    // Envia as querys ao banco e aguarda serem executadas
    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
