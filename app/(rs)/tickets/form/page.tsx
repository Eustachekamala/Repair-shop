import { BackButton } from "@/components/BackButton";
import { getTicket } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import TicketForm from "./TicketForm";
import * as Sentry from "@sentry/nextjs";

export default async function TicketsFormPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    try {
        const { customerId, ticketId } = await searchParams;

        // Validate that either customerId or ticketId is provided
        if (!customerId && !ticketId) {
            return (
                <>
                    <h2 className="text-2xl mb-2 text-red-400">
                        Ticket ID or Customer ID is required to load the ticket form
                    </h2>
                    <BackButton
                        className="h-10 cursor-pointer rounded-lg bg-blue-700 text-white"
                        title="Go Back"
                        variant="ghost"
                    />
                </>
            );
        }

        // Handle new ticket form (customerId provided)
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2 text-red-400">
                            Customer ID #{customerId} not found
                        </h2>
                        <BackButton
                            className="h-10 cursor-pointer rounded-lg bg-blue-700 text-white"
                            title="Go Back"
                            variant="ghost"
                        />
                    </>
                );
            }

            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2 text-red-400">
                            Customer ID #{customerId} is inactive
                        </h2>
                        <BackButton
                            className="h-10 cursor-pointer rounded-lg bg-blue-700 text-white"
                            title="Go Back"
                            variant="ghost"
                        />
                    </>
                );
            }

            // Render new ticket form
            return <TicketForm customer={customer} />;
        }

        // Handle edit ticket form (ticketId provided)
        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));

            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2 text-red-400">
                            Ticket ID #{ticketId} not found
                        </h2>
                        <BackButton
                            className="h-10 cursor-pointer rounded-lg bg-blue-700 text-white"
                            title="Go Back"
                            variant="ghost"
                        />
                    </>
                );
            }

            const customer = await getCustomer(ticket.customerId);

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2 text-red-400">
                            Customer for Ticket ID #{ticketId} not found
                        </h2>
                        <BackButton
                            className="h-10 cursor-pointer rounded-lg bg-blue-700 text-white"
                            title="Go Back"
                            variant="ghost"
                        />
                    </>
                );
            }

            // Render edit ticket form
            return <TicketForm ticket={ticket} customer={customer} />;
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            throw error;
        }
    }
}