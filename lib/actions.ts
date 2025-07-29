"use server";

import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "./auth";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session || !session.user)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // First, create or find author
    let authorId;
    try {
      // Try to find existing author by email
      const existingAuthor = await writeClient.fetch(
        `*[_type == "author" && email == $email][0]`,
        { email: session.user?.email }
      );
      
      if (existingAuthor) {
        authorId = existingAuthor._id;
      } else {
        // Create new author
        const newAuthor = await writeClient.create({
          _type: "author",
          name: session.user?.name || "Anonymous",
          email: session.user?.email,
          image: session.user?.image,
        });
        authorId = newAuthor._id;
      }
    } catch (authorError) {
      console.log("Author creation/fetch error:", authorError);
      return parseServerActionResponse({
        error: "Failed to create/find author",
        status: "ERROR",
      });
    }

    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: authorId,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
