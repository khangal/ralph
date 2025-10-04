"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateChallenge } from "@/query-hooks/useCreateChallenge";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import DatePicker from "../ui/DatePicker";
import { ChallengeFront } from "@/contexts/challenge/types";
import { useUpdateChallenge } from "@/query-hooks/useUpdateChallenge";

const schema = z.object({
  title: z.string(),
  description: z.string().nonempty("Description is required"),
  startAt: z.string().nonempty("Start date is required"),
  endAt: z.string().nonempty("End date is required"),
  visibility: z.enum(["public", "private"]).nullable(),
});

export default function ChallengeForm({
  challenge,
  action,
}: {
  action: "create" | "edit";
  challenge?: ChallengeFront;
}) {
  const router = useRouter();
  const { mutateAsync: create } = useCreateChallenge();
  const { mutateAsync: update } = useUpdateChallenge();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: challenge
      ? {
          ...challenge,
        }
      : {
          title: "",
          description: "",
          startAt: "",
          endAt: "",
          visibility: "public"
        },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(`-------------data---------------`)
    console.log(data)
    console.log(`----------------------------`)
    if (action === "edit") {
      await update({ ...data, id: challenge!.id });
      // 👉 implement edit functionality
      router.push(`/challenge/${challenge!.id}`);
      return;
    }

    await create(data);
    reset();

    router.push("/");
  };

  return (
    <div className="card max-w-md w-full">
      <div className="card-body">
        {action === "edit" ? (
          <h2 className="card-title">Edit &quot;{challenge!.title}&quot;</h2>
        ) : (
          <h2 className="card-title">Create New Challenge</h2>
        )}

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

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Visiblity</legend>

            <div className="flex gap-2">
              <input
                className="btn"
                value="public"
                type="radio"
                aria-label="Public"
                {...register("visibility")}
              />
              <input
                className="btn"
                value="private"
                type="radio"
                aria-label="Private"
                {...register("visibility")}
              />
            </div>

            {errors.endAt && (
              <span className="text-error text-sm mt-1">
                {errors.endAt.message}
              </span>
            )}
          </fieldset>

          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {action === "edit" ? "Update Challenge" : "Create Challenge"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
