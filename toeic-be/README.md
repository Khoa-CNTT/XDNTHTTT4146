1. Thư mục assets: sử dụng chứa các tài nguyên như hình ảnh, âm thanh, video, v.v.
2. Thư mục config: sử dụng để cấu hình cho back end
3. Thư mục middlewares: sử dụng để tạo các middleware

- Xác thực, phân quyền, xử lý lỗi

4. Thư mục resolvers: sử dụng để tạo các resolver xử lý logic GraphQL

- Sử dụng thư viện graphql-tag để tạo các query & mutation

5. Thư mục schema: Chứa các schema cho GraphQL, giúp định nghĩa cấu trúc dữ liệu và API endpoint.
6. Thư mục models: Chứa các model của MySQL (dùng Sequelize) và MongoDB (dùng Mongoose) - Định nghĩa database models
7. Thư mục routes: sử dụng để tạo các route - ĐỊnh tuyến cho API
8. Thư mục services: sử dụng để tạo các service - Xử lý logic nghiệp vụ (Business Logic Layer)
9. Thư mục utils: sử dụng để tạo các utility function
10. Thư mục seeders: sử dụng để tạo các seeder - tạo dữ liệu ban đầu cho database
11. Thư mục migrations: sử dụng để tạo các migration - tạo bảng database
12. Thư mục tests: sử dụng để tạo các test - kiểm tra chức năng của ứng dụng
