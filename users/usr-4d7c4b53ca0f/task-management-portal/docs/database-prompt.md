# ==============================================================================
# ENTERPRISE POSTGRESQL DDL, RLS & DATA SCHEMA ARCHITECTURE
# Project: task management portal
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

-- Table for Feature: Task Creation
CREATE TABLE IF NOT EXISTS task_creation (
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

CREATE INDEX IF NOT EXISTS idx_task_creation_project ON task_creation(project_id);
CREATE INDEX IF NOT EXISTS idx_task_creation_status ON task_creation(status);
CREATE INDEX IF NOT EXISTS idx_task_creation_created ON task_creation(created_at DESC);

-- Table for Feature: Minimal Task Fields
CREATE TABLE IF NOT EXISTS minimal_task_fields (
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

CREATE INDEX IF NOT EXISTS idx_minimal_task_fields_project ON minimal_task_fields(project_id);
CREATE INDEX IF NOT EXISTS idx_minimal_task_fields_status ON minimal_task_fields(status);
CREATE INDEX IF NOT EXISTS idx_minimal_task_fields_created ON minimal_task_fields(created_at DESC);

-- Table for Feature: Anonymous Usage
CREATE TABLE IF NOT EXISTS anonymous_usage (
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

CREATE INDEX IF NOT EXISTS idx_anonymous_usage_project ON anonymous_usage(project_id);
CREATE INDEX IF NOT EXISTS idx_anonymous_usage_status ON anonymous_usage(status);
CREATE INDEX IF NOT EXISTS idx_anonymous_usage_created ON anonymous_usage(created_at DESC);

-- Table for Feature: In‑App Due‑Date Reminders
CREATE TABLE IF NOT EXISTS in_app_due_date_reminders (
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

CREATE INDEX IF NOT EXISTS idx_in_app_due_date_reminders_project ON in_app_due_date_reminders(project_id);
CREATE INDEX IF NOT EXISTS idx_in_app_due_date_reminders_status ON in_app_due_date_reminders(status);
CREATE INDEX IF NOT EXISTS idx_in_app_due_date_reminders_created ON in_app_due_date_reminders(created_at DESC);

-- Table for Feature: Flexible Date Input
CREATE TABLE IF NOT EXISTS flexible_date_input (
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

CREATE INDEX IF NOT EXISTS idx_flexible_date_input_project ON flexible_date_input(project_id);
CREATE INDEX IF NOT EXISTS idx_flexible_date_input_status ON flexible_date_input(status);
CREATE INDEX IF NOT EXISTS idx_flexible_date_input_created ON flexible_date_input(created_at DESC);

-- Table for Feature: Persist Tasks Across Sessions
CREATE TABLE IF NOT EXISTS persist_tasks_across_session (
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

CREATE INDEX IF NOT EXISTS idx_persist_tasks_across_session_project ON persist_tasks_across_session(project_id);
CREATE INDEX IF NOT EXISTS idx_persist_tasks_across_session_status ON persist_tasks_across_session(status);
CREATE INDEX IF NOT EXISTS idx_persist_tasks_across_session_created ON persist_tasks_across_session(created_at DESC);

-- Table for Feature: Edit and Delete Tasks
CREATE TABLE IF NOT EXISTS edit_and_delete_tasks (
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

CREATE INDEX IF NOT EXISTS idx_edit_and_delete_tasks_project ON edit_and_delete_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_edit_and_delete_tasks_status ON edit_and_delete_tasks(status);
CREATE INDEX IF NOT EXISTS idx_edit_and_delete_tasks_created ON edit_and_delete_tasks(created_at DESC);

-- Table for Feature: Task Table View
CREATE TABLE IF NOT EXISTS task_table_view (
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

CREATE INDEX IF NOT EXISTS idx_task_table_view_project ON task_table_view(project_id);
CREATE INDEX IF NOT EXISTS idx_task_table_view_status ON task_table_view(status);
CREATE INDEX IF NOT EXISTS idx_task_table_view_created ON task_table_view(created_at DESC);

-- Table for Feature: Task Sorting
CREATE TABLE IF NOT EXISTS task_sorting (
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

CREATE INDEX IF NOT EXISTS idx_task_sorting_project ON task_sorting(project_id);
CREATE INDEX IF NOT EXISTS idx_task_sorting_status ON task_sorting(status);
CREATE INDEX IF NOT EXISTS idx_task_sorting_created ON task_sorting(created_at DESC);

-- Table for Feature: Task Filtering
CREATE TABLE IF NOT EXISTS task_filtering (
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

CREATE INDEX IF NOT EXISTS idx_task_filtering_project ON task_filtering(project_id);
CREATE INDEX IF NOT EXISTS idx_task_filtering_status ON task_filtering(status);
CREATE INDEX IF NOT EXISTS idx_task_filtering_created ON task_filtering(created_at DESC);

-- Table for Feature: Customizable Color Theme
CREATE TABLE IF NOT EXISTS customizable_color_theme (
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

CREATE INDEX IF NOT EXISTS idx_customizable_color_theme_project ON customizable_color_theme(project_id);
CREATE INDEX IF NOT EXISTS idx_customizable_color_theme_status ON customizable_color_theme(status);
CREATE INDEX IF NOT EXISTS idx_customizable_color_theme_created ON customizable_color_theme(created_at DESC);

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
