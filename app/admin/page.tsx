"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { users } from "@/lib/placeholder-data"
import { Users, Shield, Settings, Plus, Search, Pencil, Trash2 } from "lucide-react"

const roleColors: Record<string, string> = {
  admin: "bg-primary/20 text-primary",
  analyst: "bg-success/20 text-success",
  viewer: "bg-muted text-muted-foreground",
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Admin</h2>
          <p className="text-muted-foreground">Manage users, roles, and system settings</p>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-2">
              <Shield className="h-4 w-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account with specified role permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" className="bg-secondary border-0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@company.com"
                            className="bg-secondary border-0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger className="bg-secondary border-0">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="analyst">Analyst</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="relative max-w-sm mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-0"
                  />
                </div>

                {/* Users Table */}
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                        <TableHead className="text-muted-foreground">Name</TableHead>
                        <TableHead className="text-muted-foreground">Email</TableHead>
                        <TableHead className="text-muted-foreground">Role</TableHead>
                        <TableHead className="text-muted-foreground">Last Active</TableHead>
                        <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-card-foreground">{user.name}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={roleColors[user.role] || "bg-secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{formatDateTime(user.lastActive)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Admin</CardTitle>
                  <CardDescription>Full system access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">View all data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">Manage users</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">Configure system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">Run workflows</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Analyst</CardTitle>
                  <CardDescription>Data analysis access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">View all data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Manage users</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Configure system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">Run workflows</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Viewer</CardTitle>
                  <CardDescription>Read-only access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-success" />
                      <span className="text-card-foreground">View all data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Manage users</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Configure system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Run workflows</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email alerts for failed runs</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-refresh Dashboard</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions for compliance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* Data Retention */}
                <div className="space-y-2">
                  <Label>Data Retention Period</Label>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-full max-w-xs bg-secondary border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">How long to retain historical run data</p>
                </div>

                {/* API Configuration */}
                <div className="space-y-2">
                  <Label>Backend API URL</Label>
                  <Input
                    placeholder="https://api.lineage.internal"
                    defaultValue="https://api.lineage.internal"
                    className="max-w-md bg-secondary border-0"
                  />
                  <p className="text-sm text-muted-foreground">Endpoint for the lineage backend service</p>
                </div>

                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
