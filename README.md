# The News Hub: Modern news aggregation platform

A dynamic and feature-rich Newspaper website built using React, Firebase, React Router, Node.js, Express, and MongoDB. The platform provides an intuitive and engaging user experience, allowing users to submit, read, and subscribe to premium content while admins manage content seamlessly.

## Live Demo -- https://the-news-hub-5f6bb.web.app
            
## Key Features

### General Features
- Trending News Section – Displays trending articles based on total views.
- Premium Subscription System – Users can access exclusive premium content.
- Statistics Page – Displays total users, normal users, and premium users dynamically.
- Categorized Articles – Filter articles based on publishers and tags.
- Advanced Search & Filtering – Backend search and filtering for articles.

### Authentication System
- Email/password-based authentication using Firebase
- Social login (Google or GitHub)
- Password strength validation and error handling
- Secure handling of Firebase and MongoDB credentials with environment variables

### User features
- Add Articles – Users can submit articles (approved by admin before publishing).
- My Articles Page – Users can view, update, or delete their articles.
- Article Details Page – Full article view with an automatic view counter.
- Subscription Plans – Users can subscribe for 1 min, 5 days, or 10 days.
- Premium Articles – Only subscribed users can access premium content.
- Profile Management – Users can update their information.
- Automatic Logout Prevention – Users won’t be logged out on page reload.

### Admin Features
- Admin Dashboard – Manage users, articles, and publishers.
- All Users Management – Promote users to admin or manage roles.
- All Articles Management – Approve, decline, delete, or mark articles as premium.
- Dynamic Charts & Analytics – Pie chart, bar chart, and line chart showing article data.
- Add Publisher – Manage news publishers dynamically.

### Frontend Technologies
- React.js – Modern UI with dynamic rendering.
- Tailwind CSS – Responsive & beautiful design.
- React Router – Seamless navigation.
- Axios – Secure API calls.
- React Query (TanStack) – Optimized data fetching.
- SweetAlert2 & Toast Notifications – Interactive alerts & notifications.


### Additional Functionalities
- JWT-based authentication for secure private routes
- Loading spinners during data fetch operations
- Notifications using toast or sweet alert for CRUD operations
- Configured CORS, route protection, and secure server deployment


### Backend Features
- Node.js & Express.js – Fast & scalable API.
- MongoDB – NoSQL database for flexible data storage.
- JWT Authentication – Secure user authentication.






