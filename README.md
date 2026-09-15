# Help Desk Ticketing System

A responsive, browser-based Help Desk ticketing interface created as a personal IT Support learning project.

## Live demo

https://arafatict.github.io/helpdesk-ticketing-system/

## Repository

https://github.com/arafatict/helpdesk-ticketing-system

## Project purpose

This project demonstrates a practical support-queue workflow: capturing a request, recording useful context, assigning priority, tracking status, and documenting troubleshooting or resolution notes.

It is designed around the author's verified IT Support interests and experience in troubleshooting, user support, ticketing/ITSM workflows and technical documentation.

## Features

- Create a support ticket
- Edit an existing ticket with **Update**
- Requester name
- Issue title
- Category
- Description
- Priority: High, Medium or Low
- Status: Open, In progress or Resolved
- Assignee field
- Created and updated dates
- Troubleshooting/resolution notes
- Search across ticket IDs, titles, requesters, categories, descriptions, notes and assignees
- Filter by status
- Filter by priority
- Dashboard counters for open, in-progress, resolved and high-priority tickets
- Reset demo data button
- Modal close button and Escape-key support
- Responsive desktop and mobile layout
- Safe HTML escaping for user-entered ticket text

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- GitHub Pages
- Lightweight SVG favicon

## How to use

1. Open the [Live demo](https://arafatict.github.io/helpdesk-ticketing-system/).
2. Select **+ New ticket**.
3. Enter requester, issue title, category, priority, description and optional assignee/notes.
4. Select **Create ticket**.
5. Use **Update** on a ticket to edit its details, change status or add resolution notes.
6. Search or filter the queue to locate tickets.
7. Use **Reset demo data** to restore the original demonstration records.

## Persistence

Tickets are stored in the browser using `localStorage` under the key `northstar-desk-tickets-v2`. Newly created and updated tickets remain available after a browser refresh in the same browser profile.

The project has no server-side backend, shared database, authentication or multi-user synchronization.

## Project limitations

This is a **portfolio and learning simulation**, not a production help-desk backend. The records are demo data and remain only in the visitor's browser. It does not claim to represent tickets from a real employer or real customers.

A production system would additionally need authentication, authorization, a server-side database, audit logging, notification rules, attachment handling, concurrency control and data-protection measures.

## Suggested test flow

- Create a ticket with high priority and an assignee.
- Search for a unique word in its description or notes.
- Filter by High priority.
- Select Update and change the status to In progress, then Resolved.
- Refresh the browser and confirm the ticket and changes remain.
- Use Reset demo data when finished.

## Screenshots

The repository contains the source for the live responsive interface. Screenshots can be added later after a preferred visual capture is selected.

## Author

Md Arafat Hossain — [GitHub](https://github.com/arafatict) · [IT portfolio](https://arafatict.github.io/)
