# start.sh
#!/bin/sh

# Wait for PostgreSQL (Render guarantees it's available, but delay ensures readiness)
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Run migrations
echo "🚀 Deploying Prisma migrations..."
npx prisma migrate deploy

# Start your app
echo "🔧 Starting the server..."
npm run build

echo "🚀 Starting the server..."
npm run start
