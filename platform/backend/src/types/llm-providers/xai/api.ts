/**
 * xAI (Grok) API schemas
 *
 * xAI uses an OpenAI-compatible API at https://api.x.ai/v1
 * Full tool calling support, streaming, and standard OpenAI message format.
 *
 * @see https://docs.x.ai/docs/api-reference
 */

import {
  ChatCompletionRequestSchema,
  ChatCompletionsHeadersSchema,
  ChatCompletionUsageSchema,
  FinishReasonSchema,
  ChatCompletionResponseSchema as OpenAIChatCompletionResponseSchema,
} from "../openai/api";

// Re-export request and other schemas from OpenAI since xAI is compatible
export {
  ChatCompletionRequestSchema,
  ChatCompletionsHeadersSchema,
  ChatCompletionUsageSchema,
  FinishReasonSchema,
};

/**
 * xAI response schema with passthrough for extra fields.
 * xAI API may return additional fields; passthrough ensures compatibility.
 */
export const ChatCompletionResponseSchema =
  OpenAIChatCompletionResponseSchema.passthrough();
