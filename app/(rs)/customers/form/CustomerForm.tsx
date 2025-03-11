" use client "

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { inserCustomerSchema, selectCustomerSchemaType, type inserCustomerSchemaType, type selectCustomerSchema } from "@/zod-schemas/customer"

type Props = {
    customer? : selectCustomerSchemaType,
}

export default function CustomerForm({customer} : Props){
    const defaultValues : inserCustomerSchemaType = {
        id : customer?.id || 0,
        firstName : customer?.firstName || '',
        lastName : customer?.lastName || '',
        address1 : customer?.address1 || '',
        address2: customer?.address2 || '',
        city : customer?.city || "",
        state : customer?.state || "",
        zip : customer?.zip || "",
        email : customer?.email || "",
        phone : customer?.phone || "",
        notes: customer?.notes || "",
    }


    const form = useForm<inserCustomerSchemaType>({
    mode : 'onBlur',
    resolver : zodResolver(inserCustomerSchema),
    defaultValues,
    })
    async function submitForm(data : inserCustomerSchemaType) {
        console.log(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer Form
                </h2>
            </div>
            <Form {...form}>
                <form className="flex flex-col sm:flex-row gap-4 sm:gap-8" onSubmit={form.handleSubmit(submitForm)}>
                    <p>{JSON.stringify(form.getValues())}</p>
                </form>
            </Form>
        </div>
    )
}

