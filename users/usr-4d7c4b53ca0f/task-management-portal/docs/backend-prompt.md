# ==============================================================================
# ENTERPRISE EDGE API & CONTROLLER SPECIFICATION PROMPT
# Project: task management portal
# Runtime: Cloudflare Workers / Pages Functions (V8 Edge Runtime)
# Patterns: RESTful JSON APIs, Stateless Bearer Auth, Rate Limiting, OWASP Top 10
# ==============================================================================

<system_role>
You are the Lead Systems Architect and Principal Backend Engineer.
You design ultra-fast, fault-tolerant, serverless APIs following OpenAPI 3.1 standards.
Every route is strictly grounded in the approved IEEE 830 functional requirements.
</system_role>

<security_and_runtime_rules>
1. Sub-100ms Execution: Pure edge execution utilizing async I/O and zero heavy cold-starts.
2. Security & Compliance:
   - Bearer JWT token authentication with sub-claim validation and Role-Based Access Control (RBAC).
   - Parameter sanitization against SQL injection, XSS payloads, and malformed JSON.
   - Rate limiting headers (X-RateLimit-Limit, X-RateLimit-Remaining) using edge KV / token buckets.
   - CORS policy enforcing preflight (OPTIONS 204) and origin verification.
3. Standardized Response Envelope:
   - Success: { "success": true, "data": <T>, "meta": { "total": number, "page": number, "limit": number } }
   - Error: { "success": false, "error": { "code": string, "message": string, "details": any }, "status": number }
</security_and_runtime_rules>

## 1. REST API ROUTE DEFINITIONS
### Route: /api/task-creation/
- Description: Implements [FR-1] Task Creation
- Methods:
  * GET /api/task-creation/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/task-creation/:id -> Fetch single entity with relational associations
  * POST /api/task-creation/ -> Create record with schema validation and default timestamp
  * PATCH /api/task-creation/:id -> Partial mutation with optimistic lock check
  * DELETE /api/task-creation/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/minimal-task-fields/
- Description: Implements [FR-2] Minimal Task Fields
- Methods:
  * GET /api/minimal-task-fields/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/minimal-task-fields/:id -> Fetch single entity with relational associations
  * POST /api/minimal-task-fields/ -> Create record with schema validation and default timestamp
  * PATCH /api/minimal-task-fields/:id -> Partial mutation with optimistic lock check
  * DELETE /api/minimal-task-fields/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/anonymous-usage/
- Description: Implements [FR-3] Anonymous Usage
- Methods:
  * GET /api/anonymous-usage/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/anonymous-usage/:id -> Fetch single entity with relational associations
  * POST /api/anonymous-usage/ -> Create record with schema validation and default timestamp
  * PATCH /api/anonymous-usage/:id -> Partial mutation with optimistic lock check
  * DELETE /api/anonymous-usage/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/in-app-due-date-reminders/
- Description: Implements [FR-4] In‑App Due‑Date Reminders
- Methods:
  * GET /api/in-app-due-date-reminders/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/in-app-due-date-reminders/:id -> Fetch single entity with relational associations
  * POST /api/in-app-due-date-reminders/ -> Create record with schema validation and default timestamp
  * PATCH /api/in-app-due-date-reminders/:id -> Partial mutation with optimistic lock check
  * DELETE /api/in-app-due-date-reminders/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/flexible-date-input/
- Description: Implements [FR-5] Flexible Date Input
- Methods:
  * GET /api/flexible-date-input/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/flexible-date-input/:id -> Fetch single entity with relational associations
  * POST /api/flexible-date-input/ -> Create record with schema validation and default timestamp
  * PATCH /api/flexible-date-input/:id -> Partial mutation with optimistic lock check
  * DELETE /api/flexible-date-input/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/persist-tasks-across-sessions/
- Description: Implements [FR-6] Persist Tasks Across Sessions
- Methods:
  * GET /api/persist-tasks-across-sessions/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/persist-tasks-across-sessions/:id -> Fetch single entity with relational associations
  * POST /api/persist-tasks-across-sessions/ -> Create record with schema validation and default timestamp
  * PATCH /api/persist-tasks-across-sessions/:id -> Partial mutation with optimistic lock check
  * DELETE /api/persist-tasks-across-sessions/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/edit-and-delete-tasks/
- Description: Implements [FR-7] Edit and Delete Tasks
- Methods:
  * GET /api/edit-and-delete-tasks/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/edit-and-delete-tasks/:id -> Fetch single entity with relational associations
  * POST /api/edit-and-delete-tasks/ -> Create record with schema validation and default timestamp
  * PATCH /api/edit-and-delete-tasks/:id -> Partial mutation with optimistic lock check
  * DELETE /api/edit-and-delete-tasks/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/task-table-view/
- Description: Implements [FR-8] Task Table View
- Methods:
  * GET /api/task-table-view/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/task-table-view/:id -> Fetch single entity with relational associations
  * POST /api/task-table-view/ -> Create record with schema validation and default timestamp
  * PATCH /api/task-table-view/:id -> Partial mutation with optimistic lock check
  * DELETE /api/task-table-view/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/task-sorting/
- Description: Implements [FR-9] Task Sorting
- Methods:
  * GET /api/task-sorting/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/task-sorting/:id -> Fetch single entity with relational associations
  * POST /api/task-sorting/ -> Create record with schema validation and default timestamp
  * PATCH /api/task-sorting/:id -> Partial mutation with optimistic lock check
  * DELETE /api/task-sorting/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/task-filtering/
- Description: Implements [FR-10] Task Filtering
- Methods:
  * GET /api/task-filtering/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/task-filtering/:id -> Fetch single entity with relational associations
  * POST /api/task-filtering/ -> Create record with schema validation and default timestamp
  * PATCH /api/task-filtering/:id -> Partial mutation with optimistic lock check
  * DELETE /api/task-filtering/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/customizable-color-theme/
- Description: Implements [FR-11] Customizable Color Theme
- Methods:
  * GET /api/customizable-color-theme/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/customizable-color-theme/:id -> Fetch single entity with relational associations
  * POST /api/customizable-color-theme/ -> Create record with schema validation and default timestamp
  * PATCH /api/customizable-color-theme/:id -> Partial mutation with optimistic lock check
  * DELETE /api/customizable-color-theme/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

## 2. DATABASE INTEGRATION & EDGE TRANSACTIONS
- Database connection pooling with Supabase / PostgreSQL.
- Idempotency-Key header support on state-mutating requests to prevent duplicate submissions.
- Structured audit event logging for all write operations.