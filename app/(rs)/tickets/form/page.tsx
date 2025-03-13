import { BackButton } from "@/components/BackButton";
import { getTicket } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import TicketForm from "./TicketForm";
import * as Sentry from "@sentry/nextjs"

export default async function TicketsFormPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    try {
        const { customerId, ticketId } = await searchParams;
        if (!customerId && !ticketId) {
            return (
                <>
                    <h2 className="text-2xl mb-2 text-red-400">Ticket ID or Customer ID are required to load ticket form</h2>
                    <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost" />
                </>
            );
        }

        // New Ticket form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));
            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2 text-red-400">Customer ID #{customerId} not found</h2>
                        <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost" />
                    </>
                );
            }

            //New ticket form
            if(customerId){
                const customer = await getCustomer(parseInt(customerId));

                if(!customer){
                    return (
                        <>
                            <h2 className="text-2xl mb-2 text-red-400">Customer ID #{customerId} not found</h2>
                            <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost" />
                        </>
                    )
                }

                if(!customer.active){
                    return (
                        <>
                            <h2 className="text-2xl mb-2 text-red-400">Customer ID #{customerId} not found</h2>
                            <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost" />
                        </>
                    )
                }
                //return ticket form
                <TicketForm customer={customer}/>
                console.log(customer);
            }

            //Edit ticket Form
             if(ticketId){
                const ticket = await getTicket(parseInt(ticketId));

                if(!ticket){
                    return (
                        <>
                            <h2 className="text-2xl mb-2 text-red-400">Ticket ID #{customerId} is not found</h2>
                            <BackButton className="h-10 cursor-pointer rounded-lg bg-blue-700 text-wh" title="Go Back" variant="ghost" />
                        </>
                    )
                }

                const customer = await getCustomer(ticket.customerId);

                //return ticket form
                console.log("ticket", ticket);
                console.log("customer", customer);
                return <TicketForm ticket={ticket} customer={customer}/>
             }
           
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error)
            throw error;
        }
    }
}