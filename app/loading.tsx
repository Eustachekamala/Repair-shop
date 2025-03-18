import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return ( 
        <div className="fixed inset-0 z-50 bg-gray-800/70">
            <div className="w-full h-dvh grid place-content-center">
                <LoaderCircle className="h-28 w-28 animate-spin text-gray-500/90"/>
            </div>
        </div>
     );
}