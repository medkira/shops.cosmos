import { VendurePlugin, PluginCommonModule } from "@vendure/core";
import { ChannelMetadataResolver } from "./api/channel-metadata.resolver";
import { ChannelMetadataService } from "./services/channel-metadata.service";
import { ChannelMetadata } from "./entities/channel-metadata.entity";
import { apiExtensions } from "./api/api-extensions";
import { channelMetadataPermission } from "./constants";

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [ChannelMetadata],
  providers: [ChannelMetadataService],
  shopApiExtensions: {
    schema: apiExtensions,
    resolvers: [ChannelMetadataResolver],
  },

  configuration: (config) => {
    config.authOptions.customPermissions.push(channelMetadataPermission);
    return config;
  },
})
export class ChannelMetadataPlugin {}
