# Prisma Workflow Cheatsheet

Laravel comparison included so the commands map to what you already know.

---

## 1. First-Time Setup (fresh clone / new machine)

Equivalent to: `composer install && php artisan migrate --seed`

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and set your DATABASE_URL
cp .env.example .env

# 3. Generate the Prisma Client (reads schema.prisma, creates typed client)
npx prisma generate

# 4. Apply all existing migrations to the database
npx prisma migrate deploy

# 5. Seed the database
npx prisma db seed
```

> `migrate deploy` = apply existing migrations only, no new migration created.
> Use this in first-time setup, CI, and production. Never use `migrate dev` for this step.

---

## 2. Fresh Reset (wipe DB + reapply everything)

Equivalent to: `php artisan migrate:fresh --seed`

```bash
npx prisma migrate reset
```

This single command:
1. Drops the database (or all tables)
2. Recreates it
3. Reapplies **all** migrations from scratch
4. Runs your seed script automatically (`prisma db seed`)

If you don't want it to auto-seed:

```bash
npx prisma migrate reset --skip-seed
```

Non-interactive (for scripts/CI):

```bash
npx prisma migrate reset --force
```

> ⚠️ This is destructive — all data is deleted. Only use in dev.

---

## 3. Day-to-Day Development Loop

Equivalent to: `php artisan make:migration` + `php artisan migrate`

```bash
# 1. Edit schema.prisma (add/change models or fields)

# 2. Create + apply a new migration, and auto-regenerate client
npx prisma migrate dev --name <change_name>

# e.g.
npx prisma migrate dev --name add_user_avatar
```

`migrate dev` does 3 things at once:
- Creates a new SQL migration file in `prisma/migrations/`
- Applies it to your dev database
- Regenerates the Prisma Client

---

## 4. Seeding

Equivalent to: `php artisan db:seed`

```bash
# Re-run seeder anytime (safe if written with upsert)
npx prisma db seed
```

Make sure your seed script exists (usually `prisma/seed.ts` or `prisma/seed.js`) and is registered in `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Write seeders using `upsert` so they're safe to re-run without creating duplicates:

```ts
await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: {},
  create: { email: "admin@example.com", name: "Admin" },
});
```

---

## 5. Regenerate Client Only

Equivalent to: not really a Laravel thing — this is Prisma's typed-client step.

```bash
npx prisma generate
```

Run this whenever `schema.prisma` changes but you don't want to create a migration (rare — usually `migrate dev` already does this for you).

---

## 6. Quick Reference Table

| Task                                   | Laravel                              | Prisma                              |
|-----------------------------------------|---------------------------------------|--------------------------------------|
| First-time setup                        | `php artisan migrate --seed`         | `npx prisma migrate deploy && npx prisma db seed` |
| Fresh reset + reseed                    | `php artisan migrate:fresh --seed`   | `npx prisma migrate reset`          |
| New migration after schema change       | `php artisan make:migration ...`     | `npx prisma migrate dev --name ...`|
| Re-run seeder                           | `php artisan db:seed`                | `npx prisma db seed`                |
| Apply pending migrations (prod/CI)      | `php artisan migrate --force`        | `npx prisma migrate deploy`         |
| Regenerate ORM client                   | n/a                                   | `npx prisma generate`               |
| Inspect DB visually                     | Tinker / DB client                   | `npx prisma studio`                 |

---

## 7. Bonus: Visual DB Browser

```bash
npx prisma studio
```

Opens a local GUI (like phpMyAdmin/TablePlus) to browse and edit rows directly.