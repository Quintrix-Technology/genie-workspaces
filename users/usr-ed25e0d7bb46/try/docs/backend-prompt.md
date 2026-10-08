# ==============================================================================
# ENTERPRISE EDGE API & CONTROLLER SPECIFICATION PROMPT
# Project: TRY
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
### Route: /api/display-personal-name/
- Description: Implements [FR-1] Display Personal Name
- Methods:
  * GET /api/display-personal-name/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/display-personal-name/:id -> Fetch single entity with relational associations
  * POST /api/display-personal-name/ -> Create record with schema validation and default timestamp
  * PATCH /api/display-personal-name/:id -> Partial mutation with optimistic lock check
  * DELETE /api/display-personal-name/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/about-me-section/
- Description: Implements [FR-2] About Me Section
- Methods:
  * GET /api/about-me-section/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/about-me-section/:id -> Fetch single entity with relational associations
  * POST /api/about-me-section/ -> Create record with schema validation and default timestamp
  * PATCH /api/about-me-section/:id -> Partial mutation with optimistic lock check
  * DELETE /api/about-me-section/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/skills-section/
- Description: Implements [FR-3] Skills Section
- Methods:
  * GET /api/skills-section/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/skills-section/:id -> Fetch single entity with relational associations
  * POST /api/skills-section/ -> Create record with schema validation and default timestamp
  * PATCH /api/skills-section/:id -> Partial mutation with optimistic lock check
  * DELETE /api/skills-section/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/projects-section/
- Description: Implements [FR-4] Projects Section
- Methods:
  * GET /api/projects-section/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/projects-section/:id -> Fetch single entity with relational associations
  * POST /api/projects-section/ -> Create record with schema validation and default timestamp
  * PATCH /api/projects-section/:id -> Partial mutation with optimistic lock check
  * DELETE /api/projects-section/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/experience-section/
- Description: Implements [FR-5] Experience Section
- Methods:
  * GET /api/experience-section/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/experience-section/:id -> Fetch single entity with relational associations
  * POST /api/experience-section/ -> Create record with schema validation and default timestamp
  * PATCH /api/experience-section/:id -> Partial mutation with optimistic lock check
  * DELETE /api/experience-section/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/blog-section/
- Description: Implements [FR-6] Blog Section
- Methods:
  * GET /api/blog-section/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/blog-section/:id -> Fetch single entity with relational associations
  * POST /api/blog-section/ -> Create record with schema validation and default timestamp
  * PATCH /api/blog-section/:id -> Partial mutation with optimistic lock check
  * DELETE /api/blog-section/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/contact-section-with-form/
- Description: Implements [FR-7] Contact Section with Form
- Methods:
  * GET /api/contact-section-with-form/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/contact-section-with-form/:id -> Fetch single entity with relational associations
  * POST /api/contact-section-with-form/ -> Create record with schema validation and default timestamp
  * PATCH /api/contact-section-with-form/:id -> Partial mutation with optimistic lock check
  * DELETE /api/contact-section-with-form/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/audience-focused-content/
- Description: Implements [FR-8] Audience‑Focused Content
- Methods:
  * GET /api/audience-focused-content/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/audience-focused-content/:id -> Fetch single entity with relational associations
  * POST /api/audience-focused-content/ -> Create record with schema validation and default timestamp
  * PATCH /api/audience-focused-content/:id -> Partial mutation with optimistic lock check
  * DELETE /api/audience-focused-content/:id -> Soft-delete (set is_deleted = true)
- Request Body Schema:
  {
    "title": "string (min 1, max 255)",
    "status": "string (active | archived | pending)",
    "payload": "object"
  }
- HTTP Status Codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error

### Route: /api/visual-style-customization/
- Description: Implements [FR-9] Visual Style Customization
- Methods:
  * GET /api/visual-style-customization/?search=&filter=&page=1&limit=20 -> Paginated list with multi-column filtering
  * GET /api/visual-style-customization/:id -> Fetch single entity with relational associations
  * POST /api/visual-style-customization/ -> Create record with schema validation and default timestamp
  * PATCH /api/visual-style-customization/:id -> Partial mutation with optimistic lock check
  * DELETE /api/visual-style-customization/:id -> Soft-delete (set is_deleted = true)
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