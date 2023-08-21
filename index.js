import fetch from "node-fetch";
import * as core from "@actions/core";

const accessToken = core.getInput("PAT");
const discussionId = "D_kwDOKCGw7s4AVF-r";
const updatingbody = "GitHub Actions is a powerful automation and continuous integration/continuous deployment platform provided by GitHub. It allows you to automate various tasks and workflows in your software development process. Here's an explanation of GitHub Actions: Automation: GitHub Actions enables you to automate various tasks and processes related to your software development projects. This automation can include code validation, testing, building, deployment, and more. Workflow-Based: GitHub Actions is based on the concept of workflows. A workflow is a series of steps or jobs that are executed when specific events occur in your GitHub repository, such as code pushes, pull requests, or issue creation.";
console.log('discussionId', discussionId);
console.log('updatingbody', updatingbody);

const graphqlMutation = `
    mutation {
        updateDiscussion(input: {
            discussionId: "${discussionId}",
            body: "${updatingbody}"
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
    "Content-Type": "application/json",
    'Authorization': 'Bearer '+ accessToken ,
};


console.log('Api url', apiUrl)
console.log('heade:', headers)
console.log('graph mutation', graphqlMutation)
fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query: graphqlMutation }),
})
    .then(response => {
        if (response.status === 200) {
            console.log('Discussion updated successfully.');
        }
        else {
            console.log('Error:', response.status , response.message)
        }
    });
