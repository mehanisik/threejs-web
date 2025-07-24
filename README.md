# Three.js Portfolio

This is a modern portfolio website built with React, TypeScript, and Vite, featuring interactive 3D elements using Three.js.

## Tech Stack

*   **Framework:** [React](https://react.dev/)
*   **Bundler:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **3D Graphics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [wouter](https://github.com/molefrog/wouter)
*   **Database:** [Supabase](https://supabase.com/)
*   **Linting & Formatting:** [Biome](https://biomejs.dev/)

## Setup

### Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Supabase Account** (for database functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd threejs-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   To get these values:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project (or create a new one)
   - Go to Settings > API
   - Copy the URL and anon key

4. Set up your Supabase database with the following tables:
   - `projects` (id, title, number, date, city, image, url, tags, created_at)
   - `services` (id, service_id, title, description, image, created_at)
   - `about` (id, bio, address, languages, tools, portrait_url, preview_images, created_at)

5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the codebase using Biome.

### `npm run lint:fix`

Lints and fixes all auto-fixable issues with Biome.

### `npm run preview`

Serves the production build locally for preview.