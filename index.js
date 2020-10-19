const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description for your project."
    },
    {
      type: "input",
      name: "installation",
      message: "What are the instillation instructions for the project? If no instructions write NONE"
    },
    {
      type: "input",
      name: "contribution",
      message: "Who worked on this project?"
    },
    {
      type: "input",
      name: "test",
      message: "What are the Test Instructions"
    },
    {
      type: "checkbox",
      message: "Select a license.",
      choices: [
        "Apache",
        "MIT",
        "ISC",
        "GNU GPLv3"
      ],
      name: "license",
    },
    {
      type: "input",
      name: "credit",
      message: "Whose credit is this work"
    },
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address"
    },
  ]);
}

function generateMarkdown(response) {
  return `
# ${response.title}

# Table of Contents

-[Description](#description)
-[Installation](#installation)
-[Usage](#usage)
-[Contributing](#contributing)
-[Test](#test)
-[Credits](#credits)
-[License](#license)
-[Questions](#questions)


## Description:
![License](https://img.shields.io/badge/Licesnse-${response.license}-blue.svg "License Badge")

    ${response.description}
## Instalation:
    ${response.installation}
## Usage:
    ${response.usage}
## Contributing:
    ${response.contribution}
## Test:
    ${response.test}
## Credits:
    ${response.credit}
## License:
    For more information about the License, click the link below

- [License](http://opensource.org/licenses/${response.license})

## Questions: 
    For questions about the Readme generator go to my Github Page
    at the link below:
    
- [Github Profile](https://github.com/${response.username})    

For more questions feel free to email me at: ${response.email}
`;
}

async function init() {
  
  try {
    const response = await promptUser();

    const readMe = generateMarkdown(response);

    await writeFileAsync("README.md", readMe);

    console.log("Success");
  } catch(err) {
    console.log(err);
  }
}

init();
