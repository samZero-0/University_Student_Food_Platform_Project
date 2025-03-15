import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Utensils, 
  BarChart, 
  Settings, 
  LogOut,
  ChevronLeft,
  Flame,
  Menu
} from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/admin' },
  { icon: Users, text: 'Users', path: '/admin/users' },
  { icon: ShoppingCart, text: 'Orders', path: '/admin/orders' },
  { icon: Utensils, text: 'Add Categories', path: '/admin/addCategories' },
  { icon: BarChart, text: 'Applications', path: '/admin/applications' },
  { icon: Flame, text: 'Featured Items', path: '/admin/featuredItems' },
];

const SidebarItem = ({ icon: Icon, text, active, collapsed, onClick }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={onClick}
          className={`
            flex items-center p-3 rounded-lg cursor-pointer
            transition-all duration-300 ease-in-out
            group relative
            ${active 
              ? 'bg-primary text-primary-foreground shadow-lg' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }
            ${collapsed ? 'justify-center' : 'justify-start'}
          `}
        >
          <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} transition-all duration-300`} />
          <span className={`
            font-medium whitespace-nowrap
            transition-all duration-300
            ${collapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'}
          `}>
            {text}
          </span>
          {active && (
            <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-lg" />
          )}
        </div>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{text}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`
      flex flex-col h-full
      transition-all duration-300 ease-in-out
      ${collapsed && !isMobile ? 'w-20' : 'w-64'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/logo.png" alt="Logo" />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <h2 className={`
            font-bold text-xl text-foreground
            transition-all duration-300
            ${collapsed && !isMobile ? 'w-0 opacity-0' : 'w-auto opacity-100'}
          `}>
            Admin Panel
          </h2>
        </div>
        {/* {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden  md:flex"
          >
            <ChevronLeft className={`w-5 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </Button>
        )} */}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-grow p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.text}>
              <SidebarItem
                icon={item.icon}
                text={item.text}
                active={location.pathname === item.path}
                collapsed={collapsed && !isMobile}
              />
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link to="/">
          <SidebarItem
            icon={LogOut}
            text="Logout"
            collapsed={collapsed && !isMobile}
            onClick={() => {
              // Add your logout logic here
              console.log('Logging out...');
            }}
          />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 md:hidden z-50"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent isMobile={true} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50">
        <div className={`
          h-screen bg-background border-r border-border
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
        `}>
          <SidebarContent />
        </div>
      </div>

      {/* Content Margin */}
      <div className={`
        transition-all duration-300 ease-in-out
        md:ml-${collapsed ? '20' : '64'}
      `}>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default DashboardSidebar;