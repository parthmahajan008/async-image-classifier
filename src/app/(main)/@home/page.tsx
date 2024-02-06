"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setSelectedFile(files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    reader.readAsDataURL(files[0]);
    setLoading(false);
  }
  const onSubmitDisabled = !previewImage && !selectedFile;
  return (
    <div className="flex h-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Submit an Image</CardTitle>
          <CardDescription>
            Upload a Image to classify asynchronously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Input
              id="img"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {isLoading && (
              <Loader2 className="mx-auto mt-6 h-6 w-6 animate-spin  text-slate-500" />
            )}
            {previewImage && selectedFile && (
              <div className="relative aspect-video w-full">
                <Image
                  src={previewImage}
                  alt={selectedFile.name}
                  className="mt-2 object-contain text-center text-gray-600"
                  fill
                />
              </div>
            )}
            {previewImage && selectedFile && (
              <Button
                variant={"destructive"}
                onClick={() => {
                  setPreviewImage(null);
                  setSelectedFile(null);
                }}
              >
                {" "}
                Remove File
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" disabled={onSubmitDisabled}>
            Classify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
