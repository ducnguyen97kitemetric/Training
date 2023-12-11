import { UserType } from 'src/types/user';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;
  
  @Column({
    nullable: false
  })
  fullName: string;

  @Column({
    nullable: false
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: UserType.basic
  })
  userType: UserType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
