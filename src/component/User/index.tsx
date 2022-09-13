import React, {useCallback, useEffect, useState} from "react";
import { isEmpty } from "lodash";
import { useAppSelector } from "../../store/hooks";
import { userProfile } from "../../store/module/user";
import styles from "./style.module.scss";
import { useMount } from "ahooks";
import {getVipInfo} from "../../api/user";
import LazyImage from "../LazyImage";

const User = () => {
  const profile = useAppSelector(userProfile);
  const [vipLevelUrl, setVipLevelUrl] = useState('')

  const handleLogout = useCallback(() => {

  }, []);

  const getVip = useCallback(async () => {
    try {
      const { redVipDynamicIconUrl } = await getVipInfo()
      console.log('redVipDynamicIconUrl:', redVipDynamicIconUrl)
      setVipLevelUrl(redVipDynamicIconUrl)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useMount(() => {
    getVip()
  })

  return (
    !isEmpty(profile)
      ?
      <div className={styles.user}>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <LazyImage url={profile.avatarUrl}></LazyImage>
            <div className={styles.userInfo}>
              <LazyImage url={vipLevelUrl}></LazyImage>
              <span className={styles.userLevel}>Lv.{profile.level} </span>
              <span className={`${styles.gender} ${ profile.gender === 1 ? styles.male : styles.female }`}><i className={`iconfont ${ profile.gender === 1 ? 'icon-nan male' : 'icon-nv female' }`}></i> </span>
              <span className={styles.userSignature}> {profile.signature} </span>
            </div>
          </div>

          <span className={styles.userNickname}>
              {profile.nickname}
          </span>
        </div>
        <div className={styles.userPlaylists}>
          <div className="pc-user-createdList">
            <div className={styles.userListHeader}>
              {/*<span> PLAYLISTS {createdList.length} </span>*/}
            </div>
            {/*<div className="pc-user-list">*/}
            {/*  {*/}
            {/*    createdList.map(item => {*/}
            {/*      return (*/}
            {/*        <div className="pc-user-list-item" key={item.id}>*/}
            {/*          <Link to={`/album/${item.id}`} >*/}
            {/*            <img src={item.coverImgUrl} alt="歌单封面"></img>*/}
            {/*            <div> {item.name} </div>*/}
            {/*            <div> {item.trackCount} </div>*/}
            {/*          </Link>*/}
            {/*        </div>*/}
            {/*      )*/}
            {/*    })*/}
            {/*  }*/}
            {/*</div>*/}
          </div>
          <div className="pc-user-subList">
            <div className="pc-user-list-header">
              {/*<span> COLLECTIONS {subList.length} </span>*/}
            </div>
            {/*<div className="pc-user-list">*/}
            {/*  {*/}
            {/*    subList.map(item => {*/}
            {/*      return (*/}
            {/*        <div className="pc-user-list-item" key={item.id}>*/}
            {/*          <Link to={`/album/${item.id}`} >*/}
            {/*            <img src={item.coverImgUrl} alt="歌单封面"></img>*/}
            {/*            <div> {item.name} </div>*/}
            {/*            <div> {item.trackCount} </div>*/}
            {/*          </Link>*/}
            {/*        </div>*/}
            {/*      )*/}
            {/*    })*/}
            {/*  }*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      :
      <div></div>
  );
};

export default User;