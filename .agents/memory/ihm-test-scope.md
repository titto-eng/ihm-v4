---
name: IHM test-only import
description: User-authorized scope and safety constraints for importing the existing IHM website.
---

Import the full existing IHM website, not a redesign or partial demo. Preserve original URLs, CMS content, public files, and Payload admin and auth. Use the repository's npm/Next.js/Payload stack rather than converting it to the workspace starter.

**Why:** The user wants a usable full-content Replit test copy now and will deploy to their live hosting later.

Do not touch live AWS resources, production databases, DNS, or ihm.edu.au. Restore only into a fresh isolated test PostgreSQL database after inspecting dump schema and validating migration markers. Keep DRY_RUN=1, live enquiry adapters and live payment integrations disabled, tracking disabled, NEXT_PUBLIC_ROBOTS=noindex, and optional portal integration disabled. Protect private application uploads and initial admin creation. Use new test-only secrets.

**Why:** The user explicitly restricted authorization to the test website, not live messages, payments, or infrastructure.

**How to apply:** Follow AGENTS.md and applicable repository docs; preserve the existing site while adapting deployment and durable file storage. Do not silently mock unavailable external integrations. Verify the full test copy before asking the user to publish.
