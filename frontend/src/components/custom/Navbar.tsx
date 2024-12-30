import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-8 sticky top-0 bg-neutral-950">
      <div className="text-xl font-semibold">💬 chatroom</div>
      <Avatar>
        <AvatarImage src="https://github.com/anisvsc.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
