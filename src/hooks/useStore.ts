import { useState, useEffect } from 'react'
import { IUseStoreParams } from '@interfaces'

const useStore = <T, F>({ store, callback }: IUseStoreParams<T, F>) => {
  const [data, setData] = useState<F>()
  const result = store(callback) as F

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore
