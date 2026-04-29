# Portfolio Backend

## Development

If PowerShell blocks `npm run dev` because script execution is disabled, use the direct nodemon entrypoint:

```powershell
cd portfolio-backend
npm run dev:direct
```

Or run the server directly with Node:

```powershell
cd portfolio-backend
node src/server.js
```

## Notes

- The backend uses ESM modules (`type: "module"`).
- Environment variables are loaded from `portfolio-backend/.env`.
