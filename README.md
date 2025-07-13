# LaunchAppX

**LaunchAppX**  is a React application that allows you to view a live countdown to the most important upcoming rocket launches.

---

## 📦 Features

- **Live countdown** to each launch's date and time  
- **List of upcoming launches** with status indicators and live stream links (when available)  
- **Recent launch history** including mission patch, video links, and rocket details  
- **Local caching** via `localStorage` to minimize unnecessary network requests  
- **Lazy-loading** of images for improved performance

---

## 🌐 Data Source

All launch data is fetched from the [**Launch Library 2 API**](https://thespacedevs.com/llapi) provided by [**The Space Devs**](https://thespacedevs.com/).  

The following endpoints are used:

- `https://lldev.thespacedevs.com/2.2.0/launch/`  

Data is cached using `localStorage`, reducing the need for frequent API calls.

---

## 🚀 Tech Stack

- **React** – Frontend framework  
- **NextUI** – UI component library
- **react-countdown** – Live countdown timer  
---

## 🔧 Installation

To run the project locally, use the following commands:

```bash
git clone https://github.com/sbolanowski/launch-app
cd launch-app
npm install
npm start
```