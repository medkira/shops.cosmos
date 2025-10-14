import { Injectable } from "@nestjs/common";
import {
  TransactionalConnection,
  RequestContext,
  Channel,
} from "@vendure/core";
import { ChannelMetadata } from "../entities/channel-metadata.entity";

@Injectable()
export class ChannelMetadataService {
  constructor(private connection: TransactionalConnection) {}

  async createChannelMetadata(
    ctx: RequestContext,
    input: {
      siteName: string;
      domain: string;
      logoUrl?: string;
      channelId: string;
    }
  ) {
    const assignedChannels = await this.connection
      .getRepository(ctx, Channel)
      .find({
        where: {
          id: ctx.channel.id,
        },
      });

    if (assignedChannels.length > 0) {
      throw new Error("Channel metadata already exists for this channel");
    }

    const channel = await this.connection.getEntityOrThrow(
      ctx,
      Channel,
      input.channelId
    );
    const metadata = new ChannelMetadata({
      siteName: input.siteName,
      domain: input.domain,
      logoUrl: input.logoUrl,
      channel,
    });
    return this.connection.getRepository(ctx, ChannelMetadata).save(metadata);
  }

  async getChannelMetadata(ctx: RequestContext, id: string) {
    return this.connection
      .getRepository(ctx, ChannelMetadata)
      .findOne({ where: { id }, relations: ["channel"] });
  }

  async getChannelMetadatas(ctx: RequestContext, options?: any) {
    const repo = this.connection.getRepository(ctx, ChannelMetadata);
    const [items, totalItems] = await repo.findAndCount({
      // where: {
      //   channel: {
      //     id: ctx.channel.id,
      //   },
      // },
      relations: ["channel"],
    });
    return { items, totalItems };
  }

  async updateChannelMetadata(
    ctx: RequestContext,
    input: Partial<ChannelMetadata>
  ) {
    const repo = this.connection.getRepository(ctx, ChannelMetadata);
    const entity = await repo.findOne({ where: { id: input.id } });
    if (!entity) throw new Error("Channel metadata not found");
    Object.assign(entity, input);
    return repo.save(entity);
  }

  async deleteChannelMetadata(ctx: RequestContext, id: string) {
    const repo = this.connection.getRepository(ctx, ChannelMetadata);
    const entity = await repo.findOne({ where: { id } });
    if (!entity) throw new Error("Channel metadata not found");
    return repo.remove(entity);
  }
}
