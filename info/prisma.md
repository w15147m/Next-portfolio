# Re-run seeder anytime (safe, uses upsert)
npx prisma db seed

# Create a new migration after schema changes
npx prisma migrate dev --name <change_name>

# Regenerate the Prisma client after schema changes
npx prisma generate
