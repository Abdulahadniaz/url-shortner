// id, long short code

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlCode: string;

  @Column()
  longUrl: string;

  @Column()
  shortUrl: string;
}
