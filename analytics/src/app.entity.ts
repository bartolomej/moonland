import { Column, Entity } from 'typeorm';

@Entity()
export class AppEntity {
  @Column()
  text = 'Hello World';
}
