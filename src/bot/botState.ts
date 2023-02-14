//Unsettled schema

import { z } from 'zod';



//obstacle
export const obstacleSchema = z.object({
    polygonVerticeCoordinates: z.number().array().length(2).array() // assuming obstacle would be polygon
});

//battery status
export const batteryLevelLiteralsSchema = z.union([z.literal('low'),z.literal('medium'),z.literal('high')])
export const batteryStatusSchema = z.object({
    batteryPercentage: z.number().gte(0).lte(1),
    batteryLevel: batteryLevelLiteralsSchema
})

//Led State
export const ledModeLiteralsSchema = z.union([z.literal('serverOverwrite'),z.literal('clientOverwrite')])
export const ledAnimationModeLiteralsSchema = z.union([z.literal('stable'),z.literal('Flashing')])
export const ledAnimationSchema = z.object({
    animationMode: ledAnimationModeLiteralsSchema,
    flashingFrequency :z.number().optional()
})
export const ledStateSchema = z.object({
    ledMode:ledModeLiteralsSchema,
    rgbValue:z.number().gte(0).lte(255).array().length(3),
    ledAnimation: ledAnimationSchema

})

//module state
export const micStandPoseSchema = z.object({
    gripPosition: z.number().gte(0).lte(1),
    
})
export const modulePoseSchema = micStandPoseSchema; //Should be an union with more moduleSchemas
export const moduleStateSchema = z.object({

    type: z.string(),
    moduleData: z.any(),
    modulePose: modulePoseSchema,

});

//botState

export const robotStatusLiteralSchema = z.union([z.literal('idle'),z.literal('moving'),z.literal('stopped'),z.literal('error')]) ;
export const botPoseSchema = z.object({
    position:z.number().array().length(3),
    orientation:z.number().array().length(3)
}); 

export const botStateSchema = z.object({

    name: z.string(),
    pose: botPoseSchema,
    obstacles: obstacleSchema.array(),
    batteryStatus: batteryStatusSchema,
    ledState: ledStateSchema,
    status: robotStatusLiteralSchema,
    module: moduleStateSchema

});
export const compositePoseSchema = z.object({
    pose: botPoseSchema,
    modulePose: modulePoseSchema
})



export const aggregateBotStateSchema = botStateSchema.array()

export type botState = z.infer<typeof botStateSchema>;
export type aggregateBotState = z.infer<typeof aggregateBotStateSchema>;
export type compositePose = z.infer<typeof compositePoseSchema>;
export type botPose = z.infer<typeof botPoseSchema>;
export type modulePose = z.infer<typeof modulePoseSchema>;
export type obstacle = z.infer<typeof obstacleSchema>;
export type LEDState = z.infer<typeof ledStateSchema>