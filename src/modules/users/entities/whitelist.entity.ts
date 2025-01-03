import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'professional_user_whitelist' })
export class UserWhitelist {
  @PrimaryColumn({ length: 255 })
  user_id: string;
}
