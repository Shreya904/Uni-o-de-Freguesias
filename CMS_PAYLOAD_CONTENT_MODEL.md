# Payload CMS Content Model Blueprint

This document defines the CMS model needed to run the current public site with only these domains:

- Contact form submissions
- Noticias
- Documents

It is designed for Payload CMS from scratch and does not depend on reading frontend code.

## 1) Scope and non-scope

In scope:

- Content collections for Noticias and Documents
- Operational collection for Contact form submissions
- Shared Media upload collection

Out of scope:

- Hidden pages and hidden navigation areas
- Events, services, institutional pages outside documents

## 2) Recommended Payload structure

Create these collections:

1. media
2. news
3. documents
4. contact-submissions

Optional support collection:

- news-categories (if you want managed categories instead of free text)

## 3) Shared collection: media

Purpose:

- Store uploaded images/files reused by news and documents.

### Fields

| Field   | Type | Required | Notes                         |
| ------- | ---- | -------: | ----------------------------- |
| alt     | text |       No | Accessibility text for images |
| caption | text |       No | Optional display caption      |

Payload upload settings:

- Enable upload: true
- Mime types: image/\*, application/pdf
- Image sizes: optional (thumb, card, hero)

Validation suggestions:

- Max upload size by environment (example: 10MB images, 25MB PDFs)

## 4) Collection: news

Purpose:

- Render homepage news cards, news listing, and individual news detail pages.

### Fields

| Field          | Type                    |           Required | Notes                         |
| -------------- | ----------------------- | -----------------: | ----------------------------- |
| title          | text                    |                Yes | Public headline               |
| slug           | text                    |                Yes | URL segment, unique           |
| excerpt        | textarea                |                Yes | Short summary for cards/lists |
| description    | richText or textarea    |                 No | Long body for detail page     |
| date           | date                    |                Yes | Publication date used in UI   |
| category       | text or relationship    |                Yes | Display category tag          |
| mainImage      | relationship -> media   |                 No | Main hero/cover image         |
| galleryImages  | relationship[] -> media |                 No | Flexible gallery, any count   |
| isPublished    | checkbox                | Yes (default true) | Visibility switch             |
| publishedAt    | date                    |                 No | Optional scheduled publishing |
| seoTitle       | text                    |                 No | Optional SEO override         |
| seoDescription | textarea                |                 No | Optional SEO override         |

### Required behavior notes

- slug must be unique.
- If mainImage is empty, the page still renders (no crash).
- galleryImages may be empty, one item, or many (3/5/7/8+ all valid).

### Indexes

- unique index on slug
- index on date
- index on isPublished + date

### Access

- read: public only when isPublished = true
- create/update/delete: authenticated editors/admin

### Frontend consumption contract

- List pages need: title, slug, excerpt, date, category, mainImage
- Detail page needs: title, date, category, description (fallback to excerpt), mainImage, galleryImages

## 5) Collection: documents

Purpose:

- Render documents listing and homepage highlighted cards.
- Support preview modal and download action.

### Fields

| Field       | Type                  |           Required | Notes                                              |
| ----------- | --------------------- | -----------------: | -------------------------------------------------- |
| title       | text                  |                Yes | Public card title                                  |
| slug        | text                  |                Yes | Stable identifier, unique                          |
| docName     | text                  |                Yes | Display file name (example: Ata_2026.pdf)          |
| date        | date                  |                Yes | Document date shown in cards                       |
| sourceUrl   | text (url)            |                Yes | Single source link from CMS (download/source link) |
| file        | relationship -> media |                 No | Optional native file storage                       |
| isPublished | checkbox              | Yes (default true) | Visibility                                         |
| sortOrder   | number                |                 No | Manual ordering support                            |
| summary     | textarea              |                 No | Optional future use                                |

### URL and file strategy

Use one of these patterns:

1. External links only (current):

- sourceUrl required
- preview URL must be derived at runtime or in hook

2. Internal file hosting:

- file required, derive sourceUrl + preview URL via hook

Current enforced contract:

- CMS stores only sourceUrl.
- Download button uses sourceUrl directly.
- Preview iframe URL is derived from sourceUrl.

Preview derivation rule:

- Google Drive `/file/d/<id>/view|edit|preview` -> `https://drive.google.com/file/d/<id>/preview`
- Google Drive `open?id=<id>` -> `https://drive.google.com/file/d/<id>/preview`
- Direct PDF URLs (example: `*.filesusr.com/...pdf`) -> use sourceUrl as preview URL.

### Indexes

- unique index on slug
- index on date
- index on isPublished + date

### Access

- read: public only when isPublished = true
- create/update/delete: authenticated editors/admin

### Frontend consumption contract

- Homepage cards need: title, docName, date, sourceUrl
- Documents page needs: title, docName, date, sourceUrl

## 6) Collection: contact-submissions

Purpose:

- Store inbound contact form entries from the public form.

### Fields

| Field         | Type                  |          Required | Notes                                 |
| ------------- | --------------------- | ----------------: | ------------------------------------- |
| name          | text                  |               Yes | User full name                        |
| email         | email                 |               Yes | User email                            |
| category      | select                |               Yes | Controlled list of request categories |
| message       | textarea              |               Yes | Message body                          |
| attachment    | relationship -> media |                No | Uploaded file, if any                 |
| attachmentUrl | text (url)            |                No | Optional external file URL            |
| sourcePage    | text                  |                No | Example: /contactos                   |
| locale        | text                  |                No | Example: pt-PT                        |
| consent       | checkbox              |                No | If legal consent is required          |
| status        | select                | Yes (default new) | new, in_review, resolved, archived    |
| internalNotes | textarea              |                No | Staff-only notes                      |
| submittedAt   | date                  | Yes (default now) | Submission timestamp                  |

### Category options (initial)

- Servicos e Atestados
- Obras e Infraestruturas
- Apoio Social
- Atividades e Eventos
- Outras Questoes

### Validation suggestions

- message max length: start with 200 to match current form UX
- allow future increase to 1000 without schema changes
- attachment max size: 3MB if uploaded through this form
- accepted attachment types: pdf, jpg, jpeg, png, webp

### Access

- create: public (via API route)
- read/update/delete: admin/staff only
- never expose submissions in public read APIs

### Security notes

- Add rate limiting on submission endpoint
- Add spam protection (honeypot or captcha)
- Sanitize and validate all incoming fields server-side

## 7) Suggested Payload access matrix

| Collection          |          Public read | Public create | Editor/Admin read-write |
| ------------------- | -------------------: | ------------: | ----------------------: |
| media               |             optional |            No |                     Yes |
| news                | Yes (published only) |            No |                     Yes |
| documents           | Yes (published only) |            No |                     Yes |
| contact-submissions |                   No |           Yes |                     Yes |

## 8) API contracts (minimum)

### News listing API

Return items with:

- id
- title
- slug
- excerpt
- date
- category
- mainImage (url + alt)

### News detail API

Return:

- title
- slug
- date
- category
- excerpt
- description
- mainImage (url + alt)
- galleryImages[] (url + alt)

### Documents listing API

Return:

- id
- title
- slug
- docName
- date
- sourceUrl

### Contact submit API input

Required payload:

- name
- email
- category
- message

Optional payload:

- attachment or attachmentUrl
- sourcePage
- locale
- consent

## 9) Recommended Payload hooks and automation

news:

- beforeValidate: generate slug from title when empty
- beforeChange: normalize category text

documents:

- beforeValidate: generate slug from title when empty
- beforeChange: if file exists and URLs empty, derive URLs

contact-submissions:

- beforeChange: set submittedAt if missing
- afterChange: optional notification email/webhook

## 10) Deployment readiness checklist

- [ ] Payload project initialized with postgres/mongo and env secrets
- [ ] Collections created: media, news, documents, contact-submissions
- [ ] Access rules implemented per matrix
- [ ] Unique index on news.slug and documents.slug
- [ ] Public APIs return only published news/documents
- [ ] Contact submission endpoint has rate limit + spam protection
- [ ] File upload limits configured (3MB for contact attachment)
- [ ] Initial seed content created for news and documents
- [ ] Admin roles configured (admin/editor)
- [ ] Backup and audit strategy defined

## 11) Flexibility rules (important)

To keep CMS future-proof:

- Keep description as rich text or long textarea, not fixed-size snippets.
- Keep galleryImages as unbounded array.
- Keep optional media fields nullable (no image must never break rendering).
- Keep category model upgradable: start as text/select, later migrate to relationship.
- Keep documents link strategy hybrid (external URL now, hosted files later).

---

Owner suggestion:

- Keep this file as the source of truth for Payload implementation and onboarding.
