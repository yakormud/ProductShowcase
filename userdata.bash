#!/bin/bash

# Update the instance
sudo yum update -y || sudo apt-get update -y

# Install Git
sudo yum install -y git || sudo apt-get install -y git

# Install Node.js and npm for Amazon Linux 2
sudo yum install -y nodejs npm || {
    # For Ubuntu-based instances
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
}

# Install pm2 globally using npm
sudo npm install pm2 -g

# Go to the home directory of the current user
cd /home/ec2-user

# Clone the repository
git clone -b main https://github.com/yakormud/ProductShowcase

# Navigate to the project directory and install dependencies
cd ProductShowcase
sudo npm install
# sudo npm run build

# Start the application using pm2
# sudo pm2 start index.js

# Save the current pm2 processes
sudo pm2 save

# Ensure pm2 starts on boot
sudo pm2 startup


sudo yum install -y nginx

sudo systemctl start nginx
sudo systemctl enable nginx
sudo chmod 755 /home/ec2-user
sudo chmod -R 755 /home/ec2-user
sudo setsebool -P httpd_read_user_content 1

# Restart Nginx to reflect the changes
sudo systemctl restart nginx




# สิ่งที่ต้องทำหลัง copy file นี้ใส่ userdata
# 1). cd ไปยัง ที่ที่ project clone แล้วไปที่ src แก้ api.jsx เป็น IP ของเครื่อง amazon แล้วก็ port ที่ backend รัน
# 2). กดรัน npm run build เพื่อ build react file
# 3). ไปที่ไฟล์ /etc/nginx/nginx.conf แล้วแก้ path ตรงบรรทัด root เป็น /home/ec2-user/ProductShowcase/dist (ที่ที่ๆ project build)
# - ใช้คำสั่ง sudo nano nginx.conf เพื่อแก้
# 4). copy file .env ไปใส่ใน ที่ที่ server.js อยู่
# 5). ใช้คำสั่ง sudo systemctl restart nginx
# 6). pm2 start server.js
# edit inbound rule ใน EC2 เพิ่ม port ของ server.js ลงไป อีกช่องใส่ 0.0.0.0/0 กด save


# Note by me
# sudo nginx -t เช็คว่าในไฟล์ nginx syntax ถูกไหม
# วิธีออกจาก nano แก้เสร็จ , Ctrl+ o (โอ), enter , Ctrl + x


# ที่แก้เพิ่ม
# ส่วน backend
# แก้ port ใน server.js เป้่น 0.0.0.0
# ตรง port ห้ามใช้ port 80

# เพิ่ม env ไฟล์ 
# แก้ axios calling ใส่ ใส่ไฟล์เป็น api.jsx ละแก้ข้อมูล เป็น aws ip ก่อนที่จะ npm run build