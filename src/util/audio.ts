import { type Artist } from '../defination/music';

export function formatMusic(music: any) {
  // eslint-disable-next-line
  let {al, album, ar, artists, dt, duration, id, name} = music
  // 处理接口返回的内容属性名称不一的情况
  al = al || album;
  ar = ar || artists;
  dt = dt || duration;
  return {
    id: id.toString(),
    name,
    duration: dt,
    album: {
      id: al.id.toString(),
      name: al.name,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      picUrl: al.picUrl?.endsWith('?param=100y100') ? al.picUrl : `${al.picUrl}?param=100y100`,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      link: `/player/1/${al.id}`
    },
    artists: ar.map((e: any) => ({
      id: e.id.toString(),
      name: e.name,
      // Broken link
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      link: e.id ? `/artist/${e.id}` : ''
    }))
  };
}

export function formatList(list: any) {
  let playlist;
  try{
    playlist = list.map((e: any) => {
      return formatMusic(e);
    });
  } catch (e) {
    console.error('list not suit for the formation');
  }
  return playlist;
}


export function formatLyric(lyric: string){
  const result = {} as Record<string, string>;
  const lyrics = lyric.split('\n');
  lyrics.forEach(e => {
    const match = e.match(/\[.+\]/);
    if (!match) return null;
    const timestamp = match[0].replace(/\D/g, ':').replace(/^:|:$/g, '').split(':');
    const content = e.replace(/\[.+\]/, '');
    const times: number= (+timestamp[0] * 60 * 1000) + (+timestamp[1] * 1000) + (+timestamp[2]);
    result[times] = content;
  });
  return result;
}


export function getArtistNames(artists: Artist[]) {
  return artists.map(a => a.name).join('/');
}
