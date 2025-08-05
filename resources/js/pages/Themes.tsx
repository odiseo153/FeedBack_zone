import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorCustomizer } from '@/components/settings/color-customizer';
import {
    Settings as SettingsIcon,
    Palette,
    User,
    Bell,
    Shield,
    Database,
    Sparkles
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings',
    },
];

export default function Themes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto min-h-screen">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-theme-gradient p-3">
                        <SettingsIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                        <p className="text-muted-foreground">Customize your Feedback Zone experience</p>
                    </div>
                </div>

                {/* Settings Tabs */}
                <Tabs defaultValue="appearance" className="w-full">
                    <TabsList className="grid w-full lg:w-fit grid-cols-2 lg:grid-cols-5">
                        <TabsTrigger value="appearance" className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            <span className="hidden sm:inline">Appearance</span>
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <span className="hidden sm:inline">Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="privacy" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Privacy</span>
                        </TabsTrigger>
                        <TabsTrigger value="data" className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            <span className="hidden sm:inline">Data</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="mt-6">
                        <ColorCustomizer />
                    </TabsContent>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Profile Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Profile settings coming soon</p>
                                    <p className="text-sm">Manage your profile information and preferences</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notification Preferences
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Notification settings coming soon</p>
                                    <p className="text-sm">Control how and when you receive notifications</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy Tab */}
                    <TabsContent value="privacy" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Privacy & Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Privacy settings coming soon</p>
                                    <p className="text-sm">Manage your privacy and security preferences</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Data Tab */}
                    <TabsContent value="data" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    Data Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Data management coming soon</p>
                                    <p className="text-sm">Export, import, or delete your data</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Premium Features Teaser */}
                <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white border-0 mt-8">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-white/20 p-3">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">
                                        Premium Customization
                                    </h3>
                                    <p className="text-purple-100 text-sm">
                                        Unlock advanced themes, custom gradients, and exclusive color palettes
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">Pro</div>
                                <div className="text-purple-100 text-sm">Coming Soon</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
