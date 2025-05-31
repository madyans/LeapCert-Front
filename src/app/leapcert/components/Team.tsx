import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { teamMembers } from "../constants"

interface iProps {
    toggleMember: (id: number) => void
    expandedMember: number | null
}

export const Team = ({ toggleMember, expandedMember }: iProps) => {
    return (
        <section>
            <h2 className="text-3xl font-bold text-white text-center mb-10">Nossa Equipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                    <div key={member.id} className="relative">
                        <Card
                            className={`bg-white/95 backdrop-blur-md border-none shadow-xl overflow-hidden transition-all duration-300 ${expandedMember === member.id ? 'scale-105 z-20' : 'hover:shadow-2xl hover:transform hover:scale-102'}`}
                        >
                            <CardContent className="p-0">
                                <div className="relative">
                                    <div className="h-48 bg-gradient-to-b from-green-400 to-green-600 relative">
                                        <Image
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-center opacity-90 mix-blend-overlay"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                        <h3 className="text-xl font-bold">{member.name}</h3>
                                        <p className="text-green-200">{member.role}</p>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center text-sm text-gray-600 mb-4">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>{member.location}</span>
                                    </div>

                                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                        {member.bio}
                                    </p>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full flex items-center justify-center gap-1 border-green-500 text-green-600 hover:bg-green-50"
                                        onClick={() => toggleMember(member.id)}
                                    >
                                        {expandedMember === member.id ? 'Ver menos' : 'Ver mais'}
                                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedMember === member.id ? 'rotate-180' : ''}`} />
                                    </Button>

                                    {expandedMember === member.id && (
                                        <div className="mt-4 animate-fadeIn">
                                            <h4 className="font-medium text-green-800 mb-2">Habilidades</h4>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {member.skills.map((skill, index) => (
                                                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <h4 className="font-medium text-green-800 mb-2">Contato</h4>
                                            <div className="flex space-x-3">
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                                                    aria-label={`LinkedIn de ${member.name}`}
                                                >
                                                    <Linkedin className="h-4 w-4" />
                                                </a>
                                                <a
                                                    href={member.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                                    aria-label={`GitHub de ${member.name}`}
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                                    aria-label={`Email de ${member.name}`}
                                                >
                                                    <Mail className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}