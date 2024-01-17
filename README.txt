For you run this project you'll need:
Install Docker (If you are in Windows you need Docker Desktop);
After install you can follow the next steps
Run Project (Compose Up):
  docker compose -f docker-compose.dev.yml up

Stop Running Project (Compose down):
  docker compose -f docker-compose.dev.yml down

Warning: Check the port before run compose (Default Port: 4000).

Create Migrations:
 npm run typeorm migration:create src/database/migrations/CreateUserTable

Access Docker containers:
  docker exec -it core-api-1 /bin/sh

Run Migrations:
  #You need to be in the core-api-1 container to run this command
  npm run typeorm migration:run -- -d ./src/database/data-source.ts

