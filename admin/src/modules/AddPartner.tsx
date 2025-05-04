import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";

export function AddPartner() {
  const [formData, setFormData] = useState<{ 
    title: string;
    description: string;
    images: File[]; 
    link: string;
  }>({
    title: "",
    description: "",
    images: [], 
    link: ""
  });
  
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "images" && files ? Array.from(files) : value, 
    }));
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      images: [], 
      link: ""
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
  
      if (formData.images.length > 0) {
        formData.images.forEach((file) => {
          formDataToSend.append("images", file);
        });
      }
  
      await Fetch.post("partner", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      toast("Partner created successfully", { 
        action: { label: "Delete", onClick: () => console.log("Cancelled") }
      });
      window.location.reload();
      resetForm(); 
      setIsSheetOpen(false);
    } catch (error) {
      alert("Failed to create partner. Try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="default" className="bg-sky-600">
          Create Partner
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">
            Create new Partner
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <span>Fill in all fields to create a partner</span>
        </SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="title">
              Title{" "}
              <span
                className="text-blue-500"
              >
                *
              </span>
            </Label>
            <Input
              name="title"
              value={formData.title}
              type="text"
              placeholder="Title"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">
              Description{" "}
              <span
                className="text-blue-500"
              >
                *
              </span>
            </Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              type="text"
              placeholder="Description"
            />
          
          </div>
          <div className="space-y-1">
            <Label htmlFor="link">
              Link{" "}
              <span
                className="text-blue-500"
              >*</span>
            </Label>
            <Input
              id="link"
              name="link"
              value={formData.link || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">
              Image{" "}
              <span
                className="text-blue-500"
              >*</span>
            </Label>
            <div >
            <Input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
