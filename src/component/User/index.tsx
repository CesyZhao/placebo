import React, {useCallback, useEffect, useMemo, useState} from "react";
import { isEmpty } from "lodash";
import { useAppSelector } from "../../store/hooks";
import { userProfile } from "../../store/module/user";
import styles from "./style.module.scss";
import { useMount } from "ahooks";
import {getVipInfo} from "../../api/user";
import LazyImage from "../LazyImage";
import {getAge} from "../../util/number";
import {getUserPlaylist} from "../../api/music";
import {Link} from "react-router-dom";
import Loading from '../Loading';
import placebo from '../../model/Placebo';

const User = () => {
  const profile = useAppSelector(userProfile);
  const [vipLevelUrl, setVipLevelUrl] = useState('');
  const [active, setActive] = useState(0);
  const [createdList, setCreatedList] = useState<any>([]);
  const [collectedList, setCollectedList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = useCallback(() => {

  }, []);

  const switchActiveList = useMemo(() => {
    return active === 0 ? createdList : collectedList;
  }, [active, createdList, collectedList]);

  const getUserPlayList = useCallback(async () => {
    setLoading(true);
    const res: any = await getUserPlaylist(profile.userId);
    const { playlist } = res;
    const createdList: any[] = [];
    const collectedList: any[]= [];
    playlist.forEach((album: any) => {
      if (album.creator.userId === profile.userId) {
        createdList.push(album);
      } else {
        collectedList.push(album);
      }
    });
    setCreatedList(createdList);
    setCollectedList(collectedList);
    setLoading(false);
  }, [profile.userId]);

  const getVip = useCallback(async () => {
    try {
      const res = await getVipInfo();
      const { dynamicIconUrl } = res.associator;
      setVipLevelUrl(dynamicIconUrl);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const age = useMemo(() => {
    return getAge(profile.birthday);
  }, [profile.birthday]);

  const joinTime = useMemo(() => {
    return new Date(profile.createTime);
  }, [profile.createTime]);

  useMount(() => {
    placebo.user.getUserProfile();
    getVip();
    getUserPlayList();
  });

  return (
    !isEmpty(profile) && !loading
      ?
      <div className={styles.user}>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <LazyImage url={profile.avatarUrl}></LazyImage>
            <span className={styles.userNickname}>
              <span>
                {profile.nickname}
                <LazyImage url={vipLevelUrl}></LazyImage>
              </span>
              <span className={styles.joinTime}>Join at <span>{joinTime.toLocaleDateString()}</span></span>

            </span>
          </div>
          <span className={styles.userSignature}> {profile.signature || 'No Signature'} </span>
          <div className={styles.userInfo}>
            <span className={styles.userLevel}>Lv.{profile.level} </span>
            <span className={styles.age}>{age}</span>
            <span className={`${styles.gender} ${ profile.gender === 1 ? styles.male : styles.female }`}>
              <i className={`iconfont ${ profile.gender === 1 ? 'icon-nan male' : 'icon-nv female' }`}></i>
            </span>
          </div>
        </div>
        <div className={styles.userPlaylists}>
          <div className={styles.userListHeader}>
            <span className={`${active === 0 ? styles.active : ''}`} onClick={ () => { setActive(0); }}> PLAYLISTS </span>
            <span className={`${active === 1 ? styles.active : ''}`} onClick={ () => { setActive(1); }}> COLLECTIONS </span>
          </div>
          <div className={styles.userList}>
            {
              switchActiveList.map((item: any) => {
                return (
                  <div className={styles.userListItem} key={item.id}>
                    {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                    <Link to={`/album/${item.id}`} >
                      <img src={item.coverImgUrl} alt="歌单封面"></img>
                      <div className={styles.userListItemName}> {item.name} </div>
                      <div> {item.trackCount} TRACKS </div>
                    </Link>
                  </div>
                );
              })
            }
          </div>
          <div className="pc-user-subList">
            {/* <div className="pc-user-list"> */}
            {/*  { */}
            {/*    subList.map(item => { */}
            {/*      return ( */}
            {/*        <div className="pc-user-list-item" key={item.id}> */}
            {/*          <Link to={`/album/${item.id}`} > */}
            {/*            <img src={item.coverImgUrl} alt="歌单封面"></img> */}
            {/*            <div> {item.name} </div> */}
            {/*            <div> {item.trackCount} </div> */}
            {/*          </Link> */}
            {/*        </div> */}
            {/*      ) */}
            {/*    }) */}
            {/*  } */}
            {/* </div> */}
          </div>
        </div>
      </div>
      :
      <Loading></Loading>
  );
};

export default User;
