import { BackButton } from "@/components/BackButton";
import CustomerForm from "./CustomerForm";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
    searchParams,
} : { searchParams : Promise<{[key : string] : string | undefined}>}){

    const { customerId } = await searchParams

    if(!customerId) return { title : "New Customer"}

    return { title : `Edit Customer #${customerId}`}
}

async function CustomerFormPage({searchParams,} : {searchParams : Promise<{[key : string] : string | undefined}>} ) {

    try {

        const { getPermission } = getKindeServerSession();
        const managerPermission = await getPermission("manager");
        const isManager = managerPermission?.isGranted;

        const { customerId } = await searchParams;
        
        //Edit customer form
        if(customerId){
            const customer = await getCustomer(parseInt(customerId));
            if(!customer){
                return (
                    <>
                        <h2 className="text-2xl mb-2 text-red-400">Customer ID #{customerId} not found</h2>
                        <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost"/>
                    </>
                )
               
            }
             return <CustomerForm isManager={isManager} customer={customer}/>
        } else {
            // new customer form component
            return <CustomerForm isManager={isManager}/>
        }
    } catch (error) {
        if(error instanceof Error){
            Sentry.captureException(error)
            throw error
        }
    }
}

export default CustomerFormPage;