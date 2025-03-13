export interface IMessage {
  data: string;
  username: string;
  timestamp: string;
  userIcon: string;
  isCurrentUser: boolean;
}

export interface IServerMessage {
    data: string
}
