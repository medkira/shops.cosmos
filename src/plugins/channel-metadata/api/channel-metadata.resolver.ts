import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Allow, Ctx, Permission, RequestContext } from "@vendure/core";
import { ChannelMetadata } from "../entities/channel-metadata.entity";
import { ChannelMetadataService } from "../services/channel-metadata.service";

@Resolver()
export class ChannelMetadataResolver {
  constructor(private channelMetadataService: ChannelMetadataService) {}

  @Query()
  async channelMetadata(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: string }
  ) {
    return this.channelMetadataService.getChannelMetadata(ctx, args.id);
  }

  @Query()
  async channelMetadatas(
    @Ctx() ctx: RequestContext,
    @Args() args: { options?: any }
  ) {
    return this.channelMetadataService.getChannelMetadatas(ctx, args.options);
  }

  @Mutation()
  @Allow(Permission.DeleteChannel)
  async deleteChannelMetadata(
    @Ctx() ctx: RequestContext,
    @Args() args: { id: string }
  ) {
    return this.channelMetadataService.deleteChannelMetadata(ctx, args.id);
  }

  @Mutation()
  @Allow(Permission.UpdateChannel)
  @Allow(Permission.Owner)
  async updateChannelMetadata(
    @Ctx() ctx: RequestContext,
    @Args() args: { input: any }
  ) {
    return this.channelMetadataService.updateChannelMetadata(ctx, args.input);
  }

  @Mutation(() => ChannelMetadata)
  @Allow(Permission.CreateChannel)
  @Allow(Permission.Owner)
  async createChannelMetadata(
    @Ctx() ctx: RequestContext,
    @Args("input")
    input: {
      siteName: string;
      domain: string;
      logoUrl?: string;
      channelId: string;
    }
  ) {
    return this.channelMetadataService.createChannelMetadata(ctx, input);
  }
}
