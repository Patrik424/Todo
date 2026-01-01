# Todo Application

Fullstack Todo-app med Spring Boot backend, Vite/React frontend, samt automatiska tester i GitHub Actions(Playwright och Newman).

## Klona projektet

 git clone: <https://github.com/Patrik424/Todo.git>
 cd Todo

Backend
 Starta backend:
 cd todoBackend
 ./mvnw spring-boot:run
Alternativt startas på Run-knappen i IDE.
Backend körs på:
<http://localhost:8080>

Frontend
Starta frontend
 cd todofrontend
 npm install
 npm run dev.
Frontend körs på:
<http://localhost:5173>

Playwright (E2E-tester)
cd todofrontend
npx playwright install
npx playwright test --workers=1.

API-tester(Postman/Newman)
newman run postman/todo.postman_collection.json.

CI(GitHub Actions)
Vid push till main körs automatiskt:
Backend build
Playwright-tester
Postman/Newman API-tester
