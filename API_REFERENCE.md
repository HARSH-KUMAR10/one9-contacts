# API Reference

Complete REST API documentation for One9 Contact backend.

## Base Information

**Base URL**: `http://localhost:3000/api/v1`

**Authentication**: None (add JWT implementation if needed)

**Response Format**: JSON

**Content-Type**: `application/json`

---

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": {}
}
```

---

## Endpoints

### Health Check

#### GET /health

Check if API is running.

**Request:**

```http
GET /api/v1/health
```

**Response:** 200 OK

```json
{
  "status": "OK",
  "timestamp": "2026-03-20T10:30:00.000Z"
}
```

---

### Contacts

#### GET /contacts

Retrieve all active contacts.

**Request:**

```http
GET /api/v1/contacts
```

**Response:** 200 OK

```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 234 567 8900",
      "notes": "VIP client",
      "isActive": true,
      "createdAt": "2026-03-20T10:30:00.000Z",
      "updatedAt": "2026-03-20T10:30:00.000Z"
    }
  ]
}
```

---

#### GET /contacts/:id

Retrieve a specific contact by ID.

**Parameters:**

- `id` (path, required): Contact MongoDB ID

**Request:**

```http
GET /api/v1/contacts/507f1f77bcf86cd799439011
```

**Response:** 200 OK

```json
{
  "success": true,
  "message": "Contact retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "notes": "VIP client",
    "isActive": true,
    "createdAt": "2026-03-20T10:30:00.000Z",
    "updatedAt": "2026-03-20T10:30:00.000Z"
  }
}
```

**Errors:**

- 404: Contact not found

---

#### GET /contacts/search

Search contacts by name or email.

**Query Parameters:**

- `q` (required): Search query string

**Request:**

```http
GET /api/v1/contacts/search?q=john
```

**Response:** 200 OK

```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 234 567 8900",
      "notes": "VIP client",
      "isActive": true,
      "createdAt": "2026-03-20T10:30:00.000Z",
      "updatedAt": "2026-03-20T10:30:00.000Z"
    }
  ]
}
```

**Errors:**

- 400: Search query is required

---

#### POST /contacts

Create a new contact.

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 987 654 3210",
  "notes": "Potential client"
}
```

**Request:**

```http
POST /api/v1/contacts
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 987 654 3210",
  "notes": "Potential client"
}
```

**Response:** 201 Created

```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1 987 654 3210",
    "notes": "Potential client",
    "isActive": true,
    "createdAt": "2026-03-20T10:35:00.000Z",
    "updatedAt": "2026-03-20T10:35:00.000Z"
  }
}
```

**Required Fields:**

- `name` (string, max 100 chars)
- `email` (string, max 150 chars)

**Optional Fields:**

- `phone` (string, max 20 chars)
- `notes` (string, max 500 chars)

**Errors:**

- 400: Name and email are required

---

#### PUT /contacts/:id

Update an existing contact.

**Parameters:**

- `id` (path, required): Contact MongoDB ID

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1 987 654 3210",
  "notes": "Confirmed client"
}
```

**Request:**

```http
PUT /api/v1/contacts/507f1f77bcf86cd799439012
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.smith@example.com",
  "phone": "+1 987 654 3210",
  "notes": "Confirmed client"
}
```

**Response:** 200 OK

```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith Updated",
    "email": "jane.smith@example.com",
    "phone": "+1 987 654 3210",
    "notes": "Confirmed client",
    "isActive": true,
    "createdAt": "2026-03-20T10:35:00.000Z",
    "updatedAt": "2026-03-20T10:40:00.000Z"
  }
}
```

**Errors:**

- 404: Contact not found

---

#### DELETE /contacts/:id

Delete (soft delete) a contact. Sets `isActive` to false.

**Parameters:**

- `id` (path, required): Contact MongoDB ID

**Request:**

```http
DELETE /api/v1/contacts/507f1f77bcf86cd799439012
```

**Response:** 200 OK

```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012"
  }
}
```

**Errors:**

- 404: Contact not found

---

## Data Models

### Contact Model

```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  name: String,            // Required, max 100 chars
  email: String,           // Required, lowercase, max 150 chars
  phone: String,           // Optional, max 20 chars
  notes: String,           // Optional, max 500 chars
  isActive: Boolean,       // Default: true
  createdAt: Date,         // Auto-set
  updatedAt: Date          // Auto-set on updates
}
```

---

## HTTP Status Codes

| Code | Meaning      | Usage                                     |
| ---- | ------------ | ----------------------------------------- |
| 200  | OK           | Successful GET, PUT, DELETE               |
| 201  | Created      | Successful POST                           |
| 400  | Bad Request  | Validation error, missing required fields |
| 404  | Not Found    | Resource not found                        |
| 500  | Server Error | Unexpected error                          |

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

**Common Errors:**

- **400 Bad Request**: Invalid input or missing required fields

  ```json
  {
    "success": false,
    "message": "Name and email are required"
  }
  ```

- **404 Not Found**: Resource doesn't exist

  ```json
  {
    "success": false,
    "message": "Contact not found"
  }
  ```

- **500 Internal Server Error**: Server-side error
  ```json
  {
    "success": false,
    "message": "Failed to create contact"
  }
  ```

---

## Rate Limiting

Currently no rate limiting implemented. Add in production.

---

## CORS

Frontend can be on different domain. Configure in `.env`:

```env
CORS_ORIGIN=http://localhost:5173
```

---

## Testing with cURL

```bash
# Get all contacts
curl http://localhost:3000/api/v1/contacts

# Get single contact
curl http://localhost:3000/api/v1/contacts/:id

# Search contacts
curl "http://localhost:3000/api/v1/contacts/search?q=john"

# Create contact
curl -X POST http://localhost:3000/api/v1/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"+1234567890"}'

# Update contact
curl -X PUT http://localhost:3000/api/v1/contacts/:id \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","notes":"Updated"}'

# Delete contact
curl -X DELETE http://localhost:3000/api/v1/contacts/:id

# Health check
curl http://localhost:3000/api/v1/health
```

---

## Pagination (Future Implementation)

```
GET /api/v1/contacts?page=1&limit=10
```

---

## Sorting (Future Implementation)

```
GET /api/v1/contacts?sort=-createdAt
```

---

## Filtering (Future Implementation)

```
GET /api/v1/contacts?isActive=true
```

---

**Last Updated**: March 20, 2026
