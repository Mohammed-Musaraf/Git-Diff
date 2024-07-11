![image](https://github.com/Mohammed-Musaraf/Git-Diff/assets/175245948/4a4b746d-3377-4440-862f-0b63fece6127)

```markdown
# Git Differ

Git Differ is a full-stack application that leverages the GitHub API to display file differences in the UI, similar to GitHub. The backend is built with Node.js and Express, and the frontend is built with React. 

## Features

- Fetch and display file differences from GitHub repositories.
- Intuitive UI to visualize changes similar to GitHub's interface.
- Responsive design for a seamless experience on all devices.

## Demo

- Backend hosted on Render: [Git Differ Backend](https://git-diff.onrender.com)
- Frontend hosted on Vercel: [Git Differ Frontend](https://git-diff-three.vercel.app/)
- Use this link [Git Differ Home](https://git-diff-three.vercel.app/repositories/chakra-ui/chakra-ui/commit/d14435cc01ab8d8a120d34d4127920848733d9e6)
- Please feel free to explore other repo https://git-diff-three.vercel.app/repositories/:owner/:repository/commit/:commitSHA

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/git-differ.git
   cd git-differ/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your GitHub API key:
   ```env
   GIT_KEY=your_github_api_key
   WEB_APP_URL=http://localhost:3000
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the `web` directory:
   ```bash
   cd ../web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `web` directory and add the server URL:
   ```env
   VITE_SERVER_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the frontend URL in your browser: `http://localhost:3000`
2. Enter a GitHub repository URL to fetch and display file differences.

## Environment Variables

### Backend

- `GIT_KEY`: Your GitHub API key.
- `WEB_APP_URL`: URL of your frontend application.

### Frontend

- `VITE_SERVER_URL`: URL of your backend server.

## Scripts

### Backend

- `npm start`: Start the production server.
- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Build the project.

### Frontend

- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Build the project.
- `npm run preview`: Preview the production build.

## Technologies Used

- **Backend**: Node.js, Express, TypeScript, Axios, Cors
- **Frontend**: React, Chakra UI, Vite, TypeScript


