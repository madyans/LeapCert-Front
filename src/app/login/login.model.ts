import { useUser } from "@/src/context/ContextWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutateLogin } from "./hooks/useMutationAuth"
import { formSchema } from "./login.schema"

export const useLoginModel = () => {
    const router = useRouter()
    const { mutateAsync, data, isPending } = useMutateLogin()
    const { setCookieLoggedUser } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const frogRef = useRef<HTMLDivElement>(null)
    const leftEyeRef = useRef<HTMLDivElement>(null)
    const rightEyeRef = useRef<HTMLDivElement>(null)

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Update eye positions based on mouse position
    useEffect(() => {
        const updateEyes = () => {
            if (!frogRef.current || !leftEyeRef.current || !rightEyeRef.current) return

            const leftEyeRect = leftEyeRef.current.getBoundingClientRect()
            const rightEyeRect = rightEyeRef.current.getBoundingClientRect()

            // Calculate center points of each eye
            const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2
            const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2
            const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2
            const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2

            // Calculate angle between mouse and eye centers
            const leftEyeAngle = Math.atan2(mousePosition.y - leftEyeCenterY, mousePosition.x - leftEyeCenterX)
            const rightEyeAngle = Math.atan2(mousePosition.y - rightEyeCenterY, mousePosition.x - rightEyeCenterX)

            // Maximum movement radius (in pixels)
            const maxMovement = 10

            // Calculate new positions for pupils
            const leftPupilX = Math.cos(leftEyeAngle) * maxMovement
            const leftPupilY = Math.sin(leftEyeAngle) * maxMovement
            const rightPupilX = Math.cos(rightEyeAngle) * maxMovement
            const rightPupilY = Math.sin(rightEyeAngle) * maxMovement

            // Apply transformations to pupils
            const leftPupil = leftEyeRef.current.querySelector("div") as HTMLDivElement
            const rightPupil = rightEyeRef.current.querySelector("div") as HTMLDivElement

            if (leftPupil && rightPupil) {
                leftPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`
                rightPupil.style.transform = `translate(${rightPupilX}px, ${rightPupilY}px)`
            }
        }

        updateEyes()
    }, [mousePosition])

    useEffect(() => {
        if (data) {
            const results = data.data
            setCookieLoggedUser(results)
            router.push("/home")
        }
    }, [data, router, setCookieLoggedUser])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usuario: "",
            senha: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateAsync({ usuario: values.usuario, senha: values.senha })
    }

    return {
        mutateAsync,
        data,
        setCookieLoggedUser,
        showPassword, setShowPassword,
        mousePosition, setMousePosition,
        frogRef, leftEyeRef, rightEyeRef,
        form,
        onSubmit,
        isPending
    }
}