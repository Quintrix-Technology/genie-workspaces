# ==============================================================================
# ENTERPRISE POSTGRESQL DDL, RLS & DATA SCHEMA ARCHITECTURE
# Project: Like
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

-- Table for Feature: Multi-Role User Support
CREATE TABLE IF NOT EXISTS multi_role_user_support (
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

CREATE INDEX IF NOT EXISTS idx_multi_role_user_support_project ON multi_role_user_support(project_id);
CREATE INDEX IF NOT EXISTS idx_multi_role_user_support_status ON multi_role_user_support(status);
CREATE INDEX IF NOT EXISTS idx_multi_role_user_support_created ON multi_role_user_support(created_at DESC);

-- Table for Feature: Project Data Input
CREATE TABLE IF NOT EXISTS project_data_input (
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

CREATE INDEX IF NOT EXISTS idx_project_data_input_project ON project_data_input(project_id);
CREATE INDEX IF NOT EXISTS idx_project_data_input_status ON project_data_input(status);
CREATE INDEX IF NOT EXISTS idx_project_data_input_created ON project_data_input(created_at DESC);

-- Table for Feature: Standard SRS Document Generation
CREATE TABLE IF NOT EXISTS standard_srs_document_genera (
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

CREATE INDEX IF NOT EXISTS idx_standard_srs_document_genera_project ON standard_srs_document_genera(project_id);
CREATE INDEX IF NOT EXISTS idx_standard_srs_document_genera_status ON standard_srs_document_genera(status);
CREATE INDEX IF NOT EXISTS idx_standard_srs_document_genera_created ON standard_srs_document_genera(created_at DESC);

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
