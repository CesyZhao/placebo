import React, {useCallback} from "react";
import { isEmpty } from "lodash";
import { useAppSelector } from "../../store/hooks";
import { userProfile } from "../../store/module/user";
import styles from "./style.module.scss";

const User = () => {
  const profile = useAppSelector(userProfile);

  const handleLogout = useCallback(() => {

  }, []);

  return (
    !isEmpty(profile)
      ?
      <div className={styles.user}>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <img src={profile.avatarUrl}></img>
          </div>
          <div className={styles.userInfo}>
            <span>
              {/*<span className="pc-user-level">Lv.{profile.level} </span>*/}
              <span className={styles.userLevel}><i className={`iconfont ${ profile.gender === 1 ? 'icon-nan male' : 'icon-nv female' }`}></i> </span>
            </span>
          </div>
          <span className={styles.userNickname}>
              {profile.nickname}
            </span>
          <span className={styles.userSignature}> {profile.signature} </span>
          <span className="iconfont icon-tubiaozhizuomoban-" title="登出" onClick={handleLogout}></span>
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