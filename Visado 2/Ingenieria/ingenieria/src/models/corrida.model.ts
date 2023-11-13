import {Entity, model, property} from '@loopback/repository';

@model()
export class Corrida extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
  })
  sitioId?: string;

  constructor(data?: Partial<Corrida>) {
    super(data);
  }
}

export interface CorridaRelations {
  // describe navigational properties here
}

export type CorridaWithRelations = Corrida & CorridaRelations;
