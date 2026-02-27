/**
 * x.ai (Grok) LLM Provider Interaction Handler
 *
 * x.ai exposes an OpenAI-compatible API, so we reuse the OpenAI interaction handler.
 */
import OpenAiChatCompletionInteraction from "./openai";

class XaiChatCompletionInteraction extends OpenAiChatCompletionInteraction {}

export default XaiChatCompletionInteraction;
