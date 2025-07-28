-- Migration to document and support organized storage folder structure
-- This migration documents the new folder organization system

-- Create a function to help with folder organization
CREATE OR REPLACE FUNCTION get_storage_folder_by_type(media_type TEXT)
RETURNS TEXT AS $$
BEGIN
  CASE media_type
    WHEN 'portrait' THEN RETURN 'portraits';
    WHEN 'project' THEN RETURN 'projects';
    WHEN 'cover' THEN RETURN 'covers';
    WHEN 'preview' THEN RETURN 'previews';
    WHEN 'services' THEN RETURN 'services';
    WHEN 'video' THEN RETURN 'videos';
    WHEN 'gif' THEN RETURN 'gifs';
    ELSE RETURN 'misc';
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get folder by file extension
CREATE OR REPLACE FUNCTION get_storage_folder_by_extension(file_name TEXT)
RETURNS TEXT AS $$
DECLARE
  file_extension TEXT;
BEGIN
  file_extension := LOWER(SPLIT_PART(file_name, '.', -1));
  
  IF file_extension IN ('mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv', '3gp', '3g2') THEN
    RETURN 'videos';
  ELSIF file_extension = 'gif' THEN
    RETURN 'gifs';
  ELSE
    RETURN 'images';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Update storage policies to work with organized folders
-- The existing policies should work with the new folder structure
-- since they use bucket_id = 'images' which covers all folders

-- Create a view to help with storage organization
CREATE OR REPLACE VIEW storage_organization AS
SELECT 
  'portraits' as folder_name,
  'Profile pictures and portrait images' as description,
  'portrait' as media_type
UNION ALL
SELECT 
  'projects' as folder_name,
  'Project showcase images and media' as description,
  'project' as media_type
UNION ALL
SELECT 
  'covers' as folder_name,
  'Project cover images' as description,
  'cover' as media_type
UNION ALL
SELECT 
  'previews' as folder_name,
  'Project preview images' as description,
  'preview' as media_type
UNION ALL
SELECT 
  'services' as folder_name,
  'Service-related images and media' as description,
  'services' as media_type
UNION ALL
SELECT 
  'videos' as folder_name,
  'Video files (MP4, WebM, OGG, MOV, AVI, WMV, FLV, MKV, 3GP, 3G2)' as description,
  'video' as media_type
UNION ALL
SELECT 
  'gifs' as folder_name,
  'Animated GIF files' as description,
  'gif' as media_type
UNION ALL
SELECT 
  'images' as folder_name,
  'General image files (JPEG, PNG, WebP, SVG)' as description,
  'image' as media_type
UNION ALL
SELECT 
  'misc' as folder_name,
  'Miscellaneous files' as description,
  'misc' as media_type;

-- Add a comment to document the folder structure
COMMENT ON VIEW storage_organization IS 'Documentation of the organized storage folder structure for the portfolio application';

-- Create an index on the media_type column for better performance
CREATE INDEX IF NOT EXISTS idx_images_media_type_type ON images(media_type, type);
