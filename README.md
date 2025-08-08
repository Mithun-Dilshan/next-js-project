# Next.js CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with Next.js 14, TypeScript, Prisma ORM, and PostgreSQL. Features a modern React frontend with server-side rendering (SSR), client-side rendering (CSR), and server actions.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

- **Full CRUD Operations** - Create, Read, Update, Delete for Users and Posts
- **Relational Database** - PostgreSQL with Prisma ORM
- **Modern UI** - Responsive design with Tailwind CSS
- **Type Safety** - Full TypeScript integration
- **Server Components** - Next.js App Router with SSR/CSR
- **API Routes** - RESTful API endpoints
- **Server Actions** - Form handling with server functions
- **Real-time Feedback** - Toast notifications
- **Data Validation** - Zod schema validation
- **Error Handling** - Comprehensive error states
- **Responsive Design** - Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Notification system

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Server Actions** - Form handling
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL installed and running
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone (https://github.com/Mithun-Dilshan/next-js-project.git)
cd nextjs-crud-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

**Replace with your actual PostgreSQL credentials:**
- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `your_database_name` - Your database name

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                     # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── users/           # Users API endpoints
│   │   └── posts/           # Posts API endpoints
│   ├── users/               # User management pages
│   ├── posts/               # Post management pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable components
├── lib/                     # Utilities and configurations
│   ├── prisma.ts           # Prisma client
│   ├── api.ts              # API client functions
│   └── actions.ts          # Server actions
├── prisma/                  # Database schema and migrations
├── types/                   # TypeScript definitions
└── README.md
```

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get post by ID
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## 💻 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma studio    # Open Prisma Studio (visual database browser)
npx prisma migrate dev # Create and apply new migration
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes without migration
npx prisma db seed   # Run database seeding (if configured)

# Utilities
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🧪 Testing the Application

### 1. Using the Web Interface
1. Navigate to `http://localhost:3000`
2. Create users via the "Users" section
3. Create posts and assign them to users
4. Test editing and deleting functionality

### 2. Using API Endpoints (Postman/curl)

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

**Create a post:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Post", "content": "Post content", "authorId": "USER_ID", "published": true}'
```

### 3. Using Prisma Studio
```bash
npx prisma studio
```
Opens a visual interface at `http://localhost:5555` to browse and edit your database.

## 🏗️ Architecture Highlights

### **App Router (Next.js 14)**
- File-based routing system
- Server and client components
- Built-in API routes
- Server actions for form handling

### **Database Design**
- Relational data with foreign keys
- Cascade delete (deleting user removes their posts)
- Automatic timestamps
- Unique constraints

### **Type Safety**
- End-to-end TypeScript
- Prisma-generated types
- Zod validation schemas
- Type-safe API clients

## 🔒 Security Features

- **Input Validation** - Zod schemas on all inputs
- **SQL Injection Protection** - Prisma ORM handles parameterization
- **CORS Handling** - Built-in Next.js security
- **Environment Variables** - Secure credential management
- **Type Safety** - Prevents runtime errors

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Loading States** - User feedback during operations
- **Error Handling** - Toast notifications for errors
- **Intuitive Navigation** - Clear user flow
- **Modern Icons** - Lucide React icons
- **Form Validation** - Client and server-side validation

## 📈 Performance Optimizations

- **Server-Side Rendering** - Fast initial page loads
- **API Route Handlers** - Efficient data fetching
- **Database Indexing** - Optimized queries with Prisma
- **Component Optimization** - React best practices
- **CSS Optimization** - Tailwind's utility-first approach

## 🔄 Development Workflow

1. **Schema Changes**: Update `prisma/schema.prisma`
2. **Migration**: Run `npx prisma migrate dev`
3. **Types**: Auto-generated from Prisma schema
4. **API**: Update routes in `app/api/`
5. **Frontend**: Update pages in `app/`
6. **Testing**: Use Prisma Studio or Postman





## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PostgreSQL](https://www.postgresql.org/) - Advanced open source database


## 📞 Support

If you have any questions or need help:



---

**Built with ❤️ using Next.js, TypeScript, and PostgreSQL**
