import { useEffect, useRef } from 'react'
import { Group, SearchGroupParams } from '@/shared/types/group'
import GroupCard from './GroupCard'
import { Skeleton, Spinner } from '@heroui/react'
import { useInfiniteGroups, useQueryGroups } from '@/shared/hooks/useGroups'
import { isTextMatching } from '@/shared/helpers/validation'

export default function GroupList({
  params,
  searchTerm,
}: {
  params: SearchGroupParams
  searchTerm: string
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteGroups()
  const groupOrders: Group[] =
    data?.pages.flatMap(page =>
      page.groups.filter(
        (group: Group) =>
          isTextMatching(group.name, searchTerm) ||
          isTextMatching(group.created_by.display_name, searchTerm),
      ),
    ) || []

  const listRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadMoreRef.current || !listRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          const list = listRef.current
          const previousScrollHeight = list ? list.scrollHeight : 0
          fetchNextPage().then(() => {
            requestAnimationFrame(() => {
              if (list) {
                list.scrollTop += list.scrollHeight - previousScrollHeight
              }
            })
          })
        }
      },
      { threshold: 1 },
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  if (isLoading) {
    return (
      <Spinner
        className="p-2 text-center font-semibold text-primary"
        labelColor="primary"
        label="Loading..."
      />
    )
  }

  return (
    <div className="mx-auto w-full">
      <p className="py-2 font-bold italic text-primary md:hidden">{groupOrders.length} nhóm</p>
      <div ref={listRef} className="no-scrollbar h-[65vh] overflow-y-auto rounded-xl md:h-[70vh]">
        <div className="grid w-full grid-cols-1 gap-4 rounded-xl sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {groupOrders.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
      {isFetchingNextPage && (
        <p className="p-2 text-center">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        </p>
      )}
    </div>
  )
}
