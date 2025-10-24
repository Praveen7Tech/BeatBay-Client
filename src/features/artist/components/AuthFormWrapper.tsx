import { ReactNode } from "react"

interface AuthFormProps{
    title: string
    children: ReactNode
}

export default function AuthFormWrapper({title, children}: AuthFormProps){
    return(
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
            </div>

            {/* <form className="space-y-6"> */}
                {children}
            {/* </form> */}

        </>
    )
}