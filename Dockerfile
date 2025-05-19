# Use Debian-based Node image
FROM node:20-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y openssl libssl-dev && \
    apt-get clean

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Generate Prisma client (after schema + deps are in place)
#RUN npx prisma generate

EXPOSE 3000

COPY start.sh ./start.sh
RUN chmod +x ./start.sh
CMD ["./start.sh"]
