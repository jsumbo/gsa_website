"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash2, MoreHorizontal, Users } from "lucide-react"
import { getAthletes, deleteAthlete } from "@/lib/firestore"
import type { Athlete } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AdminShell } from "@/components/admin-shell"
import { toast } from "sonner"

export default function AthletesAdminPage() {
  return (
    <AdminShell>
      <AthletesContent />
    </AdminShell>
  )
}

function AthletesContent() {
  const [roster, setRoster] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)

  const loadAthletes = async () => {
    try {
      const data = await getAthletes()
      setRoster(data)
    } catch {
      toast.error("Failed to load athletes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAthletes()
  }, [])

  const handleDelete = async (athlete: Athlete) => {
    if (!confirm(`Remove ${athlete.name} from the roster? This cannot be undone.`)) return
    try {
      await deleteAthlete(athlete.id)
      setRoster((prev) => prev.filter((a) => a.id !== athlete.id))
      toast.success(`${athlete.name} removed from roster`)
    } catch {
      toast.error("Failed to delete athlete")
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Athletes</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {loading ? "Loading..." : `${roster.length} athlete${roster.length !== 1 ? "s" : ""} on the roster`}
            </p>
          </div>
          <Link href="/gsa/athletes/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Athlete
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin h-8 w-8 border-2 border-foreground border-t-transparent rounded-full" />
          </div>
        ) : roster.length === 0 ? (
          <div className="bg-background border border-border rounded-lg p-16 text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No athletes yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add your first athlete to get started.
            </p>
            <Link href="/gsa/athletes/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Athlete
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Athlete
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Position
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Club
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Nationality
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Stats
                  </th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {roster.map((athlete) => (
                  <tr key={athlete.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={athlete.image}
                            alt={athlete.name}
                            fill
                            className="object-cover grayscale"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{athlete.name}</p>
                          <p className="text-xs text-muted-foreground">#{athlete.number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                        {athlete.position}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{athlete.team}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{athlete.nationality}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span><strong className="text-foreground">{athlete.stats.goals}</strong> G</span>
                        <span><strong className="text-foreground">{athlete.stats.assists}</strong> A</span>
                        <span><strong className="text-foreground">{athlete.stats.appearances}</strong> Apps</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/athletes/${athlete.slug}`} className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/gsa/athletes/edit/${athlete.id}`} className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive flex items-center gap-2"
                            onClick={() => handleDelete(athlete)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
