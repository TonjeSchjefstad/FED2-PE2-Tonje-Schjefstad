# Holidaze App
![image](https://i.imghippo.com/files/hmy3416VJE.png)

## Description
Holidaze is a venue booking app built as my Project Exam 2 at Noroff. The app allows users to browse, search and book accommendations, and Venue Managers can create and manage their own venues. The app has a full login system and works well on both mobile and desktop.
The project is built with React, TypeScript and Tailwind, and integrates with the Noroff Holidaze API. Some of the components I built include a availability calender, a profile page with different views for customers and venue managers, and several modals. 
I had fun designing and building this project, and I really feel I was able to put the last years knowledge to use in this final project. 

- Live Demo: https://holidaze-app.vercel.app/
- Project Board: https://github.com/users/TonjeSchjefstad/projects/20
- Figma design: https://www.figma.com/design/ZYml8ZAdhuiwRups4JGkCW/PE2-Holidaze?node-id=1-2&t=YM5SQCpfUbIBFSYg-1
- Figma prototype mobile: https://www.figma.com/proto/ZYml8ZAdhuiwRups4JGkCW/PE2-Holidaze?page-id=1%3A3&node-id=1-3227&viewport=234%2C-315%2C0.72&t=C5zbha4aiNHgdt9o-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A3227
- Figma prototype desktop: https://www.figma.com/proto/ZYml8ZAdhuiwRups4JGkCW/PE2-Holidaze?node-id=1-13787&viewport=-2908%2C531%2C0.21&t=7zjrrJt4AHqKuVQu-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A14896&page-id=1%3A4

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installing
1. Clone the repository:

```bash
git clone https://github.com/TonjeSchjefstad/FED2-PE2-Tonje-Schjefstad.git
```

2. Install dependencies:

```
npm install
```

3.  Create a `.env` file in the root of the project:
```
VITE_API_BASE_URL=https://v2.api.noroff.dev
```
Never commit your .env file to version control. It's included in .gitignore.

### Running

Start the development server with:

```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Available Scripts

### Development
- `npm run dev` – Start Vite development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build locally

### Code Quality
- `npm run lint` – Run ESLint to check code quality
- `npm run format` – Format code with Prettier
- `npm run prepare` – Install Husky git hooks

## Project Structure
```bash
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │  ├── layout/
│   │  ├── profile/
│   │  ├── ui/
│   │  └── venue/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── schemas/
│   ├── services/
│   └── types/
├── env.example
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Folder highlights
- `src/assets/` - Images
- `src/components/` - All components
- `src/pages/` - Page components
- `src/services/api.ts` - All API calls
- `src/schemas/` - Zod validation schemas
- `src/types/` - TypeScript interfaces
- `src/context/` - Auth context and provider

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind
- React Router DOM
- React Hook Form + Zod
- react-hot-toast
- Lucide React + react-icons
- Vercel
- Noroff Holidaze API

## User Features
### All users
- View a list of Venues.
- Search and browse for a specific Venue.
- Filter and sort venues
- View venue details
- Register as a Customer or Venue Manager (stud.noroff.no email).
- View a calendar with available and booked dates.

### Customers
- Log in and out
- Create a booking.
- View upcoming bookings.
- Update avatar/profile picture.

### Venue Managers
- Log in and out
- Create, edit and delete venues
- View upcoming bookings for their venues
- Update avatar/profile picture.


## Future Improvements
- Add favourites functionality
- Implement interactive map on venue detail page
- Custom toast notification system

## Contact
- My LinkedIn page: https://www.linkedin.com/in/tonjeschjefstad/
- My GitHub Profile: https://github.com/TonjeSchjefstad
- Email: Tonje_schjefen@hotmail.com
  
  
