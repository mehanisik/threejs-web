CREATE TYPE image_type AS ENUM ('portrait', 'project', 'cover', 'preview', 'services');

CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  city TEXT,
  date TEXT,
  external_url TEXT,
  slug TEXT,
  tags TEXT[],
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  service_code TEXT NOT NULL,
  slug TEXT,
  icon_url TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  type image_type,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_projects_order_index ON projects(order_index);
CREATE INDEX idx_services_order_index ON services(order_index);
CREATE INDEX idx_images_type ON images(type);
CREATE INDEX idx_images_project_id ON images(project_id);
CREATE INDEX idx_images_service_id ON images(service_id);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to images" ON images
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert services" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update services" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete services" ON services
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert images" ON images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update images" ON images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete images" ON images
  FOR DELETE USING (auth.role() = 'authenticated');
