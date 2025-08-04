
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';


@Entity('formulario')  // Ajuste: usar el nombre real de tu tabla en singular
export class formulario {
  @PrimaryGeneratedColumn()
  id: number;

    @Column({ nullable: true})
    fecha:Date


    @Column({ type: 'varchar', length: 50, nullable: true })
    serie: string;

    // Tipo: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    tipo: string;

    // Descripción de trabajo: Usamos 'text' para textos largos
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    // Acciones: Se usa 'varchar' con longitud definida
    @Column({ type: 'varchar', length: 50, nullable: true })
    recomendado: string;

}