import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useInfiniteQueryObserver } from './useInfiniteQueryObserver'

const queryClient = useQueryClient()
export { useInfiniteQueryObserver, useQuery, useInfiniteQuery, queryClient, useMutation }
