"use server"

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertTicketSchema, type insertTicketSchemaType } from "@/zod-schemas/ticket";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


/**
 * Action to save a customer in the database. This action handles both creating a new customer
 * and updating an existing customer based on the presence of the customer ID.
 * 
 * @remarks
 * - If the customer ID is 0, a new customer is created.
 * - If the customer ID is not 0, the existing customer is updated.
 * 
 * @param {Object} param - The parameter object.
 * @param {insertCustomerSchemaType} param.parsedInput - The parsed input containing customer details.
 * 
 * @returns {Promise<{ message: string }>} A message indicating the result of the operation.
 * 
 * @throws Will redirect to the login page if the user is not authenticated.
 */
export const saveTicketAction = actionClient
    .metadata({actionName: 'saveTicketAction'})
    .schema(insertTicketSchema, {
        handleValidationErrorsShape : async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action( async ({
        parsedInput : ticket
    } : { parsedInput: insertTicketSchemaType}) => {
        const { isAuthenticated } = getKindeServerSession();
        const isAuth = await isAuthenticated();
        if(!isAuth) redirect('/login');

        //New ticket
        if(ticket.id === '(New)') {
            const result = await db.insert(tickets).values({
                customerId : ticket.customerId,
                title : ticket.title,
                description : ticket.description,
                tech : ticket.tech
            }).returning({insertedId : tickets.id})

        return { message : `Ticket ID #${result[0].insertedId} created successfully`}
        }

        //Updatating ticket
        const result = await db.update(tickets)
            .set({
                customerId : ticket.customerId,
                title : ticket.title,
                description : ticket.description,
                completed : ticket.completed,
                tech : ticket.tech
            })
            .where(eq(tickets.id, ticket.id!))
            .returning({updatedId : tickets.id})

        return { message : `Ticket ID #${result[0].updatedId} updated successfully`}
    })