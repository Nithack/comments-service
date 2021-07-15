import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column()
  description: string;
  @Column()
  owner: string;
  @Column()
  publication: string;
}
