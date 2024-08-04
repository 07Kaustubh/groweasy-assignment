import { useState, useEffect } from "react";
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

// Define the Tailwind CSS color palette
const tailwindColors = [
  "red-500",
  "yellow-500",
  "green-500",
  "blue-500",
  "indigo-500",
  "purple-500",
  "pink-500",
  "cyan-500",
  "lime-500",
  "orange-500",
];

const EditBannerSheet: React.FC<EditBannerSheetProps> = ({
  isOpen,
  onClose,
  banner,
  onSave,
}) => {
  const [updatedBanner, setUpdatedBanner] = useState<Banner>(banner);
  const [fromColor, setFromColor] = useState<string>("cyan-500");
  const [toColor, setToColor] = useState<string>("blue-500");

  useEffect(() => {
    setUpdatedBanner((prev) => ({
      ...prev,
      background: `bg-gradient-to-r from-${fromColor} to-${toColor}`,
    }));
  }, [fromColor, toColor]);

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
    <Sheet open={isOpen}>
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

          {/* From Color Dropdown */}
          <label className="block mb-2">From Color:</label>
          <select
            value={fromColor}
            onChange={(e) => setFromColor(e.target.value)}
            className="mb-4 block w-full p-2 border rounded-md"
          >
            {tailwindColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          {/* To Color Dropdown */}
          <label className="block mb-2">To Color:</label>
          <select
            value={toColor}
            onChange={(e) => setToColor(e.target.value)}
            className="mb-4 block w-full p-2 border rounded-md"
          >
            {tailwindColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          <div className="flex justify-end space-x-2">
            <Button type="submit" className="mr-4">
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
