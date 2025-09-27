"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateChallenge } from "@/query-hooks/useCreateChallenge";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import DatePicker from "../ui/DatePicker";

type ChallengeForm = {
  title: string;
  description: string;
};

const schema = z.object({
  title: z.string(),
  description: z.string().nonempty("Description is required"),
  startAt: z.string().nonempty("Start date is required"),
  endAt: z.string().nonempty("End date is required"),
});

export default function NewChallengeForm() {
  const router = useRouter();
  const { mutateAsync } = useCreateChallenge();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: ChallengeForm) => {
    await mutateAsync(data);

    // 👉 replace with API call
    // await fetch("/api/challenges", { method: "POST", body: JSON.stringify(data) });
    reset();

    router.push("/");
  };

  return (
    <div className="card max-w-md w-full">
      <div className="card-body">
        <h2 className="card-title">Create New Challenge</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className={cn("input w-full", errors.title && "input-error")}
              placeholder="e.g. 100 Pushups — 30 Days"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className={cn(
                "textarea w-full",
                errors.title && "textarea-error",
              )}
              placeholder="Describe the challenge..."
              {...register("description")}
              rows={4}
            />

            {errors.description && (
              <span className="text-error text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Start at</legend>
            <DatePicker
              name="startAt"
              label="Start at"
              control={control}
              id="start-at-picker"
            />

            {errors.startAt && (
              <span className="text-error text-sm mt-1">
                {errors.startAt.message}
              </span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">End at</legend>
            <DatePicker
              name="endAt"
              label="End at"
              control={control}
              id="end-at-picker"
            />

            {errors.endAt && (
              <span className="text-error text-sm mt-1">
                {errors.endAt.message}
              </span>
            )}
          </fieldset>

          {/* <fieldset className="fieldset"> */}
          {/*   <legend className="fieldset-legend">Start at</legend> */}
          {/**/}
          {/*   <button type="button" popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" } as React.CSSProperties}> */}
          {/*     {startAt ? startAt.toLocaleDateString() : "Pick a date"} */}
          {/*   </button> */}
          {/*   <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}> */}
          {/*     <DayPicker className="react-day-picker" mode="single" selected={startAt} onSelect={setStartAt} /> */}
          {/*   </div> */}
          {/* </fieldset> */}
          {/**/}
          {/* <fieldset className="fieldset"> */}
          {/*   <legend className="fieldset-legend">End at</legend> */}
          {/**/}
          {/*   <button type="button" popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" } as React.CSSProperties}> */}
          {/*     {startAt ? startAt.toLocaleDateString() : "Pick a date"} */}
          {/*   </button> */}
          {/*   <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}> */}
          {/*     <DayPicker className="react-day-picker" mode="single" selected={startAt} onSelect={setStartAt} /> */}
          {/*   </div> */}
          {/* </fieldset> */}
          {/**/}
          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Creating..." : "Create Challenge"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
