# Help Desk Ticketing System

A small browser-based Help Desk ticketing interface created as a personal IT Support learning project.

## What it demonstrates

- Support request capture
- Ticket categories and priority levels
- Open, In progress and Resolved states
- Queue search and filtering
- Resolution workflow simulation
- Asset-free responsive interface
- Browser-local persistence with `localStorage`
- Basic HTML form validation
- Safe text rendering for ticket content
- Clear technical documentation

## Run locally

No build tool or dependency is required.

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/` and select the project folder as the server directory, or run the command from the project directory.

## Important scope note

This is a front-end learning project. It uses demo records and saves changes only in the visitor's browser. It is not presented as a production help-desk platform and does not include a real backend, authentication or company data.

## Main files

- `index.html` — semantic interface and ticket form
- `styles.css` — responsive visual design
- `app.js` — ticket state, filters, local persistence and form behavior

## Verified skills represented

The project is designed around the author's verified interest and experience in IT Support, troubleshooting, documentation, ticketing/ITSM workflows and user communication.
