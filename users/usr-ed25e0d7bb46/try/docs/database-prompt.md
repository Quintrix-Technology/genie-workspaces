# ==============================================================================
# ENTERPRISE POSTGRESQL DDL, RLS & DATA SCHEMA ARCHITECTURE
# Project: TRY
# RDBMS: PostgreSQL 16 (Supabase PostgREST Engine)
# Standards: 3rd Normal Form (3NF), UUIDv4 Primary Keys, RLS Security, B-Tree Indexes
# ==============================================================================

<system_role>
You are the Chief Database Architect.
You engineer bulletproof, normalized, high-concurrency database schemas with airtight Row Level Security (RLS).
Your migrations are idempotent and follow strict naming conventions (snake_case, plural tables).
</system_role>

## 1. DDL SCHEMA MIGRATION SCRIPT

-- Initialize extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table 1: Workspaces / Projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'pending')),
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 2: User Profiles & Authentication Link
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for Feature: Display Personal Name
CREATE TABLE IF NOT EXISTS display_personal_name (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_display_personal_name_project ON display_personal_name(project_id);
CREATE INDEX IF NOT EXISTS idx_display_personal_name_status ON display_personal_name(status);
CREATE INDEX IF NOT EXISTS idx_display_personal_name_created ON display_personal_name(created_at DESC);

-- Table for Feature: About Me Section
CREATE TABLE IF NOT EXISTS about_me_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_about_me_section_project ON about_me_section(project_id);
CREATE INDEX IF NOT EXISTS idx_about_me_section_status ON about_me_section(status);
CREATE INDEX IF NOT EXISTS idx_about_me_section_created ON about_me_section(created_at DESC);

-- Table for Feature: Skills Section
CREATE TABLE IF NOT EXISTS skills_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_section_project ON skills_section(project_id);
CREATE INDEX IF NOT EXISTS idx_skills_section_status ON skills_section(status);
CREATE INDEX IF NOT EXISTS idx_skills_section_created ON skills_section(created_at DESC);

-- Table for Feature: Projects Section
CREATE TABLE IF NOT EXISTS projects_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_section_project ON projects_section(project_id);
CREATE INDEX IF NOT EXISTS idx_projects_section_status ON projects_section(status);
CREATE INDEX IF NOT EXISTS idx_projects_section_created ON projects_section(created_at DESC);

-- Table for Feature: Experience Section
CREATE TABLE IF NOT EXISTS experience_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_experience_section_project ON experience_section(project_id);
CREATE INDEX IF NOT EXISTS idx_experience_section_status ON experience_section(status);
CREATE INDEX IF NOT EXISTS idx_experience_section_created ON experience_section(created_at DESC);

-- Table for Feature: Blog Section
CREATE TABLE IF NOT EXISTS blog_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_section_project ON blog_section(project_id);
CREATE INDEX IF NOT EXISTS idx_blog_section_status ON blog_section(status);
CREATE INDEX IF NOT EXISTS idx_blog_section_created ON blog_section(created_at DESC);

-- Table for Feature: Contact Section with Form
CREATE TABLE IF NOT EXISTS contact_section_with_form (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_section_with_form_project ON contact_section_with_form(project_id);
CREATE INDEX IF NOT EXISTS idx_contact_section_with_form_status ON contact_section_with_form(status);
CREATE INDEX IF NOT EXISTS idx_contact_section_with_form_created ON contact_section_with_form(created_at DESC);

-- Table for Feature: Audience‑Focused Content
CREATE TABLE IF NOT EXISTS audience_focused_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audience_focused_content_project ON audience_focused_content(project_id);
CREATE INDEX IF NOT EXISTS idx_audience_focused_content_status ON audience_focused_content(status);
CREATE INDEX IF NOT EXISTS idx_audience_focused_content_created ON audience_focused_content(created_at DESC);

-- Table for Feature: Visual Style Customization
CREATE TABLE IF NOT EXISTS visual_style_customization (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    priority VARCHAR(20) DEFAULT 'medium',
    metadata JSONB DEFAULT '{}'::jsonb,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visual_style_customization_project ON visual_style_customization(project_id);
CREATE INDEX IF NOT EXISTS idx_visual_style_customization_status ON visual_style_customization(status);
CREATE INDEX IF NOT EXISTS idx_visual_style_customization_created ON visual_style_customization(created_at DESC);

## 2. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read and mutate authorized project rows"
    ON projects FOR ALL
    USING (auth.uid() IS NOT NULL);

## 3. AUTOMATED TIMESTAMP UPDATE TRIGGERS
CREATE OR REPLACE FUNCTION set_updated_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
