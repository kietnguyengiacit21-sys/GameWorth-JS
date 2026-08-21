# GameWorth API Contract

This file is the agreement between the React Native team and the
Spring Boot backend team. Do not silently rename fields or routes.

## Authentication

### POST `/api/auth/register`

Request:

```json
{
  "username": "minh",
  "email": "minh@example.com",
  "password": "123456",
  "displayName": "Minh Nguyen"
}
```

Response (mã được gửi tới email, tài khoản chưa được tạo):

```json
{
  "message": "Verification code sent to your email",
  "email": "minh@example.com"
}
```

### POST `/api/auth/verify-register`

Request:

```json
{
  "email": "minh@example.com",
  "code": "123456"
}
```

Response:

```json
{
  "token": "jwt-or-demo-token",
  "user": {
    "id": 1,
    "username": "minh",
    "email": "minh@example.com",
    "displayName": "Minh Nguyen",
    "avatarUrl": null
  }
}
```

### POST `/api/auth/login`

Request:

```json
{
  "email": "minh@example.com",
  "password": "123456"
}
```

Response: same shape as `verify-register`.

## User

- `GET /api/users/me`
- `PUT /api/users/me`

## Games

- `GET /api/games`
- `GET /api/games/{id}`

Expected game fields:

```json
{
  "id": 1,
  "title": "Persona 5 Royal",
  "description": "...",
  "developer": "Atlus",
  "publisher": "SEGA",
  "genre": "JRPG",
  "platform": "PC, PlayStation, Xbox, Switch",
  "releaseDate": "2019-10-31",
  "price": 59.99,
  "coverImageUrl": null,
  "trailerUrl": null,
  "minimumRequirements": "...",
  "recommendedRequirements": "...",
  "averageRating": 4.8,
  "reviewCount": 120,
  "worthItPercentage": 94,
  "createdAt": "2026-08-01T08:00:00",
  "updatedAt": "2026-08-05T08:00:00"
}
```

## Reviews

- `GET /api/games/{gameId}/reviews`
- `POST /api/games/{gameId}/reviews`
- `GET /api/reviews/{id}`
- `PUT /api/reviews/{id}`
- `DELETE /api/reviews/{id}`
- `GET /api/users/me/reviews`

Review request:

```json
{
  "rating": 5,
  "verdict": "WORTH_IT",
  "comment": "Great combat and music."
}
```

Review response:

```json
{
  "id": 10,
  "userId": 1,
  "gameId": 2,
  "rating": 5,
  "verdict": "WORTH_IT",
  "comment": "Great combat and music.",
  "createdAt": "2026-08-05T10:00:00",
  "updatedAt": null
}
```
