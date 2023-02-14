export interface IEvent {
  name: string;
  handler: Function;
}


export enum PlaceboEvent {
  UpdatePlayingStatus = 'updatePlayingStatus',
  TogglePanel = 'togglePanel'
}
