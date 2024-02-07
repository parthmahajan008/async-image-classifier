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
import { toast } from "@/components/ui/use-toast";
export default function HomePage() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!selectedFile) return;
    try {
      const data = new FormData();
      data.set("file", selectedFile);

      const res = fetch("/api/producer", {
        method: "POST",
        body: data,
      });

      if (!(await res).ok) {
        toast({
          title: "Failed",
          description: `${(await res).statusText}`,
        });
      } else if ((await res).ok) {
        toast({
          title: "Scheduled",
          description: `Your ${selectedFile.name} is scheduled for upload`,
        });
        return;
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // const onSubmitDisabled = !previewImage && !selectedFile;
  return (
    <div className="flex h-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Submit an Image</CardTitle>
          <CardDescription>
            Upload a Image to classify asynchronously
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <div>
              <Input
                id="img"
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0])}
              />

              {isLoading && (
                <Loader2 className="mx-auto mt-6 h-6 w-6 animate-spin  text-slate-500" />
              )}
              {/* {previewImage && selectedFile && (
              <div className="relative aspect-video w-full">
                <Image
                  src={previewImage}
                  alt={selectedFile.name}
                  className="mt-2 object-contain text-center text-gray-600"
                  fill
                />
              </div>
            )} */}
              {/* {previewImage && selectedFile && (
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
            )} */}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" disabled={isLoading}>
              Classify
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
