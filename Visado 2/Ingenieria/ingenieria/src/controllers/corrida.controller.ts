import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Corrida} from '../models';
import {CorridaRepository} from '../repositories';

export class CorridaController {
  constructor(
    @repository(CorridaRepository)
    public corridaRepository : CorridaRepository,
  ) {}

  @post('/corridas')
  @response(200, {
    description: 'Corrida model instance',
    content: {'application/json': {schema: getModelSchemaRef(Corrida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Corrida, {
            title: 'NewCorrida',
            
          }),
        },
      },
    })
    corrida: Corrida,
  ): Promise<Corrida> {
    return this.corridaRepository.create(corrida);
  }

  @get('/corridas/count')
  @response(200, {
    description: 'Corrida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Corrida) where?: Where<Corrida>,
  ): Promise<Count> {
    return this.corridaRepository.count(where);
  }

  @get('/corridas')
  @response(200, {
    description: 'Array of Corrida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Corrida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Corrida) filter?: Filter<Corrida>,
  ): Promise<Corrida[]> {
    return this.corridaRepository.find(filter);
  }

  @patch('/corridas')
  @response(200, {
    description: 'Corrida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Corrida, {partial: true}),
        },
      },
    })
    corrida: Corrida,
    @param.where(Corrida) where?: Where<Corrida>,
  ): Promise<Count> {
    return this.corridaRepository.updateAll(corrida, where);
  }

  @get('/corridas/{id}')
  @response(200, {
    description: 'Corrida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Corrida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Corrida, {exclude: 'where'}) filter?: FilterExcludingWhere<Corrida>
  ): Promise<Corrida> {
    return this.corridaRepository.findById(id, filter);
  }

  @patch('/corridas/{id}')
  @response(204, {
    description: 'Corrida PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Corrida, {partial: true}),
        },
      },
    })
    corrida: Corrida,
  ): Promise<void> {
    await this.corridaRepository.updateById(id, corrida);
  }

  @put('/corridas/{id}')
  @response(204, {
    description: 'Corrida PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() corrida: Corrida,
  ): Promise<void> {
    await this.corridaRepository.replaceById(id, corrida);
  }

  @del('/corridas/{id}')
  @response(204, {
    description: 'Corrida DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.corridaRepository.deleteById(id);
  }
}
