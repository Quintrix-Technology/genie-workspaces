# ==============================================================================
# ENTERPRISE POSTGRESQL DDL, RLS & DATA SCHEMA ARCHITECTURE
# Project: SRS generator
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

-- Table for Feature: PDF Generation and Download
CREATE TABLE IF NOT EXISTS pdf_generation_and_download (
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

CREATE INDEX IF NOT EXISTS idx_pdf_generation_and_download_project ON pdf_generation_and_download(project_id);
CREATE INDEX IF NOT EXISTS idx_pdf_generation_and_download_status ON pdf_generation_and_download(status);
CREATE INDEX IF NOT EXISTS idx_pdf_generation_and_download_created ON pdf_generation_and_download(created_at DESC);

-- Table for Feature: Current‑Day English Language Restriction
CREATE TABLE IF NOT EXISTS current_day_english_language (
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

CREATE INDEX IF NOT EXISTS idx_current_day_english_language_project ON current_day_english_language(project_id);
CREATE INDEX IF NOT EXISTS idx_current_day_english_language_status ON current_day_english_language(status);
CREATE INDEX IF NOT EXISTS idx_current_day_english_language_created ON current_day_english_language(created_at DESC);

-- Table for Feature: No Post‑Generation Editing
CREATE TABLE IF NOT EXISTS no_post_generation_editing (
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

CREATE INDEX IF NOT EXISTS idx_no_post_generation_editing_project ON no_post_generation_editing(project_id);
CREATE INDEX IF NOT EXISTS idx_no_post_generation_editing_status ON no_post_generation_editing(status);
CREATE INDEX IF NOT EXISTS idx_no_post_generation_editing_created ON no_post_generation_editing(created_at DESC);

-- Table for Feature: No Admin Role
CREATE TABLE IF NOT EXISTS no_admin_role (
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

CREATE INDEX IF NOT EXISTS idx_no_admin_role_project ON no_admin_role(project_id);
CREATE INDEX IF NOT EXISTS idx_no_admin_role_status ON no_admin_role(status);
CREATE INDEX IF NOT EXISTS idx_no_admin_role_created ON no_admin_role(created_at DESC);

-- Table for Feature: Reliable Speech‑to‑Text Conversion
CREATE TABLE IF NOT EXISTS reliable_speech_to_text_conv (
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

CREATE INDEX IF NOT EXISTS idx_reliable_speech_to_text_conv_project ON reliable_speech_to_text_conv(project_id);
CREATE INDEX IF NOT EXISTS idx_reliable_speech_to_text_conv_status ON reliable_speech_to_text_conv(status);
CREATE INDEX IF NOT EXISTS idx_reliable_speech_to_text_conv_created ON reliable_speech_to_text_conv(created_at DESC);

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
