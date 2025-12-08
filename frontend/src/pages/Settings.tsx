import React, { useState } from 'react';
import { Bell, Building, CreditCard, Lock, Moon, Palette, Save, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Content */}
      <Tabs defaultValue="profile" className="w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <div className="glass rounded-xl p-2">
              <TabsList className="flex lg:flex-col w-full h-auto bg-transparent gap-1">
                <TabsTrigger 
                  value="profile" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="business" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Building className="h-4 w-4 mr-3" />
                  Business
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Palette className="h-4 w-4 mr-3" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Lock className="h-4 w-4 mr-3" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="billing" 
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CreditCard className="h-4 w-4 mr-3" />
                  Billing
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">Update your personal information</p>
                </div>
                
                <Separator />

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face" />
                    <AvatarFallback className="text-2xl gradient-primary text-primary-foreground">DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">Change Photo</Button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Chen" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="dr.sarah.chen@medibook.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="Board-certified dermatologist with 10+ years of experience" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gradient-primary text-primary-foreground border-0">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Business Settings</h2>
                  <p className="text-sm text-muted-foreground">Manage your business profile</p>
                </div>
                
                <Separator />

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" defaultValue="Chen Dermatology Clinic" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input id="specialty" defaultValue="Dermatology" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" defaultValue="MD-12345-CA" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Medical Center Drive, Suite 100" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="San Francisco" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="California" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue="94102" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gradient-primary text-primary-foreground border-0">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
                </div>
                
                <Separator />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via text message</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Appointment Reminders</p>
                      <p className="text-sm text-muted-foreground">Get reminded before appointments</p>
                    </div>
                    <Switch checked={appointmentReminders} onCheckedChange={setAppointmentReminders} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Payment Alerts</p>
                      <p className="text-sm text-muted-foreground">Notifications for payments and invoices</p>
                    </div>
                    <Switch checked={paymentAlerts} onCheckedChange={setPaymentAlerts} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
                  <p className="text-sm text-muted-foreground">Customize how the app looks</p>
                </div>
                
                <Separator />

                <div>
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">Select your preferred theme</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all flex items-center gap-3',
                        theme === 'light' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center">
                        <Sun className="h-5 w-5 text-warning" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">Light</p>
                        <p className="text-xs text-muted-foreground">A clean, bright interface</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all flex items-center gap-3',
                        theme === 'dark' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary border flex items-center justify-center">
                        <Moon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">Dark</p>
                        <p className="text-xs text-muted-foreground">Easy on the eyes</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Security</h2>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>
                
                <Separator />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gradient-primary text-primary-foreground border-0">
                    Update Password
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Billing</h2>
                  <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
                </div>
                
                <Separator />

                <div className="glass-strong rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Business Plan</p>
                    <p className="text-sm text-muted-foreground">$49/month • Renews Dec 15, 2024</p>
                  </div>
                  <Button variant="outline">Manage Plan</Button>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-3">Payment Method</h3>
                  <div className="glass-strong rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
