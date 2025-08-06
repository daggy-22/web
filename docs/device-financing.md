# Device Financing Guide

## Overview

The device financing feature allows users to purchase devices through flexible payment plans with credit assessment and merchant selection.

## Financing Process Flow

### 1. Device Selection

**Location**: `/products`

**Process**:

1. Browse available devices
2. Filter by brand, price, or features
3. View device specifications
4. Select desired device
5. Add to financing cart

**Available Device Categories**:

- Smartphones
- Tablets
- Laptops
- Accessories

**Device Information Displayed**:

- Device name and model
- Price in ETB
- Specifications
- Available colors
- Stock status

### 2. Credit Assessment

**Location**: `/financing`

**Process**:

1. System automatically checks eligibility
2. Review credit limit
3. Select payment plan
4. Choose down payment amount
5. Calculate monthly payments

**Eligibility Criteria**:

- Valid user account
- Completed onboarding
- Age 18 or older
- Ethiopian resident
- Valid national ID

**Credit Assessment Factors**:

- Income verification
- Employment status
- Credit history
- Payment capacity

### 3. Payment Plan Selection

**Available Plans**:

- 3 months (25% down payment)
- 6 months (20% down payment)
- 12 months (15% down payment)
- 24 months (10% down payment)

**Payment Calculation**:

- Down payment: 10-25% of device price
- Monthly payment: Remaining amount / months
- Interest rate: 2.5% per month
- Processing fee: 500 ETB

**Example Calculation**:

- Device price: 50,000 ETB
- 12-month plan with 15% down payment
- Down payment: 7,500 ETB
- Monthly payment: 3,542 ETB
- Total cost: 50,000 + 500 = 50,500 ETB

### 4. Merchant Selection

**Location**: `/financing/merchant/search`

**Process**:

1. View nearby merchants on map
2. Search for specific merchants
3. Filter by location or services
4. Select preferred merchant
5. Schedule pickup or delivery

**Merchant Information**:

- Store name and location
- Operating hours
- Contact information
- Available services
- Customer ratings

**Map Features**:

- Interactive map view
- Merchant location markers
- Distance calculation
- Route planning

### 5. Order Confirmation

**Process**:

1. Review order details
2. Confirm payment plan
3. Verify merchant selection
4. Accept terms and conditions
5. Submit order

**Order Summary**:

- Selected device details
- Payment plan information
- Merchant information
- Total cost breakdown
- Delivery/pickup details

## Payment Methods

### Available Options

- Bank transfer
- Mobile money (CBE Birr, TeleBirr)
- Cash payment at merchant
- Credit/debit card

### Payment Schedule

- Down payment: Due immediately
- Monthly payments: Due on same date each month
- Late payment fee: 100 ETB per day

## Order Tracking

### Order Status Updates

- Order confirmed
- Payment received
- Device reserved
- Ready for pickup/delivery
- Order completed

### Notifications

- SMS notifications for status updates
- Email confirmations
- In-app notifications
- Payment reminders

## Troubleshooting

### Common Issues

**Eligibility Problems**:

- Complete onboarding process
- Verify personal information
- Check credit assessment results
- Contact support if needed

**Payment Issues**:

- Ensure sufficient funds
- Check payment method validity
- Verify transaction details
- Contact merchant for assistance

**Device Availability**:

- Check stock status
- Consider alternative models
- Contact merchant for availability
- Wait for restock notification

### Support Options

- Chat with AI assistant
- Contact merchant directly
- Call customer support
- Email support team

## API Endpoints

### Device Management

- `GET /devices` - List available devices
- `GET /devices/{id}` - Get device details
- `GET /devices/featured` - Get featured devices

### Financing

- `POST /financing/assess` - Credit assessment
- `GET /financing/plans` - Get payment plans
- `POST /financing/calculate` - Calculate payments

### Orders

- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}/status` - Update order status

### Merchants

- `GET /merchants` - List merchants
- `GET /merchants/search` - Search merchants
- `GET /merchants/{id}` - Get merchant details
