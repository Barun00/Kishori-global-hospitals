-- =====================================================
-- KISHORI GLOBAL HOSPITAL
-- Database + Security Policies
-- =====================================================

create extension if not exists pgcrypto;

-- 1. ADMIN USERS
create table if not exists public.admin_users (
    user_id uuid primary key
        references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from public.admin_users
        where user_id = (select auth.uid())
    );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;


-- 2. UPDATED AT FUNCTION
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;


-- 3. DEPARTMENTS
create table if not exists public.departments (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    description text not null default '',
    icon text not null default 'fa-stethoscope',
    is_published boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 4. DOCTORS
create table if not exists public.doctors (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    specialty text not null,
    department_id uuid
        references public.departments(id) on delete set null,
    qualifications text not null default '',
    registration_number text not null default '',
    bio text not null default '',
    consultation_schedule text not null default '',
    phone text not null default '',
    photo_url text not null default '',
    is_published boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 5. APPOINTMENTS
create table if not exists public.appointments (
    id uuid primary key default gen_random_uuid(),

    patient_name text not null
        check (char_length(trim(patient_name)) between 2 and 100),

    phone text not null
        check (
            char_length(
                regexp_replace(phone, '[^0-9]', '', 'g')
            ) between 10 and 15
        ),

    department text not null,
    preferred_doctor text not null default '',
    preferred_date date not null,
    preferred_time text not null default '',

    visit_reason text not null default ''
        check (char_length(visit_reason) <= 300),

    consent boolean not null default false,

    status text not null default 'pending'
        check (
            status in (
                'pending',
                'confirmed',
                'rescheduled',
                'completed',
                'cancelled'
            )
        ),

    admin_notes text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 6. CONTACT ENQUIRIES
create table if not exists public.contact_messages (
    id uuid primary key default gen_random_uuid(),

    name text not null
        check (char_length(trim(name)) between 2 and 100),

    phone text not null
        check (
            char_length(
                regexp_replace(phone, '[^0-9]', '', 'g')
            ) between 10 and 15
        ),

    email text not null default '',
    category text not null,

    message text not null
        check (char_length(trim(message)) between 5 and 1000),

    consent boolean not null default false,

    status text not null default 'new'
        check (
            status in ('new', 'in_progress', 'resolved', 'archived')
        ),

    admin_notes text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 7. FACILITIES
create table if not exists public.facilities (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text not null default '',
    image_url text not null default '',
    is_published boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 8. HEALTH ARTICLES
create table if not exists public.health_articles (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    slug text not null unique,
    summary text not null default '',
    body text not null default '',
    author_name text not null default '',
    reviewer_name text not null default '',
    reviewed_at date,
    published_at timestamptz,
    is_published boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 9. JOB OPENINGS
create table if not exists public.job_openings (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    department text not null default '',
    employment_type text not null default '',
    location text not null default 'Bargarh, Odisha',
    description text not null default '',
    qualifications text not null default '',
    experience text not null default '',
    responsibilities text not null default '',
    application_deadline date,
    application_email text not null default '',
    is_active boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- 10. WEBSITE SETTINGS
create table if not exists public.site_settings (
    setting_key text primary key,
    setting_value text not null default '',
    is_public boolean not null default true,
    updated_by uuid
        references auth.users(id) on delete set null,
    updated_at timestamptz not null default now()
);


-- 11. INDEXES
create index if not exists appointments_created_idx
    on public.appointments(created_at desc);

create index if not exists appointments_status_idx
    on public.appointments(status);

create index if not exists contact_messages_created_idx
    on public.contact_messages(created_at desc);

create index if not exists contact_messages_status_idx
    on public.contact_messages(status);

create index if not exists doctors_department_idx
    on public.doctors(department_id);

create index if not exists doctors_published_idx
    on public.doctors(is_published, sort_order);

create index if not exists departments_published_idx
    on public.departments(is_published, sort_order);

create index if not exists facilities_published_idx
    on public.facilities(is_published, sort_order);

create index if not exists articles_published_idx
    on public.health_articles(is_published, sort_order);

create index if not exists jobs_active_idx
    on public.job_openings(is_active, sort_order);


-- 12. AUTOMATIC UPDATED_AT TRIGGERS
do $$
declare
    table_name text;
begin
    foreach table_name in array array[
        'departments',
        'doctors',
        'appointments',
        'contact_messages',
        'facilities',
        'health_articles',
        'job_openings',
        'site_settings'
    ]
    loop
        execute format(
            'drop trigger if exists set_updated_at on public.%I',
            table_name
        );

        execute format(
            'create trigger set_updated_at
             before update on public.%I
             for each row execute function public.set_updated_at()',
            table_name
        );
    end loop;
end;
$$;


-- 13. ENABLE RLS AND ADMIN POLICIES
alter table public.admin_users enable row level security;

do $$
declare
    table_name text;
begin
    foreach table_name in array array[
        'departments',
        'doctors',
        'appointments',
        'contact_messages',
        'facilities',
        'health_articles',
        'job_openings',
        'site_settings'
    ]
    loop
        execute format(
            'alter table public.%I enable row level security',
            table_name
        );

        execute format(
            'revoke all on table public.%I from anon, authenticated',
            table_name
        );

        execute format(
            'grant select, insert, update, delete
             on table public.%I to authenticated',
            table_name
        );

        execute format(
            'drop policy if exists admin_manage on public.%I',
            table_name
        );

        execute format(
            'create policy admin_manage on public.%I
             for all to authenticated
             using (public.is_admin())
             with check (public.is_admin())',
            table_name
        );
    end loop;
end;
$$;


-- 14. ADMIN MEMBERSHIP SECURITY
revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

drop policy if exists admin_read_own_membership
    on public.admin_users;

create policy admin_read_own_membership
on public.admin_users
for select to authenticated
using (user_id = (select auth.uid()));


-- 15. PUBLIC READ ACCESS TO APPROVED DEPARTMENTS
grant select on public.departments to anon, authenticated;

drop policy if exists public_read_departments
    on public.departments;

create policy public_read_departments
on public.departments
for select to anon, authenticated
using (is_published = true);


-- 16. PUBLIC READ ACCESS TO APPROVED DOCTORS
grant select on public.doctors to anon, authenticated;

drop policy if exists public_read_doctors
    on public.doctors;

create policy public_read_doctors
on public.doctors
for select to anon, authenticated
using (is_published = true);


-- 17. PUBLIC READ ACCESS TO APPROVED FACILITIES
grant select on public.facilities to anon, authenticated;

drop policy if exists public_read_facilities
    on public.facilities;

create policy public_read_facilities
on public.facilities
for select to anon, authenticated
using (is_published = true);


-- 18. PUBLIC READ ACCESS TO PUBLISHED ARTICLES
grant select on public.health_articles to anon, authenticated;

drop policy if exists public_read_articles
    on public.health_articles;

create policy public_read_articles
on public.health_articles
for select to anon, authenticated
using (
    is_published = true
    and (
        published_at is null
        or published_at <= now()
    )
);


-- 19. PUBLIC READ ACCESS TO ACTIVE JOB OPENINGS
grant select on public.job_openings to anon, authenticated;

drop policy if exists public_read_active_jobs
    on public.job_openings;

create policy public_read_active_jobs
on public.job_openings
for select to anon, authenticated
using (
    is_active = true
    and (
        application_deadline is null
        or application_deadline >= current_date
    )
);


-- 20. PUBLIC READ ACCESS TO PUBLIC SITE SETTINGS
grant select on public.site_settings to anon, authenticated;

drop policy if exists public_read_site_settings
    on public.site_settings;

create policy public_read_site_settings
on public.site_settings
for select to anon, authenticated
using (is_public = true);


-- 21. PUBLIC APPOINTMENT INSERT ONLY
grant insert on public.appointments to anon;

drop policy if exists public_submit_appointment
    on public.appointments;

create policy public_submit_appointment
on public.appointments
for insert to anon, authenticated
with check (
    consent = true
    and status = 'pending'
    and char_length(trim(patient_name)) between 2 and 100
    and char_length(
        regexp_replace(phone, '[^0-9]', '', 'g')
    ) between 10 and 15
    and char_length(trim(department)) between 2 and 100
    and char_length(visit_reason) <= 300
);


-- 22. PUBLIC CONTACT INSERT ONLY
grant insert on public.contact_messages to anon;

drop policy if exists public_submit_contact_message
    on public.contact_messages;

create policy public_submit_contact_message
on public.contact_messages
for insert to anon, authenticated
with check (
    consent = true
    and status = 'new'
    and char_length(trim(name)) between 2 and 100
    and char_length(
        regexp_replace(phone, '[^0-9]', '', 'g')
    ) between 10 and 15
    and char_length(trim(message)) between 5 and 1000
);


-- 23. DEFAULT WEBSITE SETTINGS
insert into public.site_settings
    (setting_key, setting_value, is_public)
values
    (
        'hero_title',
        'Compassionate Care.|Better Health.',
        true
    ),
    (
        'hero_description',
        'Welcome to Kishori Global Hospital. We are committed to respectful patient care, clear communication and helping individuals and families navigate their healthcare journey.',
        true
    ),
    (
        'about_description',
        'Kishori Global Hospital aims to provide organised, respectful and patient-focused healthcare to the community.',
        true
    ),
    (
        'hospital_address',
        'At-Sayan, P.O. Deogaon, Bargarh, Odisha, India - 768038',
        true
    ),
    (
        'hospital_email',
        'kishoriglobalhospitals@gmail.com',
        true
    ),
    ('reception_phone_1', '+917077772231', true),
    ('reception_phone_2', '+917077772232', true),
    ('emergency_phone', '+917077772236', true),
    ('laboratory_phone', '+917077772237', true)
on conflict (setting_key) do nothing;


-- 24. STARTER DEPARTMENTS
-- Not published until hospital management verifies them.

insert into public.departments
    (name, slug, description, icon, is_published, sort_order)
values
    (
        'Cardiology',
        'cardiology',
        'Contact the hospital to verify current cardiology services.',
        'fa-heart-pulse',
        false,
        1
    ),
    (
        'Neurology',
        'neurology',
        'Contact the hospital to verify current neurology services.',
        'fa-brain',
        false,
        2
    ),
    (
        'Orthopedics',
        'orthopedics',
        'Contact the hospital to verify current orthopedic services.',
        'fa-bone',
        false,
        3
    ),
    (
        'Gynecology',
        'gynecology',
        'Contact the hospital to verify current gynecology services.',
        'fa-person-pregnant',
        false,
        4
    )
on conflict (slug) do nothing;


-- END OF SCHEMA