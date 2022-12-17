import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}


export function useUsers() {
  const { data, error } = useSWR(`/api/get-users`, fetcher)

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useName(user_id) {
  const { data, error } = useSWR(`/api/get-name?user_id=${user_id}`, fetcher)

  return {
    name: data,
    isLoading: !error && !data,
    isError: error,
  }
}


export function useFeedbackRequests( user_id ){
  const {data, error} = useSWR(`/api/get-feedback-requests?user_id=${user_id}`, fetcher)

  return {
    feedbackRequests: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useFeedback( request_id ){
  const {data, error} = useSWR(`/api/get-feedback?request_id=${request_id}`, fetcher)

  return {
    feedback: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useGrowthAreas( user_id, userEmail ){
  const {data, error} = useSWR(`/api/get-growth-areas?user_id=${user_id}&userEmail=${userEmail}`, fetcher)

  return {
    growth_areas: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useGrowthAreasProfile( userEmail ){
  const {data, error} = useSWR(`/api/get-growth-areas-profile?userEmail=${userEmail}`, fetcher)

  return {
    growth_areas: data,
    isLoading: !error && !data,
    isError: error,
  }
}