import { onConfirmTicket, useQueryTicketById } from "@/api/services/tickets-service";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PdfViewer from "../other/pdf-controller";
import TicketConfirmationForm from "./confirm-ticket-form";

const CheckoutForm = () => {
    const [pdfTicket, setPdfTicket] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { id } = useParams();
    const { data } = useQueryTicketById(Number(id!), isConfirmed);

    const handleConfirm = async () => {
        try {
            const { pdfTicket: currPdfTicket } = await onConfirmTicket(Number(id!));

            toast("Ticket has been confirmed!", {
                description: "You can now download and print your ticket.",
                action: {
                    label: "Ok",
                    onClick: () => { },
                },
            });

            setIsConfirmed(true);
            setPdfTicket(currPdfTicket);
        } catch (error) {
            console.error("Confirm ticket failed:", error);
            toast("Something went wrong. Please try again.", {
                description: "Confirm ticket failed.",
                action: {
                    label: "Ok",
                    onClick: () => { },
                },
            });
        }
    };

    const getTicketPdfs = () => pdfTicket || data?.ticketPdf;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="border border-slate-200 rounded-md p-4 py-2">
                {!!data && <TicketConfirmationForm ticket={data!} onConfirm={handleConfirm} />}
            </div>
            <div className="border border-slate-200 rounded-md p-4 py-2">
                <PdfViewer isGenerated={getTicketPdfs()} pdf={`data:application/pdf;base64,${getTicketPdfs()}`} />
            </div>
        </div>
    )
}

export default CheckoutForm
