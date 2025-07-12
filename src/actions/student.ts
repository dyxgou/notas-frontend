import { ActionError, defineAction } from "astro:actions";
import { getSecret } from "astro:env/server";
import { z } from "astro:schema";

const SUCCESS_STATUS = 200;

const API_URL = getSecret("API_URL");

type Student = {
  id: number;
  name: string;
};

export const student = {
  getByCourse: defineAction({
    input: z.object({
      course: z.number().gte(0).lte(11),
    }),

    handler: async ({ course }) => {
      const res = await fetch(`${API_URL}/api/student/${course}`);

      if (res.status != SUCCESS_STATUS) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Los estudiantes no han sido enontrados",
        });
      }

      const students = (await res.json()) as Student[];

      return students;
    },
  }),

  create: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(4).max(30),
      parent_phone: z.string().length(10),
      course: z.number().gte(0).lte(11),
    }),
    handler: async ({ name, course, parent_phone }) => {
      const res = await fetch(`${API_URL}/api/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          course,
          parent_phone,
        }),
      });

      if (res.status != SUCCESS_STATUS) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "El usuario no ha podido ser creado correctamente. Porfavor intentalo de nuevo mas tarde.",
        });
      }
    },
  }),
};
