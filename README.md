
# My Sailer Chat ⛵

My Sailer Chat is a real-time chat application designed to be simple, efficient, and functional. This project consumes a Python API that utilizes REST and WebSocket for communication between the client and server. With a lightweight design and a smooth experience, it was built using modern technologies that were carefully chosen to ensure robustness and code readability.

## 🛠️ How to Run the Project?

1. Install [Docker](https://www.docker.com/) on your system.
2. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

3. Make sure you have Docker Compose installed.

### Build and Run with Docker Compose

1. In the project folder, where the `docker-compose.yml` file is located, run the following command to build and start the containers for both the front-end and back-end:
   ```bash
   docker-compose up --build
   ```

2. The client side of the application will be available at `http://localhost:5173`, and the server (API) will be available at `http://localhost:8000`.

## 🚀 Technologies Used

### React + Vite + TypeScript
- **React**: Chosen for its flexibility and strong component ecosystem. Server-side rendering (like in Next.js) was not required as the application is simple.
- **Vite**: Selected for being fast and optimized for modern projects, reducing build time.
- **TypeScript**: Used to add type safety to the code, ensure built-in documentation, and prevent runtime errors that could break the application.

### Shadcdn UI
Accessible, lightweight, and customizable components, enabling agile development and creating a beautiful interface.

### Framer Motion
Used for simple and intuitive animations, providing fluidity to the interface without compromising code readability.

### Zustand
Chosen for state management due to its simplicity and clarity, avoiding the complexity of Redux or the verbosity of Context API.

### FetchAPI
Selected for making REST requests due to its simplicity, as there was no need for caching or more complex solutions.

## 🔧 Notes

This project was a technical test for an interview. The backend was not developed by me; I was responsible for creating the front-end and the Docker configuration.
