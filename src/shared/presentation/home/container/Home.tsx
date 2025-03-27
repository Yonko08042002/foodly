'use client'

import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'
import GroupList from '@/shared/presentation/home/components/GroupList'
import InputSearch from '@/shared/components/atoms/InputSearch'
import FilterSearch from '@/shared/components/atoms/FilterSearch'
import { useState } from 'react'
import { SearchGroupParams } from '@/shared/types/group'

export default function HomeContainer() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [params, setParams] = useState<SearchGroupParams>({
    size: 50,
    sort: 'code:asc',
    is_online: 1,
  })
  return (
    <div className="flex h-full w-full flex-col gap-8 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex w-full gap-4 lg:w-2/5">
          <InputSearch
            className="w-full max-w-lg"
            name="Tìm kiếm"
            color="text-primary"
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <FilterSearch
            onFilterSearch={value => setParams(prev => ({ ...prev, is_online: value ? 1 : 0 }))}
          />
        </div>
        <Button
          startContent={<Plus strokeWidth={1} />}
          className="hidden w-max items-center justify-end gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-normal text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 md:flex"
        >
          Tạo nhóm
        </Button>
      </div>
      <GroupList params={params} searchTerm={searchTerm} />
    </div>
  )
}
