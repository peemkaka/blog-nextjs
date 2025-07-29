'use client'
import React, { useActionState, useState } from 'react'
import MDEditor from "@uiw/react-md-editor";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { formSchema } from '@/lib/validation';
import {z} from 'zod';
import { useRouter } from "next/navigation";
import { createPitch } from '@/lib/actions';
import { toast } from "sonner";
const StartupForm = () => {
    const router = useRouter();
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("**Hello world!!!**");
     const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log("Form values are valid:", formValues);
      
      console.log("Calling createPitch...");
      const result = await createPitch(prevState, formData, pitch);
      
      console.log("createPitch result:", result);

      if (result.status == "SUCCESS") {
        toast.success("Your startup pitch has been created successfully");

        router.push(`/startup/${result._id}`);
      } else {
        console.log("Creation failed:", result.error);
        toast.error(result.error || "Failed to create startup");
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setError(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: '',
        status: 'INITIAL'
    });


    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input type="text" id="title" name="title" className='startup-form_Input'
                    required
                    placeholder='Startup Title'
                />
                {error.title && <p className='startup-form_error'>{error.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                <Input type="text" id="description" name="description" className='startup-form_Input'
                    required
                    placeholder='Startup Description'
                />
                {error.description && <p className='startup-form_error'>{error.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input type="text" id="category" name="category" className='startup-form_Input'
                    required
                    placeholder='Startup Category (Tech, Health, Education ...' />
                <div>
                    {error.category && <p className='startup-form_error'>{error.category}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <Input type="text" id="link" name="link" className='startup-form_Input'
                    required
                    placeholder='Startup Image URL' />
                <div>
                    {error.link && <p className='startup-form_error'>{error.link}</p>}
                </div>
            </div>
            <div data-color-mode='light'>
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    height={300}
                />
                {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}
            </div>
            <Button type='submit'
                disabled={isPending}
                className='startup-form_btn cursor-pointer text-white rounded-[15px]'>
                {isPending ? "Submitting..." : "Submit Startup"}
            </Button>
        </form>
    )
}

export default StartupForm