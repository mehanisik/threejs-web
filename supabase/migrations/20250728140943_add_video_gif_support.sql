-- Update image_type enum to include video types
ALTER TYPE image_type ADD VALUE IF NOT EXISTS 'video';
ALTER TYPE image_type ADD VALUE IF NOT EXISTS 'gif';

-- Update storage bucket to support video and GIF files
UPDATE storage.buckets 
SET 
  file_size_limit = 104857600, -- 100MB in bytes
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/x-flv',
    'video/x-matroska',
    'video/3gpp',
    'video/3gpp2'
  ]
WHERE id = 'images';

-- Add a new column to images table to track media type
ALTER TABLE images ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image';

-- Create an index for media_type for better performance
CREATE INDEX IF NOT EXISTS idx_images_media_type ON images(media_type);

-- Update existing images to have media_type = 'image'
UPDATE images SET media_type = 'image' WHERE media_type IS NULL;

-- Add a function to automatically set media_type based on file extension
CREATE OR REPLACE FUNCTION set_media_type_from_url()
RETURNS TRIGGER AS $$
BEGIN
  -- Set media_type based on file extension
  IF NEW.url LIKE '%.mp4' OR NEW.url LIKE '%.webm' OR NEW.url LIKE '%.ogg' OR 
     NEW.url LIKE '%.mov' OR NEW.url LIKE '%.avi' OR NEW.url LIKE '%.wmv' OR
     NEW.url LIKE '%.flv' OR NEW.url LIKE '%.mkv' OR NEW.url LIKE '%.3gp' OR
     NEW.url LIKE '%.3g2' THEN
    NEW.media_type := 'video';
  ELSIF NEW.url LIKE '%.gif' THEN
    NEW.media_type := 'gif';
  ELSE
    NEW.media_type := 'image';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set media_type
DROP TRIGGER IF EXISTS trigger_set_media_type ON images;
CREATE TRIGGER trigger_set_media_type
  BEFORE INSERT OR UPDATE ON images
  FOR EACH ROW
  EXECUTE FUNCTION set_media_type_from_url();
