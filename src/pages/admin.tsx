import { LogOut } from "lucide-react";
import { useState } from "react";
import { ImageDialog } from "@/components/admin/image-dialog";
import { ProjectDialog } from "@/components/admin/project-dialog";
import { ServiceDialog } from "@/components/admin/services-dialog";
import { SignInForm } from "@/components/forms/sign-in-form";
import { PageSEO } from "@/components/seo/page-seo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabase } from "@/hooks/use-supabase";
import supabase from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";

export function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");

  const {
    data: projects,
    loading: loadingProjects,
    error: projectsError,
    refetch: refetchProjects,
  } = useSupabase({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, cover_image:images(*)")
        .eq("cover_image.type", "cover");
      return { data, error };
    },
  });

  const {
    data: services,
    loading: loadingServices,
    error: servicesError,
    refetch: refetchServices,
  } = useSupabase({
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      return { data, error };
    },
  });

  const {
    data: images,
    loading: loadingImages,
    error: imagesError,
    refetch: refetchImages,
  } = useSupabase({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });
      return { data, error };
    },
  });

  const refreshProjects = () => {
    refetchProjects();
  };

  const refreshServices = () => {
    refetchServices();
  };

  const refreshImages = () => {
    refetchImages();
  };

  if (!isAuthenticated) {
    return (
      <>
        <PageSEO
          title="Admin Login - Mami Hasturk Portfolio"
          description="Admin login page for portfolio management"
          noindex={true}
          nofollow={true}
          url="/admin"
        />
        <SignInForm />
      </>
    );
  }

  if (loadingProjects || loadingServices || loadingImages) {
    return (
      <>
        <PageSEO
          title="Admin Dashboard - Mami Hasturk Portfolio"
          description="Admin dashboard for portfolio management"
          noindex={true}
          nofollow={true}
          url="/admin"
        />
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
            <p className="mt-2 text-muted-foreground">
              Loading admin dashboard...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (projectsError || servicesError || imagesError) {
    return (
      <>
        <PageSEO
          title="Admin Dashboard - Mami Hasturk Portfolio"
          description="Admin dashboard for portfolio management"
          noindex={true}
          nofollow={true}
          url="/admin"
        />
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">
              Error loading data. Please try again.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO
        title="Admin Dashboard - Mami Hasturk Portfolio"
        description="Admin dashboard for portfolio management"
        noindex={true}
        nofollow={true}
        url="/admin"
      />
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage your projects, services, and images
              </p>
            </div>
            <Button variant="ghost" className="mb-4 border" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6 border rounded-md p-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <ProjectDialog
                projects={projects ?? []}
                refreshProjects={refreshProjects}
              />
            </TabsContent>
            <TabsContent value="services">
              <ServiceDialog
                services={services ?? []}
                refreshServices={refreshServices}
                isLoadingServices={loadingServices}
              />
            </TabsContent>
            <TabsContent value="images">
              <ImageDialog
                images={images ?? []}
                projects={projects ?? []}
                services={services ?? []}
                refreshImages={refreshImages}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
