import { Button } from "@/components/ui";
import {
  ArrowUpRight,
  ChevronDown,
  DollarSign,
  Plus,
  Wallet,
} from "lucide-react";
import Image from "next/image";

const TotalBalanceCard = () => {
  return (
    <div className="bg-background rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-app-inner-bg flex items-center justify-center">
            <Wallet className="size-5 text-text-base" />
          </div>
          <h5 className="text-xl font-medium text-text-base">Total Balance</h5>
        </div>
        <Button className="rounded-full! gap-1! px-2! py-1!" variant="outline">
          <DollarSign className="size-4" /> <span className="text-sm">USD</span>
          <ChevronDown className="size-4" />
        </Button>
      </div>

      <div>
        <p className="text-4xl font-semibold mt-2">$12,345.67</p>
        <p className="text-sm text-text-base">Available Balance</p>
      </div>

      <div className="mt-5 bg-app-inner-bg p-3 rounded-xl space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-lg font-semibold leading-none">
              Create transfers
            </h6>
            <p className="text-sm text-text-base">Recent accounts</p>
          </div>
          <Button className="rounded-full! mt-0! size-8! p-0!">
            <ArrowUpRight className="size-5" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center -space-x-2 border-r border-border-color w-max pr-5">
            <Image
              src="/images/profile.png"
              className="border border-border-color rounded-full"
              alt=""
              width={40}
              height={40}
            />
            <Image
              src="/images/profile.png"
              className="border border-border-color rounded-full"
              alt=""
              width={40}
              height={40}
            />
            <Image
              src="/images/profile.png"
              className="border border-border-color rounded-full"
              alt=""
              width={40}
              height={40}
            />
            <div className="size-10 rounded-full bg-app-inner-bg flex items-center justify-center border border-border-color shrink-0">
              <p className="text-sm font-medium">+3</p>
            </div>
          </div>
          <Button className="w-max! mt-0! rounded-full! text-xs!">
            <Plus className="size-4" />
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TotalBalanceCard;
