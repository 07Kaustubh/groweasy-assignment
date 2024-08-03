// components/EditBannerSheet.tsx

import { useState } from "react";
import { Sheet, SheetHeader, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditBannerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  banner: Banner;
  onSave: (updatedBanner: Banner) => void;
}

interface Banner {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

const EditBannerSheet: React.FC<EditBannerSheetProps> = ({
  isOpen,
  onClose,
  banner,
  onSave,
}) => {
  const [updatedBanner, setUpdatedBanner] = useState<Banner>(banner);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedBanner);
    onClose();
  };

  return (
    <Sheet open={isOpen} onClose={onClose}>
      <SheetHeader>
        <h3 className="text-lg font-semibold">Edit Banner</h3>
      </SheetHeader>
      <SheetContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <Input
            name="title"
            value={updatedBanner.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="mb-4"
          />
          <Textarea
            name="description"
            value={updatedBanner.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="mb-4"
          />
          <Input
            name="cta"
            value={updatedBanner.cta}
            onChange={handleInputChange}
            placeholder="Call to Action"
            className="mb-4"
          />
          <Input
            name="image"
            value={updatedBanner.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="mb-4"
          />
          <Input
            name="background"
            value={updatedBanner.background}
            onChange={handleInputChange}
            placeholder="Background Class"
            className="mb-4"
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleSave} className="mr-4">
              Save
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditBannerSheet;
