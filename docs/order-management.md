# Order Management Guide

## Overview

The order management system handles the complete lifecycle of device financing orders from creation to completion, including tracking, status updates, and customer support.

## Order Creation Process

### 1. Order Initiation

**Location**: `/financing`

**Process**:

1. Select device from catalog
2. Choose payment plan
3. Complete credit assessment
4. Select merchant
5. Confirm order details

**Required Information**:

- Device selection
- Payment plan choice
- Personal information
- Contact details
- Delivery preferences

### 2. Order Validation

**System Checks**:

- User eligibility verification
- Credit assessment results
- Device availability
- Merchant availability
- Payment method validation

**Validation Criteria**:

- Age requirement (18+)
- Valid national ID
- Completed onboarding
- Sufficient credit limit
- Active account status

### 3. Order Confirmation

**Confirmation Details**:

- Order number generation
- Payment plan summary
- Merchant information
- Delivery timeline
- Contact information

**Next Steps**:

- Complete down payment
- Schedule merchant visit
- Prepare required documents
- Review terms and conditions

## Order Status Tracking

### 1. Status Types

**Order Confirmed**:

- Order successfully created
- Payment plan activated
- Merchant notified
- Documents required

**Payment Received**:

- Down payment completed
- Payment verified
- Order processing begins
- Device reserved

**Device Reserved**:

- Device allocated to order
- Inventory updated
- Pickup scheduled
- Customer notified

**Ready for Pickup**:

- Device prepared
- Documents verified
- Merchant ready
- Customer can collect

**Order Completed**:

- Device collected
- Final payment scheduled
- Warranty activated
- Support available

### 2. Status Updates

**Real-time Updates**:

- Automatic status changes
- Email notifications
- SMS alerts
- In-app notifications
- Status page updates

**Update Triggers**:

- Payment completion
- Document verification
- Merchant actions
- System processes
- Manual updates

## Order Management Features

### 1. Order History

**Available Information**:

- Order number
- Device details
- Payment plan
- Order status
- Creation date

**History Features**:

- Search orders
- Filter by status
- Sort by date
- Export data
- Print receipts

### 2. Order Details

**Detailed View**:

- Complete order information
- Payment breakdown
- Merchant details
- Delivery information
- Support contacts

**Document Management**:

- Upload required documents
- View document status
- Download copies
- Track verification
- Update documents

### 3. Order Modifications

**Allowed Changes**:

- Contact information
- Delivery preferences
- Payment method
- Pickup location
- Appointment time

**Restricted Changes**:

- Device selection
- Payment plan
- Order amount
- Credit terms
- Merchant selection

## Payment Integration

### 1. Payment Tracking

**Payment Status**:

- Down payment status
- Monthly payment schedule
- Payment history
- Outstanding balance
- Late payment fees

**Payment Methods**:

- Mobile money
- Bank transfer
- Cash payment
- Credit/debit cards
- Automatic deductions

### 2. Payment Reminders

**Reminder Schedule**:

- 7 days before due date
- 3 days before due date
- Due date notification
- Late payment alerts
- Payment confirmation

**Communication Channels**:

- SMS notifications
- Email reminders
- In-app alerts
- Phone calls
- Push notifications

## Merchant Integration

### 1. Merchant Communication

**Order Assignment**:

- Automatic merchant assignment
- Manual merchant selection
- Merchant availability check
- Location-based assignment
- Capacity management

**Communication Flow**:

- Order notification
- Document sharing
- Status updates
- Issue resolution
- Completion confirmation

### 2. Pickup Coordination

**Scheduling Process**:

- Available time slots
- Customer preferences
- Merchant availability
- Location confirmation
- Appointment reminders

**Pickup Requirements**:

- Valid ID document
- Payment confirmation
- Order number
- Appointment confirmation
- Additional documents

## Customer Support

### 1. Support Channels

**Available Support**:

- AI chatbot assistance
- Phone support
- Email support
- In-app messaging
- Live chat

**Support Hours**:

- Monday-Friday: 8:00 AM - 6:00 PM
- Saturday: 9:00 AM - 3:00 PM
- Sunday: Closed
- Emergency: 24/7 chatbot

### 2. Common Issues

**Order Status Issues**:

- Delayed status updates
- Missing notifications
- Incorrect status
- System errors
- Manual intervention

**Payment Problems**:

- Payment not received
- Incorrect amounts
- Failed transactions
- Refund requests
- Payment plan issues

**Merchant Issues**:

- Unavailable merchant
- Scheduling conflicts
- Communication problems
- Service quality
- Location issues

## API Endpoints

### Order Management

- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}` - Update order
- `GET /orders` - List user orders

### Order Status

- `GET /orders/{id}/status` - Get order status
- `PUT /orders/{id}/status` - Update status
- `GET /orders/status/history` - Status history

### Payment Integration

- `GET /orders/{id}/payments` - Get payment info
- `POST /orders/{id}/payments` - Process payment
- `GET /orders/{id}/payment-schedule` - Payment schedule

## Troubleshooting

### Order Creation Issues

**Eligibility Problems**:

- Complete onboarding
- Verify personal information
- Check credit assessment
- Contact support
- Review requirements

**Device Availability**:

- Check stock status
- Consider alternatives
- Contact merchant
- Wait for restock
- Modify order

**Payment Issues**:

- Verify payment method
- Check account balance
- Try alternative payment
- Contact support
- Review payment plan

### Order Tracking Issues

**Status Not Updating**:

- Refresh page
- Check notifications
- Contact support
- Verify order number
- Check system status

**Missing Information**:

- Complete required fields
- Upload documents
- Verify contact details
- Update preferences
- Contact support

### Support Contact

For order issues, contact order support at orders@kifiya.com or call +251-11-123-4569
