# Smart Parking

Smart Parking is a backend service for parking management: register users, manage slots, and secure API calls with JWT-based authentication.

What we have done (current phase)
- Backend: Express server with Mongoose models (User, Slot, Company, Project, Event).
- Authentication: Register and login endpoints (`/api/auth/register`, `/api/auth/login`) with password hashing and JWT.
- Authorization: Role-based middleware (user/admin) to protect routes.
- Routes implemented: user, admin, slots, companies, projects, events (including pagination for advanced event queries).
- Mini auth practice app: `mini_usr_auth_system` for a clean auth example.

How to use this phase (simple)
1. Start the main backend
  - Change to backend folder and install:
        powershell
    cd backend
    npm install
    
  - Create `.env` with `PORT`, `MONGODB_URI`, and `JWT_SECRET`.
  - Start the server:
        powershell
    npm start
    
2. Register and Login
  - Register: `POST http://localhost:5000/api/auth/register` (JSON body: name, email, password, …)
  - Login: `POST http://localhost:5000/api/auth/login` → response includes `token`.
3. Use token to call protected routes
  - Add header: `x-auth-token: <token>`
  - Example admin route: `GET http://localhost:5000/api/admin/dashboard` (admin only)
  - Example user route: `GET http://localhost:5000/api/user/profile` (authenticated users)
4. Mini auth practice app (optional)
  - `cd mini_usr_auth_system` → `npm install` → `npm start` (runs on port 5001 by default).

Notes
- Seed files are kept local and excluded from git (`seed/`). Run `node seed/slotSeeder.js` locally to add sample slots. (Next Milestone)
- Keep secrets in `.env` and do not commit them.

---
Developed for Smart Parking feature iterations and hands-on practice.
