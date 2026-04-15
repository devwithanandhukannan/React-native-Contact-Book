# 📱 Premium React Native Contact Book

A full-stack, offline-first mobile application designed for seamless contact management. This project demonstrates high-end UI design, robust local storage, and real-time backend synchronization with **NestJS** and **MongoDB Atlas**.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: installed on your machine.
- **Expo Go App**: installed on your physical phone (to test mobile features).
- **MongoDB Atlas**: Account with a cluster ready (URI provided below).

### 2. Backend Setup (NestJS)
```bash
cd contact-book-api
npm install
npm run start:dev
```
- **Port**: 3000
- **Database**: MongoDB Atlas (Cloud)
- **Log**: You should see `✅ db connected` in the console.

### 3. Frontend Setup (React Native / Expo)
```bash
cd contact-book
npm install
npx expo start
```
- **Action**: Scan the QR code with your **Expo Go** app or press `a` for Android Emulator.
- **Config**: Ensure the `API_URL` in `constants/Config.ts` matches your computer's IP.

---

## 🛠️ How this Project was Created

### Backend Creation
```bash
# Core command used:
npx @nestjs/cli new contact-book-api
```
NestJS was chosen for its structured approach (Module-Controller-Service), which provides a more scalable alternative to standard Express.js.

### Frontend Creation
```bash
# Core command used:
npx create-expo-app contact-book --template tabs
```
Expo Router was used to provide a web-like file-based routing system (Standard for modern React Native).

---

## 📚 Code Explanation (MERN Developer Guide)

If you know the MERN stack (MongoDB, Express, React, Node), this project will feel familiar, but with some "mobile-first" enhancements.

### 1. Backend: The NestJS API
- **Controller** (`contacts.controller.ts`): Acts like your Express **Routes**. It defines the endpoints (`GET /contacts`, `POST /contacts`).
- **Service** (`contacts.service.ts`): Contains the actual **Mongoose logic** (create, find, update, delete).
- **Schema** (`contact.schema.ts`): Exactly like a Mongoose Schema in MERN. Defines the `name`, `phone`, and `email` fields.

#### ✨ Key Logic added: `app.module.ts`
```typescript
MongooseModule.forRoot('mongodb+srv://...', {
  connectionFactory: (connection) => {
    connection.on('connected', () => console.log('✅ db connected'));
    return connection;
  }
})
```
*   **What it does**: Connects to your MongoDB Atlas cluster. I added the `connectionFactory` to provide clear feedback in your console when the database is successfully linked.

---

### 2. Frontend: The React Native App
- **View**: Think of this as a `<div>`.
- **Text**: Think of this as a `<span>` or `<p>`.
- **AsyncStorage**: Think of this as `localStorage` for mobile.

#### ✨ Key Logic added: `hooks/storage.ts` (Resilient Storage)
```typescript
// Memory fallback if Native module is missing
let memoryStorage: Record<string, string> = {}; 

export const saveContactsLocal = async (contacts: Contact[]) => {
  try {
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    // If phone storage fails, we silently fallback to memory
    memoryStorage['contacts'] = JSON.stringify(contacts);
  }
};
```
*   **What it does**: This file handles **Offline Support**. It tries to save to the phone's persistent storage. If the native module is broken (common in some dev environments), it falls back to a temporary memory store so the app never crashes.

#### ✨ Key Logic added: `hooks/api.ts` (Dynamic IP)
```typescript
const API_URL = 'http://192.168.1.3:3000'; // Your Computer's IP
```
*   **What it does**: In mobile development, you cannot use `localhost` because the phone is a separate device. We use your machine's local IP address so the phone can "see" your backend server over Wi-Fi.

#### ✨ Key Logic added: `app/(tabs)/index.tsx` (Auto-Refresh)
```typescript
useFocusEffect(
  useCallback(() => {
    loadData(); // Refreshes list whenever you see this screen
  }, [])
);
```
*   **What it does**: Unlike a website where you might click a link, mobile screens stay in memory. `useFocusEffect` ensures that every time you go back to the home screen after adding a contact, the list refreshes automatically.

---

## 🎨 Design System
- **Theme**: Clean, Premium White/Light Grey (`#f9fafb`).
- **Primary Color**: Indigo Blue (`#6366f1`).
- **Shadows**: Custom shadow offsets to create "elevation" for cards.
- **Icons**: Hand-picked from `Ionicons` for a native iOS/Android feel.

---

## 📋 Features at a Glance
1.  **Add Contact**: Instant local save + background cloud sync.
2.  **View List**: Beautifully styled cards with name initials.
3.  **Real-time Refresh**: Pull down to sync with MongoDB.
4.  **Edit/Delete**: Interactive editing with auto-sync.
