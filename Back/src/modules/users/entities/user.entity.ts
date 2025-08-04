import { Role } from "../../common/enums/rol.enum";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Reporte } from "../../reporte/entities/cliente.entity"; // Asegúrate de que la ruta sea correcta

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 225, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;

}
