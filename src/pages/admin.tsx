import { LogOut } from "lucide-react";
import { ImageDialog } from "@/components/admin/image-dialog";
import { ProjectDialog } from "@/components/admin/project-dialog";
import { ServiceDialog } from "@/components/admin/services-dialog";
import { SignInForm } from "@/components/forms/sign-in-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseTable } from "@/hooks/use-supabase-query";
import { useAuth } from "@/lib/auth";

export function AdminPage() {
  const { isAuthenticated, logout } = useAuth();

  const {
    records: projects,
    refresh: refreshProjects,
    isLoading: isLoadingProjects,
  } = useSupabaseTable("projects");
  const {
    records: services,
    refresh: refreshServices,
    isLoading: isLoadingServices,
  } = useSupabaseTable("services");
  const {
    records: images,
    refresh: refreshImages,
    isLoading: isLoadingImages,
  } = useSupabaseTable("images");

  if (!isAuthenticated) return <SignInForm />;
  return (
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
          defaultValue="projects"
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
              isLoadingProjects={isLoadingProjects}
            />
          </TabsContent>
          <TabsContent value="services">
            <ServiceDialog
              services={services ?? []}
              refreshServices={refreshServices}
              isLoadingServices={isLoadingServices}
            />
          </TabsContent>
          <TabsContent value="images">
            <ImageDialog
              images={images ?? []}
              projects={projects ?? []}
              refreshImages={refreshImages}
              isLoadingImages={isLoadingImages}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
