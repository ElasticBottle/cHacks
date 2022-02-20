import { createClient } from "urql";
export const client = createClient({
  url: "http://hot-or-not-hasura.caprover.curdinc.com/v1/graphql",
});

export const userQuery = `
query MyQuery($email: String!) {
    calgary_hacks_user(where: {email: {_eq: $email}}) {
      email
      image
      reputation
      name
      uid
    }
  }
`;

export const userMutation = `
mutation MyMutation($objects: [calgary_hacks_user_insert_input!] = {}) {
    insert_calgary_hacks_user(objects: $objects) {
      returning {
        email
      }
    }
  }
  
`;
