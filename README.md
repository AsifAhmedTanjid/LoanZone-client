# LoanZone - Client Side

LoanZone is a comprehensive Loan Management System designed to bridge the gap between borrowers and loan providers. This repository contains the frontend code for the application, built with React and Vite.

## 🔗 Live Website
[Visit LoanZone](https://loanzone.netlify.app/) 

## 🚀 Features

- **User Authentication**: Secure login and registration using Firebase (Email/Password, Google).
- **Role-Based Dashboards**:
  - **Borrower**: Apply for loans, view application status, make payments via Stripe, view payment history.
  - **Manager**: Review loan applications, approve/reject loans, create loan offers.
  - **Admin**: Manage users (make admin/manager), oversee system data.
- **Loan Application**: Easy-to-use form for loan requests.
- **Payment Integration**: Secure application fee payments using Stripe.
- **Email Notifications**: Contact form with email functionality using Nodemailer (via backend).
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and DaisyUI.
- **Interactive UI**: SweetAlert2 for confirmations and React Hot Toast for notifications.

## 🛠️ Technologies Used

- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **State Management & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Notifications**: [SweetAlert2](https://sweetalert2.github.io/), [React Hot Toast](https://react-hot-toast.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📦 Dependencies

```json
"dependencies": {
    "@react-icons/all-files": "^4.1.0",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.26",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.10.1",
    "react-spinners": "^0.17.0",
    "sweetalert2": "^11.26.10",
    "tailwindcss": "^4.1.17"
}
```

## 💻 Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AsifAhmedTanjid/LoanZone-client.git
    cd LoanZone-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase and API keys:
    ```env
    VITE_APIKey=your_firebase_api_key
    VITE_AuthDomain=your_firebase_auth_domain
    VITE_ProjectId=your_firebase_project_id
    VITE_StorageBucket=your_firebase_storage_bucket
    VITE_MessagingSenderId=your_firebase_messaging_sender_id
    VITE_AppId=your_firebase_app_id
    VITE_API_URL=http://localhost:3000
    VITE_Payment_Gateway_PK=your_stripe_publishable_key
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## 📄 Pages

- **Home**: Landing page with featured loans, testimonials, and FAQ.
- **All Loans**: Browse available loan packages.
- **Dashboard**: Private area for user-specific actions.
- **Contact**: Contact form to reach support.
- **Login/Register**: User authentication pages.

---
*Developed by Asif Ahmed Tanjid*
