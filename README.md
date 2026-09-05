# AiFi SMM V2.0

Modern SaaS-style SMM panel built with React.js.

AiFi SMM V2.0 includes a public landing page, authentication, user dashboard, new-order workflow, orders management, services, funds, transactions, API access, tickets, affiliates, and account settings.

---

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Node.js / Express.js backend
- MongoDB
- JWT Authentication

---

## Project Structure

```text
aifi-smm-v2/
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│       ├── hero-dashboard.png
│       ├── testimonials/
│       └── platforms/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Tabs.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── MobileSidebar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── PageHeader.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── NotificationPanel.jsx
│   │   │   └── UserMenu.jsx
│   │   │
│   │   └── charts/
│   │       ├── MiniChart.jsx
│   │       ├── RevenueChart.jsx
│   │       └── OrdersChart.jsx
│   │
│   ├── features/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── WelcomeHeader.jsx
│   │   │   │   ├── StatsGrid.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── RecentOrders.jsx
│   │   │   │   ├── PopularServices.jsx
│   │   │   │   └── DashboardOverview.jsx
│   │   │   └── dashboardData.js
│   │   │
│   │   ├── new-order/
│   │   │   ├── components/
│   │   │   │   ├── OrderWizard.jsx
│   │   │   │   ├── steps/
│   │   │   │   │   ├── ServiceTypeStep.jsx
│   │   │   │   │   ├── PlatformStep.jsx
│   │   │   │   │   ├── ServiceStep.jsx
│   │   │   │   │   ├── OrderDetailsStep.jsx
│   │   │   │   │   └── ReceiptStep.jsx
│   │   │   │   ├── ServiceTypeCard.jsx
│   │   │   │   ├── PlatformCard.jsx
│   │   │   │   ├── ServiceCard.jsx
│   │   │   │   ├── ServiceInfo.jsx
│   │   │   │   ├── QuantityInput.jsx
│   │   │   │   ├── OrderSummary.jsx
│   │   │   │   ├── PriceCalculator.jsx
│   │   │   │   └── OrderSuccess.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useOrderWizard.js
│   │   │   ├── orderTypes.js
│   │   │   └── orderHelpers.js
│   │   │
│   │   ├── orders/
│   │   │   ├── components/
│   │   │   │   ├── OrdersTable.jsx
│   │   │   │   ├── OrderRow.jsx
│   │   │   │   ├── OrderFilters.jsx
│   │   │   │   ├── OrderSearch.jsx
│   │   │   │   ├── OrderStatusBadge.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── OrderTimeline.jsx
│   │   │   │   └── OrderStats.jsx
│   │   │   └── orderHelpers.js
│   │   │
│   │   ├── services/
│   │   │   ├── components/
│   │   │   │   ├── ServicesTable.jsx
│   │   │   │   ├── ServiceCard.jsx
│   │   │   │   ├── ServiceFilters.jsx
│   │   │   │   ├── PlatformFilter.jsx
│   │   │   │   └── ServiceDetails.jsx
│   │   │   └── serviceHelpers.js
│   │   │
│   │   ├── funds/
│   │   │   ├── components/
│   │   │   │   ├── BalanceCard.jsx
│   │   │   │   ├── AddFunds.jsx
│   │   │   ├── PaymentMethods.jsx
│   │   │   ├── PaymentMethodCard.jsx
│   │   │   └── PaymentInstructions.jsx
│   │   │   └── paymentMethods.js
│   │   │
│   │   ├── transactions/
│   │   │   ├── components/
│   │   │   │   ├── TransactionsTable.jsx
│   │   │   │   ├── TransactionRow.jsx
│   │   │   │   ├── TransactionFilters.jsx
│   │   │   │   └── TransactionStatus.jsx
│   │   │   └── transactionHelpers.js
│   │   │
│   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── ApiCredentials.jsx
│   │   │   │   ├── ApiDocumentation.jsx
│   │   │   │   ├── ApiCodeBlock.jsx
│   │   │   │   └── ApiUsage.jsx
│   │   │   └── apiEndpoints.js
│   │   │
│   │   ├── tickets/
│   │   │   ├── components/
│   │   │   │   ├── TicketList.jsx
│   │   │   │   ├── TicketCard.jsx
│   │   │   │   ├── CreateTicket.jsx
│   │   │   │   ├── TicketConversation.jsx
│   │   │   │   └── TicketStatus.jsx
│   │   │   └── ticketHelpers.js
│   │   │
│   │   ├── affiliates/
│   │   │   ├── components/
│   │   │   │   ├── AffiliateStats.jsx
│   │   │   │   ├── ReferralLink.jsx
│   │   │   │   ├── ReferralTable.jsx
│   │   │   │   └── CommissionCard.jsx
│   │   │   └── affiliateHelpers.js
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── AuthLayout.jsx
│   │   │   └── authHelpers.js
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       │   ├── ProfileSettings.jsx
│   │       │   ├── SecuritySettings.jsx
│   │       │   ├── NotificationSettings.jsx
│   │       │   └── ApiSettings.jsx
│   │       └── settingsHelpers.js
│   │
│   ├── pages/
│   │   ├── landing/
│   │   │   ├── LandingPage.jsx
│   │   │   └── sections/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Hero.jsx
│   │   │       ├── TrustedPlatforms.jsx
│   │   │       ├── StatsSection.jsx
│   │   │       ├── ServicesSection.jsx
│   │   │       ├── WhyAiFi.jsx
│   │   │       ├── HowItWorks.jsx
│   │   │       ├── Testimonials.jsx
│   │   │       ├── Pricing.jsx
│   │   │       ├── FAQ.jsx
│   │   │       ├── CTASection.jsx
│   │   │       └── LandingFooter.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   └── dashboard/
│   │       ├── Dashboard.jsx
│   │       ├── NewOrder.jsx
│   │       ├── Orders.jsx
│   │       ├── OrderDetails.jsx
│   │       ├── Services.jsx
│   │       ├── AddFunds.jsx
│   │       ├── Transactions.jsx
│   │       ├── Api.jsx
│   │       ├── Tickets.jsx
│   │       ├── TicketDetails.jsx
│   │       ├── Affiliates.jsx
│   │       └── Settings.jsx
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── UserContext.jsx
│   │   ├── OrderContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useUser.js
│   │   ├── useOrders.js
│   │   ├── useServices.js
│   │   ├── useDebounce.js
│   │   └── usePagination.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authApi.js
│   │   ├── orderApi.js
│   │   ├── serviceApi.js
│   │   ├── fundsApi.js
│   │   ├── transactionApi.js
│   │   ├── ticketApi.js
│   │   └── userApi.js
│   │
│   ├── store/
│   │   ├── index.js
│   │   ├── authStore.js
│   │   ├── userStore.js
│   │   ├── orderStore.js
│   │   └── notificationStore.js
│   │
│   ├── constants/
│   │   ├── platforms.js
│   │   ├── orderStatuses.js
│   │   ├── serviceTypes.js
│   │   ├── paymentMethods.js
│   │   ├── navigation.js
│   │   └── theme.js
│   │
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   ├── validators.js
│   │   ├── errorHandler.js
│   │   └── storage.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── globals.css
│   │   └── animations.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Application Routes

```text
/
├── /login
├── /register
├── /forgot-password
│
└── /dashboard
    ├── /dashboard
    ├── /dashboard/new-order
    ├── /dashboard/orders
    ├── /dashboard/orders/:id
    ├── /dashboard/services
    ├── /dashboard/add-funds
    ├── /dashboard/transactions
    ├── /dashboard/api
    ├── /dashboard/tickets
    ├── /dashboard/tickets/:id
    ├── /dashboard/affiliates
    └── /dashboard/settings
```

---

## Dashboard Layout

All authenticated dashboard pages share the same layout:

```text
DashboardLayout
│
├── Sidebar
│   ├── Logo
│   ├── New Order
│   ├── Dashboard
│   ├── Orders
│   ├── Services
│   ├── Add Funds
│   ├── Transactions
│   ├── API
│   ├── Tickets
│   ├── Affiliates
│   ├── Settings
│   └── Collapse
│
├── Topbar
│   ├── Breadcrumb
│   ├── Notifications
│   ├── Messages
│   └── User Menu
│
└── Main Content
    └── <Outlet />
```

---

## New Order Flow

The New Order feature is isolated as its own feature module.

### 5-Step Order Process

1. **Service Type**
   - Cheapest — No Refill
   - Guaranteed — Refill
   - Guaranteed — Refund

2. **Platform**
   - Instagram
   - TikTok
   - YouTube
   - Facebook
   - Other supported platforms

3. **Service**
   - Followers
   - Likes
   - Views
   - Comments
   - Other services

4. **Order Details**
   - Link
   - Quantity
   - Service-specific fields
   - Price calculation
   - Order summary
   - Place Order

5. **Receipt**
   - Order ID
   - Service
   - Link
   - Quantity
   - Amount
   - Status
   - Date / Time
   - Success confirmation

### New Order Architecture

```text
OrderWizard
│
├── ServiceTypeStep
├── PlatformStep
├── ServiceStep
├── OrderDetailsStep
└── ReceiptStep
```

---

## Dashboard Features

### Dashboard

The main dashboard includes:

- Welcome header
- Total Orders
- Balance
- Total Spent
- Pending Orders
- Recent Orders
- Popular Services
- Mini performance charts

### Orders

- Orders table
- Search
- Filters
- Status
- Order details
- Order timeline
- Pagination

### Services

- Service list
- Platform filtering
- Service filtering
- Service details
- Pricing
- Minimum / maximum quantity
- Refill / refund information

### Add Funds

- Current balance
- Payment methods
- Add funds
- Payment instructions
- Payment status

### Transactions

- Transaction history
- Amount
- Type
- Status
- Date
- Filters
- Pagination

### API

- API credentials
- API documentation
- API usage
- Code examples
- Available endpoints

### Tickets

- Ticket list
- Create ticket
- Ticket conversation
- Ticket status
- Support interaction

### Affiliates

- Affiliate statistics
- Referral link
- Referral history
- Commission
- Earnings

### Settings

- Profile settings
- Security
- Notifications
- API settings

---

## Landing Page

The public landing page is separated from the dashboard.

```text
LandingPage
│
├── Navbar
├── Hero
├── TrustedPlatforms
├── StatsSection
├── ServicesSection
├── WhyAiFi
├── HowItWorks
├── Testimonials
├── Pricing
├── FAQ
├── CTASection
└── LandingFooter
```

The landing page follows the AiFi SMM SaaS design language with:

- Orange primary color
- White / light-gray surfaces
- Rounded cards
- Soft shadows
- Modern typography
- Responsive layouts
- SaaS-style dashboard previews
- Clear calls-to-action

---

## Theme

Keep all major theme values centralized instead of hardcoding colors throughout components.

Example:

```js
export const theme = {
  primary: "#FF5A00",
  primaryHover: "#E94F00",

  background: "#F8F9FB",
  surface: "#FFFFFF",

  text: "#111827",
  muted: "#6B7280",

  border: "#E5E7EB",

  success: "#16A34A",
  danger: "#EF4444",
  info: "#2563EB",
};
```

The exact theme values can be adjusted globally without modifying individual components.

---

## API Architecture

Frontend API communication is centralized inside:

```text
src/services/
├── api.js
├── authApi.js
├── orderApi.js
├── serviceApi.js
├── fundsApi.js
├── transactionApi.js
├── ticketApi.js
└── userApi.js
```

Example architecture:

```text
React Frontend
      │
      ▼
Axios API Layer
      │
      ▼
Node.js / Express API
      │
      ▼
MongoDB
```

Authentication uses JWT tokens.

---

## State Management

Global state can be organized into:

```text
store/
├── authStore.js
├── userStore.js
├── orderStore.js
└── notificationStore.js
```

Context modules are available for shared application state:

```text
context/
├── AuthContext.jsx
├── UserContext.jsx
├── OrderContext.jsx
└── ThemeContext.jsx
```

---

## Reusable Components

Common reusable UI components live inside:

```text
components/ui/
```

Examples:

- Button
- Input
- Select
- Modal
- Badge
- Dropdown
- Tabs
- Pagination
- Skeleton
- Empty State

This prevents duplicate UI implementations across features.

---

## Utility Functions

Common helper functions are stored in:

```text
src/utils/
```

Available utilities include:

- Currency formatting
- Date formatting
- Form validation
- API error handling
- Local storage helpers

---

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Keep `.env` out of version control and provide `.env.example` for the required variables.

---

## Installation

Clone the project and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Recommended Development Order

Build the project in this order:

1. Project setup
2. Global theme
3. UI components
4. Dashboard layout
5. Sidebar + Topbar
6. Authentication
7. Dashboard
8. New Order workflow
9. Orders
10. Services
11. Add Funds
12. Transactions
13. API
14. Tickets
15. Affiliates
16. Settings
17. Landing Page
18. Responsive/mobile optimization
19. API integration
20. Production deployment

---

## Design Principles

AiFi SMM V2.0 should follow these principles:

- Modern SaaS UI
- Clean whitespace
- Consistent spacing
- Reusable components
- Responsive design
- Accessible interactions
- Centralized theme
- Feature-based architecture
- Minimal duplication
- Scalable API architecture
- Clear user feedback
- Fast and lightweight interface

---

## License

Copyright © AiFi SMM. All rights reserved.
