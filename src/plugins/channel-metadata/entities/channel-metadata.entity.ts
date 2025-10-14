import { VendureEntity, EntityId, DeepPartial } from "@vendure/core";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Channel } from "@vendure/core";

@Entity()
export class ChannelMetadata extends VendureEntity {
  constructor(input?: DeepPartial<ChannelMetadata>) {
    super(input);
  }

  @Column()
  siteName: string;

  @Column()
  domain: string;

  @Column({ nullable: true })
  logoUrl: string;

  @ManyToOne(() => Channel)
  @JoinColumn()
  channel: Channel;
}
