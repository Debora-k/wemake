-- Seed categories
INSERT INTO categories (name, description) VALUES
('SaaS', 'Software as a Service products'),
('Mobile Apps', 'Mobile applications for iOS and Android'),
('Developer Tools', 'Tools and utilities for developers'),
('AI/ML', 'Artificial Intelligence and Machine Learning products'),
('E-commerce', 'Online shopping and marketplace solutions');

-- Seed topics
INSERT INTO topics (name, slug) VALUES 
('Product Development', 'product-development'),
('Design', 'design'),
('Marketing', 'marketing'),
('Growth', 'growth'),
('Entrepreneurship', 'entrepreneurship');

-- Seed products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id) VALUES
('CodeCraft', 'AI-Powered Code Generation', 'An advanced code generation tool', 'Uses GPT-4 to generate code', 'https://example.com/icon1.png', 'https://codecraft.dev', '{"views":150,"reviews":12}', 'bfa8e366-c977-4e58-8003-740a7cc1e778', 1),
('DesignMaster', 'Design System Manager', 'Complete design system solution', 'Manages design tokens and components', 'https://example.com/icon2.png', 'https://designmaster.io', '{"views":200,"reviews":15}', 'bfa8e366-c977-4e58-8003-740a7cc1e778', 2),
('DataFlow', 'Data Pipeline Builder', 'Visual data pipeline creator', 'Drag and drop interface for ETL', 'https://example.com/icon3.png', 'https://dataflow.tech', '{"views":180,"reviews":8}', 'bfa8e366-c977-4e58-8003-740a7cc1e778', 3),
('AIWriter', 'AI Content Generator', 'Generate content with AI', 'Uses ML for content creation', 'https://example.com/icon4.png', 'https://aiwriter.app', '{"views":300,"reviews":25}', 'bfa8e366-c977-4e58-8003-740a7cc1e778', 4),
('ShopSmart', 'E-commerce Platform', 'Complete e-commerce solution', 'All-in-one shopping platform', 'https://example.com/icon5.png', 'https://shopsmart.com', '{"views":250,"reviews":20}', 'bfa8e366-c977-4e58-8003-740a7cc1e778', 5);

-- Seed product_upvotes (bridge table)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778');

-- Seed reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 5, 'Excellent product, highly recommended!'),
(2, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 4, 'Great features but needs some improvements'),
(3, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 5, 'Perfect for our use case'),
(4, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 4, 'Very useful AI tool'),
(5, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 5, 'Best e-commerce solution');

-- Seed posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('Building a SaaS Product', 'Tips and tricks for building SaaS products...', 1, 'bfa8e366-c977-4e58-8003-740a7cc1e778'),
('Design Systems 101', 'Introduction to design systems...', 2, 'bfa8e366-c977-4e58-8003-740a7cc1e778'),
('Marketing Strategies', 'Effective marketing strategies for startups...', 3, 'bfa8e366-c977-4e58-8003-740a7cc1e778'),
('Growth Hacking', 'Growth hacking techniques for 2024...', 4, 'bfa8e366-c977-4e58-8003-740a7cc1e778'),
('Startup Journey', 'My journey building a startup...', 5, 'bfa8e366-c977-4e58-8003-740a7cc1e778');

-- Seed post_upvotes (bridge table)
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778');

-- Seed post_replies
INSERT INTO post_replies (reply, post_id, profile_id, parent_id) VALUES
('Great insights!', 1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', NULL),
('Thanks for sharing', 2, 'bfa8e366-c977-4e58-8003-740a7cc1e778', NULL),
('Very helpful post', 3, 'bfa8e366-c977-4e58-8003-740a7cc1e778', NULL),
('Looking forward to more', 4, 'bfa8e366-c977-4e58-8003-740a7cc1e778', NULL),
('Amazing journey!', 5, 'bfa8e366-c977-4e58-8003-740a7cc1e778', NULL);

-- Seed gpt_ideas
INSERT INTO gpt_ideas (idea, views, claimed_by) VALUES
('AI-powered task management system', 100, 'bfa8e366-c977-4e58-8003-740a7cc1e778'),
('Machine learning code reviewer', 150, NULL),
('Automated documentation generator', 200, NULL),
('Smart meeting scheduler', 120, NULL),
('AI writing assistant', 180, NULL);

-- Seed gpt_ideas_likes (bridge table)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778');

-- Seed team
INSERT INTO team (product_name, team_size, equity_split, roles, product_description, product_stage) VALUES
('CodeCraft', 3, 33, 'Developer, Designer, Product Manager', 'AI-powered code generation platform', 'mvp'),
('DesignMaster', 2, 50, 'Developer, Designer', 'Design system management tool', 'prototype'),
('DataFlow', 4, 25, 'Developer, Designer, PM, Marketing', 'Data pipeline solution', 'product'),
('AIWriter', 2, 50, 'Developer, AI Engineer', 'AI content generation platform', 'mvp'),
('ShopSmart', 3, 33, 'Developer, Designer, Marketing', 'E-commerce platform', 'product');

-- Seed message_rooms
INSERT INTO message_rooms DEFAULT VALUES;

-- Seed message_room_members (bridge table)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778');

-- Seed messages
INSERT INTO messages (message_room_id, sender_id, content) VALUES
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'Hello!'),
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'How are you?'),
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'Let''s collaborate'),
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'Sounds good'),
(1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'Great!');

-- Seed notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type) VALUES
('bfa8e366-c977-4e58-8003-740a7cc1e778', 1, NULL, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'review'),
('bfa8e366-c977-4e58-8003-740a7cc1e778', NULL, 1, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'reply'),
('bfa8e366-c977-4e58-8003-740a7cc1e778', NULL, NULL, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'follow'),
('bfa8e366-c977-4e58-8003-740a7cc1e778', NULL, 2, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'mention'),
('bfa8e366-c977-4e58-8003-740a7cc1e778', 2, NULL, 'bfa8e366-c977-4e58-8003-740a7cc1e778', 'review');

-- Seed jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range) VALUES
('Senior Developer', 'Looking for experienced developer', 'Lead development team...', '5+ years experience...', 'Health insurance, 401k...', 'React, Node.js, TypeScript', 'TechCorp', 'https://example.com/logo1.png', 'San Francisco', 'https://example.com/apply1', 'full-time', 'remote', '$150,000 - $160,000'),
('UI Designer', 'Creative designer needed', 'Design user interfaces...', '3+ years experience...', 'Flexible hours, Remote work...', 'Figma, Sketch, Adobe XD', 'DesignCo', 'https://example.com/logo2.png', 'New York', 'https://example.com/apply2', 'full-time', 'hybrid', '$90,000 - $100,000'),
('Product Manager', 'Experienced PM wanted', 'Lead product strategy...', '4+ years experience...', 'Stock options, Health insurance...', 'Agile, Scrum, Product Strategy', 'ProductHouse', 'https://example.com/logo3.png', 'Seattle', 'https://example.com/apply3', 'full-time', 'on-site', '$120,000 - $130,000'),
('Frontend Developer', 'React developer needed', 'Build user interfaces...', '2+ years experience...', 'Remote work, Flexible hours...', 'React, TypeScript, CSS', 'WebCorp', 'https://example.com/logo4.png', 'Austin', 'https://example.com/apply4', 'part-time', 'remote', '$70,000 - $80,000'),
('Backend Developer', 'Node.js developer wanted', 'Build APIs and services...', '3+ years experience...', 'Health insurance, 401k...', 'Node.js, PostgreSQL, AWS', 'ServerCo', 'https://example.com/logo5.png', 'Boston', 'https://example.com/apply5', 'full-time', 'hybrid', '$130,000 - $140,000'); 