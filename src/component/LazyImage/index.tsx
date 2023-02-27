import React, {useCallback, useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import {useMount} from "ahooks";


interface Props {
  url: string;
}

const LazyImage = (props: Props) => {

  const [url, setUrl] = useState('');
  const ref: any = useRef();

  useEffect(() => {
    let url = props.url
    if (!props.url?.endsWith('?param=100y100')) {
      url = url + '?param=100y100'
    }
    setUrl(url)
  }, [props])

  const onImageLoad = useCallback(() => {
    const { width } = ref.current;
    setUrl(props.url.replace('100y100', `${width}y${width}`))
  }, [ref, props])

  return (
    <img ref={ref} alt="lazyImage" className={style.lazyImage} src={url} onLoad={onImageLoad} />
  )
}

export default LazyImage;
