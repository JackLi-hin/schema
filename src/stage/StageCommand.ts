//unsettled schema


import { z } from 'zod';

// Define the schema for command literals and union them
export const stageCommandLiteralSchema = z.union([z.literal('capturePreset'),z.literal('recallPreset'),z.literal('stopAll'),z.literal('stop'),z.literal('setLED'),
z.literal('stopAll'),z.literal('stop'),z.literal('setLED'),z.literal('requestAllState'),z.literal('requestBotState'),z.literal('setStageBoundary')]);

// Define the schema for the StageCommand type
export const stageCommandSchema = z.object({
    // command string property that allows literal values
    command: stageCommandLiteralSchema,
    // arbritrary data property
    commandData: z.any()
});

export type StageCommand = z.infer<typeof stageCommandSchema>;
export type StageCommandLiteral = z.infer<typeof stageCommandLiteralSchema>;