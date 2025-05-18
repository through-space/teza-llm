#  Teza-llm
___
## Description

This is a home assignment for Teza.
The goal of the project is to build a Full Stack working project that has a webpage, showing a form and the response data.
The data must be provided by generative AI.

User inputs a band name and year and gets text about significant events during chosen year and gets a generated image describing the text. 
___


## Features
- Input Form
  - Input Validation
  - Submit Form
- Displays Generated Text
- Displays Generated Image
- Shows Error if no LLM API KEY provided
- Provides generated response statistics
- Includes tests
- Saves submitted form data and shows the most recent submitted data

- Deployed on https://teza-llm.onrender.com

## Get Started

### Installation
#### Local Development
##### Prerequisites:
 - Install Docker
 - Create OpenAI account and key: [OpenAI API Platform](https://openai.com/api/)

    

 
 - clone github repo 
```shell
   git clone https://github.com/through-space/teza-llm.git
```

 - Create .env file in the project root directory with the following text:
 ```dotenv
    DATABASE_URL=postgres://user:password@db:5432/mydb
    OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

- Build and Run
```shell
  docker compose build 
  docker compose up
```


### ToDo:
- [x] MVP
- [ ] Form Validation
- [x] Add Loading State
- [ ] Save Form Data
- [ ] Show Last Form Data
- [x] Generate Image
- [ ] Show error if no LLM Key provided
- [ ] Tests
