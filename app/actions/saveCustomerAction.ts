"use server"

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertCustomerSchema, type insertCustomerSchemaType } from "@/zod-schemas/customer";
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
export const saveCustomerAction = actionClient
    .metadata({actionName: 'saveCustomerAction'})
    .schema(insertCustomerSchema, {
        handleValidationErrorsShape : async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action( async ({
        parsedInput : customer
    } : { parsedInput: insertCustomerSchemaType}) => {
        const { isAuthenticated } = getKindeServerSession();
        const isAuth = await isAuthenticated();
        if(!isAuth) redirect('/login');

        //New Customer
        if(customer.id === 0){
            const result =  await db.insert(customers).values({
                firstName : customer.firstName,
                lastName : customer.lastName,
                email : customer.email,
                address1 : customer.address1,
                ...(customer.address2?.trim() ? { address2: customer.address2 } : {}),
                city : customer.city,
                state : customer.state,
                zip : customer.zip,
                phone : customer.phone,
                notes : customer.notes?.trim() ?? ""
        }).returning({insertId : customers.id})
            return { message : `Customer ID #${result[0].insertId} created successfully`}
        }

        //Existing customer
        const result = await db.update(customers)
            .set({
                firstName: customer.firstName,
                lastName : customer.lastName,
                email : customer.email,
                phone : customer.phone,
                address1 : customer.address1,
                address2 : customer.address2?.trim() ?? null,
                city : customer.city,
                state : customer.state,
                zip : customer.zip,
                notes : customer.notes?.trim() ?? null
            })
            .where(eq(customers.id, customer.id!))
            .returning({ updatedId : customers.id})

        return { message : `Customer ID #${result[0].updatedId} updated successfully`}
    })