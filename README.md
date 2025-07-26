# 📝 Notes App

**Notes App** is a full-stack web application that allows users to securely create, view, update, and delete personal notes. Built with authentication support and a clean, responsive UI, it helps manage information effortlessly.

---

## Features

- **User Authentication** — Login & register using JWT tokens
- **Create, Read, Update, Delete Notes** — Basic note-taking functionality
- **Responsive UI** — Mobile-friendly design using utility-first styling
- **Secure Backend** — Protected API endpoints with token-based auth

---

## Tech Stack

### Frontend (`/frontend`)
Built using **React** and styled with **Tailwind CSS**.

- **React 18**
- **Vite** for fast build & dev experience
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for HTTP requests
- **jwt-decode** for decoding JWT tokens

### Backend (`/backend`)
A RESTful API using **Django** and **PostgreSQL** for note and user management.

- **Django + DRF** for API development
- **Simple JWT** for authentication
- **PostgreSQL** with `psycopg2-binary`
- **CORS** and `.env` support
- **django-cors-headers** for cross-origin access

---

## Installation

### Prerequisites

- Python 3.10+
- PostgreSQL
- Node.js

### Clone the Repository

```bash
git clone https://github.com/<your-username>/notes-app.git
cd notes-app
