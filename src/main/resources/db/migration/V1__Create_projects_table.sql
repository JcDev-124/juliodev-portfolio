-- src/main/resources/db/migration/V1__Create_projects_table.sql
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_base64 TEXT,
    stack VARCHAR(255),
    link VARCHAR(255)
);

-- Tabela para armazenar a lista de tecnologias (collection)
CREATE TABLE IF NOT EXISTS project_technologies (
    project_id BIGINT NOT NULL,
    technologies VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
