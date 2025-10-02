---
title: Kịch Bản Sử Dụng
---

# Tài liệu Phân tích Kịch bản Sử dụng (Use Cases Analysis Document)

## VibeConnect - Các Kịch bản Sử dụng Toàn diện

---

## 1. Xác thực & Quản lý Tài khoản

### UC-01: Đăng ký Tài khoản Người dùng
**Tác nhân:** Người dùng mới (Maya/Liam)
**Điều kiện Tiên quyết:** Người dùng chưa đăng ký trước đây
**Luồng Chính:**
1. Người dùng mở ứng dụng web VibeConnect
2. Người dùng nhấp vào "Đăng ký"
3. Người dùng nhập email và mật khẩu
4. Người dùng xác nhận họ từ 16 tuổi trở lên
5. Hệ thống gửi email xác minh
6. Người dùng nhấp vào liên kết xác minh
7. Người dùng hoàn thành hồ sơ (tên người dùng, tên đầy đủ, ảnh đại diện)
8. Hệ thống tạo tài khoản và đăng nhập cho người dùng

**Luồng Thay thế:**
- 3a. Người dùng chọn "Đăng ký bằng Google/Apple"
- 3b. Hệ thống xác thực qua OAuth
- 3c. Tiếp tục đến bước 7

**Điều kiện hậu kiểm:** Tài khoản người dùng được tạo, đã đăng nhập

---

### UC-02: Thiết lập Tài khoản Giám hộ
**Tác nhân:** Phụ huynh (David/Sarah)
**Điều kiện Tiên quyết:** Phụ huynh đã đăng ký tài khoản
**Luồng Chính:**
1. Phụ huynh điều hướng đến cài đặt "Chế độ Giám hộ"
2. Phụ huynh nhấp vào "Liên kết Tài khoản Con"
3. Hệ thống tạo mã ghép nối duy nhất
4. Phụ huynh chia sẻ mã với con
5. Con nhập mã vào ứng dụng của mình
6. Hệ thống xác minh cả hai bên đều trên 18 tuổi (phụ huynh) và dưới 18 tuổi (con)
7. Con thấy thông báo "Phụ huynh [tên] của bạn muốn liên kết tài khoản"
8. Con chấp nhận hoặc từ chối
9. Nếu chấp nhận, hệ thống tạo mối quan hệ giám hộ
10. Phụ huynh có quyền truy cập vào Bảng điều khiển Giám hộ

**Luồng Thay thế:**
- 8a. Con từ chối - hệ thống thông báo cho phụ huynh, không tạo liên kết

**Điều kiện hậu kiểm:** Tài khoản phụ huynh-con được liên kết, Chế độ Giám hộ hoạt động

---

### UC-03: Đăng nhập Người dùng
**Tác nhân:** Người dùng đã đăng ký
**Điều kiện Tiên quyết:** Người dùng có tài khoản hợp lệ
**Luồng Chính:**
1. Người dùng mở ứng dụng
2. Người dùng nhập email/tên người dùng và mật khẩu
3. Hệ thống xác thực thông tin đăng nhập
4. Hệ thống tạo mã thông báo JWT
5. Người dùng được đăng nhập, chuyển hướng đến nguồn cấp dữ liệu ảnh

**Luồng Thay thế:**
- 3a. Thông tin đăng nhập không hợp lệ - hiển thị thông báo lỗi
- 2a. Người dùng nhấp vào "Quên mật khẩu" - kích hoạt luồng đặt lại mật khẩu

**Điều kiện hậu kiểm:** Người dùng được xác thực và ở trong ứng dụng

---

## 2. Chụp và Chia sẻ Ảnh

### UC-04: Chụp và Gửi Ảnh (Tính năng Cốt lõi)
**Tác nhân:** Người dùng Teen (Maya)
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập, có ít nhất 1 người bạn
**Luồng Chính:**
1. Người dùng nhấp vào biểu tượng máy ảnh trên màn hình chính
2. Trình duyệt yêu cầu quyền truy cập máy ảnh (nếu là lần đầu)
3. Người dùng cấp quyền truy cập máy ảnh
4. Luồng máy ảnh mở ở chế độ toàn màn hình
5. Người dùng căn chỉnh máy ảnh và nhấp vào nút chụp
6. Ảnh được chụp và hiển thị trong bản xem trước
7. Hệ thống tự động nén ảnh (< 2MB)
8. Hệ thống trích xuất dữ liệu EXIF (nếu bật vị trí)
9. Người dùng tùy chọn thêm chú thích (tối đa 200 ký tự)
10. Người dùng chọn vòng kết nối bạn bè để chia sẻ
11. Người dùng nhấp vào "Gửi"
12. Hệ thống mã hóa siêu dữ liệu ảnh
13. Hệ thống tải ảnh lên Supabase Storage (hiển thị tiến trình)
14. Hệ thống tạo bản ghi ảnh trong cơ sở dữ liệu
15. Hệ thống gửi thông báo thời gian thực đến tất cả bạn bè trong vòng kết nối
16. Hệ thống hiển thị xác nhận "Đã gửi ảnh!"
17. Người dùng quay lại nguồn cấp dữ liệu ảnh

**Luồng Thay thế:**
- 2a. Người dùng từ chối quyền truy cập máy ảnh - hiển thị nút "Sử dụng Tải lên Tệp"
- 2b. Người dùng chọn ảnh từ thư viện thay thế
- 13a. Tải lên thất bại (lỗi mạng) - hiển thị nút thử lại, xếp hàng cho việc thử lại nền

**Yêu cầu Hiệu suất:** Các bước 7-15 phải hoàn thành trong **< 12 giây**

**Điều kiện hậu kiểm:** Ảnh được chia sẻ với vòng kết nối bạn bè, hiển thị trên nguồn cấp dữ liệu của họ

---

### UC-05: Xem Nguồn cấp dữ liệu Ảnh
**Tác nhân:** Bất kỳ Người dùng nào
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập
**Luồng Chính:**
1. Người dùng mở ứng dụng hoặc điều hướng đến nguồn cấp dữ liệu chính
2. Hệ thống tải 20 ảnh gần đây nhất từ tất cả các vòng kết nối bạn bè
3. Hệ thống hiển thị ảnh theo thứ tự thời gian đảo ngược
4. Mỗi ảnh hiển thị:
   - Tên và ảnh đại diện của người gửi
   - Hình ảnh
   - Dấu thời gian (ví dụ: "2 giờ trước")
   - Huy hiệu vị trí (nếu bật vị trí)
   - Đồng hồ đếm ngược hết hạn
5. Người dùng cuộn xuống để xem thêm ảnh
6. Hệ thống tải 20 ảnh tiếp theo (cuộn vô hạn)

**Luồng Thay thế:**
- 2a. Chưa có ảnh nào - hiển thị trạng thái trống với thông báo "Gửi Vibe đầu tiên của bạn!"
- 6a. Người dùng đạt đến cuối ảnh - hiển thị "Bạn đã xem hết"

**Điều kiện hậu kiểm:** Người dùng thấy nguồn cấp dữ liệu ảnh được cập nhật

---

### UC-06: Xem Ảnh với Vị trí trên Bản đồ
**Tác nhân:** Bất kỳ Người dùng nào (đặc biệt là Chloe)
**Điều kiện Tiên quyết:** Người dùng đang xem ảnh đã bật vị trí
**Luồng Chính:**
1. Người dùng nhấp vào huy hiệu vị trí trên ảnh
2. Hệ thống mở cửa sổ Bản đồ Vị trí
3. Hệ thống hiển thị bản đồ Mapbox tập trung vào vị trí ảnh
4. Hệ thống hiển thị điểm đánh dấu ghim tại tọa độ chính xác
5. Hệ thống hiển thị tên vị trí (được chuyển đổi ngược từ tọa độ)
6. Hệ thống hiển thị tất cả các ảnh khác từ vòng kết nối bạn bè với vị trí trên cùng một bản đồ
7. Người dùng có thể phóng to/thu nhỏ bản đồ để khám phá
8. Người dùng nhấp vào các điểm đánh dấu ảnh khác để xem các ảnh đó
9. Người dùng đóng cửa sổ bản đồ

**Luồng Thay thế:**
- 1a. Ảnh không có vị trí - không hiển thị huy hiệu
- 6a. Người dùng đã tắt chia sẻ vị trí - chỉ hiển thị vị trí của ảnh này

**Điều kiện hậu kiểm:** Người dùng thấy ngữ cảnh địa lý của ảnh

---

### UC-07: Nhận Thông báo Ảnh Thời gian Thực
**Tác nhân:** Thành viên Vòng kết nối Bạn bè
**Điều kiện Tiên quyết:** Người dùng ở trong vòng kết nối bạn bè, đã bật thông báo
**Luồng Chính:**
1. Người dùng khác gửi ảnh đến vòng kết nối được chia sẻ
2. Hệ thống kích hoạt thông báo thời gian thực qua:
   - **Nếu ứng dụng đang mở:** Cập nhật WebSocket/Supabase Realtime
   - **Nếu ứng dụng đã đóng:** Thông báo Đẩy Web
3. Thông báo hiển thị:
   - Tên người gửi
   - Văn bản xem trước: "đã chia sẻ một Vibe mới"
   - Hình thu nhỏ nhỏ (nếu là thông báo đẩy)
4. Người dùng nhấp vào thông báo
5. Ứng dụng mở ra nguồn cấp dữ liệu ảnh với ảnh mới ở trên cùng
6. Ảnh mới có hoạt ảnh nổi bật nhẹ

**Luồng Thay thế:**
- Người dùng đã tắt thông báo - không gửi thông báo đẩy, nhưng ảnh xuất hiện trong nguồn cấp dữ liệu khi họ mở ứng dụng

**Điều kiện hậu kiểm:** Người dùng biết về ảnh mới, có thể xem ngay lập tức

---

## 3. Quản lý Vòng kết nối Bạn bè

### UC-08: Mời Bạn bè qua Mã QR
**Tác nhân:** Người dùng (Maya)
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập
**Luồng Chính:**
1. Người dùng điều hướng đến màn hình "Thêm Bạn bè"
2. Người dùng nhấp vào "Chia sẻ Mã QR"
3. Hệ thống tạo mã QR duy nhất chứa ID người dùng
4. Người dùng hiển thị mã QR cho bạn bè trực tiếp
5. Bạn bè mở ứng dụng VibeConnect
6. Bạn bè nhấp vào "Quét Mã QR"
7. Máy ảnh của bạn bè mở với máy quét QR
8. Bạn bè quét mã QR của người dùng
9. Hệ thống giải mã dữ liệu QR và tải hồ sơ người dùng
10. Bạn bè nhấp vào "Gửi Lời mời Kết bạn"
11. Hệ thống tạo yêu cầu kết bạn đang chờ xử lý
12. Người dùng nhận được thông báo "Yêu cầu kết bạn từ [tên]"
13. Người dùng xem xét hồ sơ của bạn bè
14. Người dùng nhấp vào "Chấp nhận"
15. Hệ thống tạo tình bạn hai chiều
16. Cả hai người dùng đều nhận được thông báo xác nhận
17. Cả hai người dùng hiện có thể chia sẻ ảnh với nhau

**Luồng Thay thế:**
- 14a. Người dùng nhấp vào "Từ chối" - yêu cầu bị xóa, bạn bè được thông báo

**Điều kiện hậu kiểm:** Người dùng được kết nối như bạn bè

---

### UC-09: Mời Bạn bè qua Liên kết
**Tác nhân:** Người dùng (Liam)
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập
**Luồng Chính:**
1. Người dùng điều hướng đến "Thêm Bạn bè"
2. Người dùng nhấp vào "Chia sẻ Liên kết Mời"
3. Hệ thống tạo URL mời duy nhất (ví dụ: vibeconnect.app/invite/abc123)
4. Người dùng sao chép liên kết
5. Người dùng chia sẻ liên kết qua ứng dụng nhắn tin (WhatsApp, iMessage, v.v.)
6. Bạn bè nhấp vào liên kết
7. Liên kết mở VibeConnect (hoặc cửa hàng ứng dụng nếu chưa cài đặt)
8. Bạn bè thấy bản xem trước hồ sơ của người dùng
9. Tiếp tục từ bước 10 của UC-08

**Điều kiện hậu kiểm:** Yêu cầu kết bạn được gửi qua liên kết

---

### UC-10: Tạo Vòng kết nối Bạn bè
**Tác nhân:** Người dùng
**Điều kiện Tiên quyết:** Người dùng có ít nhất 2 người bạn
**Luồng Chính:**
1. Người dùng điều hướng đến "Vòng kết nối Bạn bè"
2. Người dùng nhấp vào "Tạo Vòng kết nối Mới"
3. Người dùng nhập tên vòng kết nối (ví dụ: "Hội bạn thân", "Gia đình")
4. Người dùng chọn bạn bè để thêm vào vòng kết nối (tối đa 20)
5. Hệ thống xác thực giới hạn bạn bè không bị vượt quá
6. Người dùng nhấp vào "Tạo Vòng kết nối"
7. Hệ thống tạo vòng kết nối và thêm bạn bè đã chọn
8. Tất cả thành viên vòng kết nối nhận được thông báo
9. Người dùng hiện có thể gửi ảnh đến vòng kết nối cụ thể này

**Luồng Thay thế:**
- 5a. Người dùng cố gắng thêm > 20 người bạn - hiển thị lỗi "Giới hạn vòng kết nối là 20 thành viên"

**Điều kiện hậu kiểm:** Vòng kết nối bạn bè mới được tạo

---

### UC-11: Xóa Bạn bè
**Tác nhân:** Người dùng
**Điều kiện Tiên quyết:** Người dùng có tình bạn hiện có
**Luồng Chính:**
1. Người dùng điều hướng đến hồ sơ của bạn bè
2. Người dùng nhấp vào menu "Tùy chọn"
3. Người dùng nhấp vào "Xóa Bạn bè"
4. Hệ thống hiển thị hộp thoại xác nhận
5. Người dùng xác nhận xóa
6. Hệ thống xóa mối quan hệ bạn bè
7. Hệ thống xóa người dùng khỏi tất cả các vòng kết nối được chia sẻ
8. Cả hai người dùng không còn có thể xem ảnh mới của nhau
9. Ảnh hiện có vẫn hiển thị cho đến khi hết hạn

**Điều kiện hậu kiểm:** Tình bạn bị xóa

---

## 4. Vị trí & Quyền riêng tư

### UC-12: Bật Chia sẻ Vị trí
**Tác nhân:** Người dùng (Chloe)
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập, vị trí hiện đang bị tắt
**Luồng Chính:**
1. Người dùng điều hướng đến Cài đặt → Quyền riêng tư → Vị trí
2. Người dùng thấy "Chia sẻ Vị trí: TẮT"
3. Người dùng nhấp vào nút bật/tắt để bật
4. Hệ thống hiển thị giải thích: "Vị trí của bạn sẽ hiển thị với những người bạn mà bạn chia sẻ ảnh"
5. Người dùng xác nhận "Bật Vị trí"
6. Trình duyệt yêu cầu quyền truy cập vị trí
7. Người dùng cấp quyền ở cấp độ trình duyệt
8. Hệ thống cập nhật tùy chọn người dùng: `location_sharing_enabled = true`
9. Từ giờ trở đi, ảnh sẽ bao gồm dữ liệu vị trí

**Luồng Thay thế:**
- 7a. Người dùng từ chối quyền trình duyệt - hiển thị hướng dẫn để bật trong cài đặt trình duyệt

**Điều kiện hậu kiểm:** Chia sẻ vị trí được bật cho các ảnh trong tương lai

---

### UC-13: Xem Lịch sử Vị trí trên Bản đồ
**Tác nhân:** Người dùng (Chloe)
**Điều kiện Tiên quyết:** Người dùng đã gửi ảnh đã bật vị trí
**Luồng Chính:**
1. Người dùng điều hướng đến "Bản đồ Vị trí của Tôi"
2. Hệ thống tải tất cả ảnh của người dùng có dữ liệu vị trí
3. Hệ thống hiển thị bản đồ Mapbox với các điểm đánh dấu cho từng vị trí ảnh
4. Các điểm đánh dấu được gom nhóm khi thu nhỏ
5. Người dùng nhấp vào cụm để phóng to
6. Người dùng nhấp vào điểm đánh dấu riêng lẻ
7. Hệ thống hiển thị hình thu nhỏ ảnh và dấu thời gian
8. Người dùng có thể nhấp để xem ảnh đầy đủ
9. Người dùng có thể lọc theo phạm vi ngày
10. Người dùng có thể xuất lịch sử vị trí (tùy chọn)

**Điều kiện hậu kiểm:** Người dùng thấy lịch sử vị trí của họ

---

### UC-14: Điều chỉnh Mức độ Quyền riêng tư Vị trí
**Tác nhân:** Người dùng quan tâm đến quyền riêng tư (Liam)
**Điều kiện Tiên quyết:** Chia sẻ vị trí đã được bật
**Luồng Chính:**
1. Người dùng điều hướng đến Cài đặt → Quyền riêng tư → Vị trí
2. Người dùng thấy menu thả xuống "Độ chính xác Vị trí"
3. Người dùng chọn từ các tùy chọn:
   - "Chính xác" (tọa độ GPS chính xác)
   - "Chỉ Thành phố" (chỉ hiển thị tên thành phố)
   - "Ẩn" (tắt vị trí)
4. Người dùng chọn "Chỉ Thành phố"
5. Hệ thống cập nhật tùy chọn
6. Ảnh trong tương lai sẽ chỉ hiển thị vị trí cấp thành phố, không phải tọa độ chính xác

**Điều kiện hậu kiểm:** Độ chính xác vị trí được điều chỉnh

---

## 5. Chế độ Giám hộ & Kiểm soát của Phụ huynh

### UC-15: Đặt Giới hạn Thời gian Hàng ngày (Kịch bản của Sarah)
**Tác nhân:** Phụ huynh (Sarah)
**Điều kiện Tiên quyết:** Tài khoản giám hộ-con được liên kết
**Luồng Chính:**
1. Phụ huynh đăng nhập vào Bảng điều khiển Giám hộ
2. Phụ huynh điều hướng đến "Kiểm soát Thời gian Sử dụng Màn hình"
3. Phụ huynh thấy số liệu thống kê sử dụng hiện tại của con
4. Phụ huynh nhấp vào "Đặt Giới hạn Hàng ngày"
5. Phụ huynh chọn giới hạn: 60 phút mỗi ngày
6. Phụ huynh nhấp vào "Lưu"
7. Hệ thống lưu cài đặt giới hạn thời gian
8. Con nhận được thông báo: "Phụ huynh của bạn đã đặt giới hạn thời gian hàng ngày là 60 phút"
9. Ứng dụng của con bắt đầu theo dõi thời gian sử dụng
10. Khi con đạt 50 phút, hệ thống hiển thị cảnh báo
11. Ở 60 phút, hệ thống khóa ứng dụng trong ngày
12. Con thấy thông báo: "Đã đạt giới hạn hàng ngày. Vui lòng thử lại vào ngày mai."

**Luồng Thay thế:**
- 11a. Phụ huynh nhận được thông báo khi con đạt giới hạn

**Điều kiện hậu kiểm:** Giới hạn thời gian hàng ngày được thực thi

---

### UC-16: Lên lịch Thời gian Ngừng hoạt động (Kịch bản của David)
**Tác nhân:** Phụ huynh (David)
**Điều kiện Tiên quyết:** Tài khoản giám hộ-con được liên kết
**Luồng Chính:**
1. Phụ huynh điều hướng đến Bảng điều khiển Giám hộ → Thời gian Ngừng hoạt động
2. Phụ huynh nhấp vào "Thêm Lịch trình Thời gian Ngừng hoạt động"
3. Phụ huynh cấu hình:
   - Ngày: Thứ Hai-Thứ Sáu
   - Thời gian bắt đầu: 21:00 (9 giờ tối)
   - Thời gian kết thúc: 07:00 (7 giờ sáng)
4. Phụ huynh nhấp vào "Lưu Lịch trình"
5. Hệ thống lưu các quy tắc thời gian ngừng hoạt động
6. Con nhận được thông báo về lịch trình mới
7. Lúc 21:00, hệ thống gửi cảnh báo: "Ứng dụng sẽ khóa trong 15 phút nữa"
8. Lúc 21:15, hệ thống khóa ứng dụng
9. Con không thể truy cập ứng dụng cho đến 07:00 sáng hôm sau
10. Ứng dụng hiển thị: "Thời gian ngừng hoạt động đang hoạt động. Có sẵn lại lúc 7:00 sáng."

**Luồng Thay thế:**
- Phụ huynh có thể tạo nhiều lịch trình (ngày thường so với cuối tuần)

**Điều kiện hậu kiểm:** Lịch trình thời gian ngừng hoạt động được thực thi

---

### UC-17: Kích hoạt Cảnh báo Từ khóa (Nhu cầu Chính của David)
**Tác nhân:** Phụ huynh (David) + Con (Maya)
**Điều kiện Tiên quyết:** Chế độ Giám hộ hoạt động, cảnh báo từ khóa được bật
**Luồng Chính:**
1. Maya nhận ảnh có chú thích chứa từ khóa bị gắn cờ (ví dụ: "ghét bản thân")
2. Bộ quét từ khóa của hệ thống phát hiện cụm từ nhạy cảm
3. Hệ thống phân loại mức độ nghiêm trọng: "CAO" (lo ngại về sức khỏe tâm thần)
4. Hệ thống tạo bản ghi cảnh báo trong cơ sở dữ liệu
5. Hệ thống ngay lập tức gửi thông báo cho David:
   - Thông báo đẩy: "⚠️ Cảnh báo Từ khóa"
   - Email: "Nội dung có khả năng đáng lo ngại đã được phát hiện"
6. David mở Bảng điều khiển Giám hộ
7. David điều hướng đến "Cảnh báo Từ khóa"
8. David thấy chi tiết cảnh báo:
   - Từ khóa được kích hoạt: "ghét bản thân"
   - Ngữ cảnh: "[Tên bạn bè] đã gửi một bức ảnh với chú thích '...ghét bản thân...'"
   - Dấu thời gian
   - Mức độ nghiêm trọng: CAO
9. David nhấp vào "Xem Chi tiết"
10. Hệ thống hiển thị ngữ cảnh xung quanh (KHÔNG phải toàn bộ cuộc trò chuyện)
11. David nhấp vào "Đánh dấu là Đã xem xét"
12. David có thể chọn:
    - Nói chuyện trực tiếp với Maya
    - Bỏ qua cảnh báo
    - Liên hệ với cố vấn nhà trường
13. Hệ thống ghi lại hành động xem xét của David

**Luồng Thay thế:**
- 2a. Từ khóa có mức độ nghiêm trọng thấp (ví dụ: "trốn học") - chỉ gửi email, không gửi thông báo đẩy

**Điều kiện hậu kiểm:** Phụ huynh được cảnh báo về mối lo ngại tiềm ẩn, có thể hành động

---

### UC-18: Xem Báo cáo Hoạt động
**Tác nhân:** Phụ huynh (David/Sarah)
**Điều kiện Tiên quyết:** Chế độ Giám hộ hoạt động
**Luồng Chính:**
1. Phụ huynh điều hướng đến Bảng điều khiển Giám hộ → Báo cáo Hoạt động
2. Hệ thống hiển thị tóm tắt hàng tuần:
   - Tổng thời gian sử dụng ứng dụng: 7,5 giờ
   - Ảnh đã gửi: 42
   - Ảnh đã nhận: 56
   - Bạn bè mới được thêm: 1
   - Cảnh báo từ khóa: 0
   - Thời gian hoạt động nhiều nhất: 7-9 giờ tối
3. Phụ huynh nhấp vào "Xem Báo cáo Chi tiết"
4. Hệ thống hiển thị bảng phân tích hàng ngày với các biểu đồ
5. Phụ huynh nhấp vào "Tải xuống Báo cáo (PDF)"
6. Hệ thống tạo báo cáo PDF
7. Báo cáo tải xuống thiết bị của phụ huynh

**Điều kiện hậu kiểm:** Phụ huynh có cái nhìn rõ ràng về hoạt động của con

---

### UC-19: Con xem Nhật ký Minh bạch của Giám hộ
**Tác nhân:** Teen (Maya)
**Điều kiện Tiên quyết:** Chế độ Giám hộ hoạt động trên tài khoản
**Luồng Chính:**
1. Maya điều hướng đến Cài đặt → Chế độ Giám hộ
2. Maya thấy "Phụ huynh của bạn [David] đang giám sát tài khoản của bạn"
3. Maya nhấp vào "Xem Những gì Họ có thể Thấy"
4. Hệ thống hiển thị nhật ký minh bạch:
   - "Phụ huynh của bạn có thể thấy:"
     - ✓ Thống kê thời gian sử dụng
     - ✓ Danh sách bạn bè
     - ✓ Cảnh báo từ khóa (nếu được kích hoạt)
     - ✗ Ảnh của bạn
     - ✗ Tin nhắn/chú thích của bạn
     - ✗ Vị trí chính xác của bạn (chỉ khi bạn chia sẻ)
5. Maya nhấp vào "Nhật ký Hoạt động"
6. Hệ thống hiển thị những gì phụ huynh đã truy cập:
   - "Ngày 1 tháng 12: Đã xem báo cáo hoạt động"
   - "Ngày 3 tháng 12: Đã đặt giới hạn thời gian thành 60 phút/ngày"
   - "Ngày 5 tháng 12: Đã xem xét 1 cảnh báo từ khóa"

**Điều kiện hậu kiểm:** Teen có cái nhìn rõ ràng về việc giám sát của phụ huynh

---

## 6. Quyền riêng tư & Quản lý Dữ liệu

### UC-20: Xóa Ảnh Tự động (Nhu cầu Cốt lõi của Liam)
**Tác nhân:** Hệ thống (tự động)
**Điều kiện Tiên quyết:** Ảnh đã ở trong hệ thống được 72 giờ
**Luồng Chính:**
1. Tác vụ định kỳ nền chạy 6 giờ một lần
2. Hệ thống truy vấn cơ sở dữ liệu để tìm ảnh có `expires_at < NOW()`
3. Hệ thống tìm thấy ảnh đã hết hạn
4. Đối với mỗi ảnh đã hết hạn:
   - Hệ thống xóa tệp khỏi Supabase Storage
   - Hệ thống xóa mềm bản ghi cơ sở dữ liệu (đặt `deleted_at`)
   - Hệ thống xóa ảnh khỏi tất cả các bộ nhớ đệm (Redis)
5. Hệ thống ghi lại việc xóa trong nhật ký kiểm tra
6. Một giờ trước khi hết hạn, hệ thống gửi thông báo cho người gửi:
   - "Ảnh của bạn từ 3 ngày trước sẽ bị xóa trong 1 giờ nữa"

**Luồng Thay thế:**
- Người dùng có thể tự xóa ảnh của mình trước khi hết hạn

**Điều kiện hậu kiểm:** Ảnh được tự động xóa sau 48-72 giờ

---

### UC-21: Tải xuống Dữ liệu Cá nhân (Tuân thủ GDPR)
**Tác nhân:** Người dùng (Liam)
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập
**Luồng Chính:**
1. Người dùng điều hướng đến Cài đặt → Quyền riêng tư → Tải xuống Dữ liệu
2. Người dùng nhấp vào "Yêu cầu Dữ liệu của Tôi"
3. Hệ thống hiển thị: "Chúng tôi sẽ gửi email cho bạn một liên kết tải xuống trong vòng 24 giờ"
4. Người dùng xác nhận yêu cầu
5. Hệ thống xếp hàng tác vụ nền
6. Tác vụ biên dịch dữ liệu của người dùng:
   - Thông tin hồ sơ
   - Danh sách bạn bè
   - Siêu dữ liệu ảnh (không phải ảnh thực tế, vì chúng đã bị xóa)
   - Nhật ký hoạt động tài khoản
7. Hệ thống tạo tệp ZIP
8. Hệ thống gửi email kèm liên kết tải xuống an toàn (hết hạn sau 7 ngày)
9. Người dùng nhấp vào liên kết và tải xuống ZIP

**Điều kiện hậu kiểm:** Người dùng nhận được bản sao dữ liệu cá nhân

---

### UC-22: Xóa Tài khoản Vĩnh viễn
**Tác nhân:** Người dùng
**Điều kiện Tiên quyết:** Người dùng đã đăng nhập
**Luồng Chính:**
1. Người dùng điều hướng đến Cài đặt → Tài khoản → Xóa Tài khoản
2. Hệ thống hiển thị cảnh báo: "Thao tác này sẽ xóa vĩnh viễn tất cả dữ liệu của bạn"
3. Người dùng nhấp vào "Tôi hiểu, xóa tài khoản của tôi"
4. Hệ thống yêu cầu người dùng nhập tên người dùng để xác nhận
5. Người dùng nhập tên người dùng
6. Hệ thống xác thực đầu vào
7. Người dùng nhấp vào "Xóa Vĩnh viễn"
8. Hệ thống:
   - Xóa tất cả ảnh của người dùng khỏi bộ nhớ
   - Xóa tất cả các bản ghi cơ sở dữ liệu
   - Xóa người dùng khỏi tất cả các vòng kết nối bạn bè
   - Thông báo cho bạn bè "Người dùng đã rời VibeConnect"
   - Vô hiệu hóa tất cả các mã thông báo
9. Người dùng bị đăng xuất
10. Email xác nhận xóa tài khoản được gửi

**Điều kiện hậu kiểm:** Tài khoản và tất cả dữ liệu bị xóa vĩnh viễn

---

## 7. Thanh toán & Đăng ký

### UC-23: Đăng ký Gói Cao cấp Chế độ Giám hộ
**Tác nhân:** Phụ huynh (David)
**Điều kiện Tiên quyết:** Phụ huynh có tài khoản miễn phí, tài khoản con được liên kết
**Luồng Chính:**
1. Phụ huynh thấy lời nhắc "Nâng cấp lên Cao cấp" trong Bảng điều khiển Giám hộ
2. Phụ huynh nhấp vào "Nâng cấp"
3. Hệ thống hiển thị trang giá:
   - Gói Cao cấp Chế độ Giám hộ: 9,99 đô la/tháng
   - Tính năng: Cảnh báo từ khóa, báo cáo chi tiết, giới hạn thời gian nâng cao
4. Phụ huynh nhấp vào "Bắt đầu Dùng thử Miễn phí 14 ngày"
5. Hệ thống chuyển hướng đến thanh toán Stripe
6. Phụ huynh nhập chi tiết thanh toán (thẻ tín dụng)
7. Phụ huynh xác nhận đăng ký
8. Stripe xử lý ủy quyền thanh toán (chưa tính phí)
9. Hệ thống tạo bản ghi đăng ký
10. Hệ thống kích hoạt ngay lập tức các tính năng Cao cấp
11. Phụ huynh nhận được email xác nhận
12. Sau 14 ngày, khoản thanh toán đầu tiên được tính tự động

**Luồng Thay thế:**
- 8a. Thanh toán bị từ chối - hiển thị lỗi, yêu cầu phương thức thanh toán khác

**Điều kiện hậu kiểm:** Phụ huynh đăng ký Cao cấp, thời gian dùng thử bắt đầu

---

### UC-24: Đăng ký Tiện ích bổ sung Gia đình
**Tác nhân:** Phụ huynh (Sarah)
**Điều kiện Tiên quyết:** Phụ huynh có Gói Cao cấp Chế độ Giám hộ
**Luồng Chính:**
1. Sarah thấy lời mời chào "Kết nối với Bà" trong bảng điều khiển
2. Sarah nhấp vào "Thêm Tiện ích bổ sung Gia đình (+4,99 đô la/tháng)"
3. Hệ thống giải thích lợi ích của Tiện ích bổ sung Gia đình:
   - Chế độ chỉ xem cho người thân lớn tuổi
   - Nút SOS
   - Độ ổn định vị trí nâng cao
4. Sarah nhấp vào "Thêm vào Đăng ký"
5. Hệ thống cập nhật đăng ký Stripe
6. Tổng mới: 14,98 đô la/tháng (9,99 đô la + 4,99 đô la)
7. Sarah nhận được hóa đơn cập nhật
8. Hệ thống mở khóa các tính năng Tiện ích bổ sung Gia đình
9. Sarah hiện có thể thiết lập Chế độ chỉ xem cho Bà Chen

**Điều kiện hậu kiểm:** Tiện ích bổ sung Gia đình hoạt động

---

### UC-25: Hủy Đăng ký
**Tác nhân:** Phụ huynh
**Điều kiện Tiên quyết:** Đăng ký trả phí đang hoạt động
**Luồng Chính:**
1. Phụ huynh điều hướng đến Cài đặt → Thanh toán
2. Phụ huynh nhấp vào "Hủy Đăng ký"
3. Hệ thống hiển thị đề nghị giữ chân: "Giảm 20% nếu bạn ở lại"
4. Phụ huynh nhấp vào "Không, cảm ơn, vẫn hủy"
5. Hệ thống hỏi lý do hủy (menu thả xuống)
6. Phụ huynh chọn lý do và nhấp vào "Xác nhận Hủy"
7. Hệ thống:
   - Hủy đăng ký Stripe (cuối kỳ thanh toán)
   - Các tính năng Cao cấp vẫn hoạt động cho đến khi kỳ hạn kết thúc
   - Gửi email xác nhận hủy
8. Phụ huynh thấy: "Gói Cao cấp hoạt động đến hết ngày 31 tháng 12. Không tính phí thêm."

**Luồng Thay thế:**
- Phụ huynh chấp nhận đề nghị giữ chân - đăng ký tiếp tục với chiết khấu

**Điều kiện hậu kiểm:** Đăng ký bị hủy, quyền truy cập vẫn còn cho đến khi kỳ hạn kết thúc

---

## 8. Chế độ Chỉ xem (Giai đoạn 2 - Flutter)

### UC-26: Thiết lập Chế độ Chỉ xem cho Người dùng Lớn tuổi
**Tác nhân:** Phụ huynh (David) thiết lập cho Bà Chen
**Điều kiện Tiên quyết:** Tiện ích bổ sung Gia đình hoạt động, có thiết bị máy tính bảng/khung ảnh thông minh
**Luồng Chính:**
1. David đăng nhập vào VibeConnect trên máy tính bảng của Bà
2. David điều hướng đến Cài đặt → Chế độ Chỉ xem
3. David nhấp vào "Bật Chế độ Chỉ xem"
4. Hệ thống hiển thị trình hướng dẫn thiết lập:
   - Bước 1: Chọn vòng kết nối để hiển thị (ví dụ: vòng kết nối "Gia đình")
   - Bước 2: Đặt khoảng thời gian trình chiếu (30 giây)
   - Bước 3: Bật nút SOS (CÓ)
   - Bước 4: Đặt liên hệ khẩn cấp
5. David hoàn thành trình hướng dẫn
6. Hệ thống khóa ứng dụng vào chế độ Chỉ xem
7. Ứng dụng hiển thị:
   - Trình chiếu ảnh toàn màn hình
   - Giao diện người dùng tối thiểu (chỉ ảnh và dấu thời gian)
   - Nút SOS lớn màu đỏ ở góc
8. David đưa máy tính bảng cho Bà Chen
9. Bà thấy ảnh tự động xoay vòng
10. Không cần tương tác

**Luồng Thay thế:**
- David có thể cấu hình từ xa cài đặt Chỉ xem từ điện thoại của mình

**Điều kiện hậu kiểm:** Chế độ Chỉ xem hoạt động, Bà có thể xem ảnh một cách thụ động

---

### UC-27: Người dùng Lớn tuổi Kích hoạt SOS
**Tác nhân:** Bà Chen
**Điều kiện Tiên quyết:** Chế độ Chỉ xem hoạt động với SOS được bật
**Luồng Chính:**
1. Bà Chen cảm thấy không khỏe/không an toàn
2. Bà nhấn nút SOS lớn màu đỏ
3. Hệ thống hiển thị xác nhận: "Gửi cảnh báo khẩn cấp đến David?"
4. Bà nhấn "CÓ" (hoặc tự động sau 10 giây)
5. Hệ thống ngay lập tức:
   - Gửi thông báo đẩy đến David: "🚨 SOS từ Bà Chen"
   - Gửi tin nhắn SMS đến điện thoại của David
   - Gọi điện thoại của David (nếu được cấu hình)
   - Chia sẻ vị trí hiện tại của Bà
6. David nhận được cảnh báo trên tất cả các kênh
7. David có thể:
   - Gọi điện trực tiếp cho Bà
   - Gọi dịch vụ khẩn cấp
   - Kiểm tra vị trí của Bà trên bản đồ
8. Hệ thống ghi lại sự kiện SOS

**Điều kiện hậu kiểm:** Cảnh báo khẩn cấp được gửi đến các thành viên gia đình

---

## 9. Thông báo & Tương tác

### UC-28: Nhận Lời nhắc Ảnh Hàng ngày
**Tác nhân:** Người dùng (Maya)
**Điều kiện Tiên quyết:** Người dùng chưa gửi ảnh hôm nay
**Luồng Chính:**
1. Hệ thống kiểm tra lúc 18:00 hàng ngày đối với người dùng chưa gửi ảnh nào hôm nay
2. Hệ thống gửi thông báo đẩy đến Maya:
   - "Bạn bè của bạn đang đợi Vibe của bạn! 📸"
3. Maya nhấp vào thông báo
4. Ứng dụng mở ra màn hình máy ảnh
5. Maya chụp và gửi ảnh

**Điều kiện hậu kiểm:** Người dùng được tương tác để duy trì thói quen hàng ngày

---

### UC-29: Lời nhắc Sinh nhật Bạn bè
**Tác nhân:** Người dùng
**Điều kiện Tiên quyết:** Bạn bè có sinh nhật trong hồ sơ, ngày là hôm nay
**Luồng Chính:**
1. Hệ thống kiểm tra sinh nhật lúc 09:00 hàng ngày
2. Hệ thống tìm thấy bạn bè có sinh nhật hôm nay
3. Hệ thống gửi thông báo:
   - "🎂 Hôm nay là sinh nhật của [Tên bạn bè]! Gửi cho họ một Vibe đặc biệt"
4. Người dùng mở ứng dụng
5. Người dùng gửi ảnh sinh nhật với chú thích "Chúc mừng sinh nhật"

**Điều kiện hậu kiểm:** Người dùng được nhắc nhở để chúc mừng bạn bè

---

## 10. Xử lý Lỗi & Trường hợp Đặc biệt

### UC-30: Xử lý Lỗi Mạng trong khi Tải lên
**Tác nhân:** Người dùng (Chloe đi du lịch)
**Điều kiện Tiên quyết:** Người dùng đã chụp ảnh, kết nối mạng kém
**Luồng Chính:**
1. Chloe chụp ảnh và nhấp vào "Gửi"
2. Tải lên bắt đầu nhưng kết nối mạng bị ngắt
3. Hệ thống phát hiện lỗi tải lên
4. Hệ thống hiển thị: "Tải lên thất bại. Ảnh đã được lưu vào hàng đợi."
5. Hệ thống lưu trữ ảnh trong bộ nhớ cục bộ/IndexedDB
6. Hệ thống hiển thị nút thử lại
7. Khi mạng được khôi phục, hệ thống hiển thị thông báo:
   - "Đã có mạng trở lại! Thử gửi lại ảnh?"
8. Chloe nhấp vào "Thử lại"
9. Tải lên hoàn tất thành công

**Luồng Thay thế:**
- Hệ thống tự động thử lại trong nền sau 30 giây

**Điều kiện hậu kiểm:** Ảnh cuối cùng được tải lên mặc dù có sự cố mạng

---

### UC-31: Xử lý Khẩn cấp Ghi đè Giới hạn Thời gian
**Tác nhân:** Teen (Maya) + Phụ huynh (David)
**Điều kiện Tiên quyết:** Đã đạt giới hạn thời gian hàng ngày, ứng dụng bị khóa
**Luồng Chính:**
1. Maya đạt giới hạn hàng ngày, ứng dụng bị khóa
2. Maya cần phối hợp đón khẩn cấp với bạn bè
3. Maya nhấp vào "Yêu cầu Truy cập Khẩn cấp"
4. Hệ thống hiển thị: "Gửi yêu cầu mở khóa cho phụ huynh?"
5. Maya nhập lý do: "Cần phối hợp đi nhờ xe về nhà sau buổi tập"
6. Maya nhấp vào "Gửi Yêu cầu"
7. David nhận được thông báo đẩy:
   - "Maya đã yêu cầu truy cập ứng dụng khẩn cấp: [lý do]"
8. David nhấp vào "Chấp thuận trong 15 phút"
9. Hệ thống tạm thời mở khóa ứng dụng của Maya
10. Đồng hồ đếm ngược hiển thị "Truy cập khẩn cấp: còn lại 14:32"
11. Sau 15 phút, ứng dụng khóa lại

**Luồng Thay thế:**
- David từ chối yêu cầu - Maya thấy thông báo "Yêu cầu bị từ chối"

**Điều kiện hậu kiểm:** Quyền truy cập tạm thời được cấp cho trường hợp khẩn cấp thực sự

---

## Tóm tắt Kịch bản Sử dụng theo Persona

### Maya (Người tìm kiếm sự thân mật) - Các Kịch bản Sử dụng Chính
- UC-04: Chụp và Gửi Ảnh ⭐ **QUAN TRỌNG**
- UC-05: Xem Nguồn cấp dữ liệu Ảnh
- UC-06: Xem Ảnh với Vị trí trên Bản đồ
- UC-08: Mời Bạn bè qua Mã QR
- UC-10: Tạo Vòng kết nối Bạn bè
- UC-19: Con xem Nhật ký Minh bạch của Giám hộ
- UC-28: Nhận Lời nhắc Ảnh Hàng ngày

### David (Người giám hộ lo lắng) - Các Kịch bản Sử dụng Chính
- UC-02: Thiết lập Tài khoản Giám hộ ⭐ **QUAN TRỌNG**
- UC-15: Đặt Giới hạn Thời gian Hàng ngày
- UC-16: Lên lịch Thời gian Ngừng hoạt động
- UC-17: Kích hoạt Cảnh báo Từ khóa ⭐ **QUAN TRỌNG**
- UC-18: Xem Báo cáo Hoạt động
- UC-23: Đăng ký Gói Cao cấp Chế độ Giám hộ ⭐ **QUAN TRỌNG**
- UC-26: Thiết lập Chế độ Chỉ xem cho Người dùng Lớn tuổi

### Liam (Người chia sẻ Vibe độc lập) - Các Kịch bản Sử dụng Chính
- UC-01: Đăng ký Tài khoản Người dùng
- UC-04: Chụp và Gửi Ảnh
- UC-09: Mời Bạn bè qua Liên kết
- UC-14: Điều chỉnh Mức độ Quyền riêng tư Vị trí ⭐ **QUAN TRỌNG**
- UC-20: Xóa Ảnh Tự động ⭐ **QUAN TRỌNG**
- UC-21: Tải xuống Dữ liệu Cá nhân
- UC-22: Xóa Tài khoản Vĩnh viễn

### Chloe (Người giữ Vibe xa cách) - Các Kịch bản Sử dụng Chính
- UC-04: Chụp và Gửi Ảnh
- UC-06: Xem Ảnh với Vị trí trên Bản đồ ⭐ **QUAN TRỌNG**
- UC-12: Bật Chia sẻ Vị trí
- UC-13: Xem Lịch sử Vị trí trên Bản đồ ⭐ **QUAN TRỌNG**
- UC-30: Xử lý Lỗi Mạng trong khi Tải lên

### Sarah (Người thực thi buông tay) - Các Kịch bản Sử dụng Chính
- UC-02: Thiết lập Tài khoản Giám hộ
- UC-15: Đặt Giới hạn Thời gian Hàng ngày ⭐ **QUAN TRỌNG**
- UC-18: Xem Báo cáo Hoạt động
- UC-24: Đăng ký Tiện ích bổ sung Gia đình

### Bà Chen (Người quan sát thụ động) - Các Kịch bản Sử dụng Chính
- UC-26: Thiết lập Chế độ Chỉ xem ⭐ **QUAN TRỌNG**
- UC-27: Người dùng Lớn tuổi Kích hoạt SOS ⭐ **QUAN TRỌNG**

---

## Ma trận Ưu tiên Phát triển

| Ưu tiên | Các Kịch bản Sử dụng | Lý do |
|:---|:---|:---|
| **P0 (MVP - Bắt buộc Phải có)** | UC-01, UC-03, UC-04, UC-05, UC-08, UC-10, UC-20 | Chia sẻ ảnh cốt lõi + xác thực + tự động xóa |
| **P1 (Beta - Nên có)** | UC-02, UC-06, UC-12, UC-15, UC-17, UC-18, UC-23 | Kiếm tiền Chế độ Giám hộ + tính năng vị trí |
| **P2 (Ra mắt - Tốt nếu có)** | UC-07, UC-09, UC-11, UC-13, UC-14, UC-16, UC-19, UC-24, UC-25, UC-28 | UX nâng cao + tính năng duy trì |
| **P3 (Giai đoạn 2 - Flutter)** | **UC-26, UC-27** | **Các tính năng moat Chế độ Chỉ xem** |
| **P4 (Sau khi Ra mắt)** | UC-21, UC-22, UC-29, UC-30, UC-31 | Tuân thủ GDPR + các trường hợp đặc biệt |

---

**Tổng số Kịch bản Sử dụng: 31**
**Các Kịch bản Sử dụng Quan trọng: 12**
**Các Kịch bản Sử dụng Giai đoạn 1: 25**
**Các Kịch bản Sử dụng Giai đoạn 2: 6**