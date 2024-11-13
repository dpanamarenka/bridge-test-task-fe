export enum MessageType {
  BRIDGE = "BRIDGE",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface BridgeMessage {
  from: string;
  amount: string;
  chain: string;
  type: MessageType.BRIDGE;
}

interface SuccessMessage {
  txLink: string;
  type: MessageType.SUCCESS;
}

interface ErrorMessage {
  message: string;
  type: MessageType.ERROR;
}

export type Message = BridgeMessage | SuccessMessage | ErrorMessage;

export enum Event {
  BRIDGE_EVENT = "bridge-event",
  SUCCESS_EVENT = "success-event",
  ERROR_EVENT = "error-event",
}

export const NotificationTitleMap = {
  [MessageType.BRIDGE]: "New bridge transfer detected",
  [MessageType.SUCCESS]: "Funds transferred, transaction in processing",
  [MessageType.ERROR]: "Error occurred",
};
