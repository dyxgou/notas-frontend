import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";
import { getSecret } from "astro:env/server";

const SUCCESS_STATUS = 200;

const API_URL = getSecret("API_URL");

type Subject = {
  id: number;
  name: string;
  course: number;
  period: number;
  grades: number;
};

export const subject = {
  create: defineAction({
    input: z.object({
      name: z.string().max(15),
      course: z.number().gte(0).lte(11),
      period: z.number().gte(1).lte(4),
    }),

    async handler(input) {
      const res = await fetch(`${API_URL}/api/subject/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (res.status != SUCCESS_STATUS) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "La materia no ha sido creada o obtenida.",
        });
      }

      const subject = (await res.json()) as Subject;

      return subject;
    },
  }),
};
