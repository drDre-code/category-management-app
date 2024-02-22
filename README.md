# Category Management Application

The Category Management Application is designed to facilitate the organization and management of event categories in a hierarchical structure. It allows administrators to efficiently add, remove, fetch, and move categories, providing a flexible way to organize events. Built using TypeScript and PostgreSQL, this application offers a powerful backend solution for category management.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS Version)
- npm (Latest Version)
- PostgreSQL (Version 12 or newer recommended)

### Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**

```bash
git clone https://github.com/drDre-code/category-management-app.git
cd category-management-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Duplicate the .env.example file to .env and .env.test update your with your database connection strings.

4. **Start the Application**

```bash
npm run build
npm start
```

5. **Running the Tests**
   Ensure the application functions as expected by running the automated tests:

```bash
npm test
```

6. **API Endpoints**
   The application supports several RESTful endpoints for category management:

- `POST /categories`: Add a new category.
- `DELETE /categories/:id`: Remove a category by ID.
- `GET /categories/:id/subtree`: Fetch a subtree of categories starting from the specified parent ID.
- `PATCH /categories/:id/parent`: Move a category to a new parent.
- `GET /categories/top-level`: Fetches the top level Categories.
- `GET /api-docs`: API Docs of the project.

8. **Built With**
   Express - Web framework for Node.js.
   PostgreSQL - Open-source relational database.
   TypeScript - Superset of JavaScript offering static type checking.
