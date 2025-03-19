import { BackButton } from "@/components/BackButton";
import { getTicket } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import TicketForm from "./TicketForm";
import * as Sentry from "@sentry/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js"

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
      const { customerId, ticketId } = await searchParams;

      if(!customerId && !ticketId) return {
        title : 'Missing Ticket ID or Customer ID'
      }

      if(customerId) return {
        title : `New Ticket for Customer #${customerId}`
      }

      if(ticketId) return {
        title : `Edit Ticket #${ticketId}`
      }
}

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

        const { getPermission, getUser } = getKindeServerSession();
        const [managerPermission, user] = await Promise.all([
            getPermission("manager"),
            getUser(),
        ])

        const isManager = managerPermission?.isGranted;

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
            if (isManager) {
                kindeInit() // Initializezs the kinde Management Api
                const { users } = await Users.getUsers();

                const techs = users ? users.map(user => ({ id: user.email!, description: user.email! })) : []

                return <TicketForm customer={customer} techs={techs}  isManager={isManager}/>;
            } else {
                return <TicketForm customer={customer} />;
            }
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

                if (isManager) {
                    kindeInit() // Initializezs the kinde Management Api
                    const { users } = await Users.getUsers();

                    const techs = users ? users.map(user => ({ id: user.email!, description: user.email! })) : []

                    return <TicketForm customer={customer} ticket={ticket} techs={techs} isManager={isManager}/>;
                } else {
                    const isEditable = user.email === ticket.tech;
                    console.log('user :', user.email);
                    console.log('tech :', ticket.tech);

                    return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable}/>;
                }
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            throw error;
        }
    }
}