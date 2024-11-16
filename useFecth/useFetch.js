import { useEffect, useState } from "react"
import { fetch } from "whatwg-fetch";

export const useFetch = (url) => {

  const localCache = {}
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  })

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoandingState =()=>{
    setState({
      data: null,
      isLoading: false,
      hasError: true,
      error: null 
    })
  }

  const getFetch = async () => {
    if (localCache[url]) {
      console.log('Usuando Cache');
      setState({
        data:localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      })
      return;
    }
    
    setLoandingState();

    const resp = await fetch(url);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code:resp.status,
          message:resp.statusText,
        },
      })
      return;
    }
    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    })

    localCache[url] = data;
  }
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }
}


