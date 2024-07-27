# Product Management Project - Giovanni Solano Segura

This project is a product management application built with Node.js with Typescript, Express, and TypeORM.
It includes functionality for creating, reading, updating, and deleting products, both individually and in batches. It also provides JWT-based authentication and data validation using Joi.

## Requirements

- Node.js (v16 or higher)
- npm (v8 or higher)
- SQL database (MySQL)


## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/GiovanniSolano/giovanni-solano-segura.git
   cd giovanni-solano-segura
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Configure env variables:**

- Create a .env file in the root of the project.
- To set up your environment variables, start by copying the example: `.env.example` file provided.
- Set your own database and jwt configuration.

4. **Run migrations:**

```bash
   npm run migrate
```

### Important 

This project uses typeorm migrations, the commands available are:

```bash
   npm run migrate # Running pending migrations
   npm run rollback # Revert migrations
   npm run migration:create --name=migration_name # Create a new migration
```

The current configuration provides initial data to test the app quickly.

* user: giovannisolano211@gmail.com / admin.
* products: 10 products


5. **Testing app:**

```bash
   npm run dev
```

And now, you are ready to test the app, the current base paths are:

```bash
   http://localhost:3300/api/v1/auth
   http://localhost:3300/api/v1/products
```

# Product Management Project - Giovanni Solano Segura

Feel free to import the official postman documentation from:

```bash
   https://documenter.getpostman.com/view/6009041/2sA3kaBJiC
```

Thanks for reading.