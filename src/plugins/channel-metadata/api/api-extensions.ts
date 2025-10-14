import gql from "graphql-tag";

export const apiExtensions = gql`
  type ChannelMetadata implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    siteName: String!
    domain: String!
    logoUrl: String
    channel: Channel!
  }

  type ChannelMetadataList implements PaginatedList {
    items: [ChannelMetadata!]!
    totalItems: Int!
  }

  extend type Query {
    channelMetadata(id: ID!): ChannelMetadata
    channelMetadatas(options: ChannelMetadataListOptions): ChannelMetadataList!
  }

  extend type Mutation {
    updateChannelMetadata(input: UpdateChannelMetadataInput!): ChannelMetadata!
    createChannelMetadata(input: CreateChannelMetadataInput!): ChannelMetadata!
    deleteChannelMetadata(id: ID!): ChannelMetadata!
  }

  input UpdateChannelMetadataInput {
    id: ID!
    siteName: String
    domain: String
    logoUrl: String
  }

  input CreateChannelMetadataInput {
    siteName: String!
    domain: String!
    logoUrl: String
    channelId: ID!
  }

  input ChannelMetadataListOptions {
    skip: Int
    take: Int
    sort: ChannelMetadataSortParameter
    filter: ChannelMetadataFilterParameter
  }

  input ChannelMetadataSortParameter {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    siteName: SortOrder
    domain: SortOrder
  }

  input ChannelMetadataFilterParameter {
    id: IDOperators
    createdAt: DateOperators
    updatedAt: DateOperators
    siteName: StringOperators
    domain: StringOperators
  }
`;
