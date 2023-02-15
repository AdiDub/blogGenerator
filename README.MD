# Blog Generation

The program auto generates the blog on the specific topic

Clone the project

```bash
  git clone https://upsolver@bitbucket.org/redrates/blogsgenerator.git
```

Go to the blogsgenerator directory

```bash
  cd blogsgenerator
```

Install dependencies of backend

```bash
  npm install chatgpt dotenv mongoose 
  ```

Create a .env file and Initialize the following variables

    OPENAI_EMAIL = 
    OPENAI_PASSWORD = 
    PUPPETEER_BROWSER_PATH = 
    MONGODB_URI = 

Running the program

```bash
   npm run server
    ```

Currently working on making a frontend for the service