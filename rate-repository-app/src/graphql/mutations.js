import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
      user{
          username
      }
    }
  }
`;
