🚀 Space Travel Simulation Dashboard

A state-driven simulation application modeling interplanetary logistics, resource constraints, and fleet management. Built as a focused showcase of advanced React architecture, this project emphasizes scalable state management, derived data patterns, and intentional UI data flow in complex systems.

Originally based on a bootcamp exercise, this project was intentionally expanded into a React architecture showcase to demonstrate the ability to design and manage a complex, state-driven user interface.

---

🧠 Overview

The Space Travel Simulation Dashboard is a front-end application designed to simulate the movement of spacecraft between planets under real-world constraints such as population capacity, fleet limitations, and resource allocation.

This project emphasizes **application architecture over surface-level features**, showcasing how complex systems can be modeled and managed effectively within a React environment.

---

 ⚙️ Core Features

* Fleet management system with active and decommissioned spacecraft
* Planetary system with population and capacity constraints
* Dispatch workflow with real-time validation logic
* Derived metrics and system state visualization
* Persistent state using local storage (mock backend)
* Multi-page navigation using React Router

---

🏗️ Technical Focus

This project is intentionally engineered to demonstrate **production-level React patterns**, including:

* **Centralized state management** using Redux Toolkit
* **Derived state over duplicated state** via memoized selectors
* **Predictable data flow** with clearly defined state ownership
* **Component reusability and separation of concerns**
* **Asynchronous state handling** with consistent loading/error patterns
* **Normalized state structure** for scalability

---

🧩 System Design Highlights

Rather than treating UI as isolated components, this application models a **connected system**:

* Spacecraft and planets interact through shared constraints
* Dispatch logic enforces business rules before state mutation
* UI reflects **derived system outcomes**, not raw data

This mirrors how real-world applications manage:

* inventory systems
* resource allocation
* constraint-based workflows

---

🔧 Tech Stack

* React (Vite)
* Redux Toolkit
* React Router
* CSS Modules
* LocalStorage (mock API layer)

---

🚧 Ongoing Development

This project is actively being expanded to further demonstrate advanced React and frontend architecture.

Planned improvements include:

* Refactoring state architecture to further minimize global state usage
* Enhancing selector logic for more advanced derived system metrics
* Expanding UI feedback for clearer system state transitions
* Improving routing structure with data loading patterns
* Adding comprehensive loading, error, and empty states
* Increasing component abstraction and reusability

These updates are focused on evolving the project from a strong simulation into a **fully polished, production-ready frontend system**.

---

🎯 Purpose

This project is part of a larger portfolio focused on demonstrating:

* Advanced React architecture
* Real-world state management patterns
* Thoughtful system design in frontend applications

It is intentionally designed to go beyond standard CRUD applications and instead highlight **how complex logic and state relationships are handled in scalable systems**.

---

📌 Status

Actively in development — current version demonstrates core system architecture, with ongoing refinements focused on scalability, maintainability, and production-level polish.

---

🔗 Live Demo / Portfolio

(Coming soon)

---

📬 Contact

If you're interested in discussing the architecture or approach behind this project, feel free to reach out or connect.
