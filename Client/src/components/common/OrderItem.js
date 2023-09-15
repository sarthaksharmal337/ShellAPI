import React from "react";

export default function(props) {
    return(
        <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="min-w-0 flex-1">
                <a href={"/orders/" + props.id} className="focus:outline-none">
                    <div class="flex items-center justify-between">
                        <section>
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">{props.title}</p>
                            <p className="truncate text-sm text-gray-500">{props.subtitle}</p>
                        </section>
                        
                        <p className="text-sm font-medium text-gray-900">{props.price}</p>
                    </div>
                </a>
            </div>
        </div>
    )
}