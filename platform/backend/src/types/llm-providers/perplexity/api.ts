/**
 * Perplexity API schemas
 *
 * Perplexity uses an OpenAI-compatible API with some differences:
 * - No tool calling support
 * - Has search_results field in responses (citations from web search)
 * - Has Perplexity-specific usage fields (search_context_size, citation_tokens, etc.)
 *
 * @see https://docs.perplexity.ai/api-reference/chat-completions-post
 */
import { z } from "zod";

// Re-export request schema from OpenAI (Perplexity is OpenAI-compatible for requests)
export {
  ChatCompletionRequestSchema,
  ChatCompletionsHeadersSchema,
} from "../openai/api";

/**
 * Perplexity-specific usage schema with additional fields
 */
export const ChatCompletionUsageSchema = z
  .object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
    // Perplexity-specific usage fields
    search_context_size: z.string().nullable().optional(),
    citation_tokens: z.number().nullable().optional(),
    reasoning_tokens: z.number().nullable().optional(),
    num_search_queries: z.number().nullable().optional(),
  })
  .describe(
    `https://docs.perplexity.ai/api-reference/chat-completions-post#response-usage`,
  );

export const FinishReasonSchema = z
  .enum(["stop", "length", "content_filter", "tool_calls", "function_call"])
  .nullable();

/**
 * Search result from Perplexity's internal web search
 */
export const SearchResultSchema = z.object({
  title: z.string().optional(),
  url: z.string().optional(),
  date: z.string().nullable().optional(),
  snippet: z.string().optional(),
});

/**
 * Perplexity-specific Choice schema
 */
const PerplexityChoiceSchema = z
  .object({
    finish_reason: FinishReasonSchema,
    index: z.number(),
    logprobs: z.any().nullable().optional(),
    message: z
      .object({
        content: z.string().nullable(),
        refusal: z.string().nullable().optional(),
        role: z.enum(["assistant"]),
      })
      .describe(
        `https://docs.perplexity.ai/api-reference/chat-completions-post#response-choices-message`,
      ),
  })
  .describe(
    `https://docs.perplexity.ai/api-reference/chat-completions-post#response-choices`,
  );

/**
 * Perplexity-specific ChatCompletionResponse schema
 */
export const ChatCompletionResponseSchema = z
  .object({
    id: z.string(),
    choices: z.array(PerplexityChoiceSchema),
    created: z.number(),
    model: z.string(),
    object: z.enum(["chat.completion"]),
    system_fingerprint: z.string().nullable().optional(),
    usage: ChatCompletionUsageSchema.optional(),
    // Perplexity-specific: citations from web search
    citations: z.array(z.string()).nullable().optional(),
    search_results: z.array(SearchResultSchema).nullable().optional(),
  })
  .passthrough() // Allow additional fields from Perplexity API
  .describe(
    `https://docs.perplexity.ai/api-reference/chat-completions-post#response`,
  );
