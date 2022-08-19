import { IWSActions } from "./interfaces";

export const WS_CONNECTION_INIT: 'WS_CONNECTION_INIT' = 'WS_CONNECTION_INIT';
export const WS_CONNECTION_FETCHING: 'WS_CONNECTION_FETCHING' = 'WS_CONNECTION_FETCHING';
export const WS_CONNECTION_SUCCESSFUL: 'WS_CONNECTION_SUCCESSFUL' = 'WS_CONNECTION_SUCCESSFUL';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export const wsActions: IWSActions = {
  init: WS_CONNECTION_INIT,
  fetching: WS_CONNECTION_FETCHING,
  close: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESSFUL,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};
