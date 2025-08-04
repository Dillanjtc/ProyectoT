import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { Cliente } from '../../Client/entities/client.entity';
import { formulario } from '../../formulario/entities/formulario.entity';

@Entity('Reporte')
@Index('UQ_reporte_formulario', ['formulario'], { unique: true })
export class Reporte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  direccion: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  creado_en: Date;

  @ManyToOne(() => Cliente, (client) => client.reportes, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Cliente;

  // Si el campo "reporte" no existe en formulario.entity.ts, eliminamos la relación inversa.
  @OneToOne(() => formulario, { eager: true })
  @JoinColumn({ name: 'formulario_id' })
  formulario: formulario;

  // 🚫 Eliminada la relación con Ticket porque fue eliminado
  // @ManyToOne(() => Ticket, ticket => ticket.reportes, { eager: true })
  // @JoinColumn({ name: 'ticket_id' })
  // ticket: Ticket;

  // 🚫 Eliminada la relación con User porque no existe "user.reporte"
  // @OneToMany(() => User, user => user.reporte)
  // users: User[];
}
