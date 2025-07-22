import { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import Chat from "../chat";

export default function ChatModal({
  client,
  driver,
  image,
}: {
    image:string
  client: string;
  driver: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button >
          <MessageSquareMore className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Chat oynasi</DialogTitle>
        </DialogHeader>

        <Chat client={client} driver={driver} image={image} />

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Yopish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
