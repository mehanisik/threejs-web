-- Seed initial data for the portfolio

-- Insert sample projects
INSERT INTO projects (title, description, city, date, external_url, slug, tags, order_index) VALUES
(
  'Brand Identity Design',
  'Complete brand identity design for a modern tech startup, including logo, color palette, typography, and brand guidelines.',
  'Warsaw',
  '2024',
  'https://example.com/project1',
  'brand-identity-design',
  ARRAY['Branding', 'Logo Design', 'Typography'],
  1
),
(
  'E-commerce Website Redesign',
  'Modern e-commerce website redesign with improved user experience, mobile-first design, and conversion optimization.',
  'Warsaw',
  '2024',
  'https://example.com/project2',
  'ecommerce-redesign',
  ARRAY['UI/UX', 'E-commerce', 'Web Design'],
  2
),
(
  'Mobile App Interface',
  'Intuitive mobile app interface design with focus on user experience, accessibility, and modern design principles.',
  'Warsaw',
  '2023',
  'https://example.com/project3',
  'mobile-app-interface',
  ARRAY['Mobile Design', 'UI/UX', 'App Design'],
  3
),
(
  'Marketing Campaign Visuals',
  'Comprehensive marketing campaign visuals including social media graphics, banners, and promotional materials.',
  'Warsaw',
  '2023',
  'https://example.com/project4',
  'marketing-campaign',
  ARRAY['Marketing', 'Social Media', 'Graphics'],
  4
);

-- Insert sample services
INSERT INTO services (title, description, service_code, slug, icon_url, order_index) VALUES
(
  'UI/UX Design',
  'Creating intuitive and beautiful user interfaces with focus on user experience and accessibility.',
  'ui-ux-design',
  'ui-ux-design',
  'https://example.com/icons/ui-ux.svg',
  1
),
(
  'Brand Identity',
  'Complete brand identity design including logos, color palettes, typography, and brand guidelines.',
  'brand-identity',
  'brand-identity',
  'https://example.com/icons/brand.svg',
  2
),
(
  'Web Design',
  'Modern, responsive web design with focus on performance, accessibility, and user experience.',
  'web-design',
  'web-design',
  'https://example.com/icons/web.svg',
  3
),
(
  'Mobile App Design',
  'Mobile-first design approach for iOS and Android applications with native feel and optimal performance.',
  'mobile-design',
  'mobile-design',
  'https://example.com/icons/mobile.svg',
  4
),
(
  'Print Design',
  'Professional print design including business cards, brochures, posters, and marketing materials.',
  'print-design',
  'print-design',
  'https://example.com/icons/print.svg',
  5
),
(
  'Social Media Graphics',
  'Eye-catching social media graphics and templates for consistent brand presence across platforms.',
  'social-media',
  'social-media',
  'https://example.com/icons/social.svg',
  6
);

-- Insert sample images (placeholder URLs - you'll need to replace with actual image URLs)
INSERT INTO images (url, type, project_id) VALUES
(
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  'cover',
  (SELECT id FROM projects WHERE slug = 'brand-identity-design')
),
(
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'cover',
  (SELECT id FROM projects WHERE slug = 'ecommerce-redesign')
),
(
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
  'cover',
  (SELECT id FROM projects WHERE slug = 'mobile-app-interface')
),
(
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  'cover',
  (SELECT id FROM projects WHERE slug = 'marketing-campaign')
);

-- Insert service images
INSERT INTO images (url, type, service_id) VALUES
(
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  'services',
  (SELECT id FROM services WHERE service_code = 'ui-ux-design')
),
(
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  'services',
  (SELECT id FROM services WHERE service_code = 'brand-identity')
),
(
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
  'services',
  (SELECT id FROM services WHERE service_code = 'web-design')
),
(
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  'services',
  (SELECT id FROM services WHERE service_code = 'mobile-design')
),
(
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  'services',
  (SELECT id FROM services WHERE service_code = 'print-design')
),
(
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  'services',
  (SELECT id FROM services WHERE service_code = 'social-media')
);

-- Insert a sample portrait image
INSERT INTO images (url, type) VALUES
(
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  'portrait'
);
