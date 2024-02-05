
# Coachy : Coaching scheduler app


Coachy is a user-friendly 1-on-1 coaching scheduler app designed to streamline and enhance the coaching experience. With Coachy, both coaches and clients can easily manage their schedules, book sessions, and stay organized. The intuitive interface allows coaches to set their availability, while students can effortlessly browse and book sessions at their convenience.


### Requirements
- Node.js [18.17](https://nodejs.org/en) or later

### Built with

- [Next.js version 14](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [tailwindcss](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)




## Getting started

.env already included in repository

Clone the project

```bash
$ git clone https://github.com/jessdolt/coachy.git
```

Install dependencies

```bash
$ npm install
```

Build Application
```bash
$ npm run build
```

Start the server

```bash
$ npm run start
```

## Main Features and Limitations


#### For Coaches
1. Availability Management
   
   Coaches can effortlessly set their 2-hour availability slots using an intuitive day setter. This feature allows them to customize their schedule for each day of the week, providing flexibility and control.
3. Feedback System

   After each coaching session, coaches have the option to provide valuable feedback and rating on their students. This feature promotes constructive communication and continuous improvement.

#### For Student
1. Booking System

   Students have the convenience of booking coaching sessions directly through the app. This streamlined process simplifies scheduling and ensures a hassle-free experience for students seeking guidance.

#### Both 
1. Booking Overview

   Coaches and students can easily view their upcoming, done, and cancelled bookings, providing a comprehensive overview of their coaching sessions.

  
  
### Added features
- Normal authentication using NextAuth 
- Ability to mark as done for upcoming bookings (Coach)
  
`This is for testing purposes only. The main logic of the app is, it will consider a booking done once current Datetime  > endTime`
- Ability to cancel upcoming bookings
- Cancelled bookings filter
  
### Limitations
- Authentication form `/login` and `/signup` dont't have front and backend validation
- Fully booked dates are not disabled on the calendar. It will only shows "fully booked" message
- No pagination
  
## How to use the app

Once `npm run start` is done you can access it through http://localhost:3000/. You can create and login a user so navigate thoroughly if you want to try the basic authentication. 

#### Important Note  (Please read)

#### For Testing: 

You can access http://localhost:3000/testing for switching up the users. If you want to see the other users credentials you can look for `app/testing/` in the directory.

## File Structure / Routing

```bash
app - App directory
    /(auth) - Layout for /login and /signup
    /(home) - Home page
    /(user) - Authenticated users
    /testing - Buttons for switching up users
```
