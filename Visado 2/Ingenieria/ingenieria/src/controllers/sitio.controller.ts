import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {Corrida, Sitio} from '../models';
import {CorridaRepository, SitioRepository} from '../repositories';


export class SitioController {
  constructor(
    @repository(SitioRepository)
    public sitioRepository: SitioRepository,
    @repository(CorridaRepository)
    public corridaRepository: CorridaRepository
  ) { }

  @post('/sitios')
  @response(200, {
    description: 'Sitio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sitio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sitio, {
            title: 'NewSitio',

          }),
        },
      },
    })
    sitio: Sitio,
  ): Promise<Sitio> {
    const sitioCreado = await this.sitioRepository.create(sitio)
    const timerId = setInterval(async () => {
      try {
        const sitio = await this.sitioRepository.find({where: {id: sitioCreado.id}})
        if (sitio.length == 0) {
          clearInterval(timerId)
          console.log(`Timer para ${sitioCreado.name} finalizado`)
          return
        }
        const url = sitioCreado.url
        const {data} = await axios.get(url)
        const $ = cheerio.load(data, {xml: true})

        //Obtener texto main de wikipedia
        const textoBody = $('div.mw-body-content').text()

        //Obtener texto de parrafos
        const paragraphs = $('p')
        let paragraphsContent = ""
        paragraphs.each((i, elem) => {
          paragraphsContent += $(elem).text()
        })

        //Busqueda por niveles

        let linksValidos: string[] = []
        const links = $('a')
        links.each((i, elem) => {
          if (elem.attribs.href != undefined && elem.attribs.href.includes('http'))
            linksValidos.push(elem.attribs.href)
        })


        //Juntar todos los textos obtenidos
        const finalText = textoBody + paragraphsContent

        if (finalText == "") {
          throw new Error("El texto es vacio")
        }

        this.corridaRepository.create({
          date: new Date().toDateString(),
          state: "completo",
          content: finalText,
          sitioId: sitioCreado.id
        })

        console.log('se genero una nueva corrida para ' + sitioCreado.name)

      } catch (error) {
        console.log('Error al generar corrida', error)
      }

    }, sitio.frequency * 1000)
    return new Promise<Sitio>((res, rej) => {res(sitioCreado)});
  }

  private recorridoRecursivo(url: string, levels: number) {
    const {data} = await axios.get(url)
    if (levels == 0) {
      return data
    }
    const $ = cheerio.load(data, {xml: true})

    //Obtener texto main de wikipedia
    const textoBody = $('div.mw-body-content').text()

    //Obtener texto de parrafos
    const paragraphs = $('p')
    let paragraphsContent = ""
    paragraphs.each((i, elem) => {
      paragraphsContent += $(elem).text()
    })

    //Busqueda por niveles

    let linksValidos: string[] = []
    const links = $('a')
    links.each((i, elem) => {
      if (elem.attribs.href != undefined && elem.attribs.href.includes('http'))
        linksValidos.push(elem.attribs.href)
    })
    return
  }

  @get('/sitios/count')
  @response(200, {
    description: 'Sitio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sitio) where?: Where<Sitio>,
  ): Promise<Count> {
    return this.sitioRepository.count(where);
  }

  @get('/api/search/{word}')
  @response(200, {
    description: 'Sitio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sitio, {includeRelations: true}),
      },
    },
  })
  async findByKeyWord(
    @param.path.string('word') word: string,
  ): Promise<Corrida[]> {
    return this.corridaRepository.find({where: {content: {like: word}}})
  }

  @get('/sitios/{id}/{word}')
  @response(200, {
    description: 'Sitio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sitio, {includeRelations: true}),
      },
    },
  })
  async findByKeyWordInSite(
    @param.path.string('word') word: string,
    @param.path.string('id') id: string,
  ): Promise<Corrida[]> {
    return this.corridaRepository.find({where: {content: {like: word}, sitioId: id}})
  }

  @get('/sitios')
  @response(200, {
    description: 'Array of Sitio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sitio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sitio) filter?: Filter<Sitio>,
  ): Promise<Sitio[]> {
    return this.sitioRepository.find(filter);
  }

  @patch('/sitios')
  @response(200, {
    description: 'Sitio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sitio, {partial: true}),
        },
      },
    })
    sitio: Sitio,
    @param.where(Sitio) where?: Where<Sitio>,
  ): Promise<Count> {
    return this.sitioRepository.updateAll(sitio, where);
  }

  @get('/sitios/{id}')
  @response(200, {
    description: 'Sitio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sitio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sitio, {exclude: 'where'}) filter?: FilterExcludingWhere<Sitio>
  ): Promise<Sitio> {
    return this.sitioRepository.findById(id, filter);
  }

  @patch('/sitios/{id}')
  @response(204, {
    description: 'Sitio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sitio, {partial: true}),
        },
      },
    })
    sitio: Sitio,
  ): Promise<void> {
    await this.sitioRepository.updateById(id, sitio);
  }

  @put('/sitios/{id}')
  @response(204, {
    description: 'Sitio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sitio: Sitio,
  ): Promise<void> {
    await this.sitioRepository.replaceById(id, sitio);
  }

  @del('/sitios/{id}')
  @response(204, {
    description: 'Sitio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.corridaRepository.deleteAll({sitioId: id})
    await this.sitioRepository.deleteById(id);

  }

  @get('/sleep', {
    parameters: [{
      name: 'ms', schema: {type: 'number'}, in:
        'query'
    }],
    responses: {
      '200': {
        description: 'Sleep in ms',
        content: {
          'application/json': {
            schema: {type: 'string'},
          },
        },
      },
    },
  })
  async sleep(ms: number) {
    await this.delay(ms)
    return `Waking up after ${ms} ms`;
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @get('/fib', {
    parameters: [{name: 'num', schema: {type: 'number'}, in: 'query'}],
    responses: {
      '200': {
        description: 'Compute fibonacci',
        content: {
          'application/json': {
            schema: {
              type: 'number',
            },
          },
        },
      },
    }
  })
  async fib(num: number) {return this.fibonacci(num)}
  fibonacci(num: number): number {
    if (num <= 1) return 1;
    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }

}
