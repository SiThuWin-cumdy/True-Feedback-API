#!/bin/bash
# ============================================================================
# DUMMY CURL SAMPLES - Updatable
# TrueFeedback API
# ============================================================================
# Replace placeholder values (YOUR_TOKEN, YOUR_LINK_ID, etc.) with real data.
# Server: http://localhost:5000
# ============================================================================

BASE_URL="http://localhost:5000"

# ----------------------------------------------------------------------------
# FEATURE: AUTHENTICATION
# ----------------------------------------------------------------------------

# --- Register a new user ---
curl -X POST "${BASE_URL}/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "YOUR_USERNAME",
    "email": "YOUR_EMAIL@example.com",
    "password": "YOUR_PASSWORD"
  }'

echo ""

# --- Login user ---
curl -X POST "${BASE_URL}/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "YOUR_EMAIL@example.com",
    "password": "YOUR_PASSWORD"
  }'

echo ""

# --- Get current user profile (Protected) ---
curl -X GET "${BASE_URL}/api/v1/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

echo ""

# ----------------------------------------------------------------------------
# FEATURE: FEEDBACK LINKS (Owner only)
# ----------------------------------------------------------------------------

# --- Create a new feedback link (inactive by default) ---
curl -X POST "${BASE_URL}/api/v1/feedback-links" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "YOUR_LINK_TITLE",
    "description": "YOUR_LINK_DESCRIPTION",
    "slug": "YOUR_UNIQUE_SLUG"
  }'

echo ""

# --- Get all active feedback links ---
curl -X GET "${BASE_URL}/api/v1/feedback-links/active" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

echo ""

# --- Get all inactive feedback links ---
curl -X GET "${BASE_URL}/api/v1/feedback-links/inactive" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

echo ""

# --- Get a single feedback link by ID ---
curl -X GET "${BASE_URL}/api/v1/feedback-links/YOUR_LINK_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

echo ""

# --- Activate a feedback link (makes it replyable) ---
curl -X PATCH "${BASE_URL}/api/v1/feedback-links/YOUR_LINK_ID/activate" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

echo ""

# --- Deactivate a feedback link (stops accepting replies) ---
curl -X PATCH "${BASE_URL}/api/v1/feedback-links/YOUR_LINK_ID/deactivate" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"

echo ""

# ----------------------------------------------------------------------------
# FEATURE: FEEDBACK REPLIES (Public - only on active links)
# ----------------------------------------------------------------------------

# --- Create a reply for a feedback link ---
# user field is optional (anonymous replies allowed)
curl -X POST "${BASE_URL}/api/v1/feedback-links/YOUR_LINK_ID/replies" \
  -H "Content-Type: application/json" \
  -d '{
    "user": "YOUR_USER_ID_OR_NULL",
    "message": "YOUR_REPLY_MESSAGE"
  }'

echo ""

# ============================================================================
# END OF DUMMY CURL SAMPLES
# ============================================================================