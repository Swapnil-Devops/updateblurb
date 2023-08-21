import fetch from "node-fetch"; 
import * as core from "@actions/core";

const accessToken = core.getInput("PAT"); 
const discussionId = core.getInput("discussionId"); 
const updating_body = core.getInput("updatedbody");

const graphqlMutation = `
  mutation {
    updateDiscussion(input: {
      discussionId: "${discussionId}",
      body: "${updating_body}"
    }) {
      discussion {
        id
        body
      }
    }
  }
`;


const apiUrl = 'https://api.github.com/graphql';


const headers = {
  "Authorization": "Bearer ${accessToken}",
  "Content-Type": "application/json",
};

fetch(apiUrl, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ query: graphqlMutation }),
})
.then(response => {
    if (response.status === 200) {
        console.log('Discussion updated successfully.');}
});
