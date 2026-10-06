# lost and found

**Owner ID:** `usr-2e33cb297c70`
**Project Folder:** `users/usr-2e33cb297c70/lost-and-found`
**Provisioned by:** Genie Autonomous AI Platform

## Confirmed IEEE 830 Specifications

- [FUNCTIONAL] [FR-001] User Registration & Authentication (high): The system shall allow users to register with email/password, optionally authenticate via campus SSO (OAuth), and log in securely.
- [FUNCTIONAL] [FR-002] User Dashboard (high): The system shall provide a personalized dashboard where logged‑in users can view, filter and manage all of their reported lost and found items.
- [FUNCTIONAL] [FR-003] Report Lost Item (high): The system shall present a form for users to create a lost‑item report, capturing title, description, category, location (with map picker), date, images, and contact information.
- [FUNCTIONAL] [FR-004] Report Found Item (high): The system shall present a similar form for users to create a found‑item report with the same fields as lost‑item reports.
- [FUNCTIONAL] [FR-005] Item Listing with Search & Filters (high): The system shall display all active lost/found items as cards showing image, name, category, location, date, and status, and allow full‑text search, multi‑filter (category, location, date range, lost/found), sorting and pagination.
- [FUNCTIONAL] [FR-006] Item Detail Page (high): The system shall provide a detailed view for each item, showing description, all images, exact location on an interactive map, reporter contact, and a button to request/claim the item.
- [FUNCTIONAL] [FR-007] My Reports Management (high): The system shall allow users to edit, delete, or mark any of their own reports as 'Recovered', with appropriate status transitions and audit logging.
- [FUNCTIONAL] [FR-008] Claim / Request Feature (high): The system shall enable a logged‑in user to submit a claim for an item, capturing claimant details; claims enter a pending state awaiting approval by the original reporter or an admin.
- [FUNCTIONAL] [FR-009] Admin Dashboard (high): The system shall provide an admin interface to manage users, all reports, claims, and to remove inappropriate listings, with role‑based access (Super‑Admin, Campus‑Admin).
- [FUNCTIONAL] [FR-010] Notifications Center (medium): The system shall deliver in‑app and email notifications for claim updates, status changes (e.g., recovered), admin actions, and system alerts.
- [FUNCTIONAL] [FR-011] Statistics & KPI Dashboard (medium): The system shall display aggregate metrics such as total lost items, total found items, recovered items, active reports, and trends over time, visualized with charts.
- [FUNCTIONAL] [FR-012] Map Integration (high): The system shall integrate Google Maps (or Mapbox) to allow users to select a location when reporting and to view the location on the item detail page.
- [FUNCTIONAL] [FR-013] Responsive Design (high): The UI shall adapt fluidly to desktop, tablet, and mobile viewports, preserving usability and visual consistency.
- [FUNCTIONAL] [FR-014] Data Export & Reporting (low): The system shall allow users and admins to export report listings and statistics as CSV or PDF files.
- [FUNCTIONAL] [FR-015] Search Engine Optimization & Accessibility (low): The system shall follow WCAG 2.1 AA guidelines and include meta tags for SEO to ensure discoverability and accessibility.
- [NON_FUNCTIONAL] [NFR-001] Performance (high): All API endpoints shall respond within 200 ms for 95 % of requests under normal load (up to 200 concurrent users).
- [NON_FUNCTIONAL] [NFR-002] Security (high): The system shall implement OWASP Top‑10 mitigations, HTTPS everywhere, JWT‑based stateless authentication, role‑based access control, input validation, and secure password storage (bcrypt).
- [NON_FUNCTIONAL] [NFR-003] Scalability (medium): The architecture shall be horizontally scalable; stateless Node/Express services can be load‑balanced, and MongoDB shall be deployed with replica sets.
- [NON_FUNCTIONAL] [NFR-004] Reliability & Backup (medium): Daily automated backups of MongoDB shall be retained for 30 days; system uptime target ≥ 99.5 %.
- [NON_FUNCTIONAL] [NFR-005] Usability (high): All interactive elements shall have a minimum touch target of 48 dp, clear error messages, and support keyboard navigation.
- [NON_FUNCTIONAL] [NFR-006] Cross‑Browser Compatibility (medium): The frontend shall function correctly on latest versions of Chrome, Edge, Firefox, and Safari.
