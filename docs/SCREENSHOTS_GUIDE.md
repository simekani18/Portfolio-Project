# Screenshots Guide

This file describes which screenshots are needed for the README.

## Prerequisites
- Ensure all services are running: `docker-compose up -d`
- Access the application at http://localhost:3000

## Required Screenshots

### 1. Portfolio Website (Public Pages)

Navigate to http://localhost:3000 and capture:

1. **Hero Section** (`hero-section.png`)
   - Scroll to the very top
   - Capture the hero/landing section with name and intro
   - Full width, showing the background animation

2. **About Section** (`about-section.png`)
   - Scroll to the About Me section
   - Capture the profile information and description

3. **Work Experience Section** (`experience-section.png`)
   - Scroll to the Work Experience section
   - Capture at least 2-3 experience cards
   - Show the timeline and descriptions

4. **Technical Skills Section** (`skills-section.png`)
   - Scroll to the Technical Skills section
   - Capture the skills grid/display

5. **Portfolio/Projects Section** (`portfolio-section.png`)
   - Scroll to the Portfolio/Projects section
   - Capture project cards or display
   - **SKIP if this shows "Coming Soon"**

6. **Contact Section** (`contact-section.png`)
   - Scroll to the Contact section
   - Capture the contact form or contact options

### 2. Admin Dashboard

#### Admin Login
1. Navigate to http://localhost:3000/admin/login
2. **Admin Login Page** (`admin-login.png`)
   - Capture the full login form
   - Show username and password fields

#### Admin Dashboard
1. Login with credentials:
   - Username: `admin`
   - Password: `Admin@123`

2. **Admin Dashboard Overview** (`admin-dashboard.png`)
   - Capture the main admin dashboard landing page
   - Show navigation and main content area

3. **Experiences List View** (`admin-experiences-list.png`)
   - Navigate to the Experiences management page
   - Capture the list of experiences with action buttons
   - Show the full table/list view

4. **Create/Edit Experience Form** (`admin-experience-form.png`)
   - Click "Add New Experience" or edit an existing one
   - Capture the form with all fields visible
   - Show company, title, dates, description fields

5. **Admin Navigation** (`admin-nav.png`)
   - Capture the admin sidebar or navigation menu
   - Show all available admin sections

## File Naming Convention

Save all screenshots in: `/docs/screenshots/`

Use exact names as specified in parentheses above for consistency with README references.

## Screenshot Guidelines

- **Resolution**: Capture at 1920x1080 or higher
- **Format**: PNG (for crisp UI elements)
- **Browser**: Use Chrome or Firefox with no extensions visible
- **Zoom**: 100% browser zoom
- **Window Size**: Full screen or large window
- **Hide Sensitive Data**: Ensure no personal/sensitive information is visible
- **Crop**: Remove browser chrome (address bar, bookmarks) if preferred

## After Taking Screenshots

Once screenshots are saved to `/docs/screenshots/`, the README already has markdown references in place. The images will automatically display.
