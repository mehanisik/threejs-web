import { motion } from "framer-motion";
import { AboutForm } from "@/components/forms/about-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useResourceManagement } from "@/hooks/use-resource-management";
import type {
  AboutRecord,
  BaseManagementProps,
  TableColumn,
} from "@/types/admin";
import { EditFormHeader } from "../shared/edit-form-header";
import { LoadingSpinner } from "../shared/loading-spinner";
import { ManagementView } from "../shared/management-view";

const aboutColumns: TableColumn<AboutRecord>[] = [
  {
    key: "bio",
    label: "Bio",
    render: (about) => (
      <div className="flex items-center gap-3">
        {about.portrait_url && (
          <img
            src={about.portrait_url}
            alt="Portrait"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <p className="text-sm text-foreground/70 line-clamp-2">
          {about.bio.length > 100
            ? `${about.bio.substring(0, 100)}...`
            : about.bio}
        </p>
      </div>
    ),
  },
  {
    key: "address",
    label: "Location",
    className: "w-40 text-foreground/60",
  },
  {
    key: "languages",
    label: "Languages",
    render: (about) => (
      <div className="flex flex-wrap gap-1">
        {about.languages?.slice(0, 3).map((lang: string, index: number) => (
          <Badge
            key={`${about.id}-lang-${lang}-${index}`}
            variant="secondary"
            className="text-xs"
          >
            {lang}
          </Badge>
        ))}
        {about.languages && about.languages.length > 3 && (
          <Badge variant="outline" className="text-xs bg-foreground/10">
            +{about.languages.length - 3}
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: "tools",
    label: "Tools",
    render: (about) => (
      <div className="flex flex-wrap gap-1">
        {about.tools?.slice(0, 3).map((tool: string, index: number) => (
          <Badge
            key={`${about.id}-tool-${tool}-${index}`}
            variant="secondary"
            className="text-xs"
          >
            {tool}
          </Badge>
        ))}
        {about.tools && about.tools.length > 3 && (
          <Badge variant="outline" className="text-xs bg-foreground/10    ">
            +{about.tools.length - 3}
          </Badge>
        )}
      </div>
    ),
  },
];

export function AboutManagement({
  viewMode,
  onSwitchToEdit,
  onEditItem,
  editingItemId,
}: BaseManagementProps) {
  const {
    records: aboutRecords,
    isLoading,
    editingRecord: editingAbout,
    handleEdit,
    handleDelete,
    handleSave,
    handleFormSave,
    handleFormCancel,
    error,
  } = useResourceManagement<AboutRecord>({
    tableName: "about",
    sortConfig: { column: "created_at", ascending: false },
    editingItemId,
    onEditItem,
    disableCreate: true,
  });

  const renderQuickInfo = (about: AboutRecord) => (
    <div>
      <h4 className="font-medium line-clamp-1">
        {about.bio.substring(0, 40)}...
      </h4>
      <p className="text-sm text-foreground/50">
        {about.address || "No location"}
      </p>
    </div>
  );

  if (viewMode === "edit") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Card>
          <EditFormHeader
            isEditing={!!editingAbout}
            entityName="About"
            editingItemTitle={editingAbout?.bio.substring(0, 30)}
            hideAddNew={true}
          />
          <CardContent>
            <AboutForm
              editingAbout={editingAbout}
              onSave={handleFormSave}
              onCancel={handleFormCancel}
              handleSave={handleSave}
            />
          </CardContent>
        </Card>

        {!editingAbout && (
          <Card>
            <EditFormHeader
              isEditing={false}
              entityName="About"
              hideAddNew={true}
            />
            <CardContent>
              <div className="grid gap-3 max-h-60 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : (
                  aboutRecords?.map((about) => (
                    <div
                      key={about.id}
                      className="flex items-center justify-between p-3 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
                    >
                      {renderQuickInfo(about)}
                      <button
                        type="button"
                        onClick={() => handleEdit(about)}
                        className="text-foreground/60 hover:text-foreground text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    );
  }

  return (
    <ManagementView
      records={aboutRecords}
      isLoading={isLoading}
      entityName="about"
      entityNamePlural="About Sections"
      columns={aboutColumns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onSwitchToEdit={onSwitchToEdit}
      renderQuickInfo={renderQuickInfo}
      editingRecord={editingAbout}
      hideAddNew={true}
    />
  );
}
