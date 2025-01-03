import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ length: 255 })
  user_id: string;

  @Column({ length: 255, nullable: false })
  user_name: string;

  @Column({ length: 255 })
  user_phone: string;

  @Column({ length: 255 })
  user_email: string;

  @Column({ length: 255 })
  user_address: string;

  @Column({ length: 255, nullable: false })
  user_company_industry: string;

  @Column({ length: 255, nullable: false })
  user_company_name: string;

  @Column({ length: 255, nullable: false })
  user_company_address: string;

  @Column({ default: false })
  user_professional: boolean;

  @Column({ default: false })
  user_accept_tc: boolean;
}
