# Infinite Games SWE Project

Welcome to the Infinite Games Software Engineering project! This guide will help you set up the project on your local machine, including both backend and frontend components. By following these instructions, you'll have a fully functioning development environment.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Git](https://git-scm.com/)
- [Python 3.8+](https://www.python.org/)
- [Node.js and npm](https://nodejs.org/)

## Project Setup Steps

### Step 1: Clone the Repository
First, clone the repository from GitHub to your local machine:
```sh
git clone https://github.com/manojnathyogi/infinite-games-swe-project.git
cd infinite-games-swe-project
```

### Step 2: Set Up the Backend

#### Step 2.1: Create a Virtual Environment
Navigate to the backend directory and create a virtual environment:
```sh
cd backend
python -m venv virtual
```

#### Step 2.2: Activate the Virtual Environment
Activate the virtual environment:

- On Windows:
  ```sh
  virtual\Scripts\activate
  ```
- On macOS/Linux:
  ```sh
  source virtual/bin/activate
  ```

#### Step 2.3: Install Backend Dependencies
Navigate to the backend folder and install the required Python packages:
```sh
pip install -r requirements.txt
```

#### Step 2.4: Apply Migrations
Apply the database migrations to set up your local database:
```sh
python manage.py migrate
```

#### Step 2.5: Run the Backend Server
Start the Django development server:
```sh
python manage.py runserver
```

The backend server will be running at [http://localhost:8000](http://localhost:8000).

### Step 3: Set Up the Frontend

#### Step 3.1: Install Node.js and npm
Ensure that Node.js and npm are installed. You can download them from [nodejs.org](https://nodejs.org/).

#### Step 3.2: Install Frontend Dependencies
Navigate to the frontend directory and install the required npm packages:
```sh
cd ../frontend
npm install
```

#### Step 3.3: Run the Frontend Development Server
Start the Vite development server:
```sh
npm run dev
```

The frontend server will typically be running at [http://localhost:3000](http://localhost:3000).

### Step 4: Access the Application
Open your web browser and navigate to the URL provided by the Vite development server (usually [http://localhost:3000](http://localhost:3000)). Ensure that the backend server is also running at [http://localhost:8000](http://localhost:8000).

### Step 5: Deactivate the Virtual Environment
Once you're done with development, you can deactivate the virtual environment by running:
```sh
deactivate
```

## Additional Notes
- Make sure to set up any necessary environment variables if your application requires them.
- If you encounter issues during setup, check the logs for error messages and ensure that all dependencies are installed correctly.

## Contributing
We welcome contributions! Feel free to open issues, suggest features, or submit pull requests to help improve the project.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---
By following these steps, you should be able to set up and run the project on your local machine without any issues. If you need further assistance, don't hesitate to reach out!

