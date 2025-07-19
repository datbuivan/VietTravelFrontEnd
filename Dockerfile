FROM node:20.11.1-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --project sakai-ng

FROM nginx:alpine
# ❗ Xoá toàn bộ nội dung cũ trước khi copy mới
RUN rm -rf /usr/share/nginx/html/*

# ✅ Copy đúng thư mục browser của Angular
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

# ✅ Copy cấu hình nginx dành cho Angular SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
