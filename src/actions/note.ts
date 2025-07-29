import type { Note } from "@/store/note";
import { ActionError, defineAction } from "astro:actions";
import { getSecret } from "astro:env/server";
import { z } from "astro:schema";

const API_URL = getSecret("PUBLIC_API_URL");

export const note = {
  createAndGet: defineAction({
    input: z.object({
      gradeId: z.number(),
      studentId: z.number(),
    }),

    async handler({ gradeId, studentId }) {
      const res = await fetch(`${API_URL}/api/note/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade_id: gradeId,
          student_id: studentId,
        }),
      });

      if (!res.ok) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "La nota no ha podido ser creada o encontrada.",
        });
      }

      type NoteRes = {
        id: number;
        grade_id: number;
        student_id: number;
        value: number;
      };
      const { id, value, ...info } = (await res.json()) as NoteRes;

      return {
        id,
        value,
        gradeId: info.grade_id,
        studentId: info.student_id,
      } as Note;
    },
  }),
  changeValue: defineAction({
    input: z.object({
      id: z.number(),
      value: z.number().gte(10).lte(50),
    }),

    async handler({ id, value }) {
      const res = await fetch(`${API_URL}/api/note`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value }),
      });

      if (!res.ok) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No se ha podido actualizar el valor de la nota",
        });
      }
    },
  }),
};
