# Development & Contributing Guide

## Code Style & Standards

### Backend (Node.js)

#### File Structure

```
src/
├── config/      # Configuration only
├── models/      # Mongoose schemas
├── services/    # Business logic
├── controllers/ # Route handlers
├── routes/      # Route definitions
├── middleware/  # Middleware functions
├── logger/      # Logging utilities
├── utils/       # Utility functions
├── helpers/     # Helper functions
└── server.js    # Entry point
```

#### Naming Conventions

- **Files**: camelCase.js or PascalCase.js for classes
- **Functions**: camelCase()
- **Constants**: UPPER_SNAKE_CASE
- **Classes**: PascalCase

#### Code Template - Service

```javascript
import { Contact } from "../models/Contact.js";

export class ContactService {
  async getAllContacts() {
    try {
      return await Contact.find({ isActive: true });
    } catch (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }
  }
}

export const contactService = new ContactService();
```

#### Code Template - Controller

```javascript
import { contactService } from "../services/ContactService.js";
import { sendResponse, sendError } from "../helpers/response.js";
import { logger } from "../logger/index.js";

export class ContactController {
  async getAll(req, res) {
    try {
      const data = await contactService.getAllContacts();
      sendResponse(res, 200, "Success message", data);
    } catch (error) {
      logger.error("Error message", { error: error.message });
      sendError(res, 500, "User-friendly error message");
    }
  }
}
```

### Frontend (Svelte)

#### Component Structure

```svelte
<script>
  // Imports
  import Card from '../common/Card.svelte';

  // Props
  export let title = '';

  // State
  let isLoading = false;

  // Methods
  const handleClick = () => {};
</script>

<!-- Markup -->
<div class="component">
  {#if isLoading}
    <p>Loading...</p>
  {/if}
</div>

<!-- Styles -->
<style>
  .component {
    /* scoped styles */
  }
</style>
```

#### Naming Conventions

- **Components**: PascalCase.svelte
- **Stores**: camelCase.js
- **Props**: camelCase
- **CSS Classes**: kebab-case

---

## Common Development Tasks

### Adding a New API Endpoint

1. **Create Model** (if new resource)

   ```javascript
   // src/models/NewModel.js
   const schema = new mongoose.Schema({...});
   export const NewModel = mongoose.model('NewModel', schema);
   ```

2. **Create Service**

   ```javascript
   // src/services/NewService.js
   export class NewService {
     async getAll() {...}
     async create(data) {...}
   }
   ```

3. **Create Controller**

   ```javascript
   // src/controllers/NewController.js
   export class NewController {
     async getAll(req, res) {...}
   }
   ```

4. **Create Routes**

   ```javascript
   // src/routes/new.js
   import { newController } from "../controllers/NewController.js";
   router.get("/", (req, res) => newController.getAll(req, res));
   ```

5. **Register Routes**
   ```javascript
   // src/server.js
   import newRoutes from "./routes/new.js";
   app.use(`${config.api.prefix}/new`, newRoutes);
   ```

### Adding a New UI Component

1. **Create Component**

   ```svelte
   <!-- src/components/common/NewComponent.svelte -->
   <script>
     export let prop = '';
   </script>

   <div class="new-component">
     {prop}
   </div>

   <style>
     .new-component { }
   </style>
   ```

2. **Use Component**

   ```svelte
   <script>
     import NewComponent from '../common/NewComponent.svelte';
   </script>

   <NewComponent prop="value" />
   ```

---

## Testing

### Backend - Manual Testing with curl

```bash
# Get all contacts
curl -X GET http://localhost:3000/api/v1/contacts

# Create contact
curl -X POST http://localhost:3000/api/v1/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# Update contact
curl -X PUT http://localhost:3000/api/v1/contacts/:id \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane"}'

# Delete contact
curl -X DELETE http://localhost:3000/api/v1/contacts/:id
```

### Frontend - Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Application → Cookies
3. Check Network tab for API calls
4. Use Console to test Svelte store values

---

## Debugging

### Backend Logging

Logs are written to:

- Console (real-time)
- `logs/error.log` (errors)
- `logs/warn.log` (warnings)
- `logs/info.log` (info)

Adjust LOG_LEVEL in `.env`:

```env
LOG_LEVEL=debug  # Show all logs including debug
LOG_LEVEL=info   # Show info and above
LOG_LEVEL=error  # Show only errors
```

### Frontend Debugging

```javascript
// In any Svelte component
console.log("Debug info", variable);

// Check store values
contacts.subscribe((value) => console.log("Contacts:", value));
```

---

## Performance Tips

### Backend

- Use database indexes for frequently queried fields
- Implement caching for static data
- Use pagination for large datasets
- Validate input early
- Log only essential information

### Frontend

- Lazy load routes
- Minimize CSS and JS
- Use Svelte reactivity instead of computed properties
- Cache API responses in stores
- Optimize images before use

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push and create pull request
git push origin feature/new-feature
```

### Commit Message Format

```
type(scope): subject

- fix: bug fixes
- feat: new features
- docs: documentation
- style: code formatting
- refactor: code reorganization
- perf: performance improvements
- test: tests

Example: feat(contacts): add search functionality
```

---

## Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations complete
- [ ] Frontend build passes
- [ ] No console errors or warnings
- [ ] API endpoints tested
- [ ] CORS configured correctly
- [ ] Logging configured
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Security review complete

---

## Resources

- [Svelte Documentation](https://svelte.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
