# Bài 3: Năng lượng hoạt hóa của phản ứng hóa học

Một website thuyết trình tương tác về Hóa học 10, bám sát SGK hình thức học tập từ trang 19 đến 23.

## Tính năng chính
- Trang slide tương tác, hỗ trợ điều hướng bằng phím mũi tên
- Floating navigation bar, chỉ số trang, fullscreen toggle
- Dark mode + glassmorphism
- Biểu đồ năng lượng bằng Chart.js
- MathJax hiển thị công thức toán học và hóa học
- Calculator Arrhenius tương tác
- Quiz 3 câu trắc nghiệm
- Bài tập mẫu và lời giải từng bước

## Cấu trúc thư mục
```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── chart.js
├── README.md
└── .github/
    └── workflows/
        └── github-pages.yml
```

## Bước 1: Tạo repository GitHub
1. Truy cập GitHub → New repository
2. Đặt tên repository: `Vatli`
3. Chọn `Public` hoặc `Private` tùy mục đích
4. Khởi tạo repository với README (nếu muốn) hoặc bỏ qua

## Bước 2: Push mã nguồn lên GitHub
```bash
git init
git branch -M main
git remote add origin https://github.com/Mquan240310A06/Vatli.git
git add .
git commit -m "Initial commit: interactive chemistry slide deck"
git push -u origin main
```

## Bước 3: Kích hoạt GitHub Pages
1. Vào repository → `Settings` → `Pages`
2. Chọn source: `Deploy from a branch`
3. Chọn branch: `main`
4. Chọn folder: `/ (root)`
5. Lưu lại
6. Sau vài phút, GitHub sẽ tạo URL dạng:
   `https://mquan240310a06.github.io/Vatli/`

## Bước 4: Truy cập website
Mở browser và truy cập:
```text
https://mquan240310a06.github.io/Vatli/
```

## Ghi chú
- Vì dùng CDN cho Tailwind CSS, Chart.js, Font Awesome và MathJax, website hoạt động mượt mà trên GitHub Pages.
- Nếu muốn có URL đẹp hơn, có thể đặt custom domain hoặc thêm file `CNAME`.

## Nội dung chính mà website trình bày
- Khái niệm năng lượng hoạt hóa
- Thuyết va chạm
- Phương trình Arrhenius
- Bài tập mẫu SGK
- Chất xúc tác và cơ chế phản ứng
- Chu trình ozone
- Ứng dụng thực tiễn và tổng kết

## Liên hệ
Nếu cần tùy chỉnh thêm nội dung giáo dục theo chuẩn SGK 2018 hoặc mục tiêu dạy học riêng, hãy cập nhật file `index.html` và `js/app.js` theo yêu cầu.















































