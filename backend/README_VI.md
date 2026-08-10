# GameWorth API – Milestone 1

Project này đã có:

- Kết nối MySQL.
- Entity `Game`.
- `GameRepository`.
- `GameService`.
- `GameController`.
- `GET /api/games`.
- `GET /api/games/{id}`.
- SQL tạo bảng và ba game mẫu.
- Postman collection.

## 1. Chuẩn bị database

Mở MySQL Workbench và chạy:

`database/schema.sql`

Kiểm tra:

```sql
USE gameworth;
SELECT * FROM games;
```

## 2. Sửa mật khẩu MySQL

Mở:

`src/main/resources/application.properties`

Thay:

```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

bằng mật khẩu MySQL thật.

Nếu tài khoản MySQL không phải `root`, sửa luôn:

```properties
spring.datasource.username=root
```

## 3. Chạy backend

Mở terminal tại thư mục project:

```bat
mvnw.cmd spring-boot:run
```

Nếu project chưa có Maven Wrapper, dùng:

```bat
mvn spring-boot:run
```

Hoặc mở bằng IntelliJ rồi chạy `GameWorthApiApplication`.

## 4. Test

Mở trình duyệt:

- http://localhost:8080/api/games
- http://localhost:8080/api/games/1

Kết quả phải là JSON.

## 5. Lưu ý Android Emulator

Sau này mobile không dùng `localhost` để gọi backend trên máy tính.

Android Emulator sẽ dùng:

`http://10.0.2.2:8080/api`
