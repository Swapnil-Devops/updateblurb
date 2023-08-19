

import fetch from "node-fetch";
import * as core from "@actions/core";

// const blurb_title =core.getInput("blurb_title")
const accessToken = core.getInput("PAT");
const discussionId = core.getInput("disc_number");
const updating_body = core.getInput("blurb_body");
const updatedContent = {
    // title: blurb_title,
    body: updating_body
};

const updateUrl = `https://api.github.com/repos/Swapnil-Devops/test_repo/discussions/${discussionId}`;


// Set up headers
const headers = {
    "Authorization":  "Bearer " + accessToken,
    "Content-Type": "application/json",
};

fetch(updateUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(updatedContent)
})
.then(response => {
    if (response.status === 200) {
        console.log('Discussion updated successfully.');
    } else {
        console.log('Failed to update discussion. Status code:', response.status);
        return response.json().then(data => {
            console.log('Response:', data);
        });
    }
})
.catch(error => {
    console.error('Error:', error);
});
