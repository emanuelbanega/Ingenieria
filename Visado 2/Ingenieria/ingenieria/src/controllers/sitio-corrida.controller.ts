import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Sitio,
  Corrida,
} from '../models';
import {SitioRepository} from '../repositories';

export class SitioCorridaController {
  constructor(
    @repository(SitioRepository) protected sitioRepository: SitioRepository,
  ) { }

  @get('/sitios/{id}/corridas', {
    responses: {
      '200': {
        description: 'Array of Sitio has many Corrida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Corrida)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Corrida>,
  ): Promise<Corrida[]> {
    return this.sitioRepository.corridas(id).find(filter);
  }

  @post('/sitios/{id}/corridas', {
    responses: {
      '200': {
        description: 'Sitio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Corrida)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sitio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Corrida, {
            title: 'NewCorridaInSitio',
            exclude: ['id'],
            optional: ['sitioId']
          }),
        },
      },
    }) corrida: Omit<Corrida, 'id'>,
  ): Promise<Corrida> {
    return this.sitioRepository.corridas(id).create(corrida);
  }

  @patch('/sitios/{id}/corridas', {
    responses: {
      '200': {
        description: 'Sitio.Corrida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Corrida, {partial: true}),
        },
      },
    })
    corrida: Partial<Corrida>,
    @param.query.object('where', getWhereSchemaFor(Corrida)) where?: Where<Corrida>,
  ): Promise<Count> {
    return this.sitioRepository.corridas(id).patch(corrida, where);
  }

  @del('/sitios/{id}/corridas', {
    responses: {
      '200': {
        description: 'Sitio.Corrida DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Corrida)) where?: Where<Corrida>,
  ): Promise<Count> {
    return this.sitioRepository.corridas(id).delete(where);
  }
}
