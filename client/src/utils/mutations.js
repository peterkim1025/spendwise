import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation addTransaction(
    $title: String!
    $amount: Float!
    $date: String!
    $category: String!
    $description: String!
  ) {
    addTransaction(
      title: $title
      amount: $amount
      date: $date
      category: $category
      description: $description
    ) {
      _id
      title
      amount
      date
      category
      description
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!, $email: String!, $password: String!) {
    deleteUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
      amount
      description
    }
  }
`;

