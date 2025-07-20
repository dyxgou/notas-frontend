import { ActionError, defineAction } from "astro:actions";
import type { Student } from "@/store/student";
import { getSecret } from "astro:env/server";
import { z } from "astro:schema";

const SUCCESS_STATUS = 200;

const API_URL = getSecret("PUBLIC_API_URL");

export const student = {
  getByCourse: defineAction({
    input: z.object({
      course: z.number().gte(0).lte(11),
    }),

    handler: async ({ course }) => {
      const res = await fetch(`${API_URL}/api/student/course/${course}`);

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

      const studentId = (await res.json()) as Student;

      return studentId;
    },
  }),

  getParentPhone: defineAction({
    input: z.object({
      id: z.number(),
    }),
    async handler({ id }) {
      const res = await fetch(`${API_URL}/api/student/parent/${id}`);
      if (!res.ok) {
        console.log(await res.text());
        throw new ActionError({
          code: "NOT_FOUND",
          message:
            "El número de teléfono del estudiante no ha sido encontrado.",
        });
      }

      const parentPhone = (await res.json()) as { parent_phone: string };
      return parentPhone;
    },
  }),

  changeName: defineAction({
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),

    async handler({ id, name }) {
      const res = await fetch(`${API_URL}/api/student/change/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name }),
      });

      if (!res.ok) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "El estudiante no ha sido encontrado.",
        });
      }
    },
  }),

  changeParentPhone: defineAction({
    input: z.object({
      id: z.number(),
      parent_phone: z.string().length(10),
    }),

    async handler({ id, parent_phone }) {
      const res = await fetch(`${API_URL}/api/student/change/phone`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          parent_phone,
        }),
      });

      if (!res.ok) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message:
            "No se ha podido cambiar el numeró telefónico del estudiante.",
        });
      }
    },
  }),
};
