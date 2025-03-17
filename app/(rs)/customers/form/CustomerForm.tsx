"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InPutWithLabel } from "@/components/Inputs/InputWithLabel";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customer";
import { TextAreaWithLabel } from "@/components/Inputs/TextAreaWithLabel";
import { CheckBoxWithLabel } from "@/components/Inputs/CheckBoxWithLabel";
import { SelectWithLabel } from "@/components/Inputs/SelectWithLable";
import { StateArray } from "@/constants/StateArray";
import { useAction } from "next-safe-action/hooks";
import { saveCustomerAction } from "@/app/actions/saveCustomerAction";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/DisplayServerAction";

type Props = {
  customer?: selectCustomerSchemaType;
  isEditable?: boolean;
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
export default function CustomerForm({ customer, isEditable = true }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;

  // const permObj = getPermissions();
  // const isAuthorized = !isLoading && permObj.permissions.some(perm => perm === 'manager'
  //   || perm === 'admin')

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
    active: customer?.active ?? true,
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if(data?.message){
        toast(data?.message || "Success!", {
        style: {
          backgroundColor: "white",
          color: "green",
        },
      })}
    },
    onError({ error }) {   
      toast("Saved failed", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });

  async function submitForm(data: insertCustomerSchemaType) {
    executeSave({...data, firstName: '', phone : ''});
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult}/>
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer{" "}
          {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col md:flex-row gap-4 md:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />

            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />

            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            <SelectWithLabel<insertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StateArray}
            />
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />

            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InPutWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />

            {isLoading ? (
              <p className="text-xl text-green-400">Loading...</p>
            ) : isManager && customer?.id && isEditable ? (
              <CheckBoxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                className="bg-red-500"
                onClick={() => {
                   form.reset(defaultValues)
                   resetSaveAction()
                }}
                type="button"
                variant="destructive"
                title="Reset"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
