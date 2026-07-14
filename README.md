# 🌤 Smart Weather Assistant

> **Experience the weather, not just the forecast.**

A modern full-stack weather application that delivers real-time weather information with dynamic themes, intelligent recommendations, and a premium user experience. Built with React, TypeScript, and FastAPI, the application adapts its interface based on live weather conditions while providing smooth animations and responsive design.

---

## 🌐 Live Demo

**Frontend:** https://smart-weather-assistant-frontend.nkatugwa.workers.dev
**Backend API:** https://smart-weather-assistant-backend.onrender.com

---

# ✨ Features

## 🌍 Live Weather Search

Search for weather conditions in cities around the world with real-time weather information.

## 🎨 Dynamic Weather Themes

The application's appearance changes based on the current weather condition.

- ☀️ Sunny
- ⛅ Partly Cloudy
- ☁️ Overcast
- 🌧 Rain
- ⛈ Thunderstorm
- ❄️ Snow
- 🌫 Fog

---

## 🌙 Automatic Day & Night Experience

The interface automatically adapts based on the location's local time to provide a more immersive experience.

---

## 💡 Smart Weather Recommendations

Receive contextual recommendations based on the current weather conditions.

Examples include:

- Carry an umbrella
- Stay hydrated
- Wear warm clothing
- Avoid outdoor activities during storms

---

## ⚡ Intelligent Loading Experience

To improve user experience while the backend wakes from sleep (Render Free Tier), the application provides:

- Smart loading detection
- Animated loading card
- Weather facts while waiting
- Smooth transition into weather results

---

## 📱 Fully Responsive

Designed to provide a seamless experience across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🎭 Smooth Animations

Built with Framer Motion to create:

- Animated weather cards
- Smooth transitions
- Dynamic theme changes
- Interactive UI elements

---

## 🚀 Production Ready

- Backend deployed on Render
- Frontend deployed on Cloudflare
- Environment variable support
- Error handling
- Responsive design
- Accessibility improvements

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- TanStack Start
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- FastAPI
- Python
- Pydantic

## Weather Data

- Open-Meteo API

## Deployment

- Cloudflare Workers
- Render

---

# 🏗 System Architecture

```text
                    User
                      │
                      ▼
        Smart Weather Assistant
           (React Frontend)
                      │
          Fetch Weather Request
                      │
                      ▼
          FastAPI Backend (Render)
                      │
                      ▼
             Open-Meteo API
                      │
          Weather Response
                      │
                      ▼
       Dynamic UI + Recommendations
```

---

# 📂 Project Structure

```text
src/
│
├── components/
│   ├── common/
│   └── weather/
│
├── contexts/
│
├── hooks/
│
├── lib/
│
├── sections/
│
├── services/
│
├── types/
│
├── routes/
│
└── styles/
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/NhartyInnovate/smart-weather-assistant-frontend.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
VITE_WEATHER_API_URL=https://smart-weather-assistant-backend.onrender.com
```

---

## Start Development Server

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---

# 📡 API Integration

The frontend communicates with the FastAPI backend using:

```http
GET /weather?city=Abuja
```

Example response:

```json
{
  "location": {
    "city": "Abuja",
    "country": "Nigeria"
  },
  "weather": {
    "temperature": {
      "value": 23,
      "unit": "°C"
    },
    "humidity": {
      "value": 92,
      "unit": "%"
    },
    "wind_speed": {
      "value": 8,
      "unit": "km/h"
    },
    "condition": "Light Rain"
  },
  "advice": "Carry an umbrella and stay dry."
}
```

---

# 📸 Screenshots

Add screenshots here.

## Landing Page

> *(Insert Screenshot)*

---

## Weather Search

> *(Insert Screenshot)*

---

## Loading Experience

> *(Insert Screenshot)*

---

## Mobile View

> *(Insert Screenshot)*

---

# 🌟 Future Improvements

- Save favourite cities
- Weather history
- Progressive Web App (PWA)
- Multi-language support
- Air quality information
- Weather maps
- Push notifications
- AI-powered weather insights

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Built By

## NKay Labs

**AI Engineer • Full Stack Developer**

Creating modern software experiences powered by AI and scalable engineering.

---

# 🙏 Acknowledgements

Special thanks to:

- Open-Meteo API
- React Team
- FastAPI
- TanStack
- Framer Motion
- Cloudflare
- Render

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!