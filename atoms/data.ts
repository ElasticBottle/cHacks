import { createClient } from "urql";
export const client = createClient({
  url: "http://hot-or-not-hasura.caprover.curdinc.com/v1/graphql",
});

export const userQuery = `
query MyQuery {
  calgary_hacks_location(where: {online: {_eq: true}}) {
    online
    location
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
