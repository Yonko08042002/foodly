import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { CiWarning } from 'react-icons/ci'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/constant'
type ExpiredTokenProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
export default function ExpiredTokenModal({ isOpen, setIsOpen }: ExpiredTokenProps) {
  const router = useRouter()
  const handleClose = () => {
    setIsOpen(false)
    router.replace(ROUTES.HOME)
  }
  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop: 'bg-primary/30 backdrop-opacity-95 backdrop-blur-xl',
        base: 'border-primary ',
      }}
      isOpen={isOpen}
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent className="px-5">
        <div>
          <ModalHeader className="flex flex-col items-center gap-1 uppercase">
            Mã Thông Báo Hết Hạn
          </ModalHeader>
          <ModalBody className="-mb-2 -mt-3">
            <CiWarning className="text-md mx-auto flex text-red-500" size={50} />
            <p className="mb-2 text-sm font-semibold text-red-500">
              Liên kết đặt lại mật khẩu đã hết hạn hoặc đã được sử dụng.
              <br />
              Vui lòng thử yêu cầu đặt lại mật khẩu mới.
            </p>
          </ModalBody>
          <ModalFooter className="mx-auto mb-1.5 flex w-full">
            <Button color="primary" className="mx-auto w-2/5 font-semibold" onPress={handleClose}>
              Đóng
            </Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  )
}
