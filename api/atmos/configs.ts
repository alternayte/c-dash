import { gql } from '@apollo/client';

export const CONFIGS = gql`
  query GetConfigs {
    configs {
      id
      symbol
      enabled
      exchange
      quoteAmount
    }
  }
`;

export const CREATE_CONFIG = gql`
  mutation CreateConfig($createConfigInput: CreateConfigInput!) {
    createConfig(createConfigInput: $createConfigInput) {
      symbol
      id
      enabled
      exchange
    }
  }
`;

export const UPDATE_CONFIG = gql`
  mutation UpdateConfig($updateConfigInput: UpdateConfigInput!) {
    updateConfig(updateConfigInput: $updateConfigInput) {
      id
    }
  }
`;
