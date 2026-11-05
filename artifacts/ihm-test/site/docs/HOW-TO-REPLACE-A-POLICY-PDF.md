# How to replace a policy PDF

Policies, procedures, forms, guides, handbooks and brochures are **Documents** in the CMS. Each one has a fixed web address (for
example `https://ihm.edu.au/pdf/policies/IHM_Privacy_Policy.pdf`). When you replace the file, that address serves the new file
straight away. You do not need a developer or a deploy.

## Replace the file

1. Sign in to the CMS at `/admin`.
2. Open **Content → Documents**.
3. Search for the document by its title (for example "Privacy Policy") or by its address (for example `IHM_Privacy_Policy`).
4. Open the document. At the top, remove the current file and upload the new PDF. Only PDF files are accepted.
5. Update anything else that changed: **Title** (the link text on the Policies & Procedures page) or **Effective date**. You can
   add a line to **Notes**, such as the version number or who approved it. Only staff can see notes.
6. Select **Save**.

The address stays the same, so every existing link keeps working: the Policies & Procedures page, course pages, emails and printed
QR codes. Open the address in a new browser tab to check the new file. If your browser still shows the old file, reload the page.

## Things to know

- **Public path** is the document's web address. You cannot change it after the document is created. If a document really has to
  move, ask a developer: the old address then needs a redirect.
- **Listings** set where the document appears on `/policies-procedures/`: which tab, and its position (lower numbers first). A
  document can appear in more than one tab.
- **Add a new document:** choose **Create new**, upload the PDF, and fill in the title, category, audience and public path. The public
  path starts with `/pdf/`, `/brochures/`, `/IHM_Domestic_SHB/` or `/International-SHB/` and ends with `.pdf` (for example
  `/pdf/policies/New_Policy.pdf`). You can paste a full address; it is cleaned up when you save. Then add a listing if it belongs
  on the Policies & Procedures page.
- **Deleting** a document takes its address offline, so only an administrator can delete one. To retire a policy, replace the file
  or remove its listing instead.
