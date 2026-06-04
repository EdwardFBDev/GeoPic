# GeoPic

GeoPic is a mobile application developed as part of **Laboratory 2: Hardware and Sensor Integration** for the Mobile Application Development course.

The application allows users to capture photos using their device's camera and automatically register the geographic coordinates (latitude and longitude) obtained through GPS. Each photo can include a custom description and can later be viewed from a visual gallery.

---

## Project Objective

The purpose of this project is to demonstrate the integration of native mobile device resources using Expo and React Native, including:

* Device camera access
* GPS location services
* Permission management
* Screen navigation
* Global state management using Context API

---

## Features

###  Photo Capture

* Access to the device camera
* Photo preview before saving
* Automatic GPS coordinate capture when taking a photo
* Custom description field

###  Geographic Logging

Each entry stores:

* Photo
* Description
* Latitude
* Longitude
* Creation date

###  Gallery View

* Display all saved photos
* Grid-based layout for an improved visual experience
* Access to detailed information for each entry

###  Detail View

When a photo is selected from the gallery, users can view:

* Full-size image
* Description
* Geographic coordinates
* Entry creation date

###  Permission Handling

The application requests permissions for:

* Camera access
* GPS location access

It also handles scenarios where the user denies one or more required permissions without causing the application to crash.

---

## Project Architecture

This project was developed following software engineering best practices:

* **SRP (Single Responsibility Principle)**
* **DRY (Don't Repeat Yourself)**
* **KISS (Keep It Simple, Stupid)**
* **High Cohesion**
* **Low Coupling**

### Project Structure

```text
GeoPic
│
├── app
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── entry
│   │   └── [id].tsx
│   └── (tabs)
│       ├── _layout.tsx
│       ├── capture.tsx
│       └── gallery.tsx
│
├── src
│   ├── components
│   ├── constants
│   ├── context
│   └── types
│
├── assets
├── package.json
└── README.md
```

---

## Technologies Used

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript

### Hardware & Sensors

* Expo Camera
* Expo Location

### State Management

* React Context API
* React Hooks

### Navigation

* Expo Router
* Tab Navigation

### UI Design

* React Native StyleSheet
* React Native Safe Area Context

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/EdwardFBDev/GeoPic.git
```

### 2. Navigate to the Project Directory

```bash
cd GeoPic
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npx expo start
```

---

## Requirements

* Node.js
* Expo Go
* Physical Android or iOS device

> A physical device is recommended to properly test camera and GPS functionality.

---

## Author

**Eduardo Funes Betancourt**

Developed as part of the Mobile Application Development course.
