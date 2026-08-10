# Team Division — 21 Screens

## Owner A — Auth and Profile

1. Splash
2. Onboarding
3. Login
4. Register
5. Forgot Password
6. Profile
7. Edit Profile

Owns:

- `src/screens/auth/**`
- `src/screens/profile/**`
- `src/features/auth/authSlice.ts`
- `src/services/authApi.ts`

## Owner B — Home and Games

1. Home
2. Game List
3. Search Game
4. Filter Game
5. Game Detail
6. Game Media
7. System Requirements

Owns:

- `src/screens/home/**`
- `src/screens/games/**`
- `src/features/games/gamesSlice.ts`
- `src/services/gameApi.ts`
- `src/components/GameCard.tsx`

## Owner C — Reviews

1. Community Rating
2. Review List
3. Review Detail
4. Add Review
5. Edit Review
6. Delete Review Confirmation
7. My Reviews

Owns:

- `src/screens/reviews/**`
- `src/features/reviews/reviewsSlice.ts`
- `src/services/reviewApi.ts`

## Integration lead only

Only the integration lead should normally edit:

- `App.tsx`
- `package.json`
- `package-lock.json`
- `src/navigation/**`
- `src/store/store.ts`
- `src/store/hooks.ts`
- `src/theme/**`
- `docs/API_CONTRACT.md`

When another member needs a new route, they send:

```text
Screen: AddReviewScreen
Route: AddReview
Params: { gameId: number }
```

The integration lead adds it to navigation.
