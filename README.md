# firebase-todo-app

This ToDo app is built using Next.js for the frontend, Firebase Authentication for user authentication, and Firestore database for storing ToDo items. It allows users to sign up, sign in, create ToDo items, mark them as completed, and view their own ToDo list.

## Features

- User authentication: Users can sign up and sign in securely using Firebase Authentication.
- Personalized ToDo list: Each user has their own ToDo list, isolated from other users.
- CRUD operations: Users can create, read, update, and delete ToDo items.
- Marking completion: Users can mark ToDo items as completed, providing visual feedback on task progress.

## Technologies Used

- **Next.js**: Next.js is a React framework that enables server-side rendering, routing, and other useful features for building web applications.
- **Firebase Authentication**: Firebase Authentication provides easy-to-use SDKs and ready-made UI libraries to authenticate users in your app.
- **Firestore**: Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.

## Setup Instructions

1. Clone the repository:
   git clone <repository-url>
2. Install dependencies:
   npm install

3. Set up Firebase:

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Firebase Authentication and Firestore for the project.
- Copy the Firebase configuration settings.
- Create a `.env.local` file in the root directory of the project and add the Firebase configuration settings:

  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
  NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
  ```

4. Run the development server:
   npm run dev
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

- Sign up or sign in using your email and password.
- Once logged in, you'll be able to create new ToDo items, mark them as completed, update them, or delete them.
- Your ToDo list is personal and cannot be accessed by other users.
- Sign out when you're done using the app.

## Credits

This app was created by Adila Arshad as a personal project.

## License

This project is licensed under the [MIT License](LICENSE).
