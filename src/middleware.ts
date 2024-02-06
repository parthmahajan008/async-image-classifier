import multer from "multer";
import multiparty from "multiparty";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";



const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export function middleware(req: NextApiRequest, res: NextResponse) {
  const form = new multiparty.Form();

  form.parse(req, async (error: any, fields: any, files: File[]) => {
    if (error) {
      console.error("Error parsing form:", error);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 },
      );
    }

    req.body = files;
    // req.files = files;
    return NextResponse.next();
  });
}

export const config = {
  matcher: "/api/upload",
};
