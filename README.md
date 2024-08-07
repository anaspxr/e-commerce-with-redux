# Furniture E-commerce Website 🛋️

A comprehensive e-commerce website for furniture.
- *This is a clone of my own project in which i implemented redux for state management instead of context*
## Overview

This project is an e-commerce platform where users can browse, search, and purchase various furniture items. It features:
- A modern, responsive design using React and Tailwind CSS.
- State management using Redux.
- Product management and order handling.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Product Management**: Admins can add, update, and delete products.
- **Shopping Cart**: Users can add items to their cart, view the cart, and proceed to checkout.
- **Order History**: Users can view their past orders.

## Admin Page

The project includes an admin page where admins can manage users and products. This page is currently accessible only in the local development environment using JSON Server for data handling.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **State Management**: Redux
- **Backend (Local Development)**: JSON Server
- **Data Storage (Deployed Version)**: Local Storage (Temporary)

## Future Enhancements

- **Backend Integration**: The current deployed version uses local storage. I plan to add backend functionality after learning backend development.

## Learning Points

- **React**: Building reusable components, handling state, and managing side effects.
- **Redux**: A separate clone of the project was used to learn and implement Redux for state management.
- **Tailwind CSS**: Creating a responsive and modern UI.
- **JSON Server**: Simulating a backend for local development.

 ## Getting Started

To run this project locally, in a new folder open the terminal and follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/anaspxr/e-commerce-furniture-shop
   ```

2. Navigate to frontend directory
   
   ```bash
   cd frontend
   ```
3. Run the server using following command:
   ```bash
   npm run dev
   ```
Now you should be able to open it in your browser

The product and user data are stored in json server, so
- To run the json server, you should install json-server
   ```bash
   npm install -g json-server
   ```
- Now run the json-server using following command. (make sure its running on port 3000)
   ```bash
   json-server --watch frontend/data/db.json
   ```
---

Also check out the original version of the project on GitHub where i used context for state management:
- [Context Version](https://github.com/anaspxr/e-commerce-furniture-shop)

---
