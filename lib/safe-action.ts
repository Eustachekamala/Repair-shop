import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs"

/**
 * Creates a safe action client with defined metadata schema and error handling.
 *
 * @constant
 * @type {ReturnType<typeof createSafeActionClient>}
 *
 * @function defineMetadataSchema
 * Defines the schema for the metadata using `z.object`.
 * 
 * @returns {ZodObject} The schema object with `actionName` as a string.
 *
 * @function handleServerError
 * Handles server errors by capturing exceptions with Sentry and setting context information.
 *
 * @param {Error} e - The error object thrown by the server.
 * @param {Object} utils - Utility object containing `clientInput` and `metadata`.
 * @param {any} utils.clientInput - The input provided by the client.
 * @param {Object} utils.metadata - Metadata associated with the action.
 * @param {string} utils.metadata.actionName - The name of the action.
 *
 * @returns {string} A user-friendly error message.
 */
export const actionClient = createSafeActionClient({
    defineMetadataSchema(){
        return z.object({
            actionName : z.string(),
        })
     },
     handleServerError(e, utils){        
        const { clientInput, metadata  } = utils;
        Sentry.captureException(e, (scope) => {
            scope.clear();
            scope.setContext('serverError', { message: e.message})
            scope.setContext('metadata', { actionName : metadata?.actionName})
            scope.setContext(`clientInput`, { clientInput })
            return scope
        })

        if(e.constructor.name === 'NeonDbError'){
            return 'Database Error :  Your Database did not save. Support will be notified,'
        }
        return e.message
    }
});