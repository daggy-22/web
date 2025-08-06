# User Authentication Guide

## Overview

The Kifiya DFC Portal provides a comprehensive authentication system with multiple user flows including login, registration, and onboarding processes.

## Authentication Flows

### 1. User Login

**Location**: `/login`

**Process**:

1. Navigate to the login page
2. Enter your mobile number
3. Receive OTP via SMS
4. Enter the OTP code
5. Complete authentication

**Features**:

- Mobile number validation
- OTP-based authentication
- Session management
- Automatic token storage

**Error Handling**:

- Invalid mobile number format
- OTP expiration (5 minutes)
- Maximum OTP attempts (3)
- Network connectivity issues

### 2. User Registration

**Location**: `/register`

**Process**:

1. Enter personal information
2. Provide national ID details
3. Upload ID document
4. Complete verification
5. Set up account credentials

**Required Information**:

- Full name (First, Middle, Last)
- Date of birth
- Gender
- National ID number
- Mobile number
- ID document upload

**Validation Rules**:

- Minimum age: 18 years
- Valid Ethiopian national ID format
- Mobile number must be Ethiopian format
- ID document must be clear and readable

### 3. Onboarding Process

**Location**: `/onboarding/get-started`

**Multi-Step Process**:

#### Step 1: Profile Picture Upload

- Upload a clear profile photo
- Photo must be in JPG/PNG format
- Maximum file size: 5MB
- Photo will be used for account verification

#### Step 2: Personal Information

- Complete personal details
- Verify national ID information
- Confirm contact details

#### Step 3: Address Information

- Select region from dropdown
- Choose zone (auto-populated based on region)
- Select woreda (auto-populated based on zone)
- Choose kebele (auto-populated based on woreda)

#### Step 4: Employment Information

- Select income source (Employee/Business Owner)
- Provide employment details
- Upload supporting documents if required

#### Step 5: Business Information (if applicable)

- Select business sector
- Choose line of business
- Provide business registration details

#### Step 6: Document Upload

- Upload required documents
- Verify document authenticity
- Submit for approval

## Session Management

### Token Storage

- Access tokens stored securely
- Automatic token refresh
- Session timeout handling

### Security Features

- HTTPS encryption
- Token-based authentication
- Secure document upload
- Input validation and sanitization

## Troubleshooting

### Common Issues

**Login Problems**:

- Check mobile number format
- Ensure network connectivity
- Wait for OTP delivery
- Verify OTP code carefully

**Registration Issues**:

- Ensure all required fields are completed
- Check document upload quality
- Verify ID number format
- Confirm age requirements

**Onboarding Problems**:

- Complete all steps in order
- Upload clear documents
- Provide accurate address information
- Wait for system processing

### Support Contact

For authentication issues, contact support through the chatbot or email support@kifiya.com

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/verify-otp` - OTP verification
- `PUT /auth/refresh-token` - Token refresh

### Profile Management

- `GET /customer/profile` - Get user profile
- `PUT /customer/update-profile` - Update profile
- `POST /customer/upload-documents` - Upload documents
