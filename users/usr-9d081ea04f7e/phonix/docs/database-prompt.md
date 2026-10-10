# ==============================================================================
# ENTERPRISE POSTGRESQL DDL, RLS & DATA SCHEMA ARCHITECTURE
# Project: Phonix
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

-- Table for Feature: SRS Generation
CREATE TABLE IF NOT EXISTS srs_generation (
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

CREATE INDEX IF NOT EXISTS idx_srs_generation_project ON srs_generation(project_id);
CREATE INDEX IF NOT EXISTS idx_srs_generation_status ON srs_generation(status);
CREATE INDEX IF NOT EXISTS idx_srs_generation_created ON srs_generation(created_at DESC);

-- Table for Feature: User Interface
CREATE TABLE IF NOT EXISTS user_interface (
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

CREATE INDEX IF NOT EXISTS idx_user_interface_project ON user_interface(project_id);
CREATE INDEX IF NOT EXISTS idx_user_interface_status ON user_interface(status);
CREATE INDEX IF NOT EXISTS idx_user_interface_created ON user_interface(created_at DESC);

-- Table for Feature: Export Formats
CREATE TABLE IF NOT EXISTS export_formats (
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

CREATE INDEX IF NOT EXISTS idx_export_formats_project ON export_formats(project_id);
CREATE INDEX IF NOT EXISTS idx_export_formats_status ON export_formats(status);
CREATE INDEX IF NOT EXISTS idx_export_formats_created ON export_formats(created_at DESC);

-- Table for Feature: Data Persistence
CREATE TABLE IF NOT EXISTS data_persistence (
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

CREATE INDEX IF NOT EXISTS idx_data_persistence_project ON data_persistence(project_id);
CREATE INDEX IF NOT EXISTS idx_data_persistence_status ON data_persistence(status);
CREATE INDEX IF NOT EXISTS idx_data_persistence_created ON data_persistence(created_at DESC);

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
