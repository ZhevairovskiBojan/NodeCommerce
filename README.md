# NodeCommerce

Project Structure for NodeCommerce:

NodeCommerce/
│
├── backend/                   # Backend API with Node.js + Express
│   ├── config/                # Configuration files (MongoDB, JWT)
│   ├── controllers/           # Business logic for API routes
│   ├── middleware/            # Authentication and validation logic
│   ├── models/                # Mongoose schemas for MongoDB (User, Product, Order)
│   ├── routes/                # Express API routes (auth, product, cart, order)
│   └── server.js              # Main entry point for the backend server
│
├── frontend/                  # Frontend with React
│   ├── public/                # Public directory (static files, index.html)
│   ├── src/                   # React source code
│   │   ├── components/        # React components (ProductCard, Cart, Navbar, etc.)
│   │   ├── pages/             # React pages (Home, ProductDetail, Login, Signup)
│   │   ├── api/               # API services to connect to backend
│   │   └── App.js             # Main React app entry point
│   └── package.json           # Frontend dependencies and scripts
│
├── .env                       # Environment variables for backend (DB, JWT secret)
└── README.md                  # Project overview and instructions

Folder Structure for Frontend

frontend/
│
├── public/                     # Static files (index.html, images, etc.)
├── src/
│   ├── components/             # Reusable components (Navbar, ProductCard, etc.)
│   ├── pages/                  # Page components (Home, ProductDetail, Cart, Login, Signup)
│   ├── api/                    # Axios API services (productApi.js, userApi.js)
│   ├── App.js                  # Main component
│   ├── index.js                # Entry point for React
│   └── styles/                 # (Optional) Custom CSS styles
└── package.json                # Frontend dependencies and scripts


Route Name	Method	URL	Access
Register	POST	/api/auth/register	Public
Login	POST	/api/auth/login	Public
Profile	GET	/api/user/profile	Authenticated
Admin Products	GET	/api/admin/products	Admin Only
Orders	Various	/api/orders	Authenticated
Cart	Various	/api/cart	Authenticated
Products	Various	/api/products	Public/Admin