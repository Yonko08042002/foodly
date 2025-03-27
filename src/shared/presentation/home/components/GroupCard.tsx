import { Button, Card, CardBody, Tooltip } from '@heroui/react'
import { AlarmClockCheck, CircleAlert, Hash, UserRound, UsersRound } from 'lucide-react'
import Image from 'next/image'
import StatusChip from './StatusChip'
import Link from 'next/link'
import { Group } from '@/shared/types/group'
import { formatEstimatedTime, formatMoney } from '@/shared/libs/format'
import Chip from '@/shared/components/atoms/Chip'
import { LiaLuggageCartSolid } from 'react-icons/lia'
import { configs } from '@/shared/constant'

interface GroupCardProps {
  group: Group
}
export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="h-max overflow-hidden">
      <div className="relative h-max w-full">
        <Image
          width={500}
          height={100}
          alt="Background Image"
          src={configs.backgroundGroup}
          className="h-48 w-full rounded-b-xl object-cover"
        />
        <div className="absolute left-0 top-0 flex w-full items-center justify-between px-6 py-4">
          <Chip className="shadow-md" description={formatMoney(group?.price)} endIcon="vnđ" />
          <StatusChip status={group?.share_scope} />
        </div>
        <div className="absolute -bottom-7 left-0 flex w-full items-center justify-start gap-2 px-6 py-4">
          <Chip
            className="shadow-md shadow-primary"
            description={group?.code}
            startIcon={<Hash size={15} strokeWidth={1.5} />}
          />
          <Chip
            className="shadow-md shadow-primary"
            description={group?.total_quantity || 0}
            startIcon={<UsersRound size={15} strokeWidth={3} />}
          />
          <Chip
            className="shadow-md shadow-primary"
            description={formatEstimatedTime(group?.public_end_time, group.public_start_time)}
            startIcon={<AlarmClockCheck size={16} strokeWidth={1.5} />}
          />
        </div>
      </div>

      <CardBody className="h-max p-6">
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <Tooltip content={group.name}>
              <h3 className="block max-w-[70px] truncate text-lg font-semibold capitalize text-black sm:max-w-[100px] xl:max-w-[90px] 2xl:max-w-[200px]">
                {group.name}
              </h3>
            </Tooltip>
            <ul className="min-h-18 list-disc space-y-1 px-6 text-sm text-primary">
              {group.menu_items?.slice(0, 2).map((item, index) => (
                <li key={index} className="items-center">
                  {item.name}
                </li>
              ))}
              {group.menu_items?.length > 2 && (
                <Tooltip content={group.menu_items.map(item => item.name).join(', ')}>
                  <li className="cursor-pointer items-center">...</li>
                </Tooltip>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <UserRound className="text-primary" />
            <Tooltip content={group?.created_by?.display_name}>
              <h3 className="block max-w-[70px] truncate text-lg font-semibold capitalize text-black sm:max-w-[100px] xl:max-w-[90px] 2xl:max-w-[200px]">
                {group?.created_by?.display_name}
              </h3>
            </Tooltip>
          </div>

          <div className="flex gap-2 pt-2">
            <Link
              className="flex w-max items-center justify-end gap-2 rounded-lg border-[1px] border-primary bg-white px-3 py-2 font-normal text-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              href="/"
            >
              <CircleAlert size={20} className="text-primary" strokeWidth={1.5} />
              <span className="text-sm font-semibold">Chi tiết</span>
            </Link>

            <Button
              startContent={<LiaLuggageCartSolid size={22} className="text-white" />}
              className="w-max items-center justify-end gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Đặt đơn
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
