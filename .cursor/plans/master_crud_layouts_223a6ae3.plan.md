---
name: Master CRUD layouts
overview: Add static Category and Status screens on the existing routes, using the same desk theme as the enquiry list and new-enquiry form. No API calls or component logic.
todos:
  - id: shared-styles
    content: Add shared master.css using existing tokens for the form card, list rows, pills, and actions
    status: completed
  - id: category-ui
    content: Replace category-master.html with the static category CRUD layout
    status: completed
  - id: status-ui
    content: Replace status-master.html with the same layout and status copy
    status: completed
  - id: wire-styles
    content: Point both components at the shared stylesheet without adding form or API logic
    status: completed
isProject: false
---

# Category and Status CRUD layouts

Both routes already exist under `AuthLayout` in [src/app/app.routes.ts](src/app/app.routes.ts), so `/category` and `/status` keep the navbar and the content width from [src/app/components/auth-layout/auth-layout.css](src/app/components/auth-layout/auth-layout.css). [category-master](src/app/components/category-master/category-master.html) and [status-master](src/app/components/status-master/status-master.html) are still the placeholder paragraphs. Component classes stay empty.

Each record is a name plus an active flag (`categoryName` / `statusName`, `isActive`). Ids stay off the form because create sends them from the server.

## Layout

Same structure on both pages, with different titles and sample rows:

- Page heading and one-line description, matching the enquiry list header.
- A surface card with the add form: name field, Active checkbox, Clear, and Save. Same control styles as the new-enquiry form (height, border, focus ring, brand button).
- A list under the form. Each row shows the name, an Active or Inactive pill, and Edit and Delete buttons. A few static sample rows so the row actions are visible. Delete uses the existing danger color; the active pill uses the existing success soft color.

Below 720px the form actions and each row stack, same breakpoint as the navbar.

## Files

- Replace the placeholder markup in [category-master.html](src/app/components/category-master/category-master.html) and [status-master.html](src/app/components/status-master/status-master.html). Plain `form`, `input`, `button`, and `ul` only. No `formField`, click handlers, or API calls.
- One shared stylesheet, [src/styles/master.css](src/styles/master.css), referenced from both components with `styleUrls`. [token.css](src/styles/token.css) already has the colors, type, spacing, and radii these screens need, so it stays unchanged.
- Leave [category-master.ts](src/app/components/category-master/category-master.ts) and [status-master.ts](src/app/components/status-master/status-master.ts) without new logic, aside from pointing `styleUrls` at the shared sheet.

Wiring the list and form to `getCategories`, `getStatuses`, and the create, update, and delete methods is a later pass.