import {Entity, model, property, hasMany} from '@loopback/repository';
import {Corrida} from './corrida.model';

@model()
export class Sitio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'number',
    required: true,
  })
  levels: number;

  @property({
    type: 'number',
    required: true,
  })
  frequency: number;

  @property({
    type: 'string',
    required: true,
  })
  extractor: string;

  @hasMany(() => Corrida)
  corridas: Corrida[];

  constructor(data?: Partial<Sitio>) {
    super(data);
  }
}

export interface SitioRelations {
  // describe navigational properties here
}

export type SitioWithRelations = Sitio & SitioRelations;
