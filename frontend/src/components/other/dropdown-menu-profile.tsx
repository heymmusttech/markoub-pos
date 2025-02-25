import { onSignout } from '@/api/axios-instance';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuthStore from '@/store/auth-store';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';

export function DropdownMenuProfile() {
    const navigate = useNavigate();
    const { user, role } = useAuthStore((state) => state);

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((word) => word[0].toUpperCase())
            .join('');

    const signout = () => onSignout();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="flex flex-col items-end">
                        <div className="text-slate-700 text-sm">Hello, {user?.name}</div>
                        <Badge className="text-[10px] px-2">{role}</Badge>
                    </div>
                    <Avatar className="bg-slate-200 p-2 rounded-full w-10 aspect-square flex items-center justify-center">
                        <AvatarFallback>{getInitials(user?.name!)}</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-5 mt-1.5">
                <DropdownMenuLabel className="text-slate-900">
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {role === 'admin' && (
                        <>
                            <DropdownMenuItem
                                onClick={() => navigate('/dashboard')}
                                className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 "
                            >
                                Dashboard
                                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate('/dashboard/trips')}
                                className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 "
                            >
                                All Trips
                                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate('/dashboard/trips/add')}
                                className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 "
                            >
                                Add New Trip
                                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </>
                    )}

                    {role === 'vendor' && (
                        <>
                            <DropdownMenuItem
                                onClick={() => navigate('/vendor')}
                                className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 "
                            >
                                Book Ticket
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate('/vendor/sold-tickets')}
                                className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 "
                            >
                                Sold Tickets
                                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </>
                    )}

                    <DropdownMenuItem className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 ">
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:!bg-slate-50 hover:!text-slate-600 text-slate-600 ">
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled className="text-slate-600">
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 hover:!bg-red-50 hover:!text-red-600"
                    onClick={signout}
                >
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
