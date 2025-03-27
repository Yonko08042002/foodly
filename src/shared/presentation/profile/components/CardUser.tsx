'use client'
import { Button, Card, CardBody, Tooltip } from '@heroui/react'
import React, { useState } from 'react'
import ChangeNameModal from '@/shared/presentation/profile/components/ChangeNameModal'
import ChangePasswordModal from '@/shared/presentation/profile/components/ChangePasswordModal'
import { LiaCoinsSolid } from 'react-icons/lia'
import { User } from '@/shared/types/auth'

interface CardUserProps {
  data?: User
}
export default function CardUser({ data }: CardUserProps) {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  return (
    <div className="">
      <Card className="rounded-lg bg-white p-2 shadow-lg">
        <CardBody>
          <h3 className="text-md w-full font-semibold text-gray-500">Thông Tin</h3>
          <div className="md:text-md mt-2 flex gap-2 text-sm">
            <div className="flex flex-col gap-1 font-medium text-gray-600">
              <p>
                <span>Tên Hiển Thị:</span>{' '}
              </p>
              <p>
                <span>Email:</span>
              </p>
              <p>
                <span>Mật Khẩu:</span>
              </p>
              <p>
                <span>Coin:</span>{' '}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-1 text-primary">
              <p className="flex w-full">
                <span className="block max-w-[70px] truncate sm:max-w-[100px] xl:max-w-[90px] 2xl:max-w-[200px]">
                  {' '}
                  <Tooltip content={data?.display_name}> {data?.display_name}</Tooltip>
                  {data?.display_name}
                </span>
                <Button
                  radius="full"
                  size="sm"
                  className="ml-5 flex h-6 items-center gap-1 bg-primary text-white"
                  onPress={() => setIsNameModalOpen(true)}
                >
                  {' '}
                  Đổi
                </Button>
                <ChangeNameModal
                  data={data?.display_name}
                  isOpen={isNameModalOpen}
                  onOpenChange={setIsNameModalOpen}
                />
              </p>
              <p>
                <span className="">{data?.email}</span>
              </p>
              <p className="flex">
                <span className="font-medium">********</span>
                <Button
                  radius="full"
                  size="sm"
                  className="ml-5 flex h-6 items-center gap-1 bg-primary text-white"
                  onPress={() => setIsPasswordModalOpen(true)}
                >
                  {' '}
                  Đổi
                </Button>

                <ChangePasswordModal
                  isOpen={isPasswordModalOpen}
                  onOpenChange={setIsPasswordModalOpen}
                />
              </p>
              <p className="flex gap-1">
                <span className="font-semibold">{data?.my_coin}</span> <LiaCoinsSolid size={20} />
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
