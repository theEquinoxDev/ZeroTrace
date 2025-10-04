# ZeroTrace - Anonymous Real-Time Chat Application

---

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.5.1-green)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-blueviolet)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Socket.io Events](#socketio-events)
- [Frontend Components](#frontend-components)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

**ZeroTrace** is a fully anonymous real-time chat application. Users can create public or private rooms, share invite links, and chat without revealing personal identity. Messages disappear when users leave, ensuring maximum privacy.

---

## Features

- **Anonymous chat** with optional nicknames
- **Public & private rooms** with invite codes
- **Real-time messaging** with Socket.io
- **Shareable invite links** for private rooms
- **Dynamic UI notifications** using React Toastify
- **Responsive & clean design** using Tailwind CSS
- Automatic scroll to the newest message
- Room visibility icons using Lucide React
- Easy room creation and joining
- Local/session storage for rooms and messages

---

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons, React Toastify, Zustand
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Real-Time Communication:** Socket.io
- **Utilities:** UUID, Axios

---

## Live Demo

> Add your deployed demo URL here  
> Example: [https://zerotrace.example.com](https://zerotrace.example.com)

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/ZeroTrace.git
cd ZeroTrace
```

---

### Backend Setup

```bash
cd server
npm install
npm run start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

### Backend `.env`

See [server/.env.example](server/.env.example):

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend `.env`

See [client/.env.example](client/.env.example):

```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Usage

- Open the Application (`npm run dev` in `client`)
- Enter a nickname (optional) or join anonymously.
- View Available Rooms.
- Create new public or private rooms.
- Share invite links for private rooms.
- Start chatting in real-time.
- **Note:** Messages disappear when leaving the room.

---

## Folder Structure

```
ZeroTrace/
├── client/
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── api/
│       │   ├── roomApi.js
│       │   └── sessionApi.js
│       ├── assets/
│       │   └── react.svg
│       ├── components/
│       │   ├── ChatWindow.jsx
│       │   ├── MessageInput.jsx
│       │   ├── RoomForm.jsx
│       │   ├── Rooms.jsx
│       │   └── SessionForm.jsx
│       ├── hooks/
│       │   └── useSocketHook.js
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── NotFound.jsx
│       │   └── Room.jsx
│       ├── stores/
│       │   ├── roomStore.js
│       │   └── sessionStore.js
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── socket.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── roomController.js
│       │   └── sessionController.js
│       ├── models/
│       │   ├── Message.js
│       │   ├── Room.js
│       │   └── Session.js
│       └── routes/
│           ├── rooms.js
│           └── sessions.js
├── README.md
```

---

## API Endpoints

### Session Endpoints ([server/src/routes/sessions.js](server/src/routes/sessions.js))
- `POST /api/sessions` — Create a new session (nickname optional)
- `GET /api/sessions/:id` — Get session info by sessionId

### Room Endpoints ([server/src/routes/rooms.js](server/src/routes/rooms.js))
- `GET /api/rooms` — List all rooms
- `POST /api/rooms` — Create a new room (public/private)
- `GET /api/rooms/:id` — Get room info by roomId

---

## Socket.io Events

Socket events are handled in [server/src/socket.js](server/src/socket.js):

- `join_room` — Join a room (emits `system_message`)
- `leave_room` — Leave a room (emits `system_message`)
- `send_message` — Send a message (emits `receive_message`)
- `receive_message` — Receive a message in room
- `system_message` — System notifications (join/leave)
- `disconnect` — Socket disconnect

---

## Frontend Components

- [`App`](client/src/App.jsx): Main router and toast notifications
- [`Home`](client/src/pages/Home.jsx): Welcome page
- [`SessionForm`](client/src/components/SessionForm.jsx): Create/join session
- [`Rooms`](client/src/components/Rooms.jsx): List and join rooms
- [`RoomForm`](client/src/components/RoomForm.jsx): Create new room
- [`Room`](client/src/pages/Room.jsx): Chat room page
- [`ChatWindow`](client/src/components/ChatWindow.jsx): Message display and input
- [`MessageInput`](client/src/components/MessageInput.jsx): Send messages
- [`NotFound`](client/src/pages/NotFound.jsx): 404 page

---

## Contributing

- Fork the repository
- Create a feature branch:
```bash
 git checkout -b feature/your-feature
 ```
 - Commit changes:
 ```bash
 git commit -m "Add feature description"
 ```
 - Push branch:
 ```bash
 git push origin feature/your-feature
 ```
 - Open a Pull Request

---

## License

This project is licensed under MIT. See [LICENSE](./LICENSE) for details.

---

## Acknowledgements

- React
- Socket.io
- MongoDB
- Tailwind CSS
- React Toastify
- Lucide React Icons
- Zustand

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/theEquinoxDev">theEquinoxDev</a>
</p>