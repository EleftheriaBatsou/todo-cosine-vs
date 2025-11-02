# Todo App (React + Vite)

Simple, fast todo app with no login. Data is stored in your browser via localStorage. Deploy-ready for Vercel.

## Features
- Add, edit, delete todos
- Toggle completed state
- Filter: All / Active / Completed
- Clear completed items
- Persistent storage via localStorage
- Works on localhost and Vercel

## Local development
1. Install dependencies
   ```
   npm install
   ```
2. Start the dev server
   ```
   npm run dev
   ```
3. Open the app
   - Vite will print a local URL like `http://localhost:5173`

## Build and preview
```
npm run build
npm run preview
```

## Deploy to Vercel
- Push this repository to GitHub/GitLab/Bitbucket
- Import the repo in Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- No extra config required

## License
MIT
