# ==============================================================================
# ENTERPRISE EDGE API & CONTROLLER SPECIFICATION PROMPT
# Project: SRS generator
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
### Route: /api/pdf-generation-and-download/
- Description: Implements [FR-1] PDF Generation and Download
- Methods:
  * GET /api/pdf-generation-and-download/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/pdf-generation-and-download/:id -> Fetch single entity with relational associations
  * POST /api/pdf-generation-and-download/ -> Create record with schema validation and default timestamp
  * PATCH /api/pdf-generation-and-download/:id -> Partial mutation with optimistic lock check
  * DELETE /api/pdf-generation-and-download/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/current-day-english-language-restriction/
- Description: Implements [FR-2] Current‑Day English Language Restriction
- Methods:
  * GET /api/current-day-english-language-restriction/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/current-day-english-language-restriction/:id -> Fetch single entity with relational associations
  * POST /api/current-day-english-language-restriction/ -> Create record with schema validation and default timestamp
  * PATCH /api/current-day-english-language-restriction/:id -> Partial mutation with optimistic lock check
  * DELETE /api/current-day-english-language-restriction/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/no-post-generation-editing/
- Description: Implements [FR-3] No Post‑Generation Editing
- Methods:
  * GET /api/no-post-generation-editing/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/no-post-generation-editing/:id -> Fetch single entity with relational associations
  * POST /api/no-post-generation-editing/ -> Create record with schema validation and default timestamp
  * PATCH /api/no-post-generation-editing/:id -> Partial mutation with optimistic lock check
  * DELETE /api/no-post-generation-editing/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/no-admin-role/
- Description: Implements [FR-4] No Admin Role
- Methods:
  * GET /api/no-admin-role/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/no-admin-role/:id -> Fetch single entity with relational associations
  * POST /api/no-admin-role/ -> Create record with schema validation and default timestamp
  * PATCH /api/no-admin-role/:id -> Partial mutation with optimistic lock check
  * DELETE /api/no-admin-role/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/reliable-speech-to-text-conversion/
- Description: Implements [FR-5] Reliable Speech‑to‑Text Conversion
- Methods:
  * GET /api/reliable-speech-to-text-conversion/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/reliable-speech-to-text-conversion/:id -> Fetch single entity with relational associations
  * POST /api/reliable-speech-to-text-conversion/ -> Create record with schema validation and default timestamp
  * PATCH /api/reliable-speech-to-text-conversion/:id -> Partial mutation with optimistic lock check
  * DELETE /api/reliable-speech-to-text-conversion/:id -> Soft-delete (set is_deleted = true)
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