import type ApiError from "@/utils/api/error";
import type { z, ZodTypeAny } from "astro:schema";

export enum ApiErrorCode {
  INPUT,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL,
}

export type SafeResult<TInput extends ApiError, TOutput> =
  | {
      data: TOutput;
      error: undefined;
    }
  | {
      data: undefined;
      error: TInput;
    };

export type ApiFunc<TParam extends ZodTypeAny, TOutput> = (
  input: z.infer<TParam>,
) => Promise<SafeResult<ApiError, TOutput>>;
