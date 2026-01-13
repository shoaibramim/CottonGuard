# Cotton Leaf Disease Detector

A full-stack modern web application for detecting cotton leaf diseases using a fine-tuned ResNet50 model. The app features a React frontend and a FastAPI backend that proxies inference to a Hugging Face Space.

## Project Structure

- **root/**: React Frontend (Vite + TypeScript)
- **backend/**: FastAPI application (Python)

## Prerequisites

- Node.js 18+
- Python 3.9+

## 🚀 Getting Started

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The backend will start at `http://localhost:8000`.

### 2. Frontend Setup

In the project root:

```bash
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`.

## 📦 Deployment Instructions

### Backend (Render / Railway / Fly.io)

Since the backend is stateless, it can be deployed on any container platform.

**Example: Render**
1. Create a new Web Service on Render.
2. Connect your repository.
3. Set **Root Directory** to `backend`.
4. Set **Build Command** to `pip install -r requirements.txt`.
5. Set **Start Command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`.

### Frontend (Vercel)

1. Push your code to GitHub.
2. Import the project in Vercel.
3. **Environment Variables**:
   - Add `VITE_API_BASE_URL` and set it to your deployed backend URL (e.g., `https://my-backend.onrender.com`).
4. Deploy.

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: FastAPI, Gradio Client (Remote Inference), BeautifulSoup (Output Parsing)
- **Model**: ResNet50 (Hosted on Hugging Face Spaces)

## License

MIT
