# Simple REST API Users

A RESTful API for managing users built with Express.js, MongoDB, and deployed on Vercel.

## Features

- User management endpoints
- Swagger documentation
- MongoDB integration
- Error handling middleware
- Vercel deployment support

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

1. Ensure MongoDB is running
2. Start the server:
   ```bash
   npm start
   ```

The server will start at `http://localhost:5000`

## API Documentation

Access the Swagger documentation at:

- Local: `http://localhost:5000/api-docs`
- Production: `https://your-vercel-url/api-docs`

## Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - MONGO_URI

## Project Structure

```
backend/
├── routes/        # API routes
├── swagger/       # Swagger documentation
├── server.js      # Main application file
├── package.json   # Project dependencies
└── vercel.json    # Vercel configuration
```

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support, please open an issue in the repository.

## Acknowledgments

- Express.js
- MongoDB
- Vercel
- Swagger UI

## Author

Reyshal
