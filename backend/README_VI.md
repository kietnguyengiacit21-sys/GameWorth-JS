# GameWorth Backend - Node.js

Backend này thay Spring Boot bằng:

- Node.js
- Express
- MySQL (`mysql2/promise`)
- JWT
- bcryptjs

Port vẫn là **8080**, nên React Native Android Emulator vẫn gọi:

```text
http://10.0.2.2:8080/api
```

## 1. Cài package

```powershell
cd C:\GW\GameWorth\backend
npm install
```

## 2. Tạo `.env`

```powershell
Copy-Item .env.example .env
```

Mở `.env` và sửa:

```env
DB_PASSWORD=MAT_KHAU_MYSQL_CUA_BAN
JWT_SECRET=mot_chuoi_bi_mat_dai
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=email-cua-ban@example.com
SMTP_PASSWORD=mat-khau-ung-dung
MAIL_FROM=GameWorth <email-cua-ban@example.com>
```

Nếu chưa cấu hình SMTP trong môi trường development, mã xác thực sẽ được in
trong log backend và trả thêm ở field `verificationCode` để test trên mobile.
Production cần cấu hình đầy đủ SMTP; mã không được trả về trong response.

## 3. Tạo / cập nhật database

Mở MySQL Workbench rồi chạy:

```text
backend/database/schema.sql
```

Script dùng `CREATE TABLE IF NOT EXISTS`, nên bảng `games` hiện tại không bị xóa.

## 4. Chạy backend

```powershell
npm run dev
```

hoặc:

```powershell
npm start
```

## 5. Test nhanh

Browser:

```text
http://localhost:8080/api/health
http://localhost:8080/api/games
http://localhost:8080/api/games/1
```

## API chính

### Games

```text
GET /api/games
GET /api/games/:id
```

### Auth

```text
POST /api/auth/register
POST /api/auth/verify-register
POST /api/auth/login
```

Register body:

```json
{
  "username": "kiet",
  "email": "kiet@example.com",
  "password": "123456",
  "displayName": "Kiet"
}
```

`username` có thể bỏ.

`POST /api/auth/register` chỉ tạo yêu cầu đăng ký và gửi mã 6 chữ số qua email.
Sau đó gọi `POST /api/auth/verify-register`:

```json
{
  "email": "kiet@example.com",
  "code": "123456"
}
```

Xác nhận thành công sẽ trả response đăng nhập gồm `token` và `user`. Mã có
hiệu lực trong 10 phút.

Login chấp nhận `email`, `username`, hoặc `identifier`.

```json
{
  "email": "kiet@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "...",
  "user": {
    "id": 1,
    "username": "kiet",
    "email": "kiet@example.com",
    "displayName": "Kiet"
  }
}
```

### Profile

Cần header:

```text
Authorization: Bearer <token>
```

```text
GET /api/users/me
PUT /api/users/me
```

### Reviews

Đọc review không cần login:

```text
GET /api/games/:gameId/reviews
GET /api/reviews/:id
```

Create/update/delete cần Bearer token:

```text
POST /api/games/:gameId/reviews
PUT /api/reviews/:id
DELETE /api/reviews/:id
GET /api/users/me/reviews
```

Review body:

```json
{
  "rating": 5,
  "verdict": "WORTH_IT",
  "comment": "Great game"
}
```

`rating`: 1 đến 5.

`verdict`:

```text
WORTH_IT
NOT_WORTH_IT
```

## Lưu ý mobile

`GET /api/games` và `GET /api/games/:id` trả field camelCase giống Spring Boot cũ:

```text
releaseDate
coverImageUrl
trailerUrl
minimumRequirements
recommendedRequirements
createdAt
updatedAt
```

Vì vậy phần Games hiện tại không cần đổi URL hay field.

Các API profile/review cần JWT. Khi làm Auth, mobile phải gắn:

```text
Authorization: Bearer <token>
```

vào request protected.
