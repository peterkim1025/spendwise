import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  me {
    _id
    email
    username
    transactions {
      _id
      title
      amount
      date
      category
      description
    }
  }
}
`;

export const QUERY_TRANSACTIONS = gql`
query transactions {
  transactions {
    _id
    title
    amount
    date
    category
    description
  }
}
`;
