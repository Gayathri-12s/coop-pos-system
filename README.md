# COOP Supermarket POS System

## Overview

COOP Supermarket POS System is a full-stack Point of Sale (POS) application developed to streamline supermarket cashier operations. The system enables users to securely log in, search products, manage a shopping cart, process sales transactions, calculate VAT automatically, generate receipts, and maintain sales records.

The project was built using React for the frontend, Django REST Framework for backend APIs, and MySQL as the database.

---

## Features

### Authentication

* Secure user login using JWT Authentication
* Protected API endpoints
* Token-based authorization for sales operations

### Product Management

* Display available products
* Product search functionality
* Category-based product filtering
* Real-time stock visibility

### Shopping Cart

* Add products to cart
* Increase product quantity
* Decrease product quantity
* Remove products from cart
* Automatic cart total calculation

### Sales Processing

* Cash and Card payment methods
* Automatic VAT (5%) calculation
* Grand total calculation
* Receipt generation after successful checkout

### Inventory Management

* Stock quantity updates after sales
* Prevents inaccurate inventory records

### Sales Tracking

* Sales history page
* Transaction records stored in database
* Unique sale identification

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Bootstrap 5

### Backend

* Django
* Django REST Framework
* Simple JWT

### Database

* MySQL

### Development Tools

* Git
* GitHub
* VS Code

---

## Database Design

### Product

Stores product information.

Fields:

* Product Name
* Category
* Price
* Stock Quantity

### Sale

Stores completed transaction information.

Fields:

* Sale ID
* Cashier
* Payment Method
* Date and Time
* Total Amount

### SaleItem

Stores products associated with each sale.

Fields:

* Sale
* Product
* Quantity
* Price

Relationship:

Product → SaleItem ← Sale

Sale → SaleItem

---

## Application Workflow

1. User logs into the system.
2. Products are fetched from the backend API.
3. Cashier searches or filters products.
4. Products are added to the shopping cart.
5. Quantity can be adjusted in the cart.
6. VAT is automatically calculated.
7. User selects payment method.
8. Checkout request is sent to the backend.
9. Sale record is created.
10. Inventory is updated.
11. Receipt is displayed.
12. Sale appears in sales history.

---

## Screenshots

Add screenshots of:

* Login Page
* POS Dashboard
* Shopping Cart
* Receipt Screen
* Sales History

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Gayathri-12s/coop-pos-system.git
cd coop-pos-system
```

### Backend Setup

```bash
python -m venv venv
```

Activate virtual environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start backend server:

```bash
python manage.py runserver
```

### Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

POST

```text
/api/token/
```

### Products

GET

```text
/api/products/
```

### Create Sale

POST

```text
/api/sales/create/
```

### Sales History

GET

```text
/ api/sales/
```

---

## Key Learning Outcomes

* React State Management using useState
* React Lifecycle using useEffect
* REST API Development with Django REST Framework
* JWT Authentication Implementation
* MySQL Database Design
* Inventory Management Logic
* Full-Stack Application Development
* Bootstrap UI Design
* Git and GitHub Version Control

---

## Future Improvements

* Multi-cashier support
* Product image uploads
* Printable receipts
* Dashboard analytics
* Barcode scanner integration
* Role-based access control

---

## Author

Gayathri S Nair

Electronics and Communication Engineering Graduate

Aspiring Full-Stack Developer
