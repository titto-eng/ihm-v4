---
name: Replit import hosting
description: Non-obvious integration constraints for the npm-isolated IHM import.
---

Keep the imported Next application npm-isolated inside the web artifact rather than converting its stack or using the starter API.

**Why:** Payload owns `/api` and cannot share that route with the starter API. A scaffold is only registration, not the imported application.

**How to apply:** Artifact development commands run with the artifact directory as working directory. Preserve the original Payload upload access checks when adapting storage, especially private application files. Cloud-storage plugin `_objectKey` maps to PostgreSQL `_objectkey`, not `_object_key`.

The handover's full integration suite requires separate portal MySQL and Mailpit fixtures, even though live portal/email integrations are disabled for test hosting.

**Why:** Payment-page tests write portal fixture rows before creating fake gateway sessions. Without fixtures, pending-payment assertions fail; disabling real integrations does not satisfy those tests.

**How to apply:** Report fixture-blocked tests accurately; never enable live services to make the test suite pass.
