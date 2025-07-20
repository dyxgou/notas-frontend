import { ActionError, defineAction } from "astro:actions";
import { getSecret } from "astro:env/server";
import { z } from "astro:content";
import type { Grade } from "@/store/grade";

const SUCCESS_STATUS = 200;
const CONFLICT_STATUS = 409;

const API_URL = getSecret("PUBLIC_API_URL");

export const grade = {
  create: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(4).max(15),
      id: z.number(),
    }),

    handler: async ({ name, id }) => {
      const res = await fetch(`${API_URL}/api/grade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          subject_id: id,
        }),
      });

      if (res.status != SUCCESS_STATUS) {
        console.log(await res.text());
        if (res.status === CONFLICT_STATUS) {
          throw new ActionError({
            code: "CONFLICT",
            message:
              "La cantidad máxima de notas que puede haber en una materia es 10.",
          });
        }

        throw new ActionError({
          code: "BAD_REQUEST",
          message: "La nota no ha sido creada.",
        });
      }

      const gradeId = (await res.json()) as { id: number };
      return gradeId;
    },
  }),

  getAllGrades: defineAction({
    input: z.object({
      subjectId: z.number(),
    }),

    async handler({ subjectId }) {
      const params = new URLSearchParams();
      params.append("subject_id", subjectId.toString());

      const res = await fetch(`${API_URL}/api/grade/?${params}`);

      if (res.status != SUCCESS_STATUS) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "Las notas de esta materia no han sido encontradas",
        });
      }

      const grades = (await res.json()) as Grade[];

      return grades;
    },
  }),

  changeName: defineAction({
    input: z.object({
      id: z.number(),
      name: z.string().min(3).max(15),
    }),

    async handler({ id, name }) {
      const res = await fetch(`${API_URL}/api/grade/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
        }),
      });

      if (!res.ok) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No se ha podido cambiar el nombre de la nota.",
        });
      }
    },
  }),
};
