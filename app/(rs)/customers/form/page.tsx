import { BackButton } from "@/components/BackButton";
// import CustomerForm from "./CustomerForm";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs"

async function CustomerFormPage({searchParams,} : {searchParams : Promise<{[key : string] : string | undefined}>} ) {

    try {
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
            console.log(customer);
            
           return (
                    <>
                        <h2 className="text-2xl mb-2 text-green-400">Customer ID #{customerId} loaded successfully</h2>
                        <div>
                            <p>Customer: {customer.firstName}</p>
                            <p>Email: {customer.email}</p>
                        </div>
                        <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost" />
                    </>
                );
        } else {
            // new customer form component
        }

    } catch (error) {
        if(error instanceof Error){
            Sentry.captureException(error)
            throw error
        }
    }

    return ( 
        <>
            {/* <CustomerForm/> */}
        </>
     );
}

export default CustomerFormPage;