#  Chit-chat – A React Chat Application

A **basic chat UI application** built with **React and Tailwind CSS**, implementing WhatsApp-like design, multi-line input, and dynamic chat management.

---
## **Getting Started**

1. **Clone the repository**

```bash
git clone https://github.com/your-username/chit-chats.git
cd chit-chats
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
npm start
```

App will run on [http://localhost:3000](http://localhost:3000).

---

## **Features**

 Sidebar with:
- List of chats  
- Create new chat with user-defined name  
- Delete chat functionality (dropdown menu)

 Chat Window:
- Displays messages with user identifier, timestamp, and content
- WhatsApp-like styled messages
- Multi-line message display with preserved line breaks
- Auto-scrolls to the latest message

 Message Input:
- Supports typing multi-line messages with Shift + Enter  
- Press Enter to send  
- Input auto-expands up to max height
- Auto-focus when switching chats
- Delete and Copy Chat functionality

---

## **Tech Stack**

- **React** 
- **Tailwind CSS** for utility-first styling  
- **React Context + useReducer** for state management

---

## **Design Decisions**
- Used Tailwind CSS for fast, responsive UI.

- Textarea with react-textarea-autosize for WhatsApp-like expanding input.

- white-space: pre-wrap for preserving line breaks in message display.

- Auto-focus and auto-scroll for smooth user experience.
