import fetch from "node-fetch"; 
import * as core from "@actions/core";

const accessToken = core.getInput("PAT"); 
const discussionId = core.getInput("discussionID"); 
const updatingbody = core.getInput("updatedbody");
console.log('discussionId',discussionId);
console.log('updatingbody',updatingbody);

const graphqlMutation = `
  mutation {
    updateDiscussion(input: {
      discussionId: ${discussionId},
      body: ${updatingbody}
    }) {
      discussion {
        id
        body
      }
    }
  }
`;

// Set up the GraphQL endpoint URL
const apiUrl = 'https://api.github.com/graphql';

// Set up headers for authentication and content type
const headers = {
  "Content-Type": "application/json",
  'Authorization': 'Bearer '+ accessToken,
};

// Make the GraphQL request using a POST request
console.log('Api url',apiUrl)
console.log('heade:',headers)
console.log('graph mutation',graphqlMutation)
fetch(apiUrl, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ query: graphqlMutation }),
})
.then(response => {
    if (response.status === 200) {
        console.log('Discussion updated successfully.');}
    else{
        console.log('Error:',response.status+response.message)
    }
});
