# Soshbru - Productivity App

## Overview
**Soshbru** is a **productivity-focused** app designed for **remote professionals, freelancers, and digital nomads** to discover efficient workspaces, boost focus, and enhance networking. The app provides curated cafe listings, WiFi strength, ambiance ratings, and an interactive networking system to connect with other professionals.




## App Flow & Features

### 1. User Onboarding
- **Welcome Screen:** Highlights the core benefits of the app.
- **Signup/Login:**
  - OAuth options (Google, Apple, LinkedIn).
  - Email/password authentication.
- **User Preferences:**
  - Work environment (Quiet, Social, Lively).
  - WiFi speed requirement (Basic, High-Speed, Ultra-Fast).
  - Preferred distance (5km, 10km, 20km).
  - Amenities (Outdoor seating, charging ports, food availability).
  - Networking visibility toggle.

### 2. Home Dashboard
- **Search & Discovery:**
  - Search cafes by name, location, or features.
  - Dynamic suggestions based on user preferences and trends.
  - "🎲 Spin the Wheel" gamification for random cafe selection.
- **Quick Filters:**
  - WiFi Strength.
  - Noise Level.
  - Distance.
  - User Ratings.

### 3. Cafe Listings & Details
- **View Options:** List View & Interactive Map View.
- **Cafe Profile Includes:**
  - Name, images, and user reviews.
  - WiFi speed indicator.
  - Seating capacity and footfall indicator.
  - Work vibe (Quiet, Moderate, Social).
  - Special offers or work-friendly discounts.
  - User check-ins (people currently working there).

### 4. Networking & Community
- **"Who's Here?" Feature:**
  - Displays users currently working at a cafe (if visibility is enabled).
  - Optional LinkedIn/GitHub profile integration.
- **Meet-Up Requests:**
  - "👋 Meet Me" gesture for networking.
  - Accept/Decline functionality with in-app messaging.
- **User Activity Feed:**
  - Share updates (e.g., "Working on a new project at Brew Haven ☕").
  - Comment, like, and interact with posts.

### 5. User Profile & Preferences
- **Profile Customization:**
  - Name, designation, and bio.
  - Work preferences & favorite cafes.
  - Toggle for networking visibility.
- **Edit preferences anytime.**

### 6. Notifications & Engagement
- **Push Notifications:**
  - New work-friendly cafe recommendations.
  - Nearby user meet-up invitations.
  - Exclusive cafe deals.
- **Email & In-App Alerts** for user interactions and reminders.

### 7. Monetization Strategy
- **Freemium Model:**
  - Free access to basic features.
  - Premium features: Advanced filtering, AI-based suggestions, networking perks.
- **Cafe Partnerships:**
  - Paid listings & promoted cafes.
- **Affiliate Marketing:**
  - Collaborate with brands for remote work essentials.
- **In-App Ads:**
  - Non-intrusive ads for productivity tools & coworking spaces.
- **Event Hosting:**
  - Paid community meetups and skill-sharing sessions.

### 8. Tech Stack
- **Frontend:**  React Native + Zustand (state management) with TypeScript, Expo, and Expo Router ,React Hook Form.
- **Backend/Database:** Supabase.
- **UI Framework:** gluestack-ui.
- **APIs:** Google Places API, WebRTC (real-time networking).
- **Authentication:** Firebase Auth / OAuth.

### 9. Development Roadmap
#### **Phase 1 - MVP (3 Months)**
1. UI/UX Design & Wireframing.
2. Core features: Onboarding, Cafe Listings, User Profiles.
3. Gamified Cafe Selection & Basic Networking.
4. Beta Testing & Feedback Iterations.

#### **Phase 2 - Scaling & Growth (3-6 Months)**
1. Monetization Strategy Implementation.
2. AI-driven Cafe Recommendations.
3. Expansion to Multiple Cities.
4. Community Events & In-App Social Features.

### 10. Next Steps
1. **Finalize Branding** (App name, Logo, UI theme).
2. **Develop Wireframes & Prototypes.**
3. **MVP Development & Testing.**
4. **Marketing & Beta Launch.**
5. **Scale & Iterate Based on Feedback.**

🚀 **Let's build the future of remote work!**

### 11. Database Schema

#### Users Table
```sql
users (
  id: uuid PRIMARY KEY,
  email: text UNIQUE NOT NULL,
  full_name: text NOT NULL,
  avatar_url: text,
  designation: text,
  bio: text,
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now(),
  preferences: jsonb DEFAULT '{}',
  visibility: boolean DEFAULT true,
  linkedin_url: text,
  github_url: text,
  is_premium: boolean DEFAULT false
)
```

#### Cafes Table
```sql
cafes (
  id: uuid PRIMARY KEY,
  name: text NOT NULL,
  description: text,
  address: text NOT NULL,
  latitude: float8 NOT NULL,
  longitude: float8 NOT NULL,
  wifi_speed: int, -- in Mbps
  noise_level: text CHECK (noise_level IN ('quiet', 'moderate', 'social')),
  seating_capacity: int,
  images: text[],
  amenities: text[],
  opening_hours: jsonb,
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now(),
  is_verified: boolean DEFAULT false,
  average_rating: float4 DEFAULT 0,
  current_occupancy: int DEFAULT 0
)
```

#### Reviews Table
```sql
reviews (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  cafe_id: uuid REFERENCES cafes(id),
  rating: int CHECK (rating >= 1 AND rating <= 5),
  content: text,
  images: text[],
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, cafe_id)
)
```

#### Check-ins Table
```sql
check_ins (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  cafe_id: uuid REFERENCES cafes(id),
  check_in_time: timestamp with time zone DEFAULT now(),
  check_out_time: timestamp with time zone,
  status: text CHECK (status IN ('active', 'completed', 'cancelled'))
)
```

#### Meet-up Requests Table
```sql
meetup_requests (
  id: uuid PRIMARY KEY,
  sender_id: uuid REFERENCES users(id),
  receiver_id: uuid REFERENCES users(id),
  cafe_id: uuid REFERENCES cafes(id),
  status: text CHECK (status IN ('pending', 'accepted', 'declined')),
  message: text,
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now()
)
```

#### Posts Table
```sql
posts (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  cafe_id: uuid REFERENCES cafes(id),
  content: text NOT NULL,
  images: text[],
  created_at: timestamp with time zone DEFAULT now(),
  updated_at: timestamp with time zone DEFAULT now()
)
```

#### Post Interactions Table
```sql
post_interactions (
  id: uuid PRIMARY KEY,
  post_id: uuid REFERENCES posts(id),
  user_id: uuid REFERENCES users(id),
  type: text CHECK (type IN ('like', 'comment')),
  comment_content: text,
  created_at: timestamp with time zone DEFAULT now()
)
```

### 12. Folder Structure

```
src/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/            # Main app tabs
│   │   ├── home/          # Home tab and its screens
│   │   ├── discover/      # Discover tab and its screens
│   │   ├── checkin/       # Check-in tab and its screens
│   │   ├── community/     # Community tab and its screens
│   │   └── profile/       # Profile tab and its screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   ├── forms/            # Form-related components
│   ├── cards/            # Card components
│   └── modals/           # Modal components
├── constants/            # App constants and configuration
│   ├── colors.ts
│   ├── theme.ts
│   └── config.ts
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useCafe.ts
│   └── useLocation.ts
├── services/           # API and external services
│   ├── api/
│   ├── supabase/
│   └── maps/
├── stores/            # Zustand stores
│   ├── authStore.ts
│   ├── cafeStore.ts
│   └── userStore.ts
├── types/            # TypeScript type definitions
│   ├── cafe.ts
│   ├── user.ts
│   └── api.ts
├── utils/           # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── helpers.ts
└── assets/         # Static assets
    ├── images/
    ├── fonts/
    └── icons/
```

