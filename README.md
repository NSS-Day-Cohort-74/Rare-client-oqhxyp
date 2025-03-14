# Rare: The Publishing Platform for the Discerning Writer

# Blog Platform Application - README

## Overview

This client-side application provides a comprehensive platform for creating, managing, and discovering blog posts for authors. The platform allows users to write their own content, organize posts through categories and tags, and follow their favorite content creators.

## Technologies

This application was built using:
- **Python**: Backend server and API
- **JavaScript**: Client-side functionality
- **React**: Frontend user interface and components
- **SQL**: Database management and storage
- **bulma**: CSS 

## Features

### Navigation
The application offers a user-friendly navbar with the following sections:
- All Posts
- My Posts
- New Post
- Category Manager
- Tag Manager
- User Profiles

### Content Management

#### Posts
- **All Posts**: Browse posts from all authors with their associated tags and categories
- **My Posts**: View all posts created by the currently logged-in user
- **New Post**: Create new blog posts with a dedicated content creation interface

#### Organization
- **Category Manager**: Create and manage post categories for better content organization
- **Tag Manager**: Create and manage tags to improve content discoverability

### User Interaction
- **User Profiles**: Browse profiles of all platform users
- **Subscription System**: Subscribe to favorite content creators
- **Favorites Page**: Access posts from subscribed users in one convenient location

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Active internet connection
- Python 3.8+
- Node.js 14+
- SQL database (MySQL, PostgreSQL, etc.)

### Installation
1. Clone the repository: "git@github.com:NSS-Day-Cohort-74/Rare-client-oqhxyp.git"
2. Navigate to the project directory: `cd blog-platform`
3. Install backend dependencies: `pip install -r requirements.txt`
4. Install frontend dependencies: `npm install`
5. Configure database settings in `config.py`
6. Run database migrations: `python manage.py migrate`
7. Start the backend server: `python manage.py runserver`
8. Start the frontend development server: `npm start`

## Usage

1. **Creating a Post**:
   - Navigate to "New Post" in the navbar
   - Fill in the title, content, and select relevant categories and tags
   - Click "Submit" to make your post visible to other users

2. **Managing Categories and Tags**:
   - Use the Category Manager to create new categories
   - Use the Tag Manager to create new tags
   - Apply these to your posts for better organization

3. **Following Other Users**:
   - Visit the User Profiles section
   - Browse available profiles
   - Click "Subscribe" on profiles of interest
   - Access posts from subscribed users on your Favorites page

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## linked-in 
John Williams: "https://www.linkedin.com/in/john-williams-2007b4352/"

## License

This project is licensed under the MIT License - see the LICENSE file for details.

