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
    setUrl(props.url + '?param=100y100')
  }, [props])

  const onImageLoad = useCallback(() => {
    const { width } = ref.current;
    setUrl(props.url + `?param=${width}y${width}`)
  }, [ref])

  return (
    <img ref={ref} alt="lazyImage" className={style.lazyImage} src={url} onLoad={onImageLoad} />
  )
}

export default LazyImage;