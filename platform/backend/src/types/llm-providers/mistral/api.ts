/**
 * Mistral API schemas
 *
 * Mistral uses an OpenAI-compatible API, so we reuse OpenAI schemas directly.
 * This ensures type compatibility when delegating to OpenAI adapters.
 *
 * @see https://docs.mistral.ai/api
 */

// Re-export all schemas from OpenAI since Mistral is fully compatible
export {
  ChatCompletionRequestSchema,
  ChatCompletionResponseSchema,
  ChatCompletionsHeadersSchema,
  ChatCompletionUsageSchema,
  FinishReasonSchema,
} from "../openai/api";
