import supabase from "./supabase";

const STORAGE_BUCKETS = {
  name: "images",
  public: true,
  allowedMimeTypes: ["image/*"],
  fileSizeLimit: 5242880,
};

export async function initializeStorageBuckets() {
  try {
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    const existingBucketNames =
      existingBuckets?.map((bucket) => bucket.name) || [];

    if (!existingBucketNames.includes(STORAGE_BUCKETS.name)) {
      console.log(`Creating bucket: ${STORAGE_BUCKETS.name}`);

      const { error } = await supabase.storage.createBucket(
        STORAGE_BUCKETS.name,
        {
          public: STORAGE_BUCKETS.public,
          allowedMimeTypes: STORAGE_BUCKETS.allowedMimeTypes,
          fileSizeLimit: STORAGE_BUCKETS.fileSizeLimit,
        },
      );

      if (error) {
        console.error(
          `Failed to create bucket ${STORAGE_BUCKETS.name}:`,
          error,
        );
      } else {
        console.log(`Successfully created bucket: ${STORAGE_BUCKETS.name}`);
      }
    }
  } catch (error) {
    console.error("Failed to initialize storage buckets:", error);
  }
}

export async function ensureBucketExists(bucketName: string): Promise<boolean> {
  try {
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    const existingBucketNames =
      existingBuckets?.map((bucket) => bucket.name) || [];

    if (existingBucketNames.includes(bucketName)) {
      console.log(`Bucket ${bucketName} already exists`);
      return true;
    }

    console.log(`Creating bucket: ${bucketName}`);
    const { error } = await supabase.storage.createBucket(bucketName, {
      public: STORAGE_BUCKETS.public,
      allowedMimeTypes: STORAGE_BUCKETS.allowedMimeTypes,
      fileSizeLimit: STORAGE_BUCKETS.fileSizeLimit,
    });

    if (error) {
      console.error(`Failed to create bucket ${bucketName}:`, error);
      return false;
    }

    console.log(`Successfully created bucket: ${bucketName}`);
    return true;
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName} exists:`, error);
    return false;
  }
}

export async function listImagesFromStorage(
  bucket: string,
  folder = "v1",
): Promise<{ data: any[] | null; error: any }> {
  try {
    await ensureBucketExists(bucket);

    const { data, error } = await supabase.storage.from(bucket).list(folder, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      return { data: null, error };
    }

    const imageFiles =
      data
        ?.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))
        .map((file) => ({
          ...file,
          publicUrl: supabase.storage
            .from(bucket)
            .getPublicUrl(`${folder}/${file.name}`).data.publicUrl,
        })) || [];

    return { data: imageFiles, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteImageFromStorage(
  bucket: string,
  filePath: string,
): Promise<{ error: any }> {
  try {
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData.user) {
      console.error("Authentication error:", authError);
      return { error: new Error("Authentication required to delete images") };
    }

    console.log(`Deleting image from ${bucket}: ${filePath}`);
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error(`Failed to delete image from ${bucket}:`, error);
    }

    return { error };
  } catch (error) {
    console.error("Error in deleteImageFromStorage:", error);
    return { error };
  }
}

export async function uploadFileToStorage(
  file: File,
  bucket: string,
  path?: string,
): Promise<{ data: { publicUrl: string } | null; error: any }> {
  try {
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData.user) {
      console.error("Authentication error:", authError);
      return {
        data: null,
        error: new Error("Authentication required to upload files"),
      };
    }

    console.log(`Starting upload to ${bucket}...`);
    console.log(`File: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

    const bucketExists = await ensureBucketExists(bucket);
    if (!bucketExists) {
      return {
        data: null,
        error: new Error(`Failed to create or access bucket ${bucket}`),
      };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const filePath = path || `v1/${fileName}`;
    console.log(`Target path: ${filePath}`);

    try {
      await supabase.storage.from(bucket).list("v1");
    } catch (folderError) {
      console.log("v1 folder might not exist, will be created automatically");
    }

    console.log(`Uploading file to ${bucket}/${filePath}...`);
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(`Upload error for ${bucket}/${filePath}:`, uploadError);
      return { data: null, error: uploadError };
    }

    console.log(
      `Upload successful, getting public URL for ${bucket}/${filePath}`,
    );
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    if (data?.publicUrl) {
      console.log(`Public URL generated: ${data.publicUrl}`);
    } else {
      console.error("Failed to generate public URL");
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in uploadFileToStorage:", error);
    return { data: null, error };
  }
}

export async function checkBucketExists(bucketName: string): Promise<boolean> {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    return buckets
      ? buckets.some((bucket) => bucket.name === bucketName)
      : false;
  } catch {
    return false;
  }
}

export const uploadImage = async (
  file: File,
  bucket = "images",
): Promise<string | null> => {
  try {
    await ensureBucketExists(bucket);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `v1/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

export const uploadMultipleImages = async (
  files: File[],
  bucket = "images",
): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const url = await uploadImage(file, bucket);
    if (url) {
      urls.push(url);
    }
  }

  return urls;
};

export const deleteImage = async (
  url: string,
  bucket = "images",
): Promise<boolean> => {
  try {
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];

    const { error } = await supabase.storage.from(bucket).remove([fileName]);

    if (error) {
      console.error("Delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
};

export const uploadFromUrl = async (
  imageUrl: string,
  bucket = "images",
): Promise<string | null> => {
  try {
    await ensureBucketExists(bucket);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${imageUrl.split(".").pop()?.split("?")[0] || "jpg"}`;
    const file = new File([blob], fileName, { type: blob.type });

    return await uploadImage(file, bucket);
  } catch (error) {
    console.error("Upload from URL error:", error);
    return null;
  }
};
