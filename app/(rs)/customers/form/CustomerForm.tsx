"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer";

type Props = {
  customer?: selectCustomerSchemaType;
};

/**
 * CustomerForm component renders a form for creating or editing a customer.
 *
 * @param {Props} props - The props object containing the customer data.
 * @param {Customer} props.customer - The customer data to populate the form fields.
 *
 * @returns {JSX.Element} The rendered CustomerForm component.
 *
 * @component
 *
 * @example
//  * // Example usage:
 * <CustomerForm customer={customerData} />
 *
 * @remarks
 * This component uses `react-hook-form` for form handling and validation.
 * The form fields are populated with default values from the `customer` prop.
 * The form submission is handled by the `submitForm` function, which currently logs the form data to the console.
 */
export default function CustomerForm({ customer }: Props) {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    notes: customer?.notes ?? "",
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <p>{JSON.stringify(form.getValues())}</p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}