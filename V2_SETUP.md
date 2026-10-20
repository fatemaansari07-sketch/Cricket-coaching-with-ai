# Cricket AI Coach V2 — setup

## Same Supabase project
Keep the existing Supabase project, Auth users, Storage and data. Do not create a new database.

1. Run `supabase/v2_schema.sql` in the existing Supabase SQL editor.
2. In Supabase Auth → Providers, keep Google enabled.
3. Add the new Vercel domain and local dev URL to Auth → URL Configuration → Redirect URLs.
4. Set Vercel env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Paid AI server variables are optional until paid analysis is wired in production.

## Login
V2 player login UI is Google-only. Phone/OTP and password forms are removed from the new UI.
Existing Supabase auth/data remains untouched.

## Launch
Shop/Need It/Deals are implemented as future architecture but hidden by feature flags. Coaching is the primary launch product.
