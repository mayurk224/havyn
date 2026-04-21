import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { 
  Bell, 
  ShoppingCart, 
  Search, 
  Settings, 
  LogOut, 
  User,
  Heart,
  X,
  PlusCircle
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, logout } = useAuth()

  const getInitials = (name) => {
    if (!name) return '?'
    const nameParts = name.trim().split(/\s+/)
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    }
    return nameParts[0][0].toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              
              <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" id="Logo"> <g id="logomark"> <path d="M20 0C31.046 0 40 8.954 40 20V34C40 35.5913 39.3679 37.1174 38.2427 38.2426C37.1175 39.3679 35.5913 40 34 40H21V31.226C21 29.224 21.122 27.15 22.172 25.446C22.9238 24.2248 23.9294 23.1796 25.1206 22.3813C26.3118 21.5829 27.6608 21.0501 29.076 20.819L29.459 20.757C29.6169 20.703 29.754 20.601 29.8511 20.4653C29.9481 20.3296 30.0003 20.1669 30.0003 20C30.0003 19.8331 29.9481 19.6704 29.8511 19.5347C29.754 19.399 29.6169 19.297 29.459 19.243L29.076 19.181C27.0082 18.8432 25.0987 17.8644 23.6172 16.3829C22.1356 14.9013 21.1568 12.9918 20.819 10.924L20.757 10.541C20.7031 10.3831 20.6011 10.246 20.4653 10.149C20.3296 10.0519 20.1669 9.99975 20 9.99975C19.8332 9.99975 19.6705 10.0519 19.5348 10.149C19.399 10.246 19.297 10.3831 19.243 10.541L19.181 10.924C18.95 12.3393 18.4172 13.6883 17.6188 14.8795C16.8205 16.0707 15.7753 17.0763 14.554 17.828C12.85 18.878 10.776 19 8.77405 19H0.0240479C0.547048 8.419 9.29005 0 20 0Z" fill="#F06225"></path> <path d="M0 21H8.774C10.776 21 12.85 21.122 14.554 22.172C15.886 22.9928 17.0072 24.114 17.828 25.446C18.878 27.15 19 29.224 19 31.226V40H6C4.4087 40 2.88258 39.3679 1.75736 38.2426C0.632141 37.1174 0 35.5913 0 34L0 21ZM40 2C40 2.53043 39.7893 3.03914 39.4142 3.41421C39.0391 3.78929 38.5304 4 38 4C37.4696 4 36.9609 3.78929 36.5858 3.41421C36.2107 3.03914 36 2.53043 36 2C36 1.46957 36.2107 0.960859 36.5858 0.585786C36.9609 0.210714 37.4696 0 38 0C38.5304 0 39.0391 0.210714 39.4142 0.585786C39.7893 0.960859 40 1.46957 40 2Z" fill="#F06225"></path> </g> </svg>
                </div>
                <h1 className="text-xl font-bold tracking-tight hidden sm:block">Havyn</h1>
              </Link>
            </div>

   

            {/* Right Actions */}
            <div className="flex items-center gap-2">

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                      {isSearchOpen ? <X className="size-5 lg:hidden" /> : <Search className="size-5 lg:hidden" />}
                      <Heart className="size-5 hidden lg:block" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isSearchOpen ? 'Close Search' : 'Wishlist'}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      <Bell className="size-5" />
                      <Badge className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px] border-2 border-background">
                        3
                      </Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      <ShoppingCart className="size-5" />
                      <Badge variant="secondary" className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px] border-2 border-background">
                        2
                      </Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>My Cart</TooltipContent>
                </Tooltip>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {user ? (
                  <DropdownMenu rotate={true}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                        <Avatar className="h-9 w-9 border transition-transform hover:scale-105">
                          <AvatarImage src={user.avatar} alt={user.fullName} />
                          <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                            {getInitials(user.fullName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent aria-label="User menu" className="w-56" align="end" forceMount>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.fullName}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 size-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer lg:hidden">
                          <Heart className="mr-2 size-4" />
                          <span>Wishlist</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Settings className="mr-2 size-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        {user.role === 'Vendor' && (
                          <Link to="/seller/create-product" className="w-full">
                            <DropdownMenuItem className="cursor-pointer">
                              <PlusCircle className="mr-2 size-4" />
                              <span>Create Product</span>
                            </DropdownMenuItem>
                          </Link>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => logout()}
                        >
                          <LogOut className="mr-2 size-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button variant="default" size="sm" className="rounded-full px-5 h-9 font-medium shadow-sm hover:shadow-md transition-all">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sub Navbar */}
          <div className={`flex-col md:flex-row items-center justify-between gap-2 py-3 border-t md:h-14 ${isSearchOpen ? 'flex' : 'hidden md:flex'}`}>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
              {['Men', 'Women', 'Child', 'New Arrived'].map((category) => (
                <Link 
                  key={category} 
                  to={`/catalog?category=${category}`}
                  className="block"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="whitespace-nowrap font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-full transition-all"
                  >
                    {category}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for products, brands and more..." 
                className="pl-10 h-10 w-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all rounded-full" 
              />
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
