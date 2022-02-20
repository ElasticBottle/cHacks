import { createClient } from "urql";
export const client = createClient({
  url: "https://hot-or-not-hasura.caprover.curdinc.com/v1/graphql",
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
mutation MyMutation($objects: [calgary_hacks_user_insert_input!]!) {
    insert_calgary_hacks_user(objects: $objects) {
      returning {
        email
      }
    }
  }
  
`;

export const leaderBoardQuery = `
query MyQuery3 {
    calgary_hacks_user(order_by: {reputation: desc}, limit: 10) {
      image
      name
      reputation
    }
  }
`;

export const locationMutation = `
mutation MyMutation2($objects: [calgary_hacks_location_insert_input!]!) {
    insert_calgary_hacks_location(objects: $objects) {
      returning {
        uid
      }
    }
  }
  `;

export const locationQuery = `
query MyQuery4($uid: Int!) {
    calgary_hacks_location(where: {uid: {_neq: $uid}}, order_by: {last_seen_at: desc}) {
      location
    }
  }
  
  `;

export const promptQuery = `
query MyQuery5($prompt: Int!) {
    calgary_hacks_prompts(where: {stage: {_eq: $prompt}}) {
      prompt
    }
  }
  `;

export const updateUserActiveQuery = `
mutation MyMutation3($uid: Int!) {
    update_calgary_hacks_user(_set: {in_challenge: true}, where: {uid: {_eq: $uid}}) {
      returning {
        uid
      }
    }
  }
  `;

export const userChallengeQuery = `
query MyQuery6($uid: Int!) {
    calgary_hacks_user(where: {in_challenge: {_eq: true}, uid: {_neq: $uid}}) {
      uid
      name
      prompts {
        prompt
      }
    }
  }
`;

export const updateUserRepMutation = `
mutation updateRepAndInChallenge($id: Int!) {
    update_calgary_hacks_user(where: {uid: {_eq: $id}}, _set: {in_challenge: false}, _inc: {reputation: 1}) {
      returning {
        in_challenge
      }
    }
  } 
`;
