/**
 * Cerebras API schemas - OpenAI-compatible
 *
 * Cerebras uses an OpenAI-compatible API, so we re-export OpenAI schemas.
 * @see https://inference-docs.cerebras.ai/
 */
export {
  ChatCompletionRequestSchema,
  ChatCompletionResponseSchema,
  ChatCompletionsHeadersSchema,
  ChatCompletionUsageSchema,
  FinishReasonSchema,
} from "../openai/api";
